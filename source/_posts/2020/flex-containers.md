---
title: Flex Containers
featured:
  image: wengang-zhai-rNO0c2rlVUo-unsplash
  author: Wengang Zhai
  authorLink: https://unsplash.com/@wgzhai?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2020-03-20 17:45:51
---
[Flex Layout Box Model and Terminology](https://memolog.org/2020/flex-layout-box-model-and-terminology.html)から引き続き、[3. Flex Containers: the flex and inline-flex display values](https://www.w3.org/TR/css-flexbox-1/#flex-containers)について確認していく。<!-- more -->

> **Name**:	display
**New values**:	flex | inline-flex

>**flex**
This value causes an element to generate a flex container box that is block-level when placed in flow layout.
**inline-flex**
This value causes an element to generate a flex container box that is inline-level when placed in flow layout.

> A flex container establishes a new flex formatting context for its contents. This is the same as establishing a block formatting context, except that flex layout is used instead of block layout. For example, floats do not intrude into the flex container, and the flex container’s margins do not collapse with the margins of its contents. Flex containers form a containing block for their contents [exactly like block containers do](https://www.w3.org/TR/CSS2/visudet.html#containing-block-details). [CSS21] The overflow property applies to flex containers.

flex containerは新しいflex formatting contextを設置する。これはブロックレイアウトの代わりにflexレイアウトが使われることを除いて、block formatting contextと同じように設置される。たとえば、floatはflex containerの中に侵入してこないし、flex containerのマージンは、そのコンテンツのマージンと相殺（collapse）されない。flex containerは、block containerがするのと全く同じように、コンテンツのためのcontaining block（縦横幅やポジションなどの基本的な値な形成する長方形）を形作る。overflowプロパティはflex containerに適用される。

> Flex containers are not block containers, and so some properties that were designed with the assumption of block layout don’t apply in the context of flex layout. In particular:

flex containerはblock containerではなく、ブロックレイアウトを想定してデザインされているいくつかのプロパティはflexレイアウトのコンテキストでは適用されない。特に以下。

> * float and clear do not create floating or clearance of flex item, and do not take it out-of-flow.
> * vertical-align has no effect on a flex item.
> * the ::first-line and ::first-letter pseudo-elements do not apply to flex containers, and flex containers do not contribute a first formatted line or first letter to their ancestors.

* floatとclearは、flexアイテムのfloatやそのclearをしない。つまりflex itemをout-of-flow（flow layoutによって配置されていない）状態にしない
* vertical-alignはflexアイテムには効果がない
* ::first-lineと::first-letterの擬似要素はflex containerでは適用されない。またflex containerはその子孫要素にfirst formatted lineまたはfirst letterを提供しない。

> If an element’s specified display is inline-flex, then its display property computes to flex in certain circumstances: the table in [CSS 2.1 Section 9.7](https://www.w3.org/TR/CSS2/visuren.html#dis-pos-flo) is amended to contain an additional row, with inline-flex in the "Specified Value" column and flex in the "Computed Value" column.

もしある要素の指定したdisplayが`inline-flex`である場合、そのdisplayプロパティが特定の環境の中では`flex`として計算される。[CSS 2.1 Section 9.7](https://www.w3.org/TR/CSS2/visuren.html#dis-pos-flo)の表には、Specified valueが`inline-flex`、Computed Valueが`flex`という行を追加される。

----

[CSS 2.1 Section 9.7](https://www.w3.org/TR/CSS2/visuren.html#dis-pos-flo)には、以下のように書かれている。

> **9.7 Relationships between 'display', 'position', and 'float'**
> The three properties that affect box generation and layout — 'display', 'position', and 'float' — interact as follows:

`display`,`position`,`float`の3つのプロパティはboxの生成と配置に影響を与える。以下のように作用する

> 1. If 'display' has the value 'none', then 'position' and 'float' do not apply. In this case, the element generates no box.
> 2. Otherwise, if 'position' has the value 'absolute' or 'fixed', the box is absolutely positioned, the computed value of 'float' is 'none', and display is set according to the table below. The position of the box will be determined by the 'top', 'right', 'bottom' and 'left' properties and the box's containing block.
> 3. Otherwise, if 'float' has a value other than 'none', the box is floated and 'display' is set according to the table below.
> 4. Otherwise, if the element is the root element, 'display' is set according to the table below, except that it is undefined in CSS 2.1 whether a specified value of 'list-item' becomes a computed value of 'block' or 'list-item'.
> 5. Otherwise, the remaining 'display' property values apply as specified.

1. `display`が`none`の場合は、`position`もしくは`float`は適用されない。この場合、要素はboxを生成しない
2. そうでない場合、もし`position`が`absolute`または`fixed`である場合、boxは絶対的に配置され、floatの算出値（computed value）は`none`になり、displayは下の表にしたがって設定される。boxの位置は、`top`,`right`,`bottom`,`left`のプロパティとboxのcontaining blockによって決定される。
3. そうでない場合、もし`float`が`none`以外の値の場合、boxはfloatedして、`display`は下の表にしたがって設定される
4. そうでない場合、もし要素がルート要素の場合、`display`は下の表にしたがって設定される。ただしspecified valueが`list-item`の場合、そのcomputed valueが`block`となるか`list-item`となるかは特に決まってない。
5. そうでない場合、`display`プロパティは指定通りの値となる。

以下が「下の表」、`inline-flex`を追加してある。

Specified value（指定値） | Computed value（算出値）
--|--
inline-table|table|
inline, table-row-group, table-column,<br>table-column-group, table-header-group,<br>table-footer-group, table-row, table-cell,<br>table-caption, inline-block|block
inline-flex|flex|
others|指定値を同じ

ざっくり言うと、boxがout-of-flowになった場合、そのboxはインラインレベルではなく、ブロックレベルとして扱われるという感じ。
