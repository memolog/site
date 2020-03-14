---
title: 'About position:sticky'
featured:
  image: david-travis-WC6MJ0kRzGw-unsplash
  author: David Travis
  authorLink: https://unsplash.com/@dtravisphd?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2020-02-15 10:17:04
---
`position:sticky`を使った事がなかったので見出し部分につけてみた。[Can I use...](https://caniuse.com/#feat=css-sticky)によると、IE以外ならだいたい動作する。<!-- more -->

ページのCSSは急に変えてしまうので、position:stickyが動いている様子を動画の残しておいた。
{% youtube id=57YsR4LjSMU title="The sticky heading element inside header element" %}

----

positionプロパティの仕様は[6.5. Choosing a positioning scheme: position property](https://drafts.csswg.org/css-position-3/#position-property)にある。stickyについては以下のように書かれている。

> The box’s position is calculated according to the normal flow (this is called the position in normal flow). Then the box is offset relative to its flow root and containing block and in all cases, including table elements, does not affect the position of any following boxes. When a box B is stickily positioned, the position of the following box is calculated as though B were not offset. The effect of position: sticky on table elements is the same as for position: relative

normal flowは[6. Positioning schemes](https://drafts.csswg.org/css-position-3/#pos-sch)あたりの説明が比較的理解しやすい（と思う）。floatとかposition:absoluteみたいな普通のやつ。

flow rootは[Inner Display Layout Models: the flow, flow-root, table, flex, grid, and ruby keywords](https://drafts.csswg.org/css-display/#valdef-display-flow-root)に書かれている内容とまあたぶん同じ意味かなあと思う。

> The element generates a block container box, and lays out its contents using flow layout. It always establishes a new block formatting context for its contents.

つまり、その要素の block formatting context を作っている要素かなと思う。

containing blockは[3.1. Definition of containing block](https://drafts.csswg.org/css-position-3/#containing-block)によると、stickyのcontaining blockはrelativeの場合と同じなので、[containing block](https://www.w3.org/TR/css-display-3/#containing-block)の意味になる。

> A rectangle that forms the basis of sizing and positioning for the boxes associated with it (usually the children of the box that generated it). Notably, a containing block is not a box (it is a rectangle), however it is often derived from the dimensions of a box. If properties of a containing block are referenced, they reference the values on the box that generated the containing block. (For the [initial containing block](https://www.w3.org/TR/css-display-3/#initial-containing-block), values are taken from the root element unless otherwise specified.) See CSS2 [Section 9.1.2](https://www.w3.org/TR/CSS2/visuren.html#containing-block) and [Section 10.1](https://www.w3.org/TR/CSS2/visudet.html#containing-block-details) for details.

つまり、対象のboxの大きさとかpositionとかの基準になる要素がそれになる。containing blockについては大変そうだからこれ以上深追いしない。まあ、たぶん、たいていの場合、親要素ということになると思う。

多少の語弊はあるかもしれないけど、ある要素にposition:stickyに設定すると、通常のフロー上に配置され、かつ、flow rootとcontaining blockに対して、相対的なオフセットがつくようになる。つまり、上のスクリーンキャプチャのような動作になる。

HTMLとCSS的には、以下のような感じで

```html
<header class="header">
  <div>...</div>
  <h2 class="header__title"><span>...</span></h2>
  <div class="header__feature" aria-hidden="true">
    <div class="featured__image">...</div>
    <div class="featured__credit">...</div>
  </div>
</header>
```

```css
.header__title {
  position: sticky;
  top: 0;
  ...
}
```

`.header__title`に`position:sticky`をつけると、`header`に対してstickyに動作するようになる。

Safariの場合、もしかしたら `position: -webkit-sticky;` の指定が必要かもしれないけど、最新のSafari（macとiOS）でみた限りでは、-webkit-stickyは必要ないみたい。

だが、Safariの場合、たとえば .header__title が `display:inline-block` とかになっていると、うまく動作しないみたい。`display:inline`でも動作しないので、いわゆるインラインな表示に指定されていると動かないと思われるけど、それ以上は調べていない。

というメモ。
