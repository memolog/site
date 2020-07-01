---
title: The flex Shorthand
featured:
  image: steve-douglas-80Pr_AfC71Y-unsplash
  author: Steve Douglas
  authorLink: https://unsplash.com/@sldoug?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2020-06-30 14:09:49
---
今回は[7. Flexibility](https://www.w3.org/TR/css-flexbox-1/#flexibility)について。<!-- more -->

> The defining aspect of flex layout is the ability to make the flex items “flex”, altering their width/height to fill the available space in the main dimension. This is done with the flex property. A flex container distributes free space to its items (proportional to their flex grow factor) to fill the container, or shrinks them (proportional to their flex shrink factor) to prevent overflow.

> A flex item is fully inflexible if both its flex-grow and flex-shrink values are zero, and flexible otherwise.

flexレイアウトの特徴はflex itemsを「柔軟(flex)」にすることで、横幅・縦幅をmain dimensionの余白を埋めるように変更することである。これはflexプロパティによってなされる。flex containerはcontainerを満たすため余白部分をitemsに（flex grow factorに応じて）配分するか、オーバーフローしないように（flex shrink factorに応じて）itemsを収縮する。

flex item は、もし`flex-grow`と`flex-shrink`が両方とも0である場合は完全に柔軟ではなくなる。それ以外の場合は柔軟になる。

### 7.1. The flex Shorthand
|key|value|
--|--
|Name|flex|
|Value|none &#124; [ &lt;‘flex-grow’&gt; &lt;‘flex-shrink’&gt;? &#124;&#124; &lt;‘flex-basis’&gt; ]|
|Initial|0 1 auto|
|Applies to|flex items|
|Inherited|no|
|Percentages|see individual properties|
|Computed value|see individual properties|
|Animation type|by computed value type|
|Canonical order|per grammar|

Valueの`none | [ <‘flex-grow’> <‘flex-shrink’>? || <‘flex-basis’> ]`の部分はつまり、`[ none ] | [ [ <‘flex-grow’> <‘flex-shrink’>? ] || [ <‘flex-basis’> ] ]`と同じ内容になる。すなわち、`none`か、または、`flex-grow`、`flex-shrink`、`flex-basis`の3つのうち一つが記述される必要がある。`flex-grow`と`flex-shrink`の記述順は固定で、`flex-shrink`を書く場合は必ず`flex-grow`が必要になる。一方、`flex-shrink`は省略可能。また、`flex-grow`と`flex-shrink`の二つと、`flex-basis`の記述は順不同で書ける。

なので、以下の順番で書くことができる。
* `flex-grow`
* `flex-grow flex-shrink`
* `flex-grow flex-shrink flex-basis`
* `flex-grow flex-basis`
* `flex-basis flex-grow flex-shrink`
* `flex-basis flex-grow`
* `flex-basis`

なお、`flex: 0` みたいに単位表記なしの0を使うと、flex-basisではなくflex-growの値として扱われる。値がflex-basisであることを明確にするためには、`flex: 0px`とか `flex: 1 1 0`みたいに記述する必要がある。

> The flex property specifies the components of a flexible length: the flex factors (grow and shrink) and the flex basis. When a box is a flex item, flex is consulted instead of the main size property to determine the main size of the box. If a box is not a flex item, flex has no effect.

flexプロパティは**flexible length**つまり、**flex factors**（growとshrink）と、flax basisを指定する。boxがflex itemである場合、boxのmain sizeを決定するために、main sizeプロパティの代わりに flexプロパティを参照する。もしboxがflex itemではない場合、flexプロパティは効果を持たない。

> **&lt;‘flex-grow’&gt;**
> This &lt;number&gt; component sets flex-grow longhand and specifies the flex grow factor, which determines how much the flex item will grow relative to the rest of the flex items in the flex container when positive free space is distributed. When omitted, it is set to 1.

`flex-grow`はflex-growロングハンドの値で**flex grow factor**を指定する。これは、正の余白スペースが配分された場合に、flex itemがflex containerの残りのitemsと比べて相対的にどのくらい成長するかを決定する。省略された場合は、`1`になる。

> Flex values between 0 and 1 have a somewhat special behavior: when the sum of the flex values on the line is less than 1, they will take up less than 100% of the free space.

値が0から1の場合、特別な振る舞いをする。行のflex valuesの合計が1より小さい場合、それらは余白部分の100%よりも小さい領域を利用する。

> An item’s flex-grow value is effectively a request for some proportion of the free space, with 1 meaning “100% of the free space”; then if the items on the line are requesting more than 100% in total, the requests are rebalanced to keep the same ratio but use up exactly 100% of it. However, if the items request less than the full amount (such as three items that are each flex-grow: .25) then they’ll each get exactly what they request (25% of the free space to each, with the final 25% left unfilled). See [§9.7 Resolving Flexible Lengths](https://www.w3.org/TR/css-flexbox-1/#resolve-flexible-lengths) for the exact details of how free space is distributed.

itemsの`flex-grow`の値は実質的に余白部分の割り当てに対するリクエストであり、1は「余白の100%」を意味する。もし行にあるitemsが合計100%より多くリクエストしている場合、リクエストは同じ比率をキープしながらバランスを取り直されるが、余白の100%を正確に使い切る。しかしながら、もしitemsが全体の量より小さくリクエストした場合（たとえば、3つのitemsがそれぞれ`flex-grow: .25`をとる場合）、それらはリクエストした分だけの余白を正確に受け取る（それぞれが25%の余白を受け取り、残りの25%はunfilledの状態で残る）。余白がどのように割り当てられるかについて詳細は[§9.7 Resolving Flexible Lengths](https://www.w3.org/TR/css-flexbox-1/#resolve-flexible-lengths)を参照。

> This pattern is required for continuous behavior as flex-grow approaches zero (which means the item wants none of the free space). Without this, a flex-grow: 1 item would take all of the free space; but so would a flex-grow: 0.1 item, and a flex-grow: 0.01 item, etc., until finally the value is small enough to underflow to zero and the item suddenly takes up none of the free space. With this behavior, the item instead gradually takes less of the free space as flex-grow shrinks below 1, smoothly transitioning to taking none of the free space at zero.

このパターンはflex-growがゼロ（つまりitemsが余白のスペースを一切必要としない状態）に近づいていくときに連続した振る舞いをするために必要となる。このパターンがないと、`flex-grow: 1`のitemは余白のスペースの全てを使用し、`flex-grow: 0.1`の場合も同じように全て使用し、`flex-grow: 0.01`の場合も同様になり、最終的に値がゼロへアンダーフロー（下位桁あふれ）するまで同様になり、そしてitemは突然余白スペースを全く使用しなくなる。この振る舞いがあると、itemはflex-growが1未満に縮小するにつれ、余白スペースが徐々に利用されなくなり、値がゼロで余白スペースを一切使わない状態にスムーズに移行される。

> Unless this “partial fill” behavior is specifically what’s desired, authors should stick to values ≥ 1; for example, using 1 and 2 is usually better than using .33 and .67, as they’re more likely to behave as intended if items are added, removed, or line-wrapped.

この「partial fill」という振る舞いが特に望んでいる振る舞いではない限り、制作者は1以上の値を固守すべきである。たとえば、値に1と2を使うことは、.33と.67を利用するより良い。なぜならitemsが追加・削除・行折り返しをした場合に、おそらくより意図した通りに振舞うと思われるからである。

> **&lt;‘flex-shrink’&gt;**
> This &lt;number&gt; component sets flex-shrink longhand and specifies the flex shrink factor, which determines how much the flex item will shrink relative to the rest of the flex items in the flex container when negative free space is distributed. When omitted, it is set to 1.

`flex-shrink`はflex-shrinkロングハンドの値で**flex shrink factor**を指定する。これは、負の余白スペースが配分された場合に、flex itemがflex containerの他のitemsに対して相対的にどの程度縮小するかを決定する。省略された場合、`1`がセットされる。

> **Note:** The flex shrink factor is multiplied by the flex base size when distributing negative space. This distributes negative space in proportion to how much the item is able to shrink, so that e.g. a small item won’t shrink to zero before a larger item has been noticeably reduced.

負のスペースが配分されたとき、flex shrink factorはflex base size によって乗算される。これはitemがどのくらい縮小できるかに応じて負のスペースを配分することになるので、たとえば、大きなitemが著しく減少するまで、小さなitemがゼロに縮小されることはない。

> **&lt;‘flex-basis’&gt;**
> This component sets the flex-basis longhand, which specifies the flex basis: the initial main size of the flex item, before free space is distributed according to the flex factors.
>
> &lt;‘flex-basis’&gt; accepts the same values as the width and height properties (except that auto is treated differently) plus the content keyword:

`flex-basis`はflex-basisロングハンドの値で**flex basis**を指定する。これはflex factorsにしたがって余白スペースが配分される前のflex itemのmain sizeの初期値である。

`flex-basis`はwidthやheightプロパティと同じ値を受け付ける（autoの扱い方は異なる）。さらに`content`キーワードが利用できる。

> **auto**
> When specified on a flex item, the auto keyword retrieves the value of the main size property as the used flex-basis. If that value is itself auto, then the used value is content.

flex itemで指定された場合、`auto`キーワードは使用flex-basisとしてmain sizeプロパティの値を使用する。もしその値もautoであった場合、使用する値は`content`になる

> **content**
> Indicates an automatic size based on the flex item’s content. (It is typically equivalent to the max-content size, but with adjustments to handle aspect ratios, intrinsic sizing constraints, and orthogonal flows; see details in [§9 Flex Layout Algorithm](https://www.w3.org/TR/css-flexbox-1/#layout-algorithm).)

flex itemのコンテンツを基に自動サイズを示す。（それはたいていmax-contentサイズと同じであるが、アスペクト比、intrinsic sizingの制約、直交するフローなどを処理するための調整がなされる。詳細は[§9 Flex Layout Algorithm](https://www.w3.org/TR/css-flexbox-1/#layout-algorithm)を参照）

> Note: This value was not present in the initial release of Flexible Box Layout, and thus some older implementations will not support it. The equivalent effect can be achieved by using auto together with a main size (width or height) of auto.

注意：この値はFlexible Box Layoutの最初のリリースでは存在しなかった。そのため、いくつかの古い実装ではサポートされていないだろう。autoキーワードと、autoのmain size（widthまたはheight）を一緒に使うことによって同等の効果を得ることができる。

> **<‘width’>**
> For all other values, flex-basis is resolved the same way as for width and height.
> When omitted from the flex shorthand, its specified value is 0.

（auto, content以外の）他のすべての値に対して、flex-basisはwidthやheightと同じ方法で解決する。flexショートハンドから値が省略された場合、値は`0`が指定される。

----

> **none**
> The keyword none expands to 0 0 auto.

flexショートハンドに`none`が指定された場合、値は`0 0 auto`として展開される。

つまり`none`の場合、flex itemの初期値はautoで決まり、余白スペースに対して縮小も伸長もしない。

> <img src="https://www.w3.org/TR/css-flexbox-1/images/rel-vs-abs-flex.svg">
>
> **Figure 7** A diagram showing the difference between "absolute" flex (starting from a basis of zero) and "relative" flex (starting from a basis of the item’s content size). The three items have flex factors of 1, 1, and 2, respectively: notice that the item with a flex factor of 2 grows twice as fast as the others.

上の図は「絶対」flex（flex-basisが0）と「相対」flex（flex-basisがauto（コンテンツを基にする））との違いを表している。3つのitemsはそれぞれ1, 1, 2というflex factorsを持っている。2のflex factorを持つitemが他と比べて2倍の速度で成長する。

> The initial values of the flex components are equivalent to flex: 0 1 auto.
>
>**Note:** The initial values of flex-grow and flex-basis are different from their defaults when omitted in the flex shorthand. This is so that the flex shorthand can better accommodate the most common cases.
>
> A unitless zero that is not already preceded by two flex factors must be interpreted as a flex factor. To avoid misinterpretation or invalid declarations, authors must specify a zero <‘flex-basis’> component with a unit or precede it by two flex factors.

flex componentsの初期値は `0 1 auto` になる。

注意：flex-growとflex-basisの初期値は、flexショートハンドで省略された場合のデフォルト値と異なる。これはflexショートハンドが多くのよくあるケースにより良く対応できるようにするためである。

2つのflex factors（glowとshrink）が前にない場合の単位表記なしの`0`はflex factorとして解釈されなければならない。解釈ミスや不正な言言になるのを避けるためには、制作者は`flex-basis`に単位表記（pxとか）を0につけるか、2つのflex factorsを前に指定しなければならない。

#### 7.1.1. Basic Values of flex

> This section is informative.
> The list below summarizes the effects of the four flex values that represent most commonly-desired effects:

以下のリストは、よくある期待される効果を表す4つのflexの値の効果をまとめたものである。

> **flex: initial**
> Equivalent to flex: 0 1 auto. (This is the initial value.) Sizes the item based on the width/height properties. (If the item’s main size property computes to auto, this will size the flex item based on its contents.) Makes the flex item inflexible when there is positive free space, but allows it to shrink to its minimum size when there is insufficient space. The alignment abilities or auto margins can be used to align flex items along the main axis.

`flex: 0 1 auto` と同じ（初期値）。width/heightを基にitemのサイズを変更する。（もしmain sizeプロパティがautoとなる場合、flex itemはコンテンツをベースに計算される。）flex itemは正の余白スペースがあれば柔軟性がなくなり、十分なスペースがない場合、itemの最小サイズまで縮小する。alignmentまたはauto marginsを使って、main axisに沿ってflex itemsを揃えることができる。

> **flex: auto**
> Equivalent to flex: 1 1 auto. Sizes the item based on the width/height properties, but makes them fully flexible, so that they absorb any free space along the main axis. If all items are either flex: auto, flex: initial, or flex: none, any positive free space after the items have been sized will be distributed evenly to the items with flex: auto.

`flex: 1 1 auto`と同じ。width/heightを基にitemのサイズを変更するが、itemは完全に柔軟であり、main axisに沿って余白スペースを吸収する。もしすべてのitemsが`flex:auto`,`flex:initial`,`flex:none` のいずれかの場合、itemsのサイズ変更後のどの正の余白スペースも、`flex:auto`がついているitemsに均等に配分される。

> **flex: none**
> Equivalent to flex: 0 0 auto. This value sizes the item according to the width/height properties, but makes the flex item fully inflexible. This is similar to initial, except that flex items are not allowed to shrink, even in overflow situations.

`flex: 0 0 auto`と同じ。この値では、width/heightにしたがってitemのサイズを変更するが、itemは柔軟性がない。`initlal`と似ているが、flex itemsがオーバーフローするような状況でも縮小するのを許可しない。

> **flex: &lt;positive-number&gt;**
> Equivalent to flex: &lt;positive-number&gt; 1 0. Makes the flex item flexible and sets the flex basis to zero, resulting in an item that receives the specified proportion of the free space in the flex container. If all items in the flex container use this pattern, their sizes will be proportional to the specified flex factor.

`flex: <positive-number> 1 0`と同じ。itemは柔軟になり、flex basisは0にセットされ、itemはflex containerの余白スペースの指定した割合を受け取る。もしflex container内の全てのitemsがこのパターンを使っている場合、それらのサイズは指定されたflex factorに比例する。

> By default, flex items won’t shrink below their minimum content size (the length of the longest word or fixed-size element). To change this, set the min-width or min-height property. (See [§4.5 Automatic Minimum Size of Flex Items.](https://www.w3.org/TR/css-flexbox-1/#min-size-auto))

デフォルトでは、flex itemsはminimum content size（一番長い単語の長さか、固定サイズの要素）よりも縮小しない。この動作を変更するには、min-widthかmin-heightを設定する。（ [§4.5 Automatic Minimum Size of Flex Items.](https://www.w3.org/TR/css-flexbox-1/#min-size-auto)参照）
