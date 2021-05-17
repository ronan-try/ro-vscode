import * as vscode from 'vscode';

import { alertInfo, alertError, alertWarning } from '../utils/vscode';
import * as shellUtils from '@ronan-try/cli-shared-utils/es/shellUtils';

export default async (type?: string) => {
  alertInfo('hi demo');

  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (!Array.isArray(workspaceFolders)) {
    alertError('not existed workspace folders[typeof]');
    return;
  }
  if (workspaceFolders.length === 0) {
    alertError('not existed workspace folders[length]');
    return;
  }

  const rootFolder = workspaceFolders[0] as vscode.WorkspaceFolder;
  const rootPath = rootFolder.uri.fsPath;

  if (!type) {
    vscode.commands.executeCommand('vscode.open', vscode.Uri.file('D:/SDE/nginx-1.19.4/conf/nginx.conf'));
    alertInfo('应该打开了文件');
    return;
  }

  if (type === 'stop') {
    shellUtils.execAsync('D:/SDE/nginx-1.19.4', 'taskkill /f /t /im nginx.exe');
    alertInfo('应该kill 了nginx进行');
    return;
  }

  if (type === 'start') {
    shellUtils.execAsync('D:/SDE/nginx-1.19.4', 'start nginx.exe');
    alertInfo('应该start 了 nginx');
    return;
  }

  alertWarning('不该执行到这里');
};
