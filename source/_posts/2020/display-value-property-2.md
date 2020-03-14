---
title: The display value property (list-item / internal)
featured:
  image: glen-hooper-8LWtpfhGP4U-unsplash
  author: Glen Hooper
  authorLink: https://unsplash.com/@hoops1972?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2020-03-08 14:24:22
---
[The display value property (outside / inside)](https://memolog.org/2020/display-value-property.html)の続き。[2. Box Layout Modes: the display property](https://www.w3.org/TR/css-display-3/#the-display-properties)からdisplayプロパティのvalueについて、list-itemとinterについて確認していく。<!-- more -->

### display-listitem
`<display-listitem>`の定義は以下のようになっている

> &lt;display-outside&gt;? && [ flow | flow-root ]? && list-item

つまり、`list-item`のキーワードは必須で、並列して`<display-outside>`と`flow`か`flow-root`を指定することができる。なお、複数キーワードの並置（Multi-keyword values）は[display - CSS: カスケーディングスタイルシート | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/display)によると2020年3月現在Firefoxのみサポートしている。

> The list-item keyword causes the element to generate a ::marker pseudo-element [CSS-PSEUDO-4] with the content specified by its list-style properties (CSS 2.1§12.5 Lists) [CSS2] together with a principal box of the specified type for its own contents.

list-itemキーワードはprincipal boxと共に`::marker`の擬似要素を生成する。

> If no inner display type value is specified, the principal box’s inner display type defaults to flow. If no outer display type value is specified, the principal box’s outer display type defaults to block.

`<display-outside>`が指定されていなければ `block` となり、`flow | flow-root`が指定されていなければ`flow`になる。

> Note: In this level, as restricted in the grammar, list-items are limited to the Flow Layout display types (block/inline/run-in with flow/flow-root inner types). This restriction may be relaxed in a future level of this module.

list-itemのinner display typeは今のところflow/flow-rootに制限されているけど、将来的には融和されるかもしれない。

### display-internal
> table-row-group | table-header-group | table-footer-group | table-row | table-cell | table-column-group | table-column | table-caption | ruby-base | ruby-text | ruby-base-container | ruby-text-container

> Some layout models, such as table and ruby, have a complex internal structure, with several different roles that their children and descendants can fill. This section defines those “layout-internal” display values, which only have meaning within that particular layout mode.

> Unless otherwise specified, both the inner display type and the outer display type of elements using these display values are set to the given keyword.

`table`や`ruby`などのlayoutでは、内部に（行とか列とか）子孫要素に異なる役割を渡すような複雑な構造を持つ。`layout-internal`は特定のlayout modeでしか意味を持たない内部で利用するdisplay valueなどを扱っている。

特に指定がない場合、これらのdisplay valueを利用している要素のinner display typeとouter display typeには、所与のキーワードがセットされる。

> The <display-internal> keywords are defined as follows:

> **table-row-group, table-header-group, table-footer-group, table-row, table-cell, table-column-group, table-column**

> The element is an internal table element. It generates the appropriate internal table box which participates in a table formatting context. See CSS2§17.2 [CSS2].
table-cell boxes have a flow-root inner display type.

table関連のキーワード。table-cell boxesは`flow-root`のinner display typeを持つ。

> **table-caption**
> The element generates a table caption box, which is a block box with special behavior with respect to table and table wrapper boxes. See CSS2§17.2 [CSS2].
table-caption boxes have a flow-root inner display type.

table-captionはtable caption boxという特別な振る舞いをするblock boxを生成する。こちらのboxもflow-rootのinner display typeを持つ。

> **ruby-base, ruby-text, ruby-base-container, ruby-text-container**
> The element is an internal ruby element. It generates the appropriate internal ruby box which participates in a ruby formatting context. [CSS3RUBY]
> ruby-base and ruby-text have a flow inner display type.

----
> For example, Table Layout requires that a table-cell box must have a table-row parent box.
If it is misparented, like so:

```html
<div style="display:block;">
  <div style="display:table-cell">...</div>
</div>
```

> It will generate wrapper boxes around itself, producing a structure like:

たとえば上のような感じで、`table-cell`には`table-row`の親要素が必要なのにそれがない場合、以下のような感じでanonymous boxによって構造が作られる。

```plain
block box
└anonymous table box
 └anonymous table-row-group box
  └anonymous table-row box
   └table-cell box
```

> Even if the parent is another internal table element, if it’s not the correct one, wrapper boxes will be generated. For example, in the following markup:

たとえ親が別のinternal table要素であっても、もし正しい親要素でなければ、anonymous boxによって補完される。

```html
<div style="display:table;">
  <div style="display:table-row">
    <div style="display:table-cell">...</div>
  </div>
</div>
```

> Anonymous wrapper box generation will produce:

```plain
table box
└anonymous table-row-group box
 └table-row box
  └table-cell box
```

> This "fix-up" ensures that table layout has a predictable structure to operate on.
