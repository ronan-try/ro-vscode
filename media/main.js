// // This script will be run within the webview itself
// // It cannot access the main VS Code APIs directly.
// (function (global) {
//     const vscode = acquireVsCodeApi();
//     global.vscode = vscode;

//     const oldState = vscode.getState();

//     const counter = document.getElementById('lines-of-code-counter');
//     console.log(oldState);
//     let currentCount = (oldState && oldState.count) || 0;
//     counter.textContent = currentCount;

//     setInterval(() => {
//         counter.textContent = currentCount++;

//         // Update state
//         vscode.setState({ count: currentCount });

//         // Alert the extension when the cat introduces a bug
//         if (Math.random() < Math.min(0.001 * currentCount, 0.05)) {
//             // Send a message back to the extension
//             vscode.postMessage({
//                 command: 'alert',
//                 text: '🐛  on line ' + currentCount
//             });
//         }
//     }, 1000 * 1);

//     {
//         const elBtn = document.getElementById('ro_mr');
//         elBtn.addEventListener('click', () => {
//             vscode.postMessage({
//                 command: 'alert',
//                 text: '💩 ro mr',
//             });
//             vscode.postMessage({
//                 command: 'ro_mr',
//                 text: 'good luck'
//             });
//         });
//     }

//     // Handle messages sent from the extension to the webview
//     window.addEventListener('message', event => {
//         const message = event.data; // The json data that the extension sent
//         switch (message.command) {
//             case 'refactor':
//                 currentCount = Math.ceil(currentCount * 0.5);
//                 counter.textContent = currentCount;
//                 break;
//         }
//     });
// }(global || window));