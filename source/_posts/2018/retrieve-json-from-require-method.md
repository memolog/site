---
title: JSONデータを読み込んで差し替える
featured:
  image: aaron-burden-286686
  author: Aaron Burden
  authorLink: https://unsplash.com/photos/h7wpIMY3O3E?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2018-02-04 16:35:42
---
Node.jsの中であれば単に`const config = require('config.json')`すれば良いのだけれど、フロントエンド側のJavaScriptではそうはいかない。XMLHttpRequestとか[Fetch API](https://developer.mozilla.org/ja/docs/Web/API/Fetch_API)を使うか、requireで書いたものをwebpackでbundleするとかしないといけない。他にもいろいろ方法はあると思うけど、まあとにかく一手間が必要。

その読み出すJSONデータを環境ごとに変更したい場合はなおさら面倒で、Node.jsであればprocess.env.NODE_ENVなんかを使えばいいけど、フロントエンド側ではwebpackでバンドルするときの設定を変更するとか、uglifyで`DEBUG`みたいなglobal変数を入れておいて書き出すとかしつつ、異なるJSONデータをfetchするように実装しないといけない。いろいろ方法はあるから難しい問題ではないけど、面倒ではある。<!--more-->

だからフロントエンド側の実装で `const config = require('config.json')` とあったら、`const config = {'foo': 'bar'}`みたいに置き換えてくれたら良いなあと思って、[retrieve-json](https://github.com/memolog/retrieve-json)というものを用意してみた。

```bash
npm install -g retrieve-json
```
でインストールしたら、
```bash
retrive-json -i input.js -o output.js
```

という風に実行する。するとファイル内のrequireメソッドを探して、requireしてるJSONデータがローカルに見つかったら、そのデータに置き換えてくれる。`--prefix dev.` みたいにprefixオプションを指定すると`dev.config.json`みたいなファイル名のデータで差し替えてくれるので、環境ごとに別のJSONファイルを用意して差し替えることができる。

このくらいのことであれば正規表現で置換してもいけると思うのだけど、今回は[esprima](https://github.com/jquery/esprima)と[escodegen](https://github.com/estools/escodegen)、[estraverse](https://github.com/estools/estraverse)を使って、以下のような感じでJavaScriptをASTに変換して、そこからrequire部分を見つけてJSONデータ（のASTノード）に置き換えるということをしている（実装にはTypeScriptを使用しているけど、普通のJavaScriptと内容的には変わらない）。

```typescript
const ast = esprima.parse(data);
const result = estraverse.replace(ast, {
  enter: (node, parent) => {
    if (node.type === 'VariableDeclaration') {
      const declarations = node.declarations || [];
      const declaration = declarations && declarations[0];
      let kind = node.kind;
      if (!kind && declarations.length !== 1) {
        return node;
      }

      const declareType = declaration.type;
      const id = declaration.id;
      const idName = id && id.name;
      const init = declaration.init;
      const initCallee = init && init.callee;
      const initCalleeName = (initCallee && initCallee.name) || '';
      if (declareType === 'VariableDeclarator' && initCalleeName === 'require') {
        const initArg = (init.arguments || [])[0];
        const initArgValue = initArg && initArg.value;
        if (initArgValue && /\.json$/i.test(initArgValue)) {
          const { dir } = path.parse(inputFilePath);
          const prefix = options.prefix || '';
          const paths = path.parse(initArgValue);
          const jsonFilePath = paths.dir + '/' + prefix + paths.name + paths.ext;
          const jsonPath = path.resolve(process.cwd(), dir, jsonFilePath);
          const exists = fs.existsSync(jsonPath);
          if (!exists) {
            return node;
          }
          const jsonString = fs.readFileSync(jsonPath, {
            encoding: 'utf8'
          });
          return esprima.parse(`${kind} ${idName} = ${jsonString}`);
        }
      }
    }

    return node;
  }
});

const output = escodegen.generate(result) + '\n';
```

今のところ`require('config.json')`みたいに文字列でファイル名が渡されていないと変換できない。必要十分な状態ではあるのだけど、そのうち必要が出てきたら[escope](https://github.com/estools/escope)なんかでスコープの変数値を取得して、変数で入ってる場合でもJSONデータを取得できるといいなと思っている。

以上。

