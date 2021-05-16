import * as vscode from 'vscode';

import { alertInfo, alertError, alertWarning } from '../utils/vscode';
import { gitBranchCurrent, gitLocalOriginURI } from '@ronan-try/cli-service';
import { gitRemoteAdd } from '@ronan-try/cli-service/es/git';

export default async () => {
  alertInfo('Hi');

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
  const gitLocalOriginUri = await gitLocalOriginURI(rootPath);
  const gitLocalBranchName = await gitBranchCurrent(rootPath);

  const workPath = rootPath;
  {
    const res = await gitRemoteAdd(workPath, 'https://gitlab.ziroom.com/design-fe/fe-data-center/moonfall.git');
    alertWarning(JSON.stringify(res));
  }
  alertInfo('the browser should be opened');
};
