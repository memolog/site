---
title: The display value property (outside / inside)
featured:
  image: pawel-czerwinski-31xVIgIXbws-unsplash
  author: Paweł Czerwiński
  authorLink: https://unsplash.com/@pawel_czerwinski?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2020-03-07 17:25:00
---
[Inner and outer display types](https://memolog.org/2020/inner-and-outer-display-type.html)の続き。[2. Box Layout Modes: the display property](https://www.w3.org/TR/css-display-3/#the-display-properties)からdisplayプロパティのvalueについて確認していく。<!-- more -->

displayプロパティのvalueは以下のように定義されている。

> [ &lt;display-outside&gt; || &lt;display-inside&gt; ] | &lt;display-listitem&gt; | &lt;display-internal&gt; | &lt;display-box&gt; | &lt;display-legacy&gt;

つまり、上記のキーワードのどれか一つを値として使う。もしくは`<display-outside>`と`<display-inside>`を組み合わせて指定する。仕様では各キーワードを章立てて説明されているので、それに沿って確認する。

### display-outside
> &lt;display-outside&gt;  = block | inline | run-in

なので、display-outsideには、blockかinline, run-inのキーワードが入る。

> The <display-outside> keywords specify the element’s outer display type, which is essentially its principal box’s role in flow layout. They are defined as follows:

> * ***block***
The element generates a box that is block-level when placed in flow layout. [CSS2]
> * ***inline***
The element generates a box that is inline-level when placed in flow layout. [CSS2]
> * ***run-in***
The element generates an run-in box, which is a type of inline-level box with special behavior that attempts to merge it into a subsequent block container. See § 3 Run-In Layout for details.

`<display-outsite>`は**outer display type**を設定するためのキーワード。outer display typeは、principal box（要素ごとに生成されるbox）が**flow layout**上でどのように振舞うかを決める。flow layoutは左から右（書き文字によって方向は異なる）、上から下というコンテンツの流れに沿って配置すること。そのレイアウト。値は`block`、`inline`、`run-in`の3つ。`block`ならブロック要素のように配置され、`inline`ならインライン要素のように配置される。

`run-in`（追い込み）は後続のblock containerにインラインboxとして挿入されるという特殊な振る舞いをするらしいが、最新のブラウザではサポートしなくなっているので（[Can I use display:run-in](https://caniuse.com/#feat=run-in)）、とりたてて扱わない。

> If a <display-outside> value is specified but <display-inside> is omitted, the element’s inner display type defaults to flow.

`<display-outside>`は指定されているが、`<display-inside>`は省略されている場合、その要素のinner display typeは`flow`として扱われる。

### display-inside
> &lt;display-inside&gt;   = flow | flow-root | table | flex | grid |

> The <display-inside> keywords specify the element’s inner display type, which defines the type of formatting context that lays out its contents (assuming it is a non-replaced element). They are defined as follows:

`<display-inside>`は**inner display type**を設定するためのキーワード。inner display typeは、formatting contextを定義し、子孫boxがどのように配置されるかを決める。

> **flow**
The element lays out its contents using flow layout (block-and-inline layout).
If its outer display type is inline or run-in, and it is participating in a block or inline formatting context, then it generates an inline box.

> Otherwise it generates a block container box.

> Depending on the value of other properties (such as position, float, or overflow) and whether it is itself participating in a block or inline formatting context, it either establishes a new block formatting context for its contents or integrates its contents into its parent formatting context. See CSS2.1 Chapter 9. [CSS2] A block container that establishes a new block formatting context is considered to have a used inner display type of flow-root.

`flow`では、flow layoutにしたがってコンテンツを配置する。もしouter display typeが`inline`か`run-in`で、blockかinline formatting contextに含まれているなら、inline boxを生成する。

それ以外では、block container box を生成する。

他のプロパティ（position, float, overflowなど）の値や所属しているblock or inline formatting contextによって、新しいblock formatting contextを生成したり、親のformatting contextに加わったりする。新しいblock formatting contextを生成するblock containerは、inner display typeに`flow-root`を使用しているとみなされる。

つまり、文脈に応じて適切なformatting contextに参加するみたいな感じ。

> **flow-root**
> The element generates a block container box, and lays out its contents using flow layout. It always establishes a new block formatting context for its contents. [CSS2]

`flow-root`はblock container boxを生成して、flow layoutに沿ってコンテンツを配置する。常に新しいblock formatting contextを生成する。

flow-rootは最新のブラウザではサポートされている（[Can I use display:flow-root](https://caniuse.com/#feat=flow-root)）。Can I useには以下のように書かれており、

> It provides a better solution to the most use cases of the "clearfix" hack.

（明示的に新しいblock formatting contextを生成するので）、いわゆる`clearfix hack`（floatなどの回り込みを止めるためのハック）のより良い解決策を提供すると書かれてある。

> **table**
> The element generates a principal table wrapper box that establishes a block formatting context, and which contains an additionally-generated table grid box that establishes a table formatting context. [CSS2]
> **flex**
> The element generates a principal flex container box and establishes a flex formatting context. [CSS3-FLEXBOX]
> **grid**
The element generates a principal grid container box, and establishes a grid formatting context. [CSS3-GRID-LAYOUT]
> **ruby**
> The element generates a ruby container box and establishes a ruby formatting context in addition to integrating its base-level contents into its parent formatting context (if it is inline) or generating a wrapper box of the appropriate outer display type (if it is not). [CSS3RUBY]

`table`、`flex`、`grid`、`ruby`は、それぞれそれ用のformatting contextを生成する。詳細には今回は触れない。

> If a <display-inside> value is specified but <display-outside> is omitted, the element’s outer display type defaults to block—except for ruby, which defaults to inline.

`<display-inside>`が指定されていて、`<display-outside>`が省略されている場合、outer display typeは`block`になる。`ruby`の場合だけ`inline`となる。

----

と、ここまで書いて力尽きてきたので、今日はここまで。
