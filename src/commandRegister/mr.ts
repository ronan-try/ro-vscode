import * as vscode from 'vscode';
import commandHandler from '../lib/mr';

export default  vscode.commands.registerCommand('ro-vscode.mr', commandHandler);
