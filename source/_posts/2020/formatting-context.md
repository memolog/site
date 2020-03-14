---
title: Formatting Context
featured:
  image: cameron-venti-QUt6Ww8OQx0-unsplash
  author: Cameron Venti
  authorLink: https://unsplash.com/@cmventi20?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2020-02-28 17:12:58
---
[Inner and outer display types](https://memolog.org/2020/inner-and-outer-display-type.html)にて、inner display type は**formatting context**について定義し、子孫となるboxがどのように配置されるかを決める、と書いた。今回はformatting contextについて確認する。<!-- more -->

先にまとめ。

* boxは画面上に要素（または擬似要素）を表現するもの。
* formatting contextはboxをどう配置するかを決定づける。fomatting contextのタイプによってどう配置するかは変わってくる。
* boxは包含（親）ブロックのformatting contextに入るか、floatみたいに独自のformatting contextを作る場合もある。
* inner display typeで配下のboxをどのように配置するか（formatting context）を決定する。inner display typeには、flow、flow-root、table、flex、grid、rubyみたいな値がある。

----

[Formatting Context](https://www.w3.org/TR/css-display-3/#formatting-context)について、以下に適当な訳と一緒に記載する。適当な訳で抜け落ちたり間違っているかもしれないけど、後でどう読んだかを思い出すために残しておく。

> A formatting context is the environment into which a set of related boxes are laid out. Different formatting contexts lay out their boxes according to different rules. For example, a [flex formatting context](https://www.w3.org/TR/css-flexbox-1/#flex-formatting-context) lays out boxes according to the flex layout rules [CSS3-FLEXBOX], whereas a [block formatting context](https://www.w3.org/TR/css-display-3/#block-formatting-context) lays out boxes according to the block-and-inline layout rules [CSS2]. Additionally, some types of formatting contexts interleave and co-exist: for example, an [inline formatting context](https://www.w3.org/TR/css-display-3/#inline-formatting-context) exists within and interacts with the block formatting context of the element that establishes it, and a [ruby container](https://drafts.csswg.org/css-ruby-1/#ruby-container) overlays a [ruby formatting context](https://drafts.csswg.org/css-ruby-1/#ruby-formatting-context) over the inline formatting context in which its [ruby base container](https://drafts.csswg.org/css-ruby-1/#ruby-base-container-box) participates.

> A box either establishes a new [independent formatting context](https://www.w3.org/TR/css-display-3/#independent-formatting-context) or continues the formatting context of its containing block. In some cases, it might additionally establish a new (non-independent) co-existing formatting context. Unless otherwise specified, however, establishing a new formatting context creates an independent formatting context. The type of formatting context established by the box is determined by its inner display type. E.g. a grid container establishes a new grid formatting context, a ruby container establishes a new ruby formatting context, and a block container can establish a new block formatting context and/or a new inline formatting context. See the display property.

formatting contextは関連するboxを配置するための環境である。異なるformatting contextでは異なるルールでboxを配置する。たとえば [flex formatting context](https://www.w3.org/TR/css-flexbox-1/#flex-formatting-context)はflexレイアウトのルールにしたがってboxを配置するし、[block formatting context](https://www.w3.org/TR/css-display-3/#block-formatting-context)はblock-and-inlineレイアウトのルールにしたがってboxを配置する。さらに、いくつかのformatting contextでは、不連続な形で配置（interleave）したり、同じ場所に同時に存在させたり（co-exist）する。たとえば、[inline formatting context](https://www.w3.org/TR/css-display-3/#inline-formatting-context)は、その要素のblock formatting contextの内部に存在し、かつblock formatting textと相互に作用する。また、[ruby container](https://drafts.csswg.org/css-ruby-1/#ruby-container)は、[ruby base container](https://drafts.csswg.org/css-ruby-1/#ruby-base-container-box)の中にあるinline formatting contextの上の[ruby formatting context](https://drafts.csswg.org/css-ruby-1/#ruby-formatting-context)の上に置かれる。

boxは新しい[independent formatting context](https://www.w3.org/TR/css-display-3/#independent-formatting-context)を生成するか、boxが含まれるブロックのformatting contextを継続する。ケースによってはさらに新しい（独立していない）co-existing formatting context を生成するかもしれないが、そうした特定のケースを除いては新しいformatting contextはindependent formatting contextを生成する。boxによって生成されたformatting contextのタイプはinner displayのタイプによって決定される。たとえばgrid containerは新しいgrid formatting contextを生成する。ruby containerは新しいruby formatting contextを生成する。block containerは新しいblock formatting contextや新しいinline formatting contextを生成する。
