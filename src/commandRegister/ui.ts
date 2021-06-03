import * as vscode from 'vscode';
import SingletonPanel from '../webviewPanel/SingletonPanel';
import RoPanel from '../webviewPanel/DemoPanel';

const command = (context: vscode.ExtensionContext) => {

	// vscode.window.registerWebviewPanelSerializer(SingletonPanel.viewType, {
	// 	async deserializeWebviewPanel(panel: vscode.WebviewPanel, state: any) {
	// 		panel.webview.options = SingletonPanel.getWebviewOptions(context.extensionUri);
	// 		SingletonPanel.revive(panel, context.extensionUri);
	// 	}
	// });

  return vscode.commands.registerCommand('ro-vscode.ui', async () => {
    SingletonPanel.creatOrShow(context.extensionUri);
		// RoPanel.createOrShow(context.extensionUri);
  });
};

export default command;
