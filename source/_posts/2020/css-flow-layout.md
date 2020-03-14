---
title: CSS Flow Layout
featured:
  image: boris-smokrovic-HWwF4OnXAdM-unsplash
  author: Boris Smokrovic
  authorLink: https://unsplash.com/@borisworkshop?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2020-03-06 23:11:00
---
今回は[flow layout](https://www.w3.org/TR/css-display-3/#flow-layout)について確認しようと思う。
<!-- more -->

仕様には以下の部分にリンクが貼られている。定義というよりは、初出の場所といった感じだと思う。
> The element lays out its contents using **flow layout** ([block-and-inline layout](https://www.w3.org/TR/CSS2/visuren.html)).

flow layoutは、blockとinlineで構成されたレイアウト（block-and-inline layout）と言い換えることができる（たぶん）。flowとは「流れ」を意味する単語なので、つまりコンテンツが画面上にどのように流れるのか（通常blockとinlineの流れで決まる）についてのレイアウト情報ということだろうと思う。

MDNの[CSS Flow Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flow_Layout)（[CSS フローレイアウト](https://developer.mozilla.org/ja/docs/Web/CSS/CSS_Flow_Layout)）の解説も一緒に見る。

> Normal Flow, or Flow Layout, is the way that Block and Inline elements are displayed on a page before any changes are made to their layout. The flow is essentially a set of things that are all working together and know about each other in your layout. Once something is taken out of flow it works independently.

> In normal flow, inline elements display in the inline direction, that is in the direction words are displayed in a sentence according to the Writing Mode of the document. Block elements display one after the other, as paragraphs do in the Writing Mode of that document. In English therefore, inline elements display one after the other, starting on the left, and block elements start at the top and move down the page.

flow layoutは素の状態（before any changes are made）で、ブロック要素とインライン要素をページ上に表示する方法である。flowはその構成要素がお互いを理解し、すべて連動して動作する。flowから外れたものは独立して動作する。

normal flow(flow layout)では、インライン要素はインラインの流れに沿って表示される。ブロック要素は一つずつ（段落がするように）段々に表示する。つまり、英語ではインライン要素は、左から始まり、前の要素の後ろに続いて流れていく。ブロック要素は上から始まり、下に流れていく。

つまり、flow layoutとは、左から右、上から下、といった、「コンテンツの流れ」を表している。
