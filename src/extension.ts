import * as vscode from 'vscode';
import commandRegister from './commandRegister';

// try
import SPAPanel from './webviewPanel/SPAPanel';

export function activate(context: vscode.ExtensionContext) {
	commandRegister(context);

	context.subscriptions.push(
		vscode.commands.registerCommand('ro-vscode.ui', () => {
			// SPAPanel.createOrShow(context.extensionUri, context.extensionPath);
			PPP.show(context.extensionUri);
		})
	);
}

// this method is called when your extension is deactivated
export function deactivate() {}

class PPP {
	public static readonly viewType = 'TRY';

	public static show (extensionUri: vscode.Uri) {
		const column = vscode.window.activeTextEditor
			? vscode.window.activeTextEditor.viewColumn
			: void 0;

		const panel = vscode.window.createWebviewPanel(
			PPP.viewType,
			'try title',
			column || vscode.ViewColumn.One,
			{
				enableScripts: true,
			}
		);

		panel.webview.html = this._getHtmlForWebView2(panel.webview, extensionUri);
	}

	private static _getHtmlForWebView(webview: vscode.Webview, extensionUri: vscode.Uri) {
		// get resource paths
		return `
			<!DOCTYPE html>
			<html lang=zh-CN dir=ltr>
			<head>
			<base href="http://ramp.kt.ziroom.com/">
			<meta charset=utf-8>
			<meta http-equiv=Cache-Control content=no-cache>
			<meta http-equiv=X-UA-Compatible content="IE=edge"><meta name=viewport content="width=device-width,initial-scale=1">
			<meta name=google content=notranslate><!--[if IE]>
			<link rel="icon" href="/favicon.ico"><![endif]--><title>收益分析管理平台</title><link href=/css/chunk-006c607e.80d6c195.css rel=prefetch><link href=/css/chunk-012db8ae.9d307b36.css rel=prefetch><link href=/css/chunk-02585190.d5dcd59f.css rel=prefetch><link href=/css/chunk-02614fc4.d007b8e9.css rel=prefetch><link href=/css/chunk-02c5aeb1.aad95744.css rel=prefetch><link href=/css/chunk-0428b25c.6ae9e428.css rel=prefetch><link href=/css/chunk-04d9284e.1d9dabf6.css rel=prefetch><link href=/css/chunk-0576816c.f75eadd4.css rel=prefetch><link href=/css/chunk-084ee6a1.d007b8e9.css rel=prefetch><link href=/css/chunk-089578ab.7372c48b.css rel=prefetch><link href=/css/chunk-089dc6f1.808e94c4.css rel=prefetch><link href=/css/chunk-092484f7.c536c501.css rel=prefetch><link href=/css/chunk-0b698bc4.249154ae.css rel=prefetch><link href=/css/chunk-0b6d0372.1d9f5336.css rel=prefetch><link href=/css/chunk-0bfbe446.a70f4694.css rel=prefetch><link href=/css/chunk-0c2b5b6f.ee0db8c2.css rel=prefetch><link href=/css/chunk-0d56ed02.595bcb97.css rel=prefetch><link href=/css/chunk-0d697429.9d307b36.css rel=prefetch><link href=/css/chunk-0dd4f5dc.1d9dabf6.css rel=prefetch><link href=/css/chunk-0e73bd8d.7d530846.css rel=prefetch><link href=/css/chunk-0eab44e6.56efd7a3.css rel=prefetch><link href=/css/chunk-0edd3477.999dd9ca.css rel=prefetch><link href=/css/chunk-0ef35c96.d007b8e9.css rel=prefetch><link href=/css/chunk-0fb06d1e.7af98702.css rel=prefetch><link href=/css/chunk-0fb4d06a.fa3ca5f2.css rel=prefetch><link href=/css/chunk-0fb59c2a.bf0ce534.css rel=prefetch><link href=/css/chunk-100e7863.d007b8e9.css rel=prefetch><link href=/css/chunk-104af13d.05e53e14.css rel=prefetch><link href=/css/chunk-10689a4e.a9d7770d.css rel=prefetch><link href=/css/chunk-110e87e3.6160ff22.css rel=prefetch><link href=/css/chunk-124c3ba9.0d5de62e.css rel=prefetch><link href=/css/chunk-137592fc.9d85fb22.css rel=prefetch><link href=/css/chunk-13a42e56.569f2324.css rel=prefetch><link href=/css/chunk-1532f063.a0501aa9.css rel=prefetch><link href=/css/chunk-161b5e89.562095f9.css rel=prefetch><link href=/css/chunk-18a0d30e.d3140039.css rel=prefetch><link href=/css/chunk-19731142.192d20bf.css rel=prefetch><link href=/css/chunk-1a1a95ba.7a60c712.css rel=prefetch><link href=/css/chunk-1a29a49d.a0501aa9.css rel=prefetch><link href=/css/chunk-1aabfa91.8662fdff.css rel=prefetch><link href=/css/chunk-1c675b5e.8aa1e417.css rel=prefetch><link href=/css/chunk-1c7f55b9.c4d56223.css rel=prefetch><link href=/css/chunk-1e5c8590.1d9dabf6.css rel=prefetch><link href=/css/chunk-1ec6b2b2.63d3cdd4.css rel=prefetch><link href=/css/chunk-1f7ec67d.c8650110.css rel=prefetch><link href=/css/chunk-2055f766.ff8d3f2b.css rel=prefetch><link href=/css/chunk-20a4cd0b.097c7fa5.css rel=prefetch><link href=/css/chunk-217c5331.e53deda2.css rel=prefetch><link href=/css/chunk-2356f78a.23e06a9c.css rel=prefetch><link href=/css/chunk-236c0ffe.3a0042ab.css rel=prefetch><link href=/css/chunk-23b6ee1e.37ec8aa2.css rel=prefetch><link href=/css/chunk-24bca50f.d007b8e9.css rel=prefetch><link href=/css/chunk-267f82d0.5e71cc17.css rel=prefetch><link href=/css/chunk-267feb69.85c589fd.css rel=prefetch><link href=/css/chunk-272e912e.02254b71.css rel=prefetch><link href=/css/chunk-291f8b0c.aad95744.css rel=prefetch><link href=/css/chunk-294bd618.471cf937.css rel=prefetch><link href=/css/chunk-2a625a4a.d007b8e9.css rel=prefetch><link href=/css/chunk-2a6aa95e.103985c7.css rel=prefetch><link href=/css/chunk-2b1f81ba.73c9c9ff.css rel=prefetch><link href=/css/chunk-2c11b70d.e50061cc.css rel=prefetch><link href=/css/chunk-2d4a29a6.65ae2bbd.css rel=prefetch><link href=/css/chunk-2d4fff74.71d4319a.css rel=prefetch><link href=/css/chunk-2d5dc2b8.735db657.css rel=prefetch><link href=/css/chunk-2f17cc02.65ae2bbd.css rel=prefetch><link href=/css/chunk-2f19eed4.35fab08b.css rel=prefetch><link href=/css/chunk-2f96850f.c93353c4.css rel=prefetch><link href=/css/chunk-2f977b44.78a651c1.css rel=prefetch><link href=/css/chunk-30eab0cc.bf487cdc.css rel=prefetch><link href=/css/chunk-315d0d49.165ab942.css rel=prefetch><link href=/css/chunk-32dcd017.d007b8e9.css rel=prefetch><link href=/css/chunk-35a5cf25.6cb4173f.css rel=prefetch><link href=/css/chunk-3803c958.6160ff22.css rel=prefetch><link href=/css/chunk-3885ace0.f0e5c5db.css rel=prefetch><link href=/css/chunk-3d2f063e.387743c8.css rel=prefetch><link href=/css/chunk-419feda4.3ad51471.css rel=prefetch><link href=/css/chunk-41b2bc4c.bef0988e.css rel=prefetch><link href=/css/chunk-43778704.a70f4694.css rel=prefetch><link href=/css/chunk-4412d84a.512e4f2b.css rel=prefetch><link href=/css/chunk-4544c7dc.4dc210c4.css rel=prefetch><link href=/css/chunk-4588e069.f844f924.css rel=prefetch><link href=/css/chunk-495f7d13.0b83c889.css rel=prefetch><link href=/css/chunk-4aa614e4.1d9f5336.css rel=prefetch><link href=/css/chunk-4c0e2097.bea8dc5d.css rel=prefetch><link href=/css/chunk-4c8695e8.42c74c2b.css rel=prefetch><link href=/css/chunk-4c9150da.7af98702.css rel=prefetch><link href=/css/chunk-4caeccbd.9e3e3064.css rel=prefetch><link href=/css/chunk-4ce36cb0.a5ac3b7a.css rel=prefetch><link href=/css/chunk-4fdda350.c94bc3dc.css rel=prefetch><link href=/css/chunk-5004609e.6160ff22.css rel=prefetch><link href=/css/chunk-500682a0.716e6b18.css rel=prefetch><link href=/css/chunk-504b55b0.d5dcd59f.css rel=prefetch><link href=/css/chunk-50da7c55.e5bce8e4.css rel=prefetch><link href=/css/chunk-5180f40e.0d305cd0.css rel=prefetch><link href=/css/chunk-51a19f45.d091e236.css rel=prefetch><link href=/css/chunk-54ff6a15.35fab08b.css rel=prefetch><link href=/css/chunk-557b8304.d7102195.css rel=prefetch><link href=/css/chunk-55cc87d1.82720ab6.css rel=prefetch><link href=/css/chunk-56420a06.bfabdd8b.css rel=prefetch><link href=/css/chunk-568bb4a6.d7102195.css rel=prefetch><link href=/css/chunk-57b79940.9fa83273.css rel=prefetch><link href=/css/chunk-57bd77bc.298d7f5a.css rel=prefetch><link href=/css/chunk-580700c6.2217022e.css rel=prefetch><link href=/css/chunk-597a5bfa.f5c90f32.css rel=prefetch><link href=/css/chunk-59d16c86.aad95744.css rel=prefetch><link href=/css/chunk-5a7fadf6.633217cf.css rel=prefetch><link href=/css/chunk-5ba5d0b7.0b83c889.css rel=prefetch><link href=/css/chunk-5bd21e3f.7d530846.css rel=prefetch><link href=/css/chunk-5d2f1bac.6160ff22.css rel=prefetch><link href=/css/chunk-5d34776a.d3140039.css rel=prefetch><link href=/css/chunk-5e08904a.ce0b7889.css rel=prefetch><link href=/css/chunk-5e501070.999dd9ca.css rel=prefetch><link href=/css/chunk-5ee8df61.80d6c195.css rel=prefetch><link href=/css/chunk-609b6cf0.98228d90.css rel=prefetch><link href=/css/chunk-6101ced9.23e06a9c.css rel=prefetch><link href=/css/chunk-61250ef2.e53deda2.css rel=prefetch><link href=/css/chunk-629ac0ac.f5c90f32.css rel=prefetch><link href=/css/chunk-65d9460e.d7102195.css rel=prefetch><link href=/css/chunk-66b7f1f4.65ae2bbd.css rel=prefetch><link href=/css/chunk-67b5602e.d7102195.css rel=prefetch><link href=/css/chunk-6809d6f1.9c85b1c0.css rel=prefetch><link href=/css/chunk-689d565a.6cb4173f.css rel=prefetch><link href=/css/chunk-69039b61.4081ad7c.css rel=prefetch><link href=/css/chunk-6a17212d.66021dde.css rel=prefetch><link href=/css/chunk-6b4e09ee.bfabdd8b.css rel=prefetch><link href=/css/chunk-6c47335c.f0e5c5db.css rel=prefetch><link href=/css/chunk-6d91e8d4.1d9dabf6.css rel=prefetch><link href=/css/chunk-6db8e42b.64a86274.css rel=prefetch><link href=/css/chunk-6f942989.56efd7a3.css rel=prefetch><link href=/css/chunk-707e8f08.2578a8a0.css rel=prefetch><link href=/css/chunk-72a759dc.48d3341d.css rel=prefetch><link href=/css/chunk-72d37cc8.1290065f.css rel=prefetch><link href=/css/chunk-72da601a.4081ad7c.css rel=prefetch><link href=/css/chunk-742b184e.7af98702.css rel=prefetch><link href=/css/chunk-75f08edb.7444cb88.css rel=prefetch><link href=/css/chunk-75f9b21f.72c5ebbb.css rel=prefetch><link href=/css/chunk-7872eb8a.bfabdd8b.css rel=prefetch><link href=/css/chunk-78d5a756.6cb4173f.css rel=prefetch><link href=/css/chunk-7a8f1514.881a9e5e.css rel=prefetch><link href=/css/chunk-7ea9581f.3f28dcbe.css rel=prefetch><link href=/css/chunk-807d0456.0ab97838.css rel=prefetch><link href=/css/chunk-8152b3c2.f5c90f32.css rel=prefetch><link href=/css/chunk-81c9a54a.bfabdd8b.css rel=prefetch><link href=/css/chunk-83555ea8.2578a8a0.css rel=prefetch><link href=/css/chunk-8887b4d0.471cf937.css rel=prefetch><link href=/css/chunk-8d760440.512e4f2b.css rel=prefetch><link href=/css/chunk-8eaa69de.387743c8.css rel=prefetch><link href=/css/chunk-9267259c.fa3ca5f2.css rel=prefetch><link href=/css/chunk-95d4c9fa.d0764fd5.css rel=prefetch><link href=/css/chunk-9609ea48.f75eadd4.css rel=prefetch><link href=/css/chunk-98fcbfba.9c9d187d.css rel=prefetch><link href=/css/chunk-9ae13664.42c74c2b.css rel=prefetch><link href=/css/chunk-9b67f02a.78a651c1.css rel=prefetch><link href=/css/chunk-9c127842.9f9a6e0f.css rel=prefetch><link href=/css/chunk-9f917ff4.bfabdd8b.css rel=prefetch><link href=/css/chunk-a10f35da.d007b8e9.css rel=prefetch><link href=/css/chunk-a2ee9480.60265709.css rel=prefetch><link href=/css/chunk-a5234f8c.964ef8b5.css rel=prefetch><link href=/css/chunk-a855caf4.d007b8e9.css rel=prefetch><link href=/css/chunk-a9752498.be4081d2.css rel=prefetch><link href=/css/chunk-aa49bb36.33f3cf3b.css rel=prefetch><link href=/css/chunk-ae4f3d40.26e08d4d.css rel=prefetch><link href=/css/chunk-b184c080.97473f4b.css rel=prefetch><link href=/css/chunk-b28eddf4.d007b8e9.css rel=prefetch><link href=/css/chunk-b2bd7e48.6cd31ec4.css rel=prefetch><link href=/css/chunk-b80a5c5e.ae2aedce.css rel=prefetch><link href=/css/chunk-bc5414e0.1290065f.css rel=prefetch><link href=/css/chunk-bef532c6.b78c8d83.css rel=prefetch><link href=/css/chunk-bf4ae1ee.f844f924.css rel=prefetch><link href=/css/chunk-bf91d32e.9c9d187d.css rel=prefetch><link href=/css/chunk-bffbb18c.64a86274.css rel=prefetch><link href=/css/chunk-c07dc17e.73b5b6ee.css rel=prefetch><link href=/css/chunk-c27de6ee.6ae9e428.css rel=prefetch><link href=/css/chunk-c8c90d66.a65f33b7.css rel=prefetch><link href=/css/chunk-ca9e5ebc.bfabdd8b.css rel=prefetch><link href=/css/chunk-ce94cc8e.c536c501.css rel=prefetch><link href=/css/chunk-d4f061c4.f75eadd4.css rel=prefetch><link href=/css/chunk-d60b2b7e.e5bce8e4.css rel=prefetch><link href=/css/chunk-d6bea4d6.80d6c195.css rel=prefetch><link href=/css/chunk-d6fe36e8.fad65fd8.css rel=prefetch><link href=/css/chunk-d9144652.b1640c9b.css rel=prefetch><link href=/css/chunk-daba5b9c.d7102195.css rel=prefetch><link href=/css/chunk-ddeb0422.a65f33b7.css rel=prefetch><link href=/css/chunk-e1286346.0d5de62e.css rel=prefetch><link href=/css/chunk-e7241564.d007b8e9.css rel=prefetch><link href=/css/chunk-e7b6a3d6.9c85b1c0.css rel=prefetch><link href=/css/chunk-e8f85fee.d3140039.css rel=prefetch><link href=/css/chunk-eaa85b10.298d7f5a.css rel=prefetch><link href=/css/chunk-ed4bcd78.d007b8e9.css rel=prefetch><link href=/css/chunk-f0b82d94.65ae2bbd.css rel=prefetch><link href=/css/chunk-f2500c04.19f2e687.css rel=prefetch><link href=/css/chunk-f382b4dc.dce3550d.css rel=prefetch><link href=/css/chunk-f639d4ba.b78c8d83.css rel=prefetch><link href=/css/chunk-f7b5c868.73b5b6ee.css rel=prefetch><link href=/css/chunk-fef073ee.6ae9e428.css rel=prefetch><link href=/js/chunk-006c607e.d8e7e85e.js rel=prefetch><link href=/js/chunk-012db8ae.75b97c12.js rel=prefetch><link href=/js/chunk-01fe3c7f.1014ea54.js rel=prefetch><link href=/js/chunk-02585190.81c6cb6b.js rel=prefetch><link href=/js/chunk-02614fc4.fea47ad2.js rel=prefetch><link href=/js/chunk-02c5aeb1.40836047.js rel=prefetch><link href=/js/chunk-040324c2.89e81a42.js rel=prefetch><link href=/js/chunk-0428b25c.9bed8d1d.js rel=prefetch><link href=/js/chunk-04d9284e.91524549.js rel=prefetch><link href=/js/chunk-0576816c.7a4360d4.js rel=prefetch><link href=/js/chunk-084ee6a1.0d668966.js rel=prefetch><link href=/js/chunk-089578ab.f9969929.js rel=prefetch><link href=/js/chunk-089dc6f1.c3297b7e.js rel=prefetch><link href=/js/chunk-092484f7.fb166653.js rel=prefetch><link href=/js/chunk-09d8b0e4.3605b050.js rel=prefetch><link href=/js/chunk-0a1d7922.56a996ef.js rel=prefetch><link href=/js/chunk-0b3f455e.6ecff921.js rel=prefetch><link href=/js/chunk-0b698bc4.17e9ae0f.js rel=prefetch><link href=/js/chunk-0b6d0372.1f63f68c.js rel=prefetch><link href=/js/chunk-0beea26a.68be656c.js rel=prefetch><link href=/js/chunk-0bfbe446.be43373f.js rel=prefetch><link href=/js/chunk-0c2b5b6f.28b7aba5.js rel=prefetch><link href=/js/chunk-0d56ed02.394e7b0e.js rel=prefetch><link href=/js/chunk-0d697429.570d4925.js rel=prefetch><link href=/js/chunk-0d7a3aa9.e3a1dbba.js rel=prefetch><link href=/js/chunk-0dd4f5dc.c47db160.js rel=prefetch><link href=/js/chunk-0e73bd8d.c3e7db39.js rel=prefetch><link href=/js/chunk-0eab44e6.7b64c4a9.js rel=prefetch><link href=/js/chunk-0edd3477.8df5d684.js rel=prefetch><link href=/js/chunk-0ef35c96.a567ab19.js rel=prefetch><link href=/js/chunk-0fb06d1e.3386370f.js rel=prefetch><link href=/js/chunk-0fb4d06a.082ff86c.js rel=prefetch><link href=/js/chunk-0fb59c2a.a8e46aed.js rel=prefetch><link href=/js/chunk-100e7863.4b09e87c.js rel=prefetch><link href=/js/chunk-10223bea.c295b578.js rel=prefetch><link href=/js/chunk-104af13d.7497eb1c.js rel=prefetch><link href=/js/chunk-10689a4e.c9dba484.js rel=prefetch><link href=/js/chunk-110e87e3.fa889431.js rel=prefetch><link href=/js/chunk-11756dd6.bb90bbf2.js rel=prefetch><link href=/js/chunk-124c3ba9.1753a067.js rel=prefetch><link href=/js/chunk-137592fc.5ca2820c.js rel=prefetch><link href=/js/chunk-138b5b8c.e3d225f0.js rel=prefetch><link href=/js/chunk-13a42e56.237190a4.js rel=prefetch><link href=/js/chunk-1439e16f.92b260b3.js rel=prefetch><link href=/js/chunk-14c353b0.f17e4d20.js rel=prefetch><link href=/js/chunk-1532f063.68084884.js rel=prefetch><link href=/js/chunk-154d6fc2.17f0e204.js rel=prefetch><link href=/js/chunk-161b5e89.36a5b400.js rel=prefetch><link href=/js/chunk-164fb3e1.529f4fb5.js rel=prefetch><link href=/js/chunk-1683ffc2.efe80c9b.js rel=prefetch><link href=/js/chunk-18a0d30e.a7e0ee9e.js rel=prefetch><link href=/js/chunk-19731142.b1a1e38c.js rel=prefetch><link href=/js/chunk-1a1a95ba.9947931d.js rel=prefetch><link href=/js/chunk-1a29a49d.77cc35be.js rel=prefetch><link href=/js/chunk-1a5455a5.c9d1089a.js rel=prefetch><link href=/js/chunk-1aabfa91.26a3df66.js rel=prefetch><link href=/js/chunk-1bbf5fd9.f39de534.js rel=prefetch><link href=/js/chunk-1c675b5e.b68e8275.js rel=prefetch><link href=/js/chunk-1c7f55b9.5ff53699.js rel=prefetch><link href=/js/chunk-1e5c8590.5f0874e1.js rel=prefetch><link href=/js/chunk-1ec6b2b2.38d00f3b.js rel=prefetch><link href=/js/chunk-1f7ec67d.2dfc342d.js rel=prefetch><link href=/js/chunk-2055f766.0ba7942e.js rel=prefetch><link href=/js/chunk-20a4cd0b.c8f49845.js rel=prefetch><link href=/js/chunk-217c5331.2151d620.js rel=prefetch><link href=/js/chunk-22425616.bfd20972.js rel=prefetch><link href=/js/chunk-2356f78a.c52e572c.js rel=prefetch><link href=/js/chunk-236c0ffe.33de6bea.js rel=prefetch><link href=/js/chunk-23b6ee1e.1c8ffaef.js rel=prefetch><link href=/js/chunk-23dd5c37.11b46eb2.js rel=prefetch><link href=/js/chunk-24bca50f.8cdf3fcf.js rel=prefetch><link href=/js/chunk-25119372.ed89f6be.js rel=prefetch><link href=/js/chunk-267f82d0.44cf58ee.js rel=prefetch><link href=/js/chunk-267feb69.ba79051f.js rel=prefetch><link href=/js/chunk-272e912e.6f358330.js rel=prefetch><link href=/js/chunk-291f8b0c.f78b170b.js rel=prefetch><link href=/js/chunk-294bd618.8df21f1a.js rel=prefetch><link href=/js/chunk-29f8ccd6.46bd068d.js rel=prefetch><link href=/js/chunk-2a1b5518.aabebd27.js rel=prefetch><link href=/js/chunk-2a625a4a.8025269d.js rel=prefetch><link href=/js/chunk-2a6aa95e.b688ff8e.js rel=prefetch><link href=/js/chunk-2b1f81ba.8eadc6ac.js rel=prefetch><link href=/js/chunk-2b2965fe.a4d432c2.js rel=prefetch><link href=/js/chunk-2c11b70d.62163a37.js rel=prefetch><link href=/js/chunk-2d0a3c6e.cc3acb05.js rel=prefetch><link href=/js/chunk-2d0a4f11.710cd9a9.js rel=prefetch><link href=/js/chunk-2d0b24d8.ddd7fd34.js rel=prefetch><link href=/js/chunk-2d0b25e1.5dc39556.js rel=prefetch><link href=/js/chunk-2d0ba841.6f9b3b15.js rel=prefetch><link href=/js/chunk-2d0c1179.f27826e7.js rel=prefetch><link href=/js/chunk-2d0c4a38.a151f934.js rel=prefetch><link href=/js/chunk-2d0cc0a6.76845c52.js rel=prefetch><link href=/js/chunk-2d0cfac3.1ed2fa49.js rel=prefetch><link href=/js/chunk-2d0d02c2.d8fee25c.js rel=prefetch><link href=/js/chunk-2d0d3ad3.0a93211a.js rel=prefetch><link href=/js/chunk-2d0df496.dbf03d24.js rel=prefetch><link href=/js/chunk-2d0df822.e7ef1367.js rel=prefetch><link href=/js/chunk-2d0e5384.c3a0fc40.js rel=prefetch><link href=/js/chunk-2d0e6733.a16ec88a.js rel=prefetch><link href=/js/chunk-2d0f0a0d.8e6716bd.js rel=prefetch><link href=/js/chunk-2d20ec05.679c6f68.js rel=prefetch><link href=/js/chunk-2d20f763.b9fd316a.js rel=prefetch><link href=/js/chunk-2d20f8e9.0813aa40.js rel=prefetch><link href=/js/chunk-2d216d37.3dd2a88d.js rel=prefetch><link href=/js/chunk-2d217cb4.70a75957.js rel=prefetch><link href=/js/chunk-2d21ee9d.d1c455a6.js rel=prefetch><link href=/js/chunk-2d22cbf9.57c90688.js rel=prefetch><link href=/js/chunk-2d22ce95.f5ad437c.js rel=prefetch><link href=/js/chunk-2d22d086.6ba414a8.js rel=prefetch><link href=/js/chunk-2d22dae9.79c554f7.js rel=prefetch><link href=/js/chunk-2d38f0c6.1d21a5dc.js rel=prefetch><link href=/js/chunk-2d4a29a6.9eae19a3.js rel=prefetch><link href=/js/chunk-2d4fff74.f5479693.js rel=prefetch><link href=/js/chunk-2d5dc2b8.71b5ec91.js rel=prefetch><link href=/js/chunk-2d6384be.50441a06.js rel=prefetch><link href=/js/chunk-2f17cc02.e1765f0e.js rel=prefetch><link href=/js/chunk-2f19eed4.84467723.js rel=prefetch><link href=/js/chunk-2f96850f.2f04b55e.js rel=prefetch><link href=/js/chunk-2f977b44.bbdc867f.js rel=prefetch><link href=/js/chunk-30eab0cc.1374b606.js rel=prefetch><link href=/js/chunk-315d0d49.bf94848b.js rel=prefetch><link href=/js/chunk-32dcd017.bfb91203.js rel=prefetch><link href=/js/chunk-32f48be6.bdb58cf8.js rel=prefetch><link href=/js/chunk-35a5cf25.39a77feb.js rel=prefetch><link href=/js/chunk-3803c958.13d15c11.js rel=prefetch><link href=/js/chunk-3885ace0.90012119.js rel=prefetch><link href=/js/chunk-39a0f790.3957b6ce.js rel=prefetch><link href=/js/chunk-3ac19b0a.781d0d98.js rel=prefetch><link href=/js/chunk-3ba0914e.95a4f1e7.js rel=prefetch><link href=/js/chunk-3cd72922.1112df25.js rel=prefetch><link href=/js/chunk-3d2f063e.cd9316a0.js rel=prefetch><link href=/js/chunk-3df66237.d9a4174e.js rel=prefetch><link href=/js/chunk-401074d6.4e5286e9.js rel=prefetch><link href=/js/chunk-40250df0.28e5ea98.js rel=prefetch><link href=/js/chunk-415a9c3f.2a22ffd7.js rel=prefetch><link href=/js/chunk-419feda4.2315d3aa.js rel=prefetch><link href=/js/chunk-41b2bc4c.669755e5.js rel=prefetch><link href=/js/chunk-4219ee77.78d89cd3.js rel=prefetch><link href=/js/chunk-43778704.4c055240.js rel=prefetch><link href=/js/chunk-4412d84a.f5de338b.js rel=prefetch><link href=/js/chunk-44132364.a6192e93.js rel=prefetch><link href=/js/chunk-4544c7dc.ac3a5d5a.js rel=prefetch><link href=/js/chunk-4588e069.a6ec6378.js rel=prefetch><link href=/js/chunk-495f7d13.6eea6663.js rel=prefetch><link href=/js/chunk-4aa614e4.888cdd2e.js rel=prefetch><link href=/js/chunk-4c0e2097.78bcc15c.js rel=prefetch><link href=/js/chunk-4c8695e8.2edd4262.js rel=prefetch><link href=/js/chunk-4c9150da.fe91ae7a.js rel=prefetch><link href=/js/chunk-4caeccbd.2e5587e9.js rel=prefetch><link href=/js/chunk-4ce36cb0.64b35e25.js rel=prefetch><link href=/js/chunk-4fdda350.ff31de9f.js rel=prefetch><link href=/js/chunk-5004609e.9089ae2f.js rel=prefetch><link href=/js/chunk-500682a0.346ba260.js rel=prefetch><link href=/js/chunk-504b55b0.303814df.js rel=prefetch><link href=/js/chunk-50da7c55.0e19e6c1.js rel=prefetch><link href=/js/chunk-5150e0be.9345e69d.js rel=prefetch><link href=/js/chunk-5180f40e.e89cb770.js rel=prefetch><link href=/js/chunk-51913eba.4f2313b4.js rel=prefetch><link href=/js/chunk-51a19f45.ac55f2a6.js rel=prefetch><link href=/js/chunk-54ff6a15.ead0ca05.js rel=prefetch><link href=/js/chunk-557b8304.ac2a55b5.js rel=prefetch><link href=/js/chunk-55cc87d1.42410df9.js rel=prefetch><link href=/js/chunk-56420a06.0a558d85.js rel=prefetch><link href=/js/chunk-568bb4a6.1d607f89.js rel=prefetch><link href=/js/chunk-56d83385.73823413.js rel=prefetch><link href=/js/chunk-57b79940.787fad2f.js rel=prefetch><link href=/js/chunk-57bd77bc.c4df9bdb.js rel=prefetch><link href=/js/chunk-580700c6.da7a1e97.js rel=prefetch><link href=/js/chunk-597a5bfa.720249d9.js rel=prefetch><link href=/js/chunk-59d16c86.cfdddf4c.js rel=prefetch><link href=/js/chunk-5a7fadf6.2bf64cb1.js rel=prefetch><link href=/js/chunk-5ba5d0b7.bd76c5d0.js rel=prefetch><link href=/js/chunk-5bd21e3f.22fa3eb6.js rel=prefetch><link href=/js/chunk-5c6ae7f9.5c3bef10.js rel=prefetch><link href=/js/chunk-5ce51faf.a8c4156c.js rel=prefetch><link href=/js/chunk-5d2f1bac.cdc0d825.js rel=prefetch><link href=/js/chunk-5d34776a.c84a2eaa.js rel=prefetch><link href=/js/chunk-5da22b0d.5e0bc863.js rel=prefetch><link href=/js/chunk-5e08904a.a7837328.js rel=prefetch><link href=/js/chunk-5e501070.f69f1dd6.js rel=prefetch><link href=/js/chunk-5ee8df61.4ae20981.js rel=prefetch><link href=/js/chunk-609b6cf0.a8adc4a3.js rel=prefetch><link href=/js/chunk-6101ced9.fd7bc017.js rel=prefetch><link href=/js/chunk-61250ef2.a843f213.js rel=prefetch><link href=/js/chunk-61dae2f7.8441d751.js rel=prefetch><link href=/js/chunk-629ac0ac.6e61cd07.js rel=prefetch><link href=/js/chunk-65d9460e.858da3bd.js rel=prefetch><link href=/js/chunk-66b7f1f4.db60672c.js rel=prefetch><link href=/js/chunk-67b5602e.37b84012.js rel=prefetch><link href=/js/chunk-6809d6f1.051f8137.js rel=prefetch><link href=/js/chunk-6815e958.67c30274.js rel=prefetch><link href=/js/chunk-689d565a.5641cd39.js rel=prefetch><link href=/js/chunk-69039b61.024dcffb.js rel=prefetch><link href=/js/chunk-6a17212d.39d26786.js rel=prefetch><link href=/js/chunk-6b4e09ee.3807e6d3.js rel=prefetch><link href=/js/chunk-6c47335c.64ccf14b.js rel=prefetch><link href=/js/chunk-6c7b33b6.ee712a0c.js rel=prefetch><link href=/js/chunk-6d91e8d4.da25e974.js rel=prefetch><link href=/js/chunk-6db8e42b.507221bd.js rel=prefetch><link href=/js/chunk-6f942989.aba7fb0a.js rel=prefetch><link href=/js/chunk-707e8f08.8ea63a60.js rel=prefetch><link href=/js/chunk-71d94a44.bdd15344.js rel=prefetch><link href=/js/chunk-72a759dc.3076ca44.js rel=prefetch><link href=/js/chunk-72d37cc8.9900eee6.js rel=prefetch><link href=/js/chunk-72da601a.3d29a55a.js rel=prefetch><link href=/js/chunk-742b184e.ed7b7867.js rel=prefetch><link href=/js/chunk-74af3bac.32d6092a.js rel=prefetch><link href=/js/chunk-75f08edb.94a3ae03.js rel=prefetch><link href=/js/chunk-75f9b21f.5fdaa6d7.js rel=prefetch><link href=/js/chunk-763cf4ed.e280c14e.js rel=prefetch><link href=/js/chunk-783e6c73.743fc98a.js rel=prefetch><link href=/js/chunk-7872eb8a.be07e808.js rel=prefetch><link href=/js/chunk-78d5a756.10e67db1.js rel=prefetch><link href=/js/chunk-7a8f1514.957a5e68.js rel=prefetch><link href=/js/chunk-7babfebe.364531d5.js rel=prefetch><link href=/js/chunk-7ea9581f.cfa8605a.js rel=prefetch><link href=/js/chunk-7f40630d.5e1f2126.js rel=prefetch><link href=/js/chunk-7f58c670.4464764f.js rel=prefetch><link href=/js/chunk-7fcdb428.a65d31a6.js rel=prefetch><link href=/js/chunk-807d0456.842174ac.js rel=prefetch><link href=/js/chunk-8138e6a2.36006e3b.js rel=prefetch><link href=/js/chunk-8152b3c2.bcf52901.js rel=prefetch><link href=/js/chunk-81c9a54a.afd58ade.js rel=prefetch><link href=/js/chunk-83555ea8.c99da105.js rel=prefetch><link href=/js/chunk-8887b4d0.aac6cff1.js rel=prefetch><link href=/js/chunk-8d760440.aae97afc.js rel=prefetch><link href=/js/chunk-8eaa69de.23db203f.js rel=prefetch><link href=/js/chunk-9267259c.40b7024a.js rel=prefetch><link href=/js/chunk-95d4c9fa.69502ca6.js rel=prefetch><link href=/js/chunk-9609ea48.f132c3dc.js rel=prefetch><link href=/js/chunk-96b07dfc.4c57546b.js rel=prefetch><link href=/js/chunk-98fcbfba.03dc53fb.js rel=prefetch><link href=/js/chunk-9ae13664.d480bfe1.js rel=prefetch><link href=/js/chunk-9b341698.f21d6fcb.js rel=prefetch><link href=/js/chunk-9b67f02a.737603fe.js rel=prefetch><link href=/js/chunk-9c127842.b04fa26e.js rel=prefetch><link href=/js/chunk-9e9c9b90.6561a4bb.js rel=prefetch><link href=/js/chunk-9f47c75c.03c18885.js rel=prefetch><link href=/js/chunk-9f917ff4.7476ed1e.js rel=prefetch><link href=/js/chunk-a10f35da.beaf480c.js rel=prefetch><link href=/js/chunk-a2ee9480.169cd77d.js rel=prefetch><link href=/js/chunk-a5234f8c.6a5f5234.js rel=prefetch><link href=/js/chunk-a701bf02.084e89cd.js rel=prefetch><link href=/js/chunk-a855caf4.20ed9604.js rel=prefetch><link href=/js/chunk-a9752498.6573ea4b.js rel=prefetch><link href=/js/chunk-aa49bb36.0d6546ef.js rel=prefetch><link href=/js/chunk-ae4f3d40.4668243d.js rel=prefetch><link href=/js/chunk-b184c080.91ed514c.js rel=prefetch><link href=/js/chunk-b28eddf4.453e1e3a.js rel=prefetch><link href=/js/chunk-b2bd7e48.af5f9323.js rel=prefetch><link href=/js/chunk-b80a5c5e.ed09ad09.js rel=prefetch><link href=/js/chunk-b87ef9da.ad3427f7.js rel=prefetch><link href=/js/chunk-b8aec3fc.0bc37434.js rel=prefetch><link href=/js/chunk-bc5414e0.5940e0e6.js rel=prefetch><link href=/js/chunk-bd4d48a4.c905e03e.js rel=prefetch><link href=/js/chunk-bef532c6.31b527ba.js rel=prefetch><link href=/js/chunk-bf4ae1ee.d16f081c.js rel=prefetch><link href=/js/chunk-bf91d32e.1fb48a10.js rel=prefetch><link href=/js/chunk-bffbb18c.2d8db0fd.js rel=prefetch><link href=/js/chunk-c07dc17e.e5a30978.js rel=prefetch><link href=/js/chunk-c27de6ee.6b4bc8da.js rel=prefetch><link href=/js/chunk-c7aa5716.ad13e267.js rel=prefetch><link href=/js/chunk-c8c90d66.a22ad7ad.js rel=prefetch><link href=/js/chunk-ca9e5ebc.64821f0f.js rel=prefetch><link href=/js/chunk-caecee4c.2ab7c265.js rel=prefetch><link href=/js/chunk-ce94cc8e.862145c2.js rel=prefetch><link href=/js/chunk-d1a73be2.c0a08dad.js rel=prefetch><link href=/js/chunk-d20045fc.e3ecaa01.js rel=prefetch><link href=/js/chunk-d4f061c4.f68e89aa.js rel=prefetch><link href=/js/chunk-d60b2b7e.255abdfb.js rel=prefetch><link href=/js/chunk-d6bea4d6.b963425c.js rel=prefetch><link href=/js/chunk-d6fe36e8.07884c06.js rel=prefetch><link href=/js/chunk-d9144652.bfbd5956.js rel=prefetch><link href=/js/chunk-daba5b9c.7d12843f.js rel=prefetch><link href=/js/chunk-ddeb0422.6452cd74.js rel=prefetch><link href=/js/chunk-e0cc07e6.f7658390.js rel=prefetch><link href=/js/chunk-e1286346.ebd6a9cf.js rel=prefetch><link href=/js/chunk-e324d16c.bae121a4.js rel=prefetch><link href=/js/chunk-e7241564.2fe4cc8c.js rel=prefetch><link href=/js/chunk-e7623956.8f2d3f23.js rel=prefetch><link href=/js/chunk-e7b6a3d6.f3281406.js rel=prefetch><link href=/js/chunk-e8f85fee.fa6ce184.js rel=prefetch><link href=/js/chunk-eaa85b10.0ea8967f.js rel=prefetch><link href=/js/chunk-ed4bcd78.02861136.js rel=prefetch><link href=/js/chunk-f0b82d94.6af91140.js rel=prefetch><link href=/js/chunk-f2500c04.9c938ea1.js rel=prefetch><link href=/js/chunk-f382b4dc.d0ebc8c0.js rel=prefetch><link href=/js/chunk-f639d4ba.37063a19.js rel=prefetch><link href=/js/chunk-f7b5c868.5bb039de.js rel=prefetch><link href=/js/chunk-fc450062.f4917395.js rel=prefetch><link href=/js/chunk-feb4ee50.7239fe35.js rel=prefetch><link href=/js/chunk-fef073ee.c362974c.js rel=prefetch><link href=/css/app.78a40ddd.css rel=preload as=style><link href=/css/chunk-vendors.2f910167.css rel=preload as=style><link href=/js/app.8527e7d9.js rel=preload as=script><link href=/js/chunk-vendors.2d45ba01.js rel=preload as=script><link href=/css/chunk-vendors.2f910167.css rel=stylesheet><link href=/css/app.78a40ddd.css rel=stylesheet><link rel=icon type=image/png sizes=32x32 href=/img/icons/favicon-32x32.png><link rel=icon type=image/png sizes=16x16 href=/img/icons/favicon-16x16.png><link rel=manifest href=/manifest.json><meta name=theme-color content=#4DBA87><meta name=apple-mobile-web-app-capable content=no><meta name=apple-mobile-web-app-status-bar-style content=default><meta name=apple-mobile-web-app-title content=ramp.ziroom.com><link rel=apple-touch-icon href=/img/icons/apple-touch-icon-152x152.png><link rel=mask-icon href=/img/icons/safari-pinned-tab.svg color=#4DBA87><meta name=msapplication-TileImage content=/img/icons/msapplication-icon-144x144.png><meta name=msapplication-TileColor content=#000000></head><body><noscript><strong>We're sorry but ramp.ziroom.com doesn't work properly without JavaScript enabled. Please enable it to continue.</strong></noscript><div id=app></div><script>(function(para) {
        var p = para.sdk_url, n = para.name, w = window, d = document, s = 'script',x = null,y = null;
        if(typeof(w['sensorsDataAnalytic201505']) !== 'undefined') {
            return false;
        }
        w['sensorsDataAnalytic201505'] = n;
        w[n] = w[n] || function(a) {return function() {(w[n]._q = w[n]._q || []).push([a, arguments]);}};
        var ifs = ['track','quick','register','registerPage','registerOnce','trackSignup', 'trackAbtest', 'setProfile','setOnceProfile','appendProfile', 'incrementProfile', 'deleteProfile', 'unsetProfile', 'identify','login','logout','trackLink','clearAllRegister','getAppStatus'];
        for (var i = 0; i < ifs.length; i++) {
          w[n][ifs[i]] = w[n].call(null, ifs[i]);
        }
        if (!w[n]._t) {
          x = d.createElement(s), y = d.getElementsByTagName(s)[0];
          x.async = 1;
          x.src = p;
          x.setAttribute('charset','UTF-8');
          w[n].para = para;
          y.parentNode.insertBefore(x, y);
        }
      })({
        sdk_url: 'https://static8.ziroom.com/zijia/sensorsdata/sensorsdata.min.js',
        heatmap_url: 'https://static8.ziroom.com/zijia/sensorsdata/heatmap.min.js',
        name: 'sensors',
        // server_url: 'https://tianyanimport.ziroom.com:8106/sa?project=ZRSZO',
        server_url: 'https://tianyanimport.ziroom.com/sa?project=ZRSZO',
        heatmap: {
          is_track_single_page: true,
          clickmap: 'not_collect',
        },
      });</script><script src=/js/chunk-vendors.2d45ba01.js></script><script src=/js/app.8527e7d9.js></script></body></html>
		`;
	}

	private static _getHtmlForWebView2(webview: vscode.Webview, extensionUri: vscode.Uri) {
		// get resource paths
		return `
		<!DOCTYPE html>
		<html lang=zh-cn>
		<head>
		<base href="https://ronliruonan.github.io/">
		<meta charset=utf-8>
		<meta http-equiv=X-UA-Compatible content="IE=edge"><meta name=viewport content="width=device-width,initial-scale=1"><link rel=icon href=/aya-draglayout/favicon.ico><title>aya-draglayout</title><link href=/aya-draglayout/css/chunk-4d12a612.ce5bf7d7.css rel=prefetch><link href=/aya-draglayout/js/about.6fe3c8de.js rel=prefetch><link href=/aya-draglayout/js/chunk-4d12a612.d1fb0639.js rel=prefetch><link href=/aya-draglayout/css/app.fab2919d.css rel=preload as=style><link href=/aya-draglayout/css/chunk-vendors.f31a5d75.css rel=preload as=style><link href=/aya-draglayout/js/app.25c4d8d8.js rel=preload as=script><link href=/aya-draglayout/js/chunk-vendors.6d58e78c.js rel=preload as=script><link href=/aya-draglayout/css/chunk-vendors.f31a5d75.css rel=stylesheet><link href=/aya-draglayout/css/app.fab2919d.css rel=stylesheet></head><body><noscript><strong>We're sorry but aya doesn't work properly without JavaScript enabled. Please enable it to continue.</strong></noscript><div id=app></div><script src=/aya-draglayout/js/chunk-vendors.6d58e78c.js></script><script src=/aya-draglayout/js/app.25c4d8d8.js></script></body></html>
		`;
	}
}