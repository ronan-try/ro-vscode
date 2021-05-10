import { ExtensionContext } from 'vscode';

import HelloWorld from './helloWorld';
import Mr from './mr';
import Ui from './ui';

export default function factory (context: ExtensionContext) {
  context.subscriptions.push(HelloWorld);
  context.subscriptions.push(Mr);
  context.subscriptions.push(Ui(context));
};
