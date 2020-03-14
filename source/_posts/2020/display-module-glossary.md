---
title: Display module glossary
featured:
  image: francesco-ungaro-JHypHcOObf4-unsplash
  author: Francesco Ungaro
  authorLink: https://unsplash.com/@francesco_ungaro?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2020-03-14 19:02:28
---
今回はDisplay Moduleの[Appendix A: Glossary](https://www.w3.org/TR/css-display-3/#glossary)のところで、今までちゃんと確認しなかったもので、気になるところを簡単に確認しようかなと思う。そのうち見直すかも。<!-- more -->

### block container
> A block container either contains only inline-level boxes participating in an inline formatting context, or contains only block-level boxes participating in a block formatting context (possibly generating anonymous block boxes to ensure this constraint, as defined in CSS2§9.2.1.1).

block containerは、inline formatting contextに参加するインラインレベルのboxだけを含むか、block formatting contextに参加するブロックレベルのboxのみを含んでいる（この制約を保証するためにanonymous boxを生成する可能性がある）。

> A block container that contains only inline-level content establishes a new inline formatting context. The element then also generates a root inline box which wraps all of its inline content.
> **Note**, this root inline box concept effectively replaces the "anonymous inline element" concept introduced in CSS2§9.2.2.1.

インラインレベルのコンテンツのみを含むblock containerは、新しいinline formatting contextを設置する。その要素はインラインのコンテンツをすべて囲うようなroot inline boxもまた設置する。

このroot inline boxのコンセプトは、「anonymous inline element」のコンセプトを実質的に置き換えるものである。

> A block container establishes a new block formatting context if its parent formatting context is not a block formatting context; otherwise, when participating in a block formatting context itself, it either establishes a new block formatting context for its contents or continues the one in which it participates, as determined by the constraints of other properties (such as overflow or align-content).

block containerは、親のformatting contextがblock formatting contextではない場合、新しいblock formatting contextを設置する。そうでない場合、block formatting context自身に参加するときに、（overflowやalign-contentなどのような）他のプロパティの制約を基にして、自身のコンテンツのための新しいblock formatting contextを設置するか、参加してるcontextを継続する。

> **Note**: A block container box can both establish a block formatting context and an inline formatting context simultaneously.

block container boxは、block formatting contextとinline formatting contextを同時に設置することもできる。

### block box
> A block-level box that is also a block container.
> **Note**: Not all block container boxes are block-level boxes: non-replaced inline blocks and non-replaced table cells, for example, are block containers but not block-level boxes. Similarly, not all block-level boxes are block containers: block-level replaced elements (display: block) and flex containers (display: flex), for example, are not block containers.

block containerでもあるブロックレベルのbox。

すべてのblock container boxがブロックレベルのboxというわけではない。たとえば、非置換のインラインブロックや、非置換のテーブルセルは、block containerであるけど、ブロックレベルのboxではない。同様に、すべてのブロックレベルのboxがblock containerというわけではない。たとえば、ブロックレベルの置換要素（`display: block`）やflex container（`display: flex`）はblock containerではない。

### containing block
> A rectangle that forms the basis of sizing and positioning for the boxes associated with it (usually the children of the box that generated it). Notably, a containing block is not a box (it is a rectangle), however it is often derived from the dimensions of a box. If properties of a containing block are referenced, they reference the values on the box that generated the containing block. (For the initial containing block, values are taken from the root element unless otherwise specified.) See [CSS2] Section 9.1.2 and Section 10.1 for details.

関連するbox（たいてい生成したboxの子）のために、縦横幅やポジションなどの基本的な値な形成する長方形（rectangle）。containing blockはboxではない（it is a rectangle）。けれども、しばしばrectangleはboxの寸法から導き出される。もしcontaining blockのプロパティが参照される場合、それらはcontaining blockを生成したboxの値を参照する。（特に指定がなければinitial containing blockでは、値はルートの要素から導かれる。）

### initial containing block
> The containing block of the root element. See CSS2.1§10.1 for continuous media; and [CSS3PAGE] for paged media.

ルート要素のcontaining block

### out-of-flow / in-flow
> A box is out-of-flow if it is floated (via float) or absolutely-positioned (via position). A box is in-flow if it is not out-of-flow.

boxがfloatしている、またはpositionによって絶対配置されている場合、boxはout-of-flowの状態にある。boxがout-of-flowでなければboxがin-flowの状態になる。

> **Note**: some formatting contexts inhibit floating, so that an element with float: left is not necessarily out-of-flow.

いくつかのformatting contextはfloatingを抑制する。そのため`float: left`のついた要素が必ずout-of-flowになるわけではない。

### independent formatting context
> When a あ establishes an independent formatting context (whether that formatting context is of the same type as its parent or not), it essentially creates a new, independent layout environment: except through the sizing of the box itself, the layout of its descendants is (generally) not affected by the the rules and contents of the formatting context outside the box, and vice versa.

boxが（formatting contextは親と同じタイプかどうかに関係なく）independent formatting contextを設置するとき、新しい、独立したレイアウト環境を作成する。box自身のサイズを除いて、その子孫のレイアウトは（一般的に）boxの外側のformatting contextのルールやコンテンツによって影響を受けない。反対も同じ。

> **EXAMPLE 4**
> For example, in a block formatting context, floated boxes affect the layout of surrounding boxes. But their effects do not escape their formatting context: the box establishing their formatting context grows to fully contain them, and floats from outside that box are not allowed to protrude into and affect the contents inside the box.

たとえば、block formatting contextの中で、floated boxesは周囲のboxのレイアウトに影響を与える。しかし、それらの効果は、それらのformatting contextからは逃れられない。それらのformatting contextを生成したboxは、それらが完全に含まれるように大きくなり、外側からfloatする。外側のboxは、boxの内側のコンテンツに影響を与えたりはみ出させたりすることは許されない。

> **EXAMPLE 5**
> As another example, margins do not collapse across formatting context boundaries.

別の例としては、マージンはformatting contextの境界を越えて折りたたまれない。

> Exclusions are able to affect content across independent formatting context boundaries. (At time of writing, they are the only layout feature that can.) [CSS3-EXCLUSIONS]

Exclusionsは、formatting contextを越えてコンテンツに影響を与えることができる（執筆時点では、exclusionsはそのようなことができる唯一のレイアウトである）。

> Certain properties can force a box to establish an independent formatting context in cases where it wouldn’t ordinarily. For example, making a box out-of-flow causes it to blockify as well as to establish an independent formatting context. As another example, certain values of the contain property can cause a box to establish an independent formatting context. Turning a block into a scroll container will cause it to establish an independent formatting context; however turning a subgrid into a scroll container will not—it continues to act as a subgrid, with its contents participating in the layout of its parent grid container.

特定のプロパティは、通常ではないケースにおいて、boxにindependent formatting contextを設置することを強制できる。たとえば、boxをout-of-flowにすると、boxのブロック化とindependent formatting contextの確率を引き起こす。別の例としては、特定のプロパティの特定の値は、boxにindependent formatting contextを設置させることができる。ブロックをscroll containerにすることでindependent formatting contextを設置するだろう。しかしながら、subgridをscroll containerにしてもそうはならない。subgridとして引き続き機能して、親のgrid containerのレイアウトにコンテンツに参加し続ける。

> A block box that establishes an independent formatting context establishes a new block formatting context for its contents. In most other cases, forcing a box to establish an independent formatting context is a no-op—either the box already establishes an independent formatting context (e.g. flex containers), or it’s not possible to establish a totally independent new formatting context on that type of box (e.g. non-replaced inline boxes).

independent formatting contextを設置したブロックはそのコンテンツのための新しいblock formatting contextを設置する。他のほとんどの場合、boxはindependent formatting contextを設置することを強制しても何も処理されない（no-op）。そのboxは（flex containerのように）すでにindependent formatting contextを確立しているか、（非置換インラインboxのような）box上でindependentな新しいformatting contextを確立できない。
