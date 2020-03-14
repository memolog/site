---
title: Event target and currentTarget
featured:
  image: erik-mclean-CIO4c2xmtHQ-unsplash
  author: Erik Mclean
  authorLink: https://unsplash.com/s/photos/current-target?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2020-02-05 07:32:36
---

Eventオブジェクトには[currentTarget](https://developer.mozilla.org/ja/docs/Web/API/Event/currentTarget)と[target](https://developer.mozilla.org/ja/docs/Web/API/Event/target)の2つのプロパティがあるけど、いつもどっちがどっちか混同する。<!-- more -->

currentTargetの方はaddEventListenerでリッスンしている要素が入る。たとえば以下のようなHTMLとJavaScriptがあるとして、

```html
<body><a href="./foobar" id="foobar">Link</a></body>
```

```javascript
document.body.addEventListener("click", ev => {
  console.log(ev.currentTarget, ev.target);
});
```
currentTargetにはaddEventListenerをしているbody要素が入ってくる。targetには実際にクリックイベントが発生したa要素が入ってくる。

----
以下のように、クリックイベントが発生するa要素自体でaddEventListenerするとする。

```javascript
document.getElementById("foobar").addEventListener("click", ev => {
  console.log(ev.currentTarget, ev.target);
});
```

この場合は、currentTargetもa要素になるし、targetもa要素になる。たいていの場合はこのようにするから、どちらも同じ要素が入ってくる。

どちらでも同じだからcurrentTargetでもtargetでもどちらを使っても良い。だから混同してしまう。

そういう時は、addEventListenerしている要素を操作したいのか、イベントが発生してる要素自体を操作したいのか、実装の意図を考えて決めるべきなんだと思う。けど、まあでも、どちらでも動くからどちらでも良いよね！とも思う。

----
currentTargetとtargetの区別がどんな場合に有効に機能するかというと、

```html
<ul id="parent">
  <li><a href="./foo" id="foo">Link</a></li>
  <li><a href="./bar" id="bar">Link</a></li>
</ul>
```

```javascript
document.getElementById("parent").addEventListener("click", ev => {
  console.log(ev.currentTarget, ev.target);
});
```

以上のように複数のリンクのイベントを親の要素でまとめてリッスンしたい場合とかに有効に機能する。currentTargetの方にはparentの要素が入ってくるが、targetの方には実際にクリックイベントが発生したa要素が入ってくる。

というメモ。
