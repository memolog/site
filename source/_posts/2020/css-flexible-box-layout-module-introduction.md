---
title: CSS Flexible Box Layout Module Introduction
featured:
  image: mick-haupt-XMLRK8xpEIs-unsplash
  author: Mick Haupt
  authorLink: https://unsplash.com/@rocinante_11?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2020-03-15 21:16:28
---
前回CSS Display Moduleについて一通り確認したので、今回からは[CSS Flexible Box Layout Module](https://www.w3.org/TR/css-flexbox-1)を確認しようかなと思っている。flex boxは[Can I use flexbox](https://caniuse.com/#feat=flexbox)によると、IE11以外では問題なく利用できる。IE11についてはいろいろ問題があるそうでPartial Supportという扱いになっている。[Flexbugs](https://github.com/philipwalton/flexbugs)にいろいろ問題やそれに対する回避策などが書いてある。<!-- more -->

### Abstraction

> The specification describes a CSS box model optimized for user interface design. In the flex layout model, the children of a flex container can be laid out in any direction, and can “flex” their sizes, either growing to fill unused space or shrinking to avoid overflowing the parent. Both horizontal and vertical alignment of the children can be easily manipulated. Nesting of these boxes (horizontal inside vertical, or vertical inside horizontal) can be used to build layouts in two dimensions.

> CSS is a language for describing the rendering of structured documents (such as HTML and XML) on screen, on paper, etc.

flexレイアウトモデルでは、flex containerの子供はどの方向にも配置することができ、それらのサイズを「flex（伸縮自在にみたいな意味で捉えている）」にすることができる。使われていないスペースを満たすように拡大したり、親要素をあふれさせないように縮小することができる。行揃えも水平方向、垂直方向の両方とも簡単に操作することができる。二次元のレイアウトを構築するのにこれらのboxを入れ子（垂直の中に水平、または水平の中に垂直のbox）にして使うこともできる。

### Introduction

> CSS 2.1 defined four layout modes — algorithms which determine the size and position of boxes based on their relationships with their sibling and ancestor boxes:

CSS2.1では、4つのレイアウトモードを定義していた。アルゴリズム的には、boxのサイズや位置をそれらの兄弟や先祖のboxとの関係性を基に決定している。

> * block layout, designed for laying out documents
> * inline layout, designed for laying out text
> * table layout, designed for laying out 2D data in a tabular format
> * positioned layout, designed for very explicit positioning without much regard for other elements in the document
>
> This module introduces a new layout mode, flex layout, which is designed for laying out more complex applications and webpages.

このモジュールでは、新しいレイアウトモードの、flexレイアウトについて説明する。flex layoutはより複雑なアプリケーションやウェブページのレイアウトをするために設計されている。

#### 1.1. Overview

> Flex layout is superficially similar to block layout. It lacks many of the more complex text- or document-centric properties that can be used in block layout, such as floats and columns. In return it gains simple and powerful tools for distributing space and aligning content in ways that web apps and complex web pages often need. The contents of a flex container:

Flexレイアウトはブロックレイアウトに一見すると似ているが、floatやcolumnのようなブロックレイアウトでは使えるより複雑なテキスト、またはドキュメント中心のプロパティの多くが欠けている。その代わりに、アプリや複雑なページで必要となるスペースや行揃えを行うためのシンプルでパワフルなツールとなっている。

> * can be laid out in any flow direction (leftwards, rightwards, downwards, or even upwards!)
> * can have their display order reversed or rearranged at the style layer (i.e., visual order can be independent of source and speech order)
> * can be laid out linearly along a single (main) axis or wrapped into multiple lines along a secondary (cross) axis
> * can “flex” their sizes to respond to the available space
> * can be aligned with respect to their container or each other on the secondary (cross)
> * can be dynamically collapsed or uncollapsed along the main axis while preserving the container’s cross size

flexコンテナーは、
* どのflow方向（左方向、右方向、下方向、上方向）にもレイアウトできる
* スタイルレイヤーにおいて、表示順を反対にしたり並び替えたりすることができる（視覚的な順番はソースやスピーチの順番とは独立してる）
* 一つの（メインの）軸に沿って直線的にレイアウトしたり、セカンダリ（交差方向）の軸に沿って複数の線に折り返す（wrap）ことができる
* 利用可能なスペースに合わせてサイズを「flex」にできる
* コンテナやセカンダリ（交差方向）の軸上のそれぞれに合わせて整列させることができる
* コンテナの交差方向のサイズを保持しつつ、メインの軸に沿って動的に折りたたんだり（collapsed）、展開したり（uncollapsed）できる。

> **EXAMPLE1**
> Here’s an example of a catalog where each item has a title, a photo, a description, and a purchase button. The designer’s intention is that each entry has the same overall size, that the photo be above the text, and that the purchase buttons aligned at the bottom, regardless of the length of the item’s description. Flex layout makes many aspects of this design easy:

カタログの例。それぞれのアイテムにはタイトル、写真、概要と購入ボタンがある。デザイナーの意図は、それぞれのエントリーが同じ全体サイズを持ち、写真はテキストの上で、購入ボタンはアイテムの概要の長さに関わらず下に配置されることである。flexレイアウトはこのデザインの多くの面を簡単にする。

> * The catalog uses flex layout to lay out rows of items horizontally, and to ensure that items within a row are all equal-height. Each entry is then itself a column flex container, laying out its contents vertically.
> * Within each entry, the source document content is ordered logically with the title first, followed by the description and the photo. This provides a sensible ordering for speech rendering and in non-CSS browsers. For a more compelling visual presentation, however, order is used to pull the image up from later in the content to the top, and align-self is used to center it horizontally.
> * An auto margin above the purchase button forces it to the bottom within each entry box, regardless of the height of that item’s description.

* カタログは、アイテムの行が、水平に配置して行内のアイテムがすべて同じ高さに保証されるようにflexレイアウトを使う。それぞれのエントリーは、それ自身が列のflex containerであり、そのコンテンツを縦方向に配置する。
* それぞれのエントリー内では、ソースドキュメントのコンテンツは論理的な順番に並ぶ。タイトルが最初で、概要と写真が続く。これはスピーチレンダリングやnon-CSSブラウザに対して、意味のある順序を与える。しかしながら、より説得力のある視覚的な表示にするために、orderプロパティを画像をトップに移動させるために使い、align-selfを水平方向に中央揃えにするのに使う。
* 購入ボタンのmarginをautoにすることで、アイテムの概要ボタンの高さに関係なく、購入ボタンをそれぞれのエントリーbox内の下に配置されるよう強制する。

```css
#deals {
  display: flex;        /* Flexレイアウトでアイテムに同じ高さを持たせる  */
  flex-flow: row wrap;  /* アイテムが複数行に折り返すことを許可する */
}
.sale-item {
  display: flex;        /* それぞれのアイテムをflexレイアウトを使って配置する */
  flex-flow: column;    /* アイテムのコンテンツを垂直に配置する  */
}
.sale-item > img {
  order: -1;            /* 画像を（視覚的な順番で）他のコンテンツの前に移す */
  align-self: center;   /* 画像を交差方向に（水平に）中央揃えにする         */
}
.sale-item > button {
  margin-top: auto;     /* magin topをautoにすることでボタンを下に押さえる */
}
```
```html
<section id="deals">
  <section class="sale-item">
    <h1>Computer Starter Kit</h1>
    <p>This is the best computer money can buy, if you don’t have much money.
    <ul>
      <li>Computer
      <li>Monitor
      <li>Keyboard
      <li>Mouse
    </ul>
    <img src="images/computer.jpg"
         alt="You get: a white computer with matching peripherals.">
    <button>BUY NOW</button>
  </section>
  <section class="sale-item">
    …
  </section>
  …
</section>
```

#### 1.2. Module interactions

>This module extends the definition of the display property [CSS21], adding a new block-level and new inline-level display type, and defining a new type of formatting context along with properties to control its layout. None of the properties defined in this module apply to the ::first-line or ::first-letter pseudo-elements.

>The CSS Box Alignment Module extends and supercedes the definitions of the alignment properties (justify-content, align-items, align-self, align-content) introduced here.

このモジュールはdisplay propertyの定義を拡張し、新しいブロックレベルとインラインレベルのdisplay typeを追加して、レイアウトを制御するためのプロパティを備えた新しいタイプのformatting contextを定義する。このモジュールで定義されたプロパティの全ては::first-lineまたは::first-letter擬似要素に対しては適用されない。

CSS Box Alignmentモジュールはこのモジュールで説明されるalignmentのプロパティ（justify-content, align-items, align-self, align-content）の定義を拡張したり置き換えたりする。
