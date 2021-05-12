import * as vscode from 'vscode';

const cats = {
  'codingCat': 'cat1.webp',
  'compilingCat': 'cat2.webp',
  'testingCat': 'cat3.webp'
};

export default class RoPanel {
  // 单例
  // public property
  // currentRoPanel, viewType
  public static currentInstance: RoPanel | undefined;
  public static readonly viewType = 'RoUI';

  // private property
  // _panel, _extensionUri, _disposables
  private readonly _panel: vscode.WebviewPanel;
  private readonly _extensionUri: vscode.Uri;
  private _disposables: vscode.Disposable[] = [];

  // public function
  // createOrShow(), revive(), postMessage()
  // dispose()
  public static createOrShow(extensionUri: vscode.Uri) {
    // column
    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : void 0;

    if (RoPanel.currentInstance) {
      RoPanel.currentInstance._panel.reveal(column);
      return;
    }

    // createWebviewPanel
    const panel = vscode.window.createWebviewPanel(
      RoPanel.viewType,
      'RoDashboard',
      column || vscode.ViewColumn.One,
      getWebviewOptions(extensionUri)
    );

    // 单例
    RoPanel.currentInstance = new RoPanel(panel, extensionUri);
  }

  public static revive(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
		RoPanel.currentInstance = new RoPanel(panel, extensionUri);
	}

  public static postMesssage(message = { command: 'refactor' }) {
    RoPanel.currentInstance?._panel.webview.postMessage(message);
  }

  // private function
  // constructor(), Listen onDidDisposable() onDidChangeWebviewState(), onDidRecieveMessage()
  // _update(), _updateHtml(), _getHtmlForWebview()
  private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    this._panel = panel;
    this._extensionUri = extensionUri;

    this._update();

    // Listen
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
    this._panel.onDidChangeViewState(e => {
      if (this._panel.visible) {
        this._update();
      }
    }, null, this._disposables);
    this._panel.webview.onDidReceiveMessage(
      message => {
        switch (message.command) {
          case 'alert':
            vscode.window.showInformationMessage(message.text);
            return;
        }
      },
      null,
      this._disposables
    );
  }

  public dispose() {
    RoPanel.currentInstance = void 0;

    this._panel.dispose();

    while (this._disposables.length) {
      const x = this._disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  private _update() {
    // update webview html by sencens
    const webview = this._panel.webview;

    switch (this._panel.viewColumn) {
      case vscode.ViewColumn.Two:
        this._updateHtml(webview, 'compilingCat');
        return;
      case vscode.ViewColumn.Three:
        this._updateHtml(webview, 'testingCat');
        return;
      case vscode.ViewColumn.One:
      default:
        this._updateHtml(webview, 'codingCat');
        return;
    }
  }

  private _updateHtml(webview: vscode.Webview, typeName: keyof typeof cats) {
    this._panel.title = typeName;
    this._panel.webview.html = this._getHtmlForWebview(webview, cats[typeName]);
  }

  private _getHtmlForWebview(webview: vscode.Webview, catName: string) {
    const factoryUri = (fileName: string): vscode.Uri => {
      const onDiskPath = vscode.Uri.joinPath(this._extensionUri, 'media', fileName);
      const uri = webview.asWebviewUri(onDiskPath);
      return uri;
    };

    const scriptPathOnDisk = vscode.Uri.joinPath(this._extensionUri, 'media', 'main.js');
    const scriptUri = factoryUri('main.js');//webview.asWebviewUri(scriptPathOnDisk);

    const styleResetPath = vscode.Uri.joinPath(this._extensionUri, 'media', 'reset.css');
    const stylesPathMainPath = vscode.Uri.joinPath(this._extensionUri, 'media', 'vscode.css');

    const styleRestUri = factoryUri('reset.css'); // webview.asWebviewUri(styleResetPath);
    const stylesMainUri = factoryUri('vscode.css'); // webview.asWebviewUri(stylesPathMainPath);

    const imgUri = factoryUri(catName);

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

				<link href="${styleRestUri}" rel="stylesheet">
				<link href="${stylesMainUri}" rel="stylesheet">

				<title>Cat Coding</title>
			</head>
			<body>
				<img src="${imgUri}" width="300" />

				<h1 id="lines-of-code-counter">0</h1>

				<script nonce="${nonce}" src="${scriptUri}"></script>
			</body>
			</html>
		`;
  }
}

function getWebviewOptions(extensionUri: vscode.Uri): vscode.WebviewOptions {
  return {
    enableScripts: true,
    localResourceRoots: [vscode.Uri.joinPath(extensionUri, 'media')]
  };
}

function getNonce() {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}