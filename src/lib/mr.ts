import * as vscode from 'vscode';

import { alertInfo, alertError } from '../utils/vscode';
import { gitBranchCurrent, gitLocalOriginURI } from '@ronan-try/cli-service';

export default async () => {
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

  let url =
    `${gitLocalOriginUri}`
      .replace('.com:', '.com/')
      .replace('git@', 'https://')
      .replace('.git', '/merge_requests/new?')
    + 'merge_request%5Bsource_branch%5D='
    + gitLocalBranchName;

  if (gitLocalOriginUri.includes('github.com')) {
    url = `${gitLocalOriginUri}`.replace('.git', '/compare/main...' + gitLocalOriginUri.replace('https://github.com/', '').replace(/(\/(\S*))/, '') + ':' + gitLocalBranchName);
  } else if (gitLocalOriginUri.includes('gitee.com')) {
    url = `${gitLocalOriginUri}`.replace('.git', '/compare/main...' + gitLocalOriginUri.replace('https://gitee.com/', '').replace(/(\/(\S*))/, '') + ':' + gitLocalBranchName);
  }

  vscode.env.openExternal(vscode.Uri.parse(url));
  alertInfo('the browser should be opened');
};
