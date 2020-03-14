---
title: Optional chaining and Nullish coalescing
featured:
  image: ben-hershey-1IZBAlIs4ug-unsplash
  author: Ben Hershey
  authorLink: https://unsplash.com/@introspectivedsgn?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2020-02-06 07:25:28
---
ES2020で新しく追加された機能（[ECMAScript 2016+ compatibility table](https://kangax.github.io/compat-table/es2016plus/)の画面の下の方にある）はどれもわりと実用的で、なくても大丈夫なんだけどあると便利といったものが並んでいる。Bigintは日常的には使わないとは思うけど。

その中で、[Nullish coalescing](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator)と[Optional chaining](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Optional_chaining) はかなり便利。なくても大丈夫だし、使わなくても良いんだけど、便利だから日常的に書かれるJavaScriptの書き方を変えるものになると思う。<!-- more -->

まず、Nullishとは何かというと、値がnullかundefinedになるものを言う。[Falsy](https://developer.mozilla.org/ja/docs/Glossary/Falsy)の場合、数値の0とかNaN、空文字列などが含まれるけど、Nullishは値が存在しない場合（nullとundefined）だけを扱う。

論理演算子の`&&`や`||`（[論理演算子](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Logical_Operators)）は、Falsyな値ははすべてFalseとして扱うので、

```javascript
const foo = 0;
const bar = foo || 100;
```

としたとき、0のようなFalsyな値を`bar`に渡したい場合でも、`||`の右側の値が使われてしまう。こういったときに従来なら

```javascript
const foo = 0;
const bar = (typeof foo === "undefined" || foo === null) ? 100 : foo;
```
みたいな感じにしないといけなかった。（Strictモードならundefinedが別の値になることはないので、`foo === undefined`と書いても大丈夫）。

Nullish coalescingならundefinedかnullの場合だけ扱うようになるので、以下のように簡単に書く事ができる。

```javascript
const foo = 0;
const bar = foo ?? 100;
```

これは便利。

----
Optional chainingは、`.`演算子でオブジェクトのプロパティにアクセスするときに、良い感じにしてくれる。

例えば以下のようなオブジェクトがあった場合で、`foo.bar.baz`の値にアクセスしたいとする。

```javascript
const foo = {
  bar: {
    baz: 'qux'
  }
};
console.log(foo.bar.baz);
```

オブジェクト内に中間（bar）のプロパティが必ず存在する場合は問題ないけど、`foo.bar` が undefined である可能性があると、`foo.bar.baz`のアクセスのときにTypeErrorになる可能性がある。undefinedやnullに対して`.`演算子でプロパティにアクセスするとTypeErrorとなる。

なので、そういった場合、従来

```javascript
console.log(foo.bar && foo.bar.baz);
```

みたいな感じにして、barのプロパティにアクセスする前にbarが存在するかを確認しないといけなかった。上の例の場合、`&&`演算子によって、`foo.bar` が Falsy の場合は`foo.bar.baz`の評価はされず`foo.bar` の値が返る。Falsyな場合なので、`foo.bar` に0が入ってると、0が返ってくる。それで困ることは実用上まずないと思うけど、上の方法はundefinedが返ってくることは保証されない。

Optional chainingを使うと、以下のように書ける。

```javascript
console.log(foo.bar?.baz);
```

この場合、`bar`がNullsih（undefinedかnull）であった場合、bazの評価はしないで undefined が返ってくる。便利。

連結して使う事ができるので、
```javascript
console.log(foo?.bar?.baz);
```
みたいにfooがundefinedの可能性がある場合でも、安全にプロパティにアクセスすることができる。`foo && foo.bar && foo.bar.baz`とか書かなくて良い。これは、本当に、便利。

----

Nullish coalescingもOptional chainingも新しい機能であるので、機能に対応していないブラウザではSyntaxErrorになってしまう。

でもTypeScriptの3.7でこれらの機能に対応している（[TypeScript 3.7](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html)）。ので、TypeScript 3.7 を使っていれば、安全に使える状態にある。Babel 7 でも大丈夫みたい。
