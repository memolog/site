---
title: floatとwidth&#x3a;auto
date: 2012-05-23T15:41:00.000Z
categories:
- web
tags:
- css
---
いまさらながらのfloatとwidth:autoの話。<!-- more -->

たとえば

```html
<div class="container">
  <div class="sidebar1">サイドバー</div>
  <div class="main">超長い文章のつもり</div>
  <div class="sidebar2">サイドバー</div>
  <div class="footer">フッター</div>
</div>
```

というdivがあって、.sidebar1と.sidebar2を固定値のwidthにしてfloatして、.mainのwidthはautoにして可変にしたい...ということで、下記のようにCSSを設定してもうまくいかない。

```css
.container{ width:auto; }
.sidebar1{ float:left; width: 200px; }
.main{ float:left; width:auto; }
.sidebar2{ float:right; width: 200px; }
```

width:autoは通常は包含ブロックの幅にフィットするような感じに計算されるけれど、 floatが設定されている要素の場合、[10.3.5 Floating, non-replaced elements](http://www.w3.org/TR/CSS2/visudet.html#float-width)の仕様に従うようになる。

> ### 10.3.5 Floating, non-replaced elements
>
> If 'margin-left', or 'margin-right' are computed as 'auto', their used value is '0'.
>
> If 'width' is computed as 'auto', the used value is the "shrink-to-fit" width.
>
> Calculation of the shrink-to-fit width is similar to calculating the width of a table cell using the automatic table layout algorithm. Roughly: calculate the preferred width by formatting the content without breaking lines other than where explicit line breaks occur, and also calculate the preferred minimum width, e.g., by trying all possible line breaks. CSS 2.1 does not define the exact algorithm. Thirdly, find the available width: in this case, this is the width of the containing block minus the used values of 'margin-left', 'border-left-width', 'padding-left', 'padding-right', 'border-right-width', 'margin-right', and the widths of any relevant scroll bars.
>
> Then the shrink-to-fit width is: min(max(preferred minimum width, available width), preferred width).

まず、preferred widthという最大値と最小値が計算される。これは（明示的に改行を発生するところを除いて）改行しないで伸ばしたときの幅が最大幅で、改行できるところで全部改行したときに得られる幅が最小値になる（CSS 2.1では正確なアルゴリズムは定義されていない）。さらにavailable widthが求められる。これはこの場合は包含ブロックからmarginとか諸々の幅を差し引いた、利用できる正味の幅になる。

それで、「preferred widthの最小幅」と「available width」のどちらか大きい方の幅と、「preferred widthの最大幅」を比較して、小さい方の幅をwidthの値として使用する。

なので、超長い文章の場合（available widthの方が小さくなる）ので、包含ブロックの幅一杯に.mainが広がることになる。

上の例のような構成で3列にしたい場合は

```html
<div class="container">
  <div class="sidebar1">サイドバー</div>
  <div class="sidebar2">サイドバー</div>
  <div class="main">超長い文章のつもり</div>
  <div class="footer">フッター</div>
</div>

```

```css
.container{ width:auto; }
.sidebar1{ float:left; width: 200px; }
.sidebar2{ float:right; width: 200px; }
.main{ width:auto; overflow:hidden; }
```

のように、.mainを.sidebar2の下にして、floatを外すとうまくいく。ただ、そのままだとサイドバーの下にテキストが回り込んでしまうので、overflow:hiddenを追加しておく。これはfloatと同様に [Block formatting contexts](http://www.w3.org/TR/CSS2/visuren.html#block-formatting)の原理が働くようにするため。

> ### 9.4.1 Block formatting contexts
>
> Floats, absolutely positioned elements, block containers (such as inline-blocks, table-cells, and table-captions) that are not block boxes, and block boxes with 'overflow' other than 'visible' (except when that value has been propagated to the viewport) establish new block formatting contexts for their contents.
>
> In a block formatting context, boxes are laid out one after the other, vertically, beginning at the top of a containing block. The vertical distance between two sibling boxes is determined by the 'margin' properties. Vertical margins between adjacent block-level boxes in a block formatting context collapse.
>
> In a block formatting context, each box's left outer edge touches the left edge of the containing block (for right-to-left formatting, right edges touch). This is true even in the presence of floats (although a box's line boxes may shrink due to the floats), unless the box establishes a new block formatting context (in which case the box itself may become narrower due to the floats).
>
> For information about page breaks in paged media, please consult the section on allowed page breaks.
>
> ...
>
> 9.5 Floats
> ----------
>
> ...
>
> The border box of a table, a block-level replaced element, or an element in the normal flow that establishes a new block formatting context (such as an element with 'overflow' other than 'visible') must not overlap the margin box of any floats in the same block formatting context as the element itself. If necessary, implementations should clear the said element by placing it below any preceding floats, but may place it adjacent to such floats if there is sufficient space. They may even make the border box of said element narrower than defined by section 10.3.3. CSS2 does not define when a UA may put said element next to the float or by how much said element may become narrower.

overflowで「visible」以外ではblock formatting contextsが新規に設定される。block formatting contextが設定された要素はその要素自身と同じblock formatting contextにあるfloatのマージンボックスと重なってはいけないということになっている（CSS2では要素がfloatの隣に配置されるタイミングやどこまで幅を狭くできるかについての定義はない）。そのため、float同士が（隣に十分なスペースがあれば）隣り合うように、floatとoverflow:hiddenも下に回りこまないように隣り合わせることができる。
