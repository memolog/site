---
title: Load jQuery library in the Chrome developer console
featured:
  image: harsh-jain-xoMeq3-GwTY-unsplash
  author: Harsh Jain
  authorLink: https://unsplash.com/@harshjain1?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2020-02-04 07:19:43
---
スクリプト内のDOM操作でjQueryを使っているけれど、処理がスクリプト内で完結していて、GlobalにはjQueryをロードさせていないという場合がある。あると思う。

そういった場合、例えばそのスクリプトに新しい実装を入れたいけどjQueryでのDOM操作が自分の期待通りに行えるかをChromeのデベロッパーツールでちょっと確認したいみたいな時に少し困る。大して困らない気もするけど、少し手間ではある。<!-- more -->

そんな時にjQuery用のスニペットを用意しておくとjQueryを手軽にロードすることができるので役に立つ。[スニペットの作成、保存、実行](https://developers.google.com/web/tools/chrome-devtools/sources?hl=ja#snippets)のページに書かれている内容そのままだけど、以下のようなコードをスニペットとして作成して、右下のRunボタンを押すだけである。

```javascript
let script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.2.1.min.js';
script.crossOrigin = 'anonymous';
script.integrity = 'sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=';
document.head.appendChild(script);
```

{% youtube id=0okbda7OiSI title="How to load jQuery library in the Chrome developer console" %}

同じ方法でjQueryに限らず、一時的にページにライブラリをロードさせることができるので、まあまあ応用の利くハックかなと思う。スニペットの存在そのものを忘れる可能性はある。

というメモ。
