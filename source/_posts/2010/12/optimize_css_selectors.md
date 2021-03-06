---
title: CSSセレクタを効率的な記述にする
date: 2010-12-28T21:00:00.000Z
categories:
- web
tags:
- css
---
[Page Speed](http://code.google.com/intl/ja/speed/page-speed/)の評価の一つに[Use efficient CSS selectors](http://code.google.com/intl/ja/speed/page-speed/docs/rendering.html#UseEfficientCSSSelectors)という項目があり、そこで効率的なCSSセレクタを使用するという話が挙げられています。

<!-- more -->

ブラウザではセレクタの規則を右から左にフィルターしていくそうなのですが（「div img a」ならaタグを見つけて、先祖にimgがあるもので絞り込んで、さらにその先祖にdivであるもので絞り込む ）、このフィルターの処理がパフォーマンスを悪化させるらしいのです。だからパフォーマンス的には子孫セレクタの指定はできるだけ避けた方がよくて（子供セレクタの方がましらしい）、IDのみとかclassのみとかできるだけシンプルな方が良い、という話。

ブラウザの内部処理を考えれば、当たり前と言えば当たり前のように感じますが、CSSの書き方でパフォーマンスが劣化するという意識したことがなかったのでなかなか興味深かったです。私はどちらかというとスタイルの宣言の予期せぬ競合を避けるために余分に詳細度を上げている方だったのですが、今回はかなりシンプルに変更してみました。<li>タグのそれぞれにclass属性挿入していくの面倒くさいなあとか思いつつも、今回はclass属性でリストを特定できるように全部入れてみました。サイトの構築のスピードとかclass属性の記述漏れなどを考えると、<li>タグは親の<ul>タグにclass属性つけて「.list < li」みたいに指定するのは許容範囲なのかなあとは個人的には思いますけど。

そして、実際のところ、CSSの記述の仕方を変えたことによるパフォーマンスの向上はあまり感じられないわけですが。まあとにかく、大きなサイトでトラフィックもありCSSの量も多いという場合には一考の余地はあるのではないのかなと思います。
