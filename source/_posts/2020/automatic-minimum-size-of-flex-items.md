---
title: Automatic Minimum Size of Flex Items
featured:
  image: febiyan-z85gD0sTOQ0-unsplash
  author: Febiyan
  authorLink: https://unsplash.com/@febiyanr?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2020-05-18 18:49:00
---
時間が開いてしまった。開きすぎてもはや自分でもよく覚えてないけど今回は[4.5. Automatic Minimum Size of Flex Items](https://www.w3.org/TR/css-flexbox-1/#min-size-auto)、autoキーワードで自動的に決定される最小値について。<!-- more -->

> **Note:** The auto keyword, representing an [automatic minimum size](https://www.w3.org/TR/css-sizing-3/#automatic-minimum-size), is the new initial value of the min-width and min-height properties. The keyword was previously defined in this specification, but is now defined in the CSS Sizing module.

`auto`のキーワードは**automatic minimum size**を表し、これがmin-widthやmin-heightの新しい初期値になる。このキーワードはこの仕様の中で定義されていたけど、今は[CSS Sizing module](https://www.w3.org/TR/css-flexbox-1/#biblio-css-sizing-3)の中で定義されている。

`auto`キーワードの説明を[CSS Sizing module](https://www.w3.org/TR/css-sizing-3/#automatic-minimum-size)より抜粋。

> **auto**
> For width/height, specifies an automatic size. See the relevant layout module for how to calculate this.
> For min-width/min-height, specifies an automatic minimum size. Unless otherwise defined by the relevant layout module, however, it resolves to a used value of 0. For backwards-compatibility, the resolved value of this keyword is zero for boxes of all CSS2 display types: block and inline boxes, inline blocks, and all the table layout boxes. It also resolves to zero when no box is generated.

autoは、width/heightに対してはautomatic sizeを指定する。算出方法は関連するレイアウトモジュールを参照。

min-width/min-heightに対しては、**automatic minimum size**を指定する。しかしながら、関連するレイアウトモジュールによって定義されていない限り、値はゼロとなる。後方互換性のため、このキーワードで渡される値は、CSS2のdisplay type（block, inline, inline-block, table）のboxに対してはゼロとなる。boxが生成されないときもゼロとなる。

> To provide a more reasonable default minimum size for flex items, the used value of a main axis automatic minimum size on a flex item that is not a scroll container is a content-based minimum size; for scroll containers the automatic minimum size is zero, as usual.

flex itemsに対するより合理的なデフォルトの最小サイズを提供するために、[scroll container](https://www.w3.org/TR/css-overflow-3/#scroll-container)ではないflex itemのmain axisのautomatic minimum sizeとして使用される値は、**content-based minimum size**となる。scroll containersに対しては、automatic minimum size は従来通りゼロとなる。

<img src="../../assets/images/flex-direction-terms.svg" />

> In general, the content-based minimum size of a flex item is the smaller of its content size suggestion and its specified size suggestion. However, if the box has an aspect ratio and no specified size, its content-based minimum size is the smaller of its content size suggestion and its transferred size suggestion. If the box has neither a specified size suggestion nor an aspect ratio, its content-based minimum size is the content size suggestion.

一般的には、flex itemのcontent-based minimum sizeは、**content size suggestion**と**specified size suggestion**の小さい方になる。しかし、もしboxがアスペクト比を持っているが**specified size**を持っていない場合、content-based minimum sizeはそのcontent size suggestionと**transferred size suggestion**の小さい方になる。もし boxがspecified sizeもアスペクト比もどちらも持っていない場合、content-based minimum sizeはcontent size suggestionになる。

specified sizeとは[CSS Images Module Level 3](https://www.w3.org/TR/css-images-3/#specified-size)によると以下の通り。

> The specified size of an object is given by CSS, such as through the width and height or background-size properties. The specified size can be a definite width and height, a set of constraints, or a combination thereof.

オブジェクトのspecified sizeは、widthとheight、またはbackground-sizeなどのCSSによって与えられる。specified sizeはwidthとheight、制約のセット、またはそれらの組み合わせによって決定される。

> The content size suggestion, specified size suggestion, and transferred size suggestion used in this calculation account for the relevant min/max/preferred size properties so that the content-based minimum size does not interfere with any author-provided constraints, and are defined below:

この計算で使われるcontent size suggestionやspecified size suggestion、transferred size suggestionは、content-based minimum sizeが制作者が用意したどの制約にも干渉しないように、関連したmin/max/preferredサイズのプロパティを考慮しており、以下に定義されている。

> **specified size suggestion**
> If the item’s computed main size property is definite, then the specified size suggestion is that size (clamped by its max main size property if it’s definite). It is otherwise undefined.

itemのcomputed main sizeプロパティが決まっている場合、specified size suggestionはそのサイズになる（その場合、max main sizeプロパティによって固定される）。それ以外ではundefinedとなる。

> **transferred size suggestion**
> If the item has an intrinsic aspect ratio and its computed cross size property is definite, then the transferred size suggestion is that size (clamped by its min and max cross size properties if they are definite), converted through the aspect ratio. It is otherwise undefined.

itemがintrinsicなアスペクト比を持ち、computed cross sizeプロパティが決まっている場合、transferred size suggestionはそのサイズになる（それらが定義されている場合、そのminとmax cross sizeプロパティによって固定される）。それ以外ではundefinedとなる。

intrinsicとは、[Intrinsic Size (内在サイズ)](https://developer.mozilla.org/ja/docs/Glossary/Intrinsic_Size)あたりを参考にすると、つまり、そのflex itemが画像のときなど、要素がそもそも持っている値を指す。アスペクト比（縦横比）があってcross側のサイズが判明していたら、transferred size suggestionはそこから算出される。intrinsic　sizeについては[CSS Intrinsic & Extrinsic Sizing Module Level 3](https://www.w3.org/TR/css-sizing-3)あたりに詳しく書かれていそうだけど、今は触れない。

> **content size suggestion**
> The content size suggestion is the min-content size in the main axis, clamped, if it has an aspect ratio, by any definite min and max cross size properties converted through the aspect ratio, and then further clamped by the max main size property if that is definite.

content size suggestionは、main axisの[min-content size](https://www.w3.org/TR/css-sizing-3/#min-content)であり、もしアスペクト比がある場合、アスペクト比を通して変換され決定された任意のminまたはmax cross サイズプロパティによって固定され、さらにそれが定義されている場合は、max main サイズプロパティによって固定される。

min-content size とは、[CSS Intrinsic & Extrinsic Sizing Module Level 3](https://www.w3.org/TR/css-sizing-3/#min-conten)に以下のように書かれている。

> The smallest size a box could take that doesn’t lead to overflow that could be avoided by choosing a larger size. (See [§4 Intrinsic Size Determination](https://www.w3.org/TR/css-sizing-3/#intrinsic))

boxがより大きなサイズを選ぶことによって避けることができるオーバーフローを引き起こさない最小のサイズ。

> For the purpose of calculating an intrinsic size of the box (e.g. the box’s min-content size), a content-based minimum size causes the box’s size in that axis to become indefinite (even if e.g. its width property specifies a definite size). Note this means that percentages calculated against this size will behave as auto.

boxのintrinsicサイズ（たとえばboxのmin-contentサイズ）を計算する目的で、content-based minimum sizeがそのaxis内のboxのサイズを不定の状態にする（たとえwidthプロパティが固定サイズを指定していたとしても）。これは、このサイズに対する計算されたパーセンテージがautoとして振舞うことを意味する。

> Nonetheless, although this may require an additional layout pass to re-resolve percentages in some cases, this value (like the min-content, max-content, and fit-content values defined in [CSS-SIZING-3]) does not prevent the resolution of percentage sizes within the item.

それにもかかわらず、場合によってはパーセンテージを再解決するための追加のレイアウトパスが必要になる場合があるけれども、（[CSS-SIZING-3](https://www.w3.org/TR/css-flexbox-1/#biblio-css-sizing-3)で定義されているmin-content、max-content、fit-contentなどのような）値は、アイテム内のパーセンテージのサイズの解決を妨げるものではない。

> Note that while a content-based minimum size is often appropriate, and helps prevent content from overlapping or spilling outside its container, in some cases it is not:
In particular, if flex sizing is being used for a major content area of a document, it is better to set an explicit font-relative minimum width such as min-width: 12em. A content-based minimum width could result in a large table or large image stretching the size of the entire content area into an overflow zone, and thereby making lines of text gratuitously long and hard to read.

content-based minimum sizeはたいていの場合適切であり、contentがオーバーラップまたはコンテナの外にこぼれることを防ぐ一方で、そうではない場合もあることに注意が必要。特に、flex sizingがdocumentの主要なコンテンツエリアに使われている場合、`min-width:12em`のような明示的なfont相対的な最小widthを指定する方が良い。content-based minimum widthは、大きなテーブルや大きな画像がコンテンツエリア全体のサイズをoverflow zoneに引き延ばすことになり、したがってテキストの行が不当に長くなり読みにくくなってしまう。

> Note also, when content-based sizing is used on an item with large amounts of content, the layout engine must traverse all of this content before finding its minimum size, whereas if the author sets an explicit minimum, this is not necessary. (For items with small amounts of content, however, this traversal is trivial and therefore not a performance concern.)

また、content-based sizingが大量のコンテンツのあるitemに使われると、レイアウトエンジンは最小サイズを見つける前にコンテンツの全てを走査しなければならなくなる。一方、もし制作者が明示的な最小値を設定すれば、これは必要なくなる。（しかしながら、コンテンツ量が少ないitemsについてはこの操作は些細なことなので、パフォーマンスにたいする懸念はない。）
