---
title: Flex Items
featured:
  image: vincent-van-zalinge-8bOwZ8ag9UY-unsplash
  author: Vincent van Zalinge
  authorLink: https://unsplash.com/@vincentvanzalinge?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2020-03-21 18:17:12
---
[Flex Containers](https://memolog.org/2020/flex-containers.html)から引き続き、[4. Flex Items](https://www.w3.org/TR/css-flexbox-1/#flex-items)について確認していく。<!-- more -->

> Loosely speaking, the flex items of a flex container are boxes representing its in-flow contents.

大まかに言うと、　flex containerのflex itemは、（flex containerの）in-flowコンテンツを表現したboxである。

つまり、大まかには`display:flex`配下の子要素がflex itemとして処理される。以下の説明では、例外的なケースについての説明を含んだ、より厳密な内容が続く。

> Each in-flow child of a flex container becomes a flex item, and each contiguous sequence of child text runs is wrapped in an anonymous block container flex item. However, if the entire sequence of child text runs contains only white space (i.e. characters that can be affected by the white-space property) it is instead not rendered (just as if its text nodes were display:none).

flex containerのそれぞれのin-flowの子供は、flex itemになり、子のtext runの連続する列のそれぞれは、anonymous block container flex itemでラップされる。しかしながら、もし全てのtext runの列が空白（white-spaceプロパティによって影響をうける文字列）のみを含む場合、ラップされる代わりにレンダリングされなくなる（ちょうどtextノードがdisplay:noneであるかのように）。

**EXAMPLE 2**
```html
<div style="display:flex">

    <!-- flex item: block child -->
    <div id="item1">block</div>

    <!-- flex item: floated element; floatの指定は無視される -->
    <div id="item2" style="float: left;">float</div>

    <!-- flex item: インラインコンテンツはanonymous block boxで囲われる -->
    anonymous item 3

    <!-- flex item: inline child -->
    <span>
        item 4
        <!-- flex items はブロックの周囲で分かれない -->
        <q style="display: block" id=not-an-item>item 4</q>
        item 4
    </span>
</div>
```

flex itemsは下の画像みたいになる。
<img src="../../assets/images/screenshot_flex_items.png" lazyload width="327" height="100" />

> Note that the inter-element white space disappears: it does not become its own flex item, even though the inter-element text does get wrapped in an anonymous flex item.

要素と要素の間にある空白は消える。要素間のtextはanonymous flex itemでラップされるけれど、空白だけではflex itemにはならない。

> Note also that the anonymous item’s box is unstyleable, since there is no element to assign style rules to. Its contents will however inherit styles (such as font settings) from the flex container.

anonymous itemのboxは、スタイルのルールを割り当てる要素がないので、スタイルがない（unstyleable）状態になる。しかしながら、flex containerから（fontのような）スタイルは引き継がれる。

> A flex item establishes an independent formatting context for its contents. However, flex items themselves are flex-level boxes, not block-level boxes: they participate in their container’s flex formatting context, not in a block formatting context.

flex itemはそのコンテンツに対してindependent formatting contextを設置する。しかしながら、flex itemそのものはflexレベルのboxであり、blockレベルのboxではない。つまりflex itemsはcontainerのflex formatting contextに参加する。block formatting contextには参加しない。

----

> **Note**: Authors reading this spec may want to skip past the following box-generation and static position details.

> The display value of a flex item is blockified: if the specified display of an in-flow child of an element generating a flex container is an inline-level value, it computes to its block-level equivalent. (See CSS2.1§9.7 [CSS21] and CSS Display [CSS3-DISPLAY] for details on this type of display value conversion.)

flex itemのdisplay valueは、ブロック化される。もしflex containerを生成した要素のin-flowの子どものspecified valueがインラインベルのvalueであった場合、ブロックレベルのvalueとして計算される。これは[Flex Containers](https://memolog.org/2020/flex-containers.html)の最後に書いた、インラインレベルのものがブロックレベルとして扱われるという話と同様。

> **Note**: Some values of display normally trigger the creation of anonymous boxes around the original box. If such a box is a flex item, it is blockified first, and so anonymous box creation will not happen. For example, two contiguous flex items with display: table-cell will become two separate display: block flex items, instead of being wrapped into a single anonymous table.

display valueの値によっては、通常オリジナルのboxの周りにanonymous boxの作成をもたらす。もしそのようなboxがflex itemであったばあい、それはまずブロック化され、anonymous boxの生成は起こらなくなる。たとえば、2つの連続したflex itemがdisplay:table-cellであった場合、一つのanonymous  tableによってラップされるのではなく、それらは二つのdisplay:blockなflex itemsになる。

> In the case of flex items with display: table, the table wrapper box becomes the flex item, and the order and align-self properties apply to it. The contents of any caption boxes contribute to the calculation of the table wrapper box’s min-content and max-content sizes. However, like width and height, the flex longhands apply to the table box as follows: the flex item’s final size is calculated by performing layout as if the distance between the table wrapper box’s edges and the table box’s content edges were all part of the table box’s border+padding area, and the table box were the flex item.

`display:table`であるflex itemsの場合、table wrapper boxがflex itemとなり、その他のとalign-selfのプロパティはそこに適用される。caption boxのコンテンツもtable wrapper boxのmin-content、max-contentのサイズの計算に貢献する。しかしながら、widthとheightのように、flex longhandsは次のようにtable boxに適用される。flex itemの最終的なサイズはtable wrapper boxの端とtable boxのコンテンツの端との間の距離が、すべてtable boxのborderとpaddingエリアの一部であるかのようになり、そのtable boxがflex itemであるかのようにレイアウトを実行されることによって、計算される。

----

`longhand`とは、`shorthand`の反対ということで、fontでいうと`font: 18px sans-serif;`みたいに関連するプロパティをまとめて指定するのがshorthandで、`font-family: sans-serif;`とプロパティを個別に指定するのがlonghand（だと思う）。

`display:table`は、[2.2. Inner Display Layout Models](https://www.w3.org/TR/css-display-3/#valdef-display-table)から引用すると以下の通り。

> **table**
The element generates a principal [table wrapper box](https://drafts.csswg.org/css-tables-3/#table-wrapper-box) that establishes a block formatting context, and which contains an additionally-generated [table grid box](https://drafts.csswg.org/css-tables-3/#table-grid-box) that establishes a table formatting context. [CSS2]

要素はblock formatting contextを設置する**table wrapper box**を生成し、そこにtable formatting contextを設置する**table grid box**を包含する。

> **table wrapper box**
A block container box generated [around table grid boxes](https://drafts.csswg.org/css-tables-3/#fixup-algorithm) to account for any space occupied by each [table-caption](https://drafts.csswg.org/css-tables-3/#table-caption) it owns.

table wrapper boxはblock containerであり、それが所有する各table-captionによって占めるスペースを考慮しつつ、table grid boxesの周りに生成される。

> **table grid box**
A block-level box containing the table-internal boxes, excluding its captions.

table grid boxは、ブロックレベルのboxでcaptionを除いた、table-internal boxesが含まれる。

----

つまり、`display:table`になっているとprincipal box（通常、要素は一つのboxを生成する、それをprincipal boxと呼ぶ）として、table wrapper boxを生成する。flex containerの子要素が`display:table`であった場合、table wrapper boxがflex itemとして扱われる。table wrapper box には、table-captionによるキャプションのエリアとtable-internal boxesが含まれていて、min-content、max-contentの計算にはcaption部分も含まれる。でもflexの各種設定値では、caption部分（table wrapper boxとtable boxの間にある距離）はpaddingとかborderと同じ扱いになり、（content-box・コンテンツ領域のみを対象とする）widthやheightと同じようにコンテンツ領域としては考慮されない。
