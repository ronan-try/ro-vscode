import * as vscode from 'vscode';
import SingletonPanel from '../webviewPanel/SingletonPanel';

const command = (context: vscode.ExtensionContext) => {
  return vscode.commands.registerCommand('ro-vscode.ui', async () => {
    SingletonPanel.creatOrShow(context.extensionUri);
  });
};

export default command;
