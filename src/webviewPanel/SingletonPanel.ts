import * as vscode from 'vscode';
import commandHandler from '../lib/mr';
import gitforkHandler from '../lib/gitfork';
import * as WS_MESSAGE_TYPE from '@ronan-try/cli-const/src/wsMessageType';

type PostedMessage = {
  command: string
  text: string
};

export default class SingletonPanel {
  // singleton pattern
  public static currentInstance: SingletonPanel | undefined;
  public static readonly viewType = 'SingletonPanel';

  private readonly _panel: vscode.WebviewPanel;
  private readonly _extensionUri: vscode.Uri;
  private _disposables: vscode.Disposable[] = [];

  public static creatOrShow(extensionUri: vscode.Uri) {
    // column
    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : void 0;

    // show
    if (SingletonPanel.currentInstance) {
      SingletonPanel.currentInstance._panel.reveal(column);
      return;
    }

    // create
    const panel = vscode.window.createWebviewPanel(
      SingletonPanel.viewType,
      'ro-ui',
      column || vscode.ViewColumn.One,
      getWebviewOptions(extensionUri),
    );

    SingletonPanel.currentInstance = new SingletonPanel(panel, extensionUri);
  }

  public static revive(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    SingletonPanel.currentInstance = new SingletonPanel(panel, extensionUri);
  }

  public static postMessage(message: PostedMessage ) {
    if (!SingletonPanel.currentInstance) {
      vscode.window.showErrorMessage('当前没有SingletonPanel实例');
      return;
    }
    SingletonPanel.currentInstance._panel.webview.postMessage(message);
  }

  private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    this._panel = panel;
    this._extensionUri = extensionUri;

    this._update();

    // Listen
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

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
      (message: PostedMessage) => {
        switch (message.command) {
          case 'alert':
            vscode.window.showInformationMessage(message.text);
            break;

          case WS_MESSAGE_TYPE.ADD_TARGET_UPSTREAM:
            gitforkHandler();
            break;

          case 'ro_mr':
            commandHandler();
            break;
          default:
            break;
        }
      },
      null,
      this._disposables
    );

  }


  public dispose() {
    SingletonPanel.currentInstance = void 0;
    this._panel.dispose();

    while (this._disposables.length) {
      const x = this._disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  public translateDiskUri(webview: vscode.Webview, relativePath: string, fileName: string): vscode.Uri {
    const diskPathUri = vscode.Uri.joinPath(this._extensionUri, relativePath, fileName);
    const uri = webview.asWebviewUri(diskPathUri);
    return uri;
  }

  private _update() {
    switch (this._panel.viewColumn) {
      case vscode.ViewColumn.Two:
        this._updateHtml('cat1.webp');
        break;
      case vscode.ViewColumn.Three:
        this._updateHtml('cat2');
        break;
      case vscode.ViewColumn.One:
      default:
        this._updateHtml('cat3.webp');
        break;
    }
  }

  private _updateHtml(catName: string) {
    this._panel.title = 'RoUI-' + catName;
    this._panel.webview.html = this._getHtmlForWebview(this._panel.webview, catName);
  }

  private _getHtmlForWebview(webview: vscode.Webview, catName: string) {
    const stylesUri = this.translateDiskUri(webview, 'media', 'styles.css');
    const mainjsUri = this.translateDiskUri(webview, 'media', 'main.js');

    const imgUri = this.translateDiskUri(webview, 'media', catName);

    const nonce = getNonce();

    return `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="with=device-width, initial-scale=1.0">

          <meta
            http-equiv="Content-Security-Policy"
            content="
              default-src none;
              style-src ${webview.cspSource} http://localhost:3000/ 'unsafe-inline';
              img-src ${webview.cspSource} https http://localhost:3000/;
              script-src 'nonce-${nonce}' http://localhost:3000/;
            "
          >

          <link href="${stylesUri}" rel="stylesheet">

          <title>ro-ui</title>
          <script type="module" src="http://localhost:3000/@vite/client"></script>
        </head>
        <body>
          <div id="app"></div>
          <script type="module" src="http://localhost:3000/src/main.ts"></script>

          <img src="${imgUri}" width="300" />
          <h1>${webview.cspSource}</h1>
          <h1 id="lines-of-code-counter">0</h1>

          <script nonce="${nonce}" src="${mainjsUri}"></script>
        </body>
      </html>
    `;
  }

  public static getWebviewOptions = getWebviewOptions;
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
    enableScripts: true,
    localResourceRoots: [vscode.Uri.joinPath(extensionUri, 'media')],
  };
}

