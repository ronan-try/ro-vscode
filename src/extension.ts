import * as vscode from 'vscode';
import commandRegister from './commandRegister';

export function activate(context: vscode.ExtensionContext) {
	commandRegister(context);

	context.subscriptions.push(
		vscode.commands.registerCommand('ro-vscode.start', () => {
			CatPanel.createOrShow(context.extensionUri);
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('ro-vscode.doRefactor', () => {
			if (CatPanel.currentPanel) {
				CatPanel.currentPanel.doRefactor();
			}
		})
	);

	if (vscode.window.registerWebviewPanelSerializer) {
		vscode.window.registerWebviewPanelSerializer(CatPanel.viewType, {
			async deserializeWebviewPanel(webview: vscode.WebviewPanel, state: any) {
				webview.webview.options = getWebviewOptions(context.extensionUri);
				CatPanel.revive(webview, context.extensionUri);
			}
		});
	}
}

// this method is called when your extension is deactivated
export function deactivate() {}

const cats = {
	'Coding Cat': 'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif',
	'Compiling Cat': 'https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif',
	'Testing Cat': 'https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif'
};

class CatPanel {
	public static currentPanel: CatPanel | undefined;

	public static readonly viewType = 'catCoding';

	private readonly _panel: vscode.WebviewPanel;
	private readonly _extensionUri: vscode.Uri;
	private _disposables: vscode.Disposable[] = [];


	public static createOrShow(extensionUri: vscode.Uri) {
		const column = vscode.window.activeTextEditor
			? vscode.window.activeTextEditor.viewColumn
			: void 0;
		
		if (CatPanel.currentPanel) {
			CatPanel.currentPanel._panel.reveal(column);
			return;
		}

		// Otherwise, create a new panel
		const panel = vscode.window.createWebviewPanel(
			CatPanel.viewType,
			'Cat',
			column || vscode.ViewColumn.One,
			getWebviewOptions(extensionUri),
		);

		CatPanel.currentPanel = new CatPanel(panel, extensionUri);
	}

	public static revive(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
		CatPanel.currentPanel = new CatPanel(panel, extensionUri);
	}

	private constructor (panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
		this._panel = panel;
		this._extensionUri = extensionUri;

		// Set the webview's initial html content
		this._update();

		// Listen for when the panel is disposed
		// This happens when the use closes the panel or when the panel is closed programmatically
		this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
	
		// Update the content based on view changes
		this._panel.onDidChangeViewState(
			e => {
				if (this._panel.visible) {
					this._update();
				}
			},
			null,
			this._disposables
		);
	
		this._panel.webview.onDidReceiveMessage(
			message => {
				switch (message.command) {
					case 'alert':
						vscode.window.showErrorMessage(message.text);
						return;
				}
			},
			null,
			this._disposables
		);
	}

	public doRefactor () {
		// Send a message to the webview 
		// You can send any JSON serializable data
		this._panel.webview.postMessage({ command: 'refactor' });
	}

	public dispose () {
		CatPanel.currentPanel = void 0;

		this._panel.dispose();

		while(this._disposables.length) {
			const x = this._disposables.pop();
			if (x) {
				x.dispose();
			}
		}
	}

	private _update() {
		const webview = this._panel.webview;

		switch (this._panel.viewColumn) {
			case vscode.ViewColumn.Two:
				this._updateForCat(webview, 'Compiling Cat');
				return;
			case vscode.ViewColumn.Three:
				this._updateForCat(webview, 'Testing Cat');
				return;
			case vscode.ViewColumn.One:
			default:
				this._updateForCat(webview, 'Coding Cat');
				return;
		}
	}

	private _updateForCat(webview: vscode.Webview, catName: keyof typeof cats) {
		this._panel.title = catName;
		this._panel.webview.html = this._getHtmlForWebview(webview, cats[catName]);
	}

	private _getHtmlForWebview (webview: vscode.Webview, catGifPath: string) {
		const scriptPathOnDisk = vscode.Uri.joinPath(this._extensionUri, 'media', 'main.js');
		const scriptUri = webview.asWebviewUri(scriptPathOnDisk);

		const styleResetPath = vscode.Uri.joinPath(this._extensionUri, 'media', 'reset.css');
		const stylesPathMainPath = vscode.Uri.joinPath(this._extensionUri, 'media', 'vscode.css');
	
		const stylesResetUri = webview.asWebviewUri(styleResetPath);
		const stylesMainUri = webview.asWebviewUri(stylesPathMainPath);

		const nonce = getNonce();

		return `<!DOCTYPE html>
			<html>
				<head>
				<meta charset="UTF-8">

				<!--
					Use a content security policy to only allow loading images from https or from our extension directory,
					and only allow scripts that have a specific nonce.
				-->
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; img-src ${webview.cspSource} https:; script-src 'nonce-${nonce}';">

				<meta name="viewport" content="width=device-width, initial-scale=1.0">

				<link href="${stylesResetUri}" rel="stylesheet">
				<link href="${stylesMainUri}" rel="stylesheet">

				<title>Cat Coding</title>
			</head>
			<body>
				<img src="${catGifPath}" width="300" />
				<h1 id="lines-of-code-counter">0</h1>

				<script nonce="${nonce}" src="${scriptUri}"></script>
			</body>
			</html>
		`;
	}
}

function getNonce() {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < 32; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}


function getWebviewOptions(extensionUri: vscode.Uri): vscode.WebviewOptions {
	return {
		// Enable javascript in the webview
		enableScripts: true,

		// And restrict the webview to only loading content from our extension's `media` directory.
		localResourceRoots: [vscode.Uri.joinPath(extensionUri, 'media')]
	};
}