# Dev Diary

## 20210421
> 怎么发布到vscode extension市场来着？      
 https://code.visualstudio.com/api/working-with-extensions/publishing-extension


## 20210410
### 1. How to add WebViews to a VSCode Extension
Thks blog: https://betterprogramming.pub/how-to-add-webviews-to-a-visual-studio-code-extension-69884706f056

1. Register the cmd to Activate the WebView
```js
// package.json
"contributes": {
  "commands": [
    {
      "command": "ro-vscode-extension.openWebview",
      "title": "Open webview"
    }
  ]
}
```

2. Add Code to Active the Webview
搜索：`ro-vscode-extension.exampleOpenWebview`

### 2. 基本常识
https://www.cnblogs.com/liuxianan/p/vscode-plugin-webview.html