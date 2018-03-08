---
title: 古い記事をインポートする
date: 2018-01-04 03:36:06
featured:
  author: Jordan Sanchez
  image: jordan-sanchez-111052
  authorLink: https://unsplash.com/photos/71hQxE-Sfvg?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
---
ブログの古い記事なんてほとんど顧みることはない。ほとんどの記事が「以前は役に立ったかもしれないけど、すでに役には立たない」コードの端切れのようなもので古い記事なんてそのまま放置していつの日かインターネットから姿を消すくらいでもいいかなあとか思っていた。

のだが、数は少ないけどまだ誰かの役に立つかもしれないものもたぶんあるだろうし、過去の時点で自分が何を書いていたのか振り返ることもあるかもしれない（今まで一度もなかったけど）と思い直し、頑張ってインポートをしてみることにした。<!-- more -->

MT形式のエクスポートファイルをHexoで読み込めるファイルに作り直すのは[TurnDown](https://github.com/domchristie/turndown) というHTMLをMarkdownに変換するモジュールのおかげで、そんなに難しくなかった。コードブロックの前に不要な改行が入ってしまうパターンは元々の入力内容の問題もあるので気がついたら手直ししていこうと思う。

ということで、大まかな点では大きな問題はなかったのだが、古い記事でアップロードしていた画像の扱い（フェッチしてディレクトリに保存するようにして、URLを置換した）とか、古いURLがなるべく変更されないように調整するのとか、Hexo（というかたぶんejs）でHTMLを生成するときにBodyに「&#x25;」があるためにエラーになってしまうので数値参照にしたり、Titleに「:」があるとエラーになるのでやっぱり数値参照にしたりとか、ついでにCSSを変えてみたりとか、そういった細かいところの調整に時間がかかってしまった。

作成した変換ツールは[memolog/hexo-mt-converter](https://github.com/memolog/hexo-mt-converter) に公開してある。けど他の人にはあまり役に立たないツールかもしれない。

せっかくなのでturndownの拡張した部分のコードだけを記しておく。

```javascript
const TurndownService = require('turndown');

const turndownService = new TurndownService({
  codeBlockStyle: 'fenced',
  fence: '```'
})

turndownService.addRule('fencedCodeBlock', {
  filter: function (node, options) {
    return (
      options.codeBlockStyle === 'fenced' &&
      node.nodeName === 'PRE' &&
      (
        (node.firstChild && node.firstChild.nodeName === 'CODE') || (node.className === 'prettyprint')
      )
    )
  },


  replacement: function (content, node, options) {
    var className = node.firstChild.className || node.className || ''
    var language = (className.match(/language-(\S+)/) || [null, ''])[1]

    return (
      '\n\n' + options.fence + language + '\n' +
      node.firstChild.textContent +
      '\n' + options.fence + '\n\n'
    )
  }
});
```

コードブロックの出力はデフォルトでは「indent」になっているので、これを「fenced」に変更。して、fencedのフィルター部分を自分のエクスポートデータの内容に応じて少し調整している。旧いデータだとcode要素にはclass名がついていなくて、pre要素にだけついているというHTMLもあったので、code要素にclassNameがなかったら親のpre要素のclassNameも参照するようにしている。また、投稿によっては「prettyprint」を使ってコードブロックを記述していたところもあったので、prettyprintの場合でもコードブロックとして扱うように追加している。prettyprintの場合はclassNameにlanguage-xxxがというのがないので、出力内容はプレーンでハイライトがつかない状態になっているけど、これは気が向いたら直そうと思う。

----

そんな感じでとにかくインポートできた。これで古い記事どうようしかな〜とかいう心配は必要なくなる。ブログを書かなくなって維持し続けるを迷っていたドメインとかレンタルサーバーとかも、今年中には止めることができそうである。なんだかんだでまた使い始めるかもしれないけど。
