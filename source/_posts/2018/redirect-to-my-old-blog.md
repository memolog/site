---
title: 元のブログからリダイレクトをかける
date: 2018-01-17 06:08:02
featured:
  image: andy-beales-53407
  author: Andy Beales
  authorLink: https://unsplash.com/photos/BjcGdM-mjL0?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
---

このブログは今はGitHub Pages上で公開しているが、AWS上でドメイン取得して公開しようかな、でもお金かかるしどうしようかなと微妙に悩んでいた。AWSにしても個人ブログのトラフィックなんて程度が知れているので、たいした金額になることはないとは思いつつも、いつ課金されるかわからないから状況をモニタリングしなければならないというのが圧倒的に面倒臭い... ただその日のメモを残したいだけだというのに。
<!-- more -->
だからもうGithub Pagesで公開を継続することにしようと思う。そのうちまた移動したり元の場所に戻ったりするかもしれないけど、そのときはそのときにまた考えるとして...

ということで[元のブログ](http://memolog.org)の.htaccessにリダクレクトの設定を入れた。

```bash
RedirectMatch 301 (.*20[0-9]{2}\/[0-1][0-9]\/.*)\.html "https://memolog.github.io/blog$1/"
RedirectMatch 301 /index.html "https://memolog.github.io/blog/"
```

これだけ。パスが変換可能になるように注意してインポートしたので大丈夫かなあと思う。[タグのページ](http://memolog.org/tags.html#webdriver)みたいにリダイレクトがかからないところもあるけど、それはまあいいや。

[Feedbuner](https://www.feedburner.com/)の設定も新しいatom.xmlに変更した（Feedbunerのサービスがずっと残っていてすごい。Goolgleえらい）。フィードは[hexo-generator-feed](https://github.com/hexojs/hexo-generator-feed)をREADMEに書いてあった設定そのままに使用している。

「ちゃんとした情報を載せよう」みたいなところで書くのが面倒になりやめてしまう、そしてそのまま1年放置...みたいになっていたので、今後、少なくともしばらくの間は、中身があるんだかないんだかわからない内容をそのまま載せていこうと思う。五時脱字もある程度は許していただきたい🙇

memolog.orgというドメインを取得した時は、このドメインは一生持ち続けるパーマネントなものだという思いがあったのだが、諸行無常、やはり先々のことはわからないものだなと思う。

以上。
