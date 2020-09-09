---
title: Flex Layout Algorithm
featured:
  image: sarah-madaio-fpZHGVBzlYk-unsplash
  author: Sarah Madaio
  authorLink: https://unsplash.com/@smadaio?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2020-07-26 11:56:00
---
今回は[9. Flex Layout Algorithm](https://www.w3.org/TR/css-flexbox-1/#layout-algorithm)について。この章は見なくて良いんじゃないかと思いつつ、写経のような感じでやっていこうと思う。<!-- more -->

> This section contains normative algorithms detailing the exact layout behavior of a flex container and its contents. The algorithms here are written to optimize readability and theoretical simplicity, and may not necessarily be the most efficient. Implementations may use whatever actual algorithms they wish, but must produce the same results as the algorithms described here.
>
> **Note:** This section is mainly intended for implementors. Authors writing web pages should generally be served well by the individual property descriptions, and do not need to read this section unless they have a deep-seated urge to understand arcane details of CSS layout.
>
> The following sections define the algorithm for laying out a flex container and its contents.
>
> **Note:** Flex layout works with the flex items in order-modified document order, not their original document order.

このセクションはflex containerおよびそのコンテンツの正確なレイアウトの振る舞いについての規範的なアルゴリズムの詳細を含んでいる。ここにあるアルゴリズムは可読性や理論的な簡易さを適切にするために書かれており、最も効率的であるとは限らない。実装にはそれらが望ましいと思う実際のアルゴリズムを何でも利用することができるが、ここに示されているアルゴリズムと同じ結果を出力しなければならない。

このセクションは主に実装者に対して書かれている。WEBページの制作者には個々のプロパティの記述によって適切に情報提供されているので、
CSSレイアウトの難解な詳細を深く理解したいということがなければ、このセクションを読む必要はない。

次のセクションはflex containerとそのコンテンツをレイアウトするためのアルゴリズムを定義する。

flex layoutはオリジナルのドキュメント順ではなく、order-modifiedされたドキュメント順でflex itemsを操作する。

### 9.1. Initial Setup
> **1. Generate anonymous flex items** as described in [§4 Flex Items](https://www.w3.org/TR/css-flexbox-1/#flex-items).

[§4 Flex Items](https://www.w3.org/TR/css-flexbox-1/#flex-items)で記述したように、**匿名のflex itemsを生成する**

### 9.2. Line Length Determination
> **2. Determine the available main and cross space for the flex items.** For each dimension, if that dimension of the flex container’s content box is a definite size, use that; if that dimension of the flex container is being sized under a min or max-content constraint, the available space in that dimension is that constraint; otherwise, subtract the flex container’s margin, border, and padding from the space available to the flex container in that dimension and use that value.
>
> This might result in an infinite value.

**2. flex itemsに対して利用可能なmain/crossのスペースを決定する。**それぞれの次元に対して、もしflex containerのコンテンツboxの次元が、明確なサイズであるなら、それを利用する。もしflex containerの次元がmin/max-contentの制約下でサイズを指定するなら、その次元における利用可能なスペースはその制約になる。それ以外の場合は、この次元におけるflex containerに対して利用可能なスペースから、flex containerのマージン、ボーダー、パディングなどを差し引いたものになる。

結果として値が無限になる場合がある。

> **EXAMPLE 13**
> For example, the available space to a flex item in a floated auto-sized flex container is:
>
> * the width of the flex container’s containing block minus the flex container’s margin, border, and padding in the horizontal dimension
> * infinite in the vertical dimension

たとえば、フロートしたauto-sized flex containerにおけるflex itemの利用可能なスペースは次のようになる。

* flex containerの包含ブロックの幅から水平方向の次元のflex containerのマージン・ボーダー・パディングをマイナスする
* 縦方向については、無限になる

> **3. Determine the flex base size and hypothetical main size of each item:**

**3. それぞれのitemのflex base sizeと仮想main sizeを決定する**

> A. If the item has a definite used flex basis, that’s the flex base size.
> B. If the flex item has ...
>    * an intrinsic aspect ratio,
>    * a used flex basis of content, and
>    * a definite cross size,
> then the flex base size is calculated from its inner cross size and the flex item’s intrinsic aspect ratio.
>
> C. If the used flex basis is content or depends on its available space, and the flex container is being sized under a min-content or max-content constraint (e.g. when performing automatic table layout [CSS21]), size the item under that constraint. The flex base size is the item’s resulting main size.
> D. Otherwise, if the used flex basis is content or depends on its available space, the available main size is infinite, and the flex item’s inline axis is parallel to the main axis, lay the item out using the rules for a box in an orthogonal flow [CSS3-WRITING-MODES]. The flex base size is the item’s max-content main size.
> **Note:** This case occurs, for example, in an English document (horizontal writing mode) containing a column flex container containing a vertical Japanese (vertical writing mode) flex item.
> E. Otherwise, size the item into the available space using its used flex basis in place of its main size, treating a value of content as max-content. If a cross size is needed to determine the main size (e.g. when the flex item’s main size is in its block axis) and the flex item’s cross size is auto and not definite, in this calculation use fit-content as the flex item’s cross size. The flex base size is the item’s resulting main size.
>
> When determining the flex base size, the item’s min and max main sizes are ignored (no clamping occurs). Furthermore, the sizing calculations that floor the content box size at zero when applying box-sizing are also ignored. (For example, an item with a specified size of zero, positive padding, and box-sizing: border-box will have an outer flex base size of zero—and hence a negative inner flex base size.)
>
> The hypothetical main size is the item’s flex base size clamped according to its used min and max main sizes (and flooring the content box size at zero).
>
> Determine the main size of the flex container using the rules of the formatting context in which it participates. For this computation, auto margins on flex items are treated as 0.

A. もしitemが明確なflex basisの値があるなら、それがflex base sizeになる。

B. もしflex itemが以下の値を持っていたら...

* intrinsicなアスペクト比
* flex basisの使用値がcontent
* cross sizeの明確な値

flex base sizeはitemの内部cross sizeとintrinsicなアスペクト比から計算される

C. flex basisの使用値がcontentであるか利用可能なスペースに依存する場合で、flex containerがmin/max-contentの制約下でサイズを決定する（例えば自動tableレイアウトを実行する）場合、その制約下でサイズを決定する。そのflex base sizeはitemの最終的なmain sizeになる。

D. それ以外の場合で、もしflex basisの使用値がcontentかである利用可能なスペースに依存する場合で、利用可能なmain sizeが無限でflex itemのinline axisがmain axisと平行である場合、直交するフロー内のboxに対するルールを使ってitemをレイアウトする。flex base sizeはitemのmax-content main sizeになる。

E. それ以外の場合、contentの値をmax-contentの値として扱い、main sizeの代わりにflex basisを使って利用可能なスペースでitemのサイズを決定する。もしcross sizeがmain sizeを決定するのに必要とされる場合（たとえば、flex itemのmain sizeがblock axis内にある場合）で、flex itemのcross sizeがautoで明確ではない場合、flex itemのcross sizeとして`fit-content`を使って計算する。flex base sizeはitemの最終的なmain sizeになる。

flex base sizeが決定したら、itemのmin/maxサイズは無視される（clamping（値の制限）が発生しなくなる）。さらに、box-sizingを適用する場合、content boxのサイズをゼロに切り捨てるサイズの計算も無視される（たとえば、ゼロが指定されているitemで、正のパディングがあり、かつ`box-sizing: border-box`である場合、outer flex base sizeがゼロになり、したがって負のinner flex base sizeになる）。

仮想のmain sizeは、min/max main sizeの使用値にしたがって制限された、itemのflex base sizeになる（そしてcontent boxのサイズはゼロに切り捨てられる）。

flex containerのmain sizeは、参加しているformatting contextのルールを使って決定する。この計算において、flex itemsのautoマージンは0として扱われる。

### 9.3. Main Size Determination

> **5. Collect flex items into flex lines:**
> * If the flex container is single-line, collect all the flex items into a single flex line.
> * Otherwise, starting from the first uncollected item, collect consecutive items one by one until the first time that the next collected item would not fit into the flex container’s inner main size (or until a forced break is encountered, see [§10 Fragmenting Flex Layout](https://www.w3.org/TR/css-flexbox-1/#pagination)). If the very first uncollected item wouldn’t fit, collect just it into the line.
For this step, the size of a flex item is its outer hypothetical main size. (Note: This can be negative.)
> Repeat until all flex items have been collected into flex lines.
> Note that the "collect as many" line will collect zero-sized flex items onto the end of the previous line even if the last non-zero item exactly "filled up" the line.

**5. flex itemsをflex行に集める**
* もしflex containerが1行の場合、すべてのflex itemsを一つのflex行に集める
* それ以外の場合、最初の未収集のitemから始めて、次に収集するitemがflex containerのinner main sizeにフィットしなくなるまで（または強制的なbreakが発生するまで。[§10 Fragmenting Flex Layout](https://www.w3.org/TR/css-flexbox-1/#pagination)を参照）、連続するitemsを一つずつ集めていく。もし最初の未収集のitemがフィットしない場合、それだけを行に集める。
このステップに対して、flex itemのサイズはその仮想のouter main size になる（これは負の値になる可能性がある）
そしてすべてのflex itemがflex行に集められるまで繰り返す。
この行に「集める」作業は、たとえ最後のゼロではないitemが正確に行に「満たされた」場合でも、ゼロサイズのflex itemsを前の行の最後に集める。

> **6. Resolve the flexible lengths** of all the flex items to find their used main size. See [§9.7 Resolving Flexible Lengths](https://www.w3.org/TR/css-flexbox-1/#resolve-flexible-lengths).

**6.**main sizeの使用値を見つけるためにすべてのflex itemsについて**flexible lengthを解決する**。[§9.7 Resolving Flexible Lengths](https://www.w3.org/TR/css-flexbox-1/#resolve-flexible-lengths)を参照。

### 9.4. Cross Size Determination

**7.Determine the hypothetical cross size of each item** by performing layout with the used main size and the available space, treating auto as fit-content.

**7.**main sizeの使用値と利用可能スペースを使ってレイアウトを実行して、autoを`fit-content`として扱い、**各itemの仮想のcross sizeを決定する**

**8.Calculate the cross size of each flex line.**

> If the flex container is single-line and has a definite cross size, the cross size of the flex line is the flex container’s inner cross size.
>
> Otherwise, for each flex line:
>
> 1. Collect all the flex items whose inline-axis is parallel to the main-axis, whose align-self is baseline, and whose cross-axis margins are both non-auto. Find the largest of the distances between each item’s baseline and its hypothetical outer cross-start edge, and the largest of the distances between each item’s baseline and its hypothetical outer cross-end edge, and sum these two values.
> 2. Among all the items not collected by the previous step, find the largest outer hypothetical cross size.
> 3. The used cross-size of the flex line is the largest of the numbers found in the previous two steps and zero.
> If the flex container is single-line, then clamp the line’s cross-size to be within the container’s computed min and max cross sizes. Note that if CSS 2.1’s definition of min/max-width/height applied more generally, this behavior would fall out automatically.

もしflex containerが単一行で、cross sizeが明確な値である場合、flex行のcross sizeはflex containerのinner cross sizeになる。

それ以外の場合、各flex行について以下のようになる。

1. inline-axisがmain-axisに対して平行で、align-selfがbaselineで、cross-axisマージンが両方ともautoではないすべてのflex itemsを集める。各itemのbaselineと仮想outer cross-startの端との間の距離が一番大きい箇所と、各itemのbaselineと仮想outer cross-endの端との間の距離が一番大きい箇所を見つけて、それらの値を合計する。
2. 先のステップで収集しなかったすべてのitemsの中で、outerの仮想cross sizeが一番大きいものを見つける
3. flex行のcross-sizeの使用値は、先のステップで見つけた値とゼロの中で一番大きい値になる。
もしflex containerが単一行の場合、行のcross-sizeはcontainerのmin/max cross sizeの使用値の範囲内に収める。もしmin/max-width/heightのCSS 2.1の定義がより広く適用される場合、この振る舞いは自動的に失われることに注意。

> **9. Handle 'align-content: stretch'**. If the flex container has a definite cross size, align-content is stretch, and the sum of the flex lines' cross sizes is less than the flex container’s inner cross size, increase the cross size of each flex line by equal amounts such that the sum of their cross sizes exactly equals the flex container’s inner cross size.

**9. `align-contnet: strech`を対処する**。もしflex containerがcross sizeの明確な値を持っている場合、align-contentはstretchとなり、flex行のcross sizeの合計はflex containerのinner cross sizeよりも小さくなり、cross sizeの合計が正確にflex containerのinner cross sizeと同じになるように、同じ量だけ各flex lineのcross sizeを増やす。

> **10. Collapse visibility:collapse items**. If any flex items have visibility: collapse, note the cross size of the line they’re in as the item’s strut size, and restart layout from the beginning.
>
> In this second layout round, when collecting items into lines, treat the collapsed items as having zero main size. For the rest of the algorithm following that step, ignore the collapsed items entirely (as if they were display:none) except that after calculating the cross size of the lines, if any line’s cross size is less than the largest strut size among all the collapsed items in the line, set its cross size to that strut size.
>
> Skip this step in the second layout round.

**10. `visibility:collapse`のitemsを折りたたむ**。もしいずれかのflex itemsが`visibility: collapse`を持っている場合、そのitemの支柱サイズとして、その行のcross sizeをメモしておき、最初からレイアウトを再開する。

この2回目のレイアウトの回で、itemsを行に集めた時に、折り畳まれたitemsをゼロのmain sizeを持っているものとして扱う。このステップの後に続く残りのアルゴリズムについて、折り畳まれたitemsは完全に無視されれ（`display:none`が設定されているかのようになる）。ただし、もし行のcross sizeが、行内の折り畳まれたitemの中で最も大きい支柱サイズよりも小さい場合、そのcross sizeは支柱サイズになる。

2回目のレイアウトの回ではこのステップをスキップする。

> **11. Determine the used cross size of each flex item.** If a flex item has align-self: stretch, its computed cross size property is auto, and neither of its cross-axis margins are auto, the used outer cross size is the used cross size of its flex line, clamped according to the item’s used min and max cross sizes. Otherwise, the used cross size is the item’s hypothetical cross size.
>
> If the flex item has align-self: stretch, redo layout for its contents, treating this used size as its definite cross size so that percentage-sized children can be resolved.
>
> Note that this step does not affect the main size of the flex item, even if it has an intrinsic aspect ratio.

もしflex itemが`align-self: stretch`を持っている場合、そのcross sizeの計算値はautoにあり、cross-axisのマージンはいずれもautoにはならず、outer cross sizeの使用値はflex行のcross sizeの使用値になり、itemのmin/max cross sizeの使用値に従って値を固定する。それ以外の場合、cross sizeの使用値はitemの仮想cross sizeになる。

もしflex itemが`align-self: stretch`を持っている場合、そのコンテンツに対してレイアウトをやり直し、パーセンテージサイズの子供を解決するために、この使用サイズをcross sizeの固定値として扱う。

このステップはitemがintrinsicなアスペクト比を持っている場合でも、flex itemのmain sizeには影響を与えないことに注意。

### 9.5. Main-Axis Alignment

> **12. Distribute any remaining free space.** For each flex line:
> 1. If the remaining free space is positive and at least one main-axis margin on this line is auto, distribute the free space equally among these margins. Otherwise, set all auto margins to zero.
> 2. Align the items along the main-axis per justify-content.

**12. 残りの余白スペースを配分する** 各flex行について以下のようにする。

1. もし残りの余白スペースが正で、この行上の少なくとも一つのmain-axisがautoである場合、余白スペースはこれらのマージンに均等に配分される。それ以外の場合、すべてのautoマージンはゼロにセットされる。
2. justify-contentに従って、main-axisに沿ってitemを整列する。

### 9.6. Cross-Axis Alignment

> **13. Resolve cross-axis auto margins.** If a flex item has auto cross-axis margins:
> * If its outer cross size (treating those auto margins as zero) is less than the cross size of its flex line, distribute the difference in those sizes equally to the auto margins.
> * Otherwise, if the block-start or inline-start margin (whichever is in the cross axis) is auto, set it to zero. Set the opposite margin so that the outer cross size of the item equals the cross size of its flex line.

**13. cross-size auto マージンを解決する** もしflex itemがauto cross-axisマージンを持っている場合、以下のようになる。
* もしouter cross size（それらのautoマージンはゼロとして扱われる）が、flex行のcross sizeより小さい場合、それらのサイズの差をautoマージンに均等に配分する
* それ以外の場合、もしblock-startもしくはinline-startのマージン（cross axis内のどちらでも）がautoである場合、ゼロにセットされる。itemのouter cross sizeがflex行のcross sizeと同じになるように反対のマージンがセットされる。

> **14. Align all flex items along the cross-axis** per align-self, if neither of the item’s cross-axis margins are auto.

**14.** もしitemのcross-axisマージンがいずれもautoではない場合、align-selfに従って、**すべてのflex itemsをcross-axisに沿って整列する。**

> **15. Determine the flex container’s used cross size:**
> * If the cross size property is a definite size, use that, clamped by the used min and max cross sizes of the flex container.
> * Otherwise, use the sum of the flex lines' cross sizes, clamped by the used min and max cross sizes of the flex container.

**15. flex containerのcross sizeの使用値を決定する**
* もしcross sizeが固定値である場合、それを使用する。flex containerのmin/max cross sizeの使用値によって収められる。
* それ以外の場合、flex行のcross sizeの合計を利用する。flex containerのmin/max cross sizeの使用値によって収められる。

> **16. Align all flex lines** per align-content.

**16.** align-contentに従って**すべてのflex行を整列する**

### 9.7. Resolving Flexible Lengths

> To resolve the flexible lengths of the items within a flex line:

flex行内でitemのflexible lengthを解決するために、以下のことを行う。

> **1. Determine the used flex factor**. Sum the outer hypothetical main sizes of all items on the line. If the sum is less than the flex container’s inner main size, use the flex grow factor for the rest of this algorithm; otherwise, use the flex shrink factor.

**1. flex factorの使用値を決定する。** 行上のすべてのitemsのouter 仮想main sizeを合計する。もし合計がflex containerのinner main sizeよりも小さい場合、このアルゴリズムの残りの部分についてflex grow factorを使用する。それ以外の場合、flex shrink factorを使用する。

> **2. Size inflexible items**. Freeze, setting its target main size to its hypothetical main size…
> * any item that has a flex factor of zero
> * if using the flex grow factor: any item that has a flex base size greater than its hypothetical main size
> * if using the flex shrink factor: any item that has a flex base size smaller than its hypothetical main size

**2. inflexible itemsのサイズを決める。** ターゲットのmain sizeを仮想main sizeに設定して固定する
* flex factorがゼロであるitem
* もしflex grow factorを使用してる場合、flex base sizeが仮想main sizeより大きいitem
* もしflex shrink factorを使用してる場合、flex base sizeが仮想main sizeより小さいitem

> **3. Calculate initial free space**. Sum the outer sizes of all items on the line, and subtract this from the flex container’s inner main size. For frozen items, use their outer target main size; for other items, use their outer flex base size.

**3. 余白スペースの初期値を計算する。** 行上のすべてのitemsのouter sizesを合計して、これをflex containerのinner main sizeから引く。固定したitemsについては、それらのouter target main sizeを使用する。それ以外のitemsには、それらのouter flex base sizeを使用する。

> **4.** Loop:
> a. Check for flexible items. If all the flex items on the line are frozen, free space has been distributed; exit this loop.
> b. Calculate the remaining free space as for initial free space, above. If the sum of the unfrozen flex items’ flex factors is less than one, multiply the initial free space by this sum. If the magnitude of this value is less than the magnitude of the remaining free space, use this as the remaining free space.
> c. Distribute free space proportional to the flex factors.
> **If the remaining free space is zero**
> Do nothing.
> **If using the flex grow factor**
> Find the ratio of the item’s flex grow factor to the sum of the flex grow factors of all unfrozen items on the line. Set the item’s target main size to its flex base size plus a fraction of the remaining free space proportional to the ratio.
> **If using the flex shrink factor**
> For every unfrozen item on the line, multiply its flex shrink factor by its inner flex base size, and note this as its scaled flex shrink factor. Find the ratio of the item’s scaled flex shrink factor to the sum of the scaled flex shrink factors of all unfrozen items on the line. Set the item’s target main size to its flex base size minus a fraction of the absolute value of the remaining free space proportional to the ratio. Note this may result in a negative inner main size; it will be corrected in the next step.
> **Otherwise**
> Do nothing.
> d. **Fix min/max violations**. Clamp each non-frozen item’s target main size by its used min and max main sizes and floor its content-box size at zero. If the item’s target main size was made smaller by this, it’s a max violation. If the item’s target main size was made larger by this, it’s a min violation.
> e. **Freeze over-flexed items.** The total violation is the sum of the adjustments from the previous step ∑(clamped size - unclamped size). If the total violation is:
> **Zero**
> Freeze all items.
> **Positive**
> Freeze all the items with min violations.
> **Negative**
> Freeze all the items with max violations.
> f. Return to the start of this loop.

**4.** Loop:

a. **flexible itemsを確認する**。もし行上のすべてのflex itemsが固定であるなら、余白スペースは配分されている。ループを終了する。
b. 上述の余白スペースの初期処理と同じように**残りの余白スペースを計算する**。もし固定化されていないflex itemsのflex factorsの合計が1よりも低い場合、この合計値で初期の余白スペースを乗算する。もしこの値の大きさが残りの余白スペースの大きさよりも小さい場合、この値を残り余白スペースとして使用する。
c. **flex factorsに応じて余白スペースの配分する。**
  * 残りの余白スペースがゼロだったら
  何もしない
  * flex grow factorを使用している場合
  行上のすべての固定化されていないitemsのflex grow factorsの合計に対する、そのitemのflex grow factorの割合を調べる。itemのtarget main sizeをflex base sizeに、その割合に比例した残り余白スペースの割合をプラスした値に設定する。
  * flex shrink factorを使用している場合
  行上のすべての固定化されていないitemに対して、itemのflex shrink factorにそのinner flex base sizeを乗算して、この値をscaled flex shrink factorとしてメモする。行上のすべての固定化されていないitemのflex shrink factorの合計に対する、itemのscaled flex shrink factorの割合を調べる。itemのtarget main sizeに、flex base size にその割合に比例した残り余白スペースの絶対値の割合をマイナスした値を設定する。これは次のステップで修正される。
  * その他の場合
  何もしない
d. **min/max違反を修正する。**各固定されていないitemのtarget main sizeをmin/max main sizeの使用値内に収め、content-boxのサイズを0に切り捨てる。もしitemのtarget main sizeがこれによって小さくなる場合は、max違反となる。もしitemのtarget main sizeがこれより大きくなる場合は、それはmin違反となる。
e. **over-flexed itemを固定する**違反の総計は、先のステップからの調整値の合計（∑(clamped size - unclamped size)）になる。もし違反の総計が
  * ゼロの場合、すべて固定にする
  * 正の場合、min違反にて、すべてのitemを固定する
  * 負の場合、max違反にて、すべてのitemを固定する
f. このループの最初に戻る

> **5.** Set each item’s used main size to its target main size.

各itemのmain sizeの使用値を、itemのtarget main sizeに設定する

### 9.8. Definite and Indefinite Sizes

> Although CSS Sizing [[CSS-SIZING-3](https://www.w3.org/TR/css-flexbox-1/#biblio-css-sizing-3)] defines definite and indefinite lengths, Flexbox has several additional cases where a length can be considered definite:
>
> 1. If a single-line flex container has a definite cross size, the outer cross size of any stretched flex items is the flex container’s inner cross size (clamped to the flex item’s min and max cross size) and is considered definite.
> 2. If the flex container has a definite main size, a flex item’s post-flexing main size is treated as definite, even though it can rely on the indefinite sizes of any flex items in the same line.
> 3. Once the cross size of a flex line has been determined, items in auto-sized flex containers are also considered definite for the purpose of layout; see [step 11](https://www.w3.org/TR/css-flexbox-1/#algo-stretch).
>
> **Note:** The main size of a fully inflexible item with a definite flex basis is, by definition, definite.

CSS Sizing [[CSS-SIZING-3](https://www.w3.org/TR/css-flexbox-1/#biblio-css-sizing-3)] が[明確](https://www.w3.org/TR/css-sizing-3/#definite)・[不明確](https://www.w3.org/TR/css-sizing-3/#indefinite)な長さについて定義しているが、flexboxでも長さが明確であると見なされる追加のケースがある。

1. もし単一行のflex containerが明確なcross sizeを持っている場合、伸長したflex itemsのouter cross sizeはflex containerのinner cross size（flex itemのmin/max cross sizeに収まる）となり、明確であると見なされる。
2. もしflex containerが明確なmain sizeを持っている場合、たとえそれが同じ行にあるflex itemの不明確なサイズに依存していても、flex itemのpost-flexing main sizeは明確なサイズとして扱われる。
3. ひとたびflex lineのcross sizeが決定されたら、auto-sized flex containers内のitemsはレイアウト目的で明確なサイズと見なされる。[step 11](https://www.w3.org/TR/css-flexbox-1/#algo-stretch)参照。

**注** 不明確なflex basisを持つ完全にinflexibleなitemのmain sizeは、定義により、明確なサイズとなる。

### 9.9. Intrinsic Sizes
> The [intrinsic sizing](https://www.w3.org/TR/css-sizing-3/#intrinsic-sizing) of a flex container is used to produce various types of content-based automatic sizing, such as shrink-to-fit logical widths (which use the fit-content formula) and content-based logical heights (which use the max-content size).
>
> See [[CSS-SIZING-3]](https://www.w3.org/TR/css-flexbox-1/#biblio-css-sizing-3) for a definition of the terms in this section.

flex cotainerの[intrinsic sizing](https://www.w3.org/TR/css-sizing-3/#intrinsic-sizing)は、shrink-to-fit logical width （これはfit-contentの式で使う）やcontent-based logical height（max-contentサイズで使う）などのように、様々なタイプのcontent-based自動サイズを生成するために使われる。

このセクションの用語の定義については[[CSS-SIZING-3]](https://www.w3.org/TR/css-flexbox-1/#biblio-css-sizing-3)を参照。

#### 9.9.1. Flex Container Intrinsic Main Sizes

> The max-content main size of a flex container is the smallest size the flex container can take while maintaining the max-content contributions of its flex items, insofar as allowed by the items’ own flexibility:

flex containerのmax-contentのmain sizeは、flex itemsのmax-contentの配分を維持しながら、flex containerが取りうる最小サイズになる。

> 1. For each flex item, subtract its outer flex base size from its max-content contribution size. If that result is positive, divide by its flex grow factor floored at 1; if negative, divide by its scaled flex shrink factor having floored the flex shrink factor at 1. This is the item’s max-content flex fraction.
> 2. Place all flex items into lines of infinite length.
> 3. Within each line, find the largest max-content flex fraction among all the flex items. Add each item’s flex base size to the product of its flex grow factor (or scaled flex shrink factor, if the chosen max-content flex fraction was negative) and the chosen max-content flex fraction, then clamp that result by the max main size floored by the min main size.
> 4. The flex container’s max-content size is the largest sum of the afore-calculated sizes of all items within a single line.

1. 各flex itemについて、そのmax-content配分サイズから、outer flex base sizeを引く。もし結果が正であれば、flex grow factorを1で切り捨てた値で除算する。もし結果が負であれば、flex shrink factorを1で切り捨てた、スケールされたflex shrink factorで除算する。これはitemのmax-content flex fractionになる。
2. すべてのflex itemsを不定の長さの行に配置する。
3. 各行の中で、flex itemsの中で一番大きいmax-content flex fractionを探す。各itemのflex base sizeにflex grow factor（もしくはもし選択したmax-content flex fractionが負の場合、スケールされたflex factor）と選択したmax-content flex fractionとの積を追加して、min main sizeで切り捨てられたmax main sizeによって結果を制限する。
4. flex containerのmax-content sizeは、単一行内のすべてのitemsの先に計算したサイズの合計の一番大きな値になる。

> The min-content main size of a single-line flex container is calculated identically to the max-content main size, except that the flex item’s min-content contribution is used instead of its max-content contribution. However, for a multi-line container, it is simply the largest min-content contribution of all the flex items in the flex container.

単一行のflex containerのmin-content sizeは、flex itemのmin-contentの配分が、そのmax-contentの配分の代わりにつかわれている場合は除いて、max-content main sizeと同じように計算される。しかしながら、複数行のcontainerに対しては、単にflex container内のすべてのflex itemsのmin-contentの配分のうち、一番大きな値になる。

> **Implications of this algorithm when the sum of flex is less than 1**
> The above algorithm is designed to give the correct behavior for two cases in particular, and make the flex container’s size continuous as you transition between the two:
>
> 1. If all items are inflexible, the flex container is sized to the sum of their flex base size. (An inflexible flex base size basically substitutes for a width/height, which, when specified, is what a max-content contribution is based on in Block Layout.)
>
> 2. When all items are flexible with flex factors ≥ 1, the flex container is sized to the sum of the max-content contributions of its items (or perhaps a slightly larger size, so that every flex item is at least the size of its max-content contribution, but also has the correct ratio of its size to the size of the other items, as determined by its flexibility).
>
> For example, if a flex container has a single flex item with flex-basis: 100px; but a max-content size of 200px, then when the item is flex-grow: 0, the flex container (and flex item) is 100px wide, but when the item is flex-grow: 1 or higher, the flex container (and flex item) is 200px wide.
>
> There are several possible ways to make the overall behavior continuous between these two cases, particularly when the sum of flexibilities on a line is between 0 and 1, but all of them have drawbacks. We chose one we feel has the least bad implications; unfortunately, it "double-applies" the flexibility when the sum of the flexibilities is less than 1. In the above example, if the item has flex-grow: .5, then the flex container ends up 150px wide, but the item then sizes normally into that available space, ending up 125px wide.

**flexの合計が1未満の場合のアルゴリズムの実装**
上述のアルゴリズムは特に2つのケースに対して正しい振る舞いを与えるために設計されており、flex containerのサイズを2つのケース間で連続的な移行を可能にする。

1. すべてのitemsが柔軟ではない場合、flex containerはflex base sizeの合計値になる。（inflexibleなflex base sizeは基本的にwidth/height、つまり指定されるとmax-contentの配分がブロックレイアウトにおいて基本になるもの、の代わりに使用される。）
2. すべてのitemsが柔軟であり、flex factorsが1以上の場合、flex containerはそのitemsのmax-contentの配分の合計になる（もしくはどのflex itemも少なくともmax-contentの配分のサイズになるだけはなく、その柔軟性によって決定されるように、itemのサイズと他のitemのサイズの比率が正しくあるためにおそらく少しだけ大きなサイズになる）。

たどえば、もしflex containerが`flex-basis: 100px`を持ち、200pxのmax-contentサイズを持つ単一のflex itemを持つ場合、itemが`flex-grow: 0`なら、flex container（とflex item）は100pxの幅になる。しかしitemが`flex-grow: 1`もしくはそれ以上の場合、flex container（とflex item）は200pxの幅になる。

これらの二つのケースの間の全体の振る舞いを継続的にするためにはいくつかの方法があり、特に行上のflexibilitiesの合計が0から1の間の場合あるが、それらの全てについて欠点がある。私たちはそのうち一番悪くない実装であると感じるものを選んだ。残念ながら、、それはflexibilitiesの合計が1より小さい場合、flexibilitiesを「重複適用」する。上記の例では、もしitemが`flex-grow: .5`の場合、flex containerは150pxの幅になるが、itemは通常利用可能なスペースに収まるので、itemの幅は125pxになる。

### 9.9.2. Flex Container Intrinsic Cross Sizes

> The min-content/max-content cross size of a single-line flex container is the largest min-content contribution/max-content contribution (respectively) of its flex items.

単一行flex containerのmin-content/max-contentのcross sizeは、flex itemsの（それぞれの）min-contentの配分/max-contentの配分になる。

> For a multi-line flex container, the min-content/max-content cross size is the sum of the flex line cross sizes resulting from sizing the flex container under a cross-axis min-content constraint/max-content constraint (respectively). However, if the flex container is flex-flow: column wrap;, then it’s sized by first finding the largest min-content/max-content cross-size contribution among the flex items (respectively), then using that size as the available space in the cross axis for each of the flex items during layout.

複数行のflex containerでは、min-content/max-content cross sizeは（それぞれの）cross-axis min-content制約/max-content制約の下、flex containerをサイズ設定することによって得られるflex行のcross sizeの合計になる。しかしながら、もしflex containerが`flex-flow: column wrap;` である場合、最初に（それぞれの）flex itemsの中のmin-content/max-contentのcross-sizeの配分の大きい値を見つけてサイズを設定し、そのサイズをレイアウト中にそれぞれのflex itemsに対してcross sizeの余白スペースとして利用する。

> **Note:** This heuristic for column wrap flex containers gives a reasonable approximation of the size that the flex container should be, with each flex item ending up as min(item’s own max-content, maximum min-content among all items), and each flex line no larger than its largest flex item. It’s not a perfect fit in some cases, but doing it completely correct is insanely expensive, and this works reasonably well.

`column wrap`のflex containerについてのヒューリスティックは、各flex itemが最小（item自身のmax-content, 全itemの中の最大min-content）であり、各flex行が最も大きいflex itemよりも大きくないようなflex containerになるようにサイズの妥当な概算を提供する。それはいくつかのケースでは完全には適合しないかもしれないが、完全に正しく行うことは非常に高コストであり、この方法が良い感じに機能する。

### 9.9.3. Flex Item Intrinsic Size Contributions
> The main-size min-content contribution of a flex item is the larger of its outer min-content size and outer [preferred size](https://www.w3.org/TR/css-sizing-3/#preferred-size-properties) (its width/height as appropriate) if that is not auto, clamped by its flex base size as a maximum (if it is not growable) and/or as a minimum (if it is not shrinkable), and then further clamped by its min/max main size.

flex itemのmain-size min-contentの配分は、autoでない場合、outer min-content sizeとouter [preferred size](https://www.w3.org/TR/css-sizing-3/#preferred-size-properties)（必要に応じてwidthやheight）の大きい方になり、flex base sizeを最大値（growableの場合）and/or最小値（shrinkableの場合）として制限し、それからmin/max main sizeによってさらに制限される。

> The main-size max-content contribution of a flex item is the larger of its outer max-content size and outer preferred size (its width/height as appropriate) clamped by its flex base size as a maximum (if it is not growable) and/or as a minimum (if it is not shrinkable), and then further clamped by its min/max main size.

flex itemのmain-size max-contentの配分は、outer max-content sizeとouter preferred size（必要に応じてwidthやheight）の大きい方になり、flex base sizeを最大値（growableの場合）and/or最小値（shrinkableの場合）として制限し、それからmin/max main sizeによってさらに制限される。
