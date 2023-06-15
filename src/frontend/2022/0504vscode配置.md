---
title: 我的VSCode配置
date: 2022-05-04 21:33:00
aside: true
tags:
  - VSCode
---

:::tip

删除文件不小心把编辑器的配置给删了，怎么办？

此文记录一下我目前在使用的 `VSCode` 配置，不怕配置在丢了。

:::

<!-- more -->

## Settings.json

```json
{
  "files.autoSave": "onFocusChange",
  "editor.minimap.maxColumn": 30,
  "editor.fontSize": 15,
  "editor.fontWeight": "normal",
  "editor.fontFamily": "Fira Code, Menlo, Monaco, 'Courier New', monospace",
  "editor.fontLigatures": true,
  "editor.tabSize": 2,
  "editor.tabCompletion": "onlySnippets",
  "editor.formatOnSave": true,
  "editor.formatOnSaveMode": "file",
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },

  "vscode_custom_css.imports": ["file:///Users/sunwei/synthwave84.css"],

  "background.enabled": true,
  "background.useDefault": false,
  "background.customImages": [
    "file:///Users/sunwei/liying0.png",
    "file:///Users/sunwei/liying1.png",
    "file:///Users/sunwei/liying2.png",
    "file:///Users/sunwei/z4.png"
  ],
  "background.style": {
    "content": "''",
    "pointer-events": "none",
    "position": "absolute",
    "z-index": "99999",
    "width": "100%",
    "height": "100%",
    "background-position": "100% 100%",
    "background-repeat": "no-repeat",
    "opacity": 0.3
  },
  "[vue]": {
    "editor.defaultFormatter": "octref.vetur"
  },
  "editor.quickSuggestions": {
    "strings": true
  },
  "editor.linkedEditing": true,
  "workbench.colorTheme": "SynthWave '84",

  "turboConsoleLog.wrapLogMessage": true,
  "turboConsoleLog.logMessagePrefix": "",
  "turboConsoleLog.includeFileNameAndLineNum": false,
  "turboConsoleLog.delimiterInsideMessage": "||||||",
  "turboConsoleLog.quote": "\"",
  "turboConsoleLog.addSemicolonInTheEnd": true,

  "prettier.printWidth": 110,
  "window.zoomLevel": 1,
  "thunder-client.codeSnippetLanguage": "js-axios",
  "workbench.iconTheme": "material-icon-theme"
}
```

## 需要安装的插件

- background
  [github](https://github.com/shalldie/vscode-background)

- Prettier - Code formatter
  [插件地址](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

* SynthWave '84
  [插件地址](https://marketplace.visualstudio.com/items?itemName=RobbOwen.synthwave-vscode)

* Fira Code 字体
  [github](https://github.com/tonsky/FiraCode/wiki/Installing)
