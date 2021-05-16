
interface VsCode {
  postMessage(message: any): void;
}

declare let acquireVsCodeApi: Function;

const vscode = (acquireVsCodeApi || (() => {}))() as VsCode;

export default function vscodePostMessage(data: any) {
  vscode.postMessage(data)
}
