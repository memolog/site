---
title: Top-level await will be soon
featured:
  image: kai-pilger-1k3vsv7iIIc-unsplash
  author: Kai Pilger
  authorLink: https://unsplash.com/@kaip?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2020-02-08 05:55:41
---
[async](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/async_function)と[await](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/await)の書き方に慣れてくると、非同期の処理を待つ時はいつでもawaitを使いたくなるのだが、使えるのはasyncのついたfunctionの中だけでトップレベルでは使えない。<!-- more -->

つまり
```javascript
const resp = await fetch("./foo.json");
const json = await resp.json();
console.log(json);
```
みたいにトップレベルで使えない。

```javascript
(async () => {
  const resp = await fetch("./foo.json");
  const json = await resp.json();
  console.log(json);
})();
```
みたいにasyncのfunction内ならできる。

だからトップレベルでも使えるようにしようというのが[ECMAScript proposal: Top-level await](https://github.com/tc39/proposal-top-level-await)の話（詳細は読んでない）。Top-level awaitのステージは現在3。ECMAScriptのproposalにはステージの状態があって、ステージについて詳しくは [The TC39 Process](https://tc39.es/process-document/)に書いてある。読んでないけど、まあ、仕様追加一歩手前という感じだと思われる。だが[Stage 3の提案](https://github.com/tc39/proposals)を見るとStage 3のまま留まるものもあるみたいなので、実際いつ仕様に追加されるかよくわからない。

とにかく、いつ追加されるかはわからないけど、TypeScriptでは3.8でサポートが予定されている（[Announcing TypeScript 3.8 Beta](https://devblogs.microsoft.com/typescript/announcing-typescript-3-8-beta/#top-level-await)）。ので、TypeScript上ではもうすぐ使えるのだ。

というメモ。
