---
title: Fragmenting Flex Layout
featured:
  image: tomas-malik-zlSzh2FP7LY-unsplash
  author: Tomáš Malík
  authorLink: https://unsplash.com/@malcoo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2020-09-09 10:06:00
---
今回は[10. Fragmenting Flex Layout
](https://www.w3.org/TR/css-flexbox-1/#pagination)について。<!-- more -->

> Flex containers can break across pages between items, between lines of items (in multi-line mode), and inside items. The [break-*](https://www.w3.org/TR/css3-break/#propdef-break-before) properties apply to flex containers as normal for block-level or inline-level boxes. This section defines how they apply to flex items and the contents of flex items. See the [CSS Fragmentation Module](http://www.w3.org/TR/css-break/) for more context [[CSS3-BREAK]](https://www.w3.org/TR/css-flexbox-1/#biblio-css3-break).

flex containerはitemsの間や、itemの行の間（複数行モードの場合）、そしてitemsの内部でページをまたぐことができる。[break-*](https://www.w3.org/TR/css3-break/#propdef-break-before)のプロパティはブロックやインラインレベルと同じようにflex containersに適用される。このセクションはそれらがどのようにflex itemやflex itemsのコンテンツに適用されるかを定義している。詳細は[CSS Fragmentation Module](http://www.w3.org/TR/css-break/)を参照[[CSS3-BREAK]](https://www.w3.org/TR/css-flexbox-1/#biblio-css3-break)。

> The following breaking rules refer to the [fragmentation container](https://www.w3.org/TR/css3-break/#fragmentation-container) as the “page”. The same rules apply in any other [fragmentation context](https://www.w3.org/TR/css3-break/#fragmentation-context). (Substitute “page” with the appropriate fragmentation container type as needed.) For readability, in this section the terms "row" and "column" refer to the relative orientation of the flex container with respect to the block flow direction of the fragmentation context, rather than to that of the flex container itself.

次の改行ルールでは[fragmentation container](https://www.w3.org/TR/css3-break/#fragmentation-container)を「ページ」として言及する。同じルールが他の[fragmentation context](https://www.w3.org/TR/css3-break/#fragmentation-context)においても適用される。（必要に応じて「ページ」を適切なfragmentation container typeに置き換える。）可読性のために、このセクションにおいては「行」「列」の用語を、flex container自身のそれではなく、fragmentation contextのブロックフローに対するflex containerの相対的な方向として言及する。

> The exact layout of a fragmented flex container is not defined in this level of Flexible Box Layout. However, breaks inside a flex container are subject to the following rules (interpreted using order-modified document order):

fragmented flex containerの正確なレイアウトはFlexible Box Layoutのこのレベルでは定義されていない。しかしながら、flex container内部での改行は次のルールに従う（order-modified document orderを使用していると解釈される）。

> * In a row flex container, the break-before and break-after values on flex items are propagated to the flex line. The break-before values on the first line and the break-after values on the last line are propagated to the flex container.<br>**Note:** Break propagation (like text-decoration propagation) does not affect computed values.
> * In a column flex container, the break-before values on the first item and the break-after values on the last item are propagated to the flex container. Forced breaks on other items are applied to the item itself.
> * A forced break inside a flex item effectively increases the size of its contents; it does not trigger a forced break inside sibling items.
> * In a row flex container, [Class A break opportunities](https://www.w3.org/TR/css3-break/#btw-blocks) occur between sibling flex lines, and [Class C break opportunities](https://www.w3.org/TR/css3-break/#end-block) occur between the first/last flex line and the flex container’s content edges. In a column flex container, Class A break opportunities occur between sibling flex items, and Class C break opportunities occur between the first/last flex items on a line and the flex container’s content edges. [CSS3-BREAK]
> * When a flex container is continued after a break, the space available to its flex items (in the block flow direction of the fragmentation context) is reduced by the space consumed by flex container fragments on previous pages. The space consumed by a flex container fragment is the size of its content box on that page. If as a result of this adjustment the available space becomes negative, it is set to zero.
> * If the first fragment of the flex container is not at the top of the page, and none of its flex items fit in the remaining space on the page, the entire fragment is moved to the next page.
> * When a multi-line column flex container breaks, each fragment has its own "stack" of flex lines, just like each fragment of a multi-column container has its own row of column boxes.
> * Aside from the rearrangement of items imposed by the previous point, UAs should attempt to minimize distortion of the flex container with respect to unfragmented flow.

* flex containerの行において、flex items上の`break-before`と`break-after`の値は、flex行に伝播する。最初の行のbreak-beforeの値と最後の行のbreak-afterの値は、flex containerに伝播する。<br>**注:**改行の伝播は（text-decorationの伝播のように）計算値に影響を与えない
* flex containerの列において、最初のitemのbreak-beforeの値と最後のitemのbreak-afterの値はflex containerに伝播する。他のitems上の強制的な改行はitemそれ自身に適用される。
* flex item内の強制改行はコンテンツのサイズを効果的に増加させる。それは隣のitems内の強制改行を引き起こさない。
* flex containerの行において、[Class A break opportunities](https://www.w3.org/TR/css3-break/#btw-blocks)は隣り合うflex行の間で発生して、[Class C break opportunities](https://www.w3.org/TR/css3-break/#end-block)は最初・最後のflex行とflex containerのコンテンツの端の間で発生する。flex containerの列にといては、Class A break opportunitiesは隣り合うflex itemsの間で起こり、Class C break opportunitiesは最初・最後のflex itemsとflex containerのコンテンツの端との間で発生する。
* flex containerが改行の後に継続する場合、flex itemsに対する余白スペース（fragmentation contextのブロックフロー方向において）は、前のページ上のflex container fragmentsによって使われたスペースを差し引かれる。もしこの調整の結果として余白スペースが負になる場合は、ゼロにセットされる。
* flex containerの最初のfragmentがページのトップではなく、ページ上の残りのスペースの中でどのflex itemsもフィットしない場合、全てのfragmentが次のページに移動する。
* flex containerの複数行の列が改行した場合、ちょうど複数列のcontainerの各fragmentが独自の列boxesの行を持つように、各fragmentはflex行の独自の「スタック」を持つ。
* 先のポイントによって課されるitemsの再調整からさらに、ユーザーエージェントはunfragmentedフローに対するflex containerの歪みを最小限にすることを努力すべきである。

### 10.1. Sample Flex Fragmentation Algorithm

> This informative section presents a possible fragmentation algorithm for flex containers. Implementors are encouraged to improve on this algorithm and provide feedback to the CSS Working Group.

このinformativeセクションはflex containerに対しての可能なfragmentationアルゴリズムを提示する。実装においてはこのアルゴリズムを改善し、CSS Working Groupにフィードバックを与えることが推奨される。

> **EXAMPLE 14**
> This algorithm assumes that pagination always proceeds only in the forward direction; therefore, in the algorithms below, alignment is mostly ignored prior to pagination. Advanced layout engines may be able to honor alignment across fragments.

このアルゴリズムはページネーションが常に前方方向にのみ進んでいくことを仮定する。したがって、下のアルゴリズムにおいては、alignmentはページネーションの前にたいてい無視される。高度なレイアウトエンジンはfragmentsにまたがってalignmentを履行することができるかもしれない。

> **single-line column flex container**
> 1. Run the flex layout algorithm (without regards to pagination) through [Cross Sizing Determination](https://www.w3.org/TR/css-flexbox-1/#cross-sizing).
> 2. Lay out as many consecutive flex items or item fragments as possible (but at least one or a fragment thereof), starting from the first, until there is no more room on the page or a forced break is encountered.
> 3. If the previous step ran out of room and the free space is positive, the UA may reduce the distributed free space on this page (down to, but not past, zero) in order to make room for the next unbreakable flex item or fragment. Otherwise, the item or fragment that does not fit is pushed to the next page. The UA should pull up if more than 50% of the fragment would have fit in the remaining space and should push otherwise.
> 4. If there are any flex items or fragments not laid out by the previous steps, rerun the flex layout algorithm from [Line Length Determination](https://www.w3.org/TR/css-flexbox-1/#line-sizing) through [Cross Sizing Determination](https://www.w3.org/TR/css-flexbox-1/#cross-sizing) with the next page’s size and all the contents (including those already laid out), and return to the previous step, but starting from the first item or fragment not already laid out.
> 5. For each fragment of the flex container, continue the flex layout algorithm from [Main-Axis Alignment](https://www.w3.org/TR/css-flexbox-1/#main-alignment) to its finish.

1. [Cross Sizing Determination](https://www.w3.org/TR/css-flexbox-1/#cross-sizing)を通して、flexレイアウトアルゴリズム（ページネーションに関係なく）を実行する
2. 最初のitemから始めてページ上に余白がなくなるか強制的な改行が起こるまで、可能な限り多く（少なくとも1つまたは1つのfragment）の連続したflex itemまたはitem fragmentsをレイアウトする。
3. もし先のステップで余白が不足し、かつ余白スペースが正の場合、ユーザーエージェントは次の改行できないflex itemやfragmentのための余白を確保するために、このページの配分された余白スペースを減らすかもしれない（ゼロまで）。ユーザーエージェントはもしfragmentの50%以上が残りのスペースの中でフィットする場合は引き上げ、それ以外の場合は引き下げるべきだろう。
4. もし先のステップによってレイアウトされていないflex itemsまたはfragmentsがある場合、次のページのサイズとすべてのコンテンツ（すでにレイアウトされているものも含む）を使用して、[Line Length Determination](https://www.w3.org/TR/css-flexbox-1/#line-sizing)から[Cross Sizing Determination](https://www.w3.org/TR/css-flexbox-1/#cross-sizing)までのflexレイアウトアルゴリズムを再実行して、先のステップに戻り、まだレイアウトされていない最初のitemまたはfragmentから始める。
5. flex containerの各fragmentに対して、[Main-Axis Alignment](https://www.w3.org/TR/css-flexbox-1/#main-alignment)からその終了までレイアウトアルゴリズムを続ける。

> It is the intent of this algorithm that column-direction single-line flex containers paginate very similarly to block flow. As a test of the intent, a flex container with justify-content:start and no flexible items should paginate identically to a block with in-flow children with same content, same used size and same used margins.

このアルゴリズムの意図はcolumn-direction single-line flex containerが、ブロックフローにとても似たページネートを行うということである。その意図のテストとして、`justify-content:start`を持つflex containerでflexibleではないitemsが、同じコンテンツで同じ使用サイズ、同じマージンのin-flow childrenを持つブロックが同様にページネートするべきである。

**multi-line column flex container**
> 1. Run the flex layout algorithm with regards to pagination (limiting the flex container’s maximum line length to the space left on the page) through [Cross Sizing Determination](https://www.w3.org/TR/css-flexbox-1/#cross-sizing).
> 2. Lay out as many flex lines as possible (but at least one) until there is no more room in the flex container in the cross dimension or a forced break is encountered:
>   1. Lay out as many consecutive flex items as possible (but at least one), starting from the first, until there is no more room on the page or a forced break is encountered. Forced breaks within flex items are ignored.
>   2. If this is the first flex container fragment, this line contains only a single flex item that is larger than the space left on the page, and the flex container is not at the top of the page already, move the flex container to the next page and restart flex container layout entirely.
>   3. If there are any flex items not laid out by the first step, rerun the flex layout algorithm from [Main Sizing Determination](https://www.w3.org/TR/css-flexbox-1/#main-sizing) through [Cross Sizing Determination](https://www.w3.org/TR/css-flexbox-1/#cross-sizing) using only the items not laid out on a previous line, and return to the previous step, starting from the first item not already laid out.
> 3. If there are any flex items not laid out by the previous step, rerun the flex layout algorithm from Line Sizing Determination through [Cross Sizing Determination](https://www.w3.org/TR/css-flexbox-1/#cross-sizing) with the next page’s size and only the items not already laid out, and return to the previous step, but starting from the first item not already laid out.
> 4. For each fragment of the flex container, continue the flex layout algorithm from Main-Axis Alignment to its finish.

1. [Cross Sizing Determination](https://www.w3.org/TR/css-flexbox-1/#cross-sizing)を通して、ページネーションに考慮しつつ（flex containerの最大行数をページの残りスペースに制限する）flexレイアウトアルゴリズムを実行する。
2. cross dimensionにおけるflex container内の余白がなくなるまで、または強制的な改行が発生するまで可能な限り（少なくとも一つ）のflex行を配置する。
  1. 最初のitemからページ上に余白スペースがなくなる、または強制的な改行が発生するまで、可能な限りの連続したflex items（少なくとも一つ）を配置する。flex items内部の強制的な改行は無視される
  2. もしこれが最初のflex container fragmentの場合で、ページ上に残っているスペースよりも大きい1つのflex itemのみがこの行に含まれる場合で、かつflex containerがすでにページのトップではない場合、flex containerを次のページに移動してflex containerレイアウトを全体的に再開する。
  3. もし最初のステップによってレイアウトされていないflex itemsがある場合、先の行でレイアウトされていないitemsのみを使って、[Main Sizing Determination](https://www.w3.org/TR/css-flexbox-1/#main-sizing)から[Cross Sizing Determination](https://www.w3.org/TR/css-flexbox-1/#cross-sizing)までのflexレイアウトアルゴリズムを再実行する。
3. もし先のステップでレイアウトされていないflex itemsがあったら、次のページのサイズとまだレイアウトされていないitemsを使用して、[Line Length Determination](https://www.w3.org/TR/css-flexbox-1/#line-sizing)から[Cross Sizing Determination](https://www.w3.org/TR/css-flexbox-1/#cross-sizing)までのflexレイアウトアルゴリズムを再実行して、先のステップに戻り、まだレイアウトされていない最初のitemから始める。
4. flex containerの各fragmentに対して、[Main-Axis Alignment](https://www.w3.org/TR/css-flexbox-1/#main-alignment)からその終了までレイアウトアルゴリズムを続ける。
