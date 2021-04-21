import * as vscode from 'vscode';

const command = vscode.commands.registerCommand('ro-vscode.helloWorld', () => {
  vscode.window.showInformationMessage('Hello 小老弟儿!');
});

export default command;
