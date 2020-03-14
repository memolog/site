---
title: Inner and outer display types
featured:
  image: fotografierende-HMGNL811SQE-unsplash
  author:  fotografierende
  authorLink: https://unsplash.com/@fotografierende?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2020-02-18 06:25:00
---
前回の[CSS Display Module Introduction](https://memolog.org/2020/css-display-module-introduction.html)に引き続き、CSS Display Module Level 3の[2. Box Layout Modes: the display property](https://www.w3.org/TR/css-display-3/#the-display-properties)冒頭部分についてのメモ。内容を見直して、変だなと思うところは随時修正してる。<!-- more -->

最初にIntroductionからの抜粋。
> Each **box** in the box tree represents its corresponding element (or pseudo-element) in space and/or time on the canvas, while each **text run** in the box tree likewise represents the contents of its corresponding text nodes.

box treeにおいて、boxは、スクリーン上で要素を時間的・空間的に表現する。text runはtext nodesの内容を表現する。

> Then, for each element, CSS generates zero or more boxes as specified by that element’s display property. Typically, an element generates a single box, the [principal box](https://drafts.csswg.org/css-display/#principal-box), which represents itself and contains its contents in the box tree.

CSSは、各要素に対して、displayプロパティに応じて0個以上のboxを生成する。通常は、一つの要素につき、一つのboxを生成する。そのboxは**principal box**と呼ばれ、box自身と内包するコンテンツをbox tree内に表現する。

抜粋ここまで。

----

> The display property defines an element’s display type, which consists of the two basic qualities of how an element generates boxes:

> * the **inner display type**, which defines (if it is a [non-replaced element](https://www.w3.org/TR/css-display-3/#replaced-element)) the kind of [formatting context](https://www.w3.org/TR/css-display-3/#formatting-context) it generates, dictating how its descendant boxes are laid out. (The inner display of a replaced element is outside the scope of CSS.)

> * the **outer display type**, which dictates how the principal box itself participates in [flow layout](https://www.w3.org/TR/css-display-3/#flow-layout).

displayプロパティには**inner display type**と**outer display type**という二つの基本的な性質を持つ。inner display typeは（それが置換要素ではない場合（**non-replaced element**））**formatting context**について定義し、子孫となるboxがどのように配置されるかを決める。

outer display typeは**principal box**（要素ごとに生成されたbox）自身がどのようにflow layoutに参加するかを決める。

> Text runs have no display type.

text run（box treeにおいて、対応するtext nodeの内容を表現する）はdisplay typeを持たない。

> Some display values have additional side-effects: such as list-item, which also generates a ::marker pseudo-element, and none, which causes the element’s entire subtree to be left out of the box tree.

displayの値によっては副次的な効果があるものもある。list-itemは`::marker`擬似要素を生成する。noneの場合は要素のsubtree全体をbox treeから取り除く。

> The display property has no effect on an element’s semantics: these are defined by the document language and are not affected by CSS. Aside from the none value, which also affects the aural/speech output [[CSS-SPEECH-1](https://www.w3.org/TR/css-display-3/#biblio-css-speech-1)] and interactivity of an element and its descendants, the display property only affects visual layout: its purpose is to allow designers freedom to change the layout behavior of an element without affecting the underlying document semantics.

**displayプロパティは要素のセマンティクスに影響を与えない。**セマンティクスはdocumentの言語（HTML）によって定義され、CSSに影響されない。`none`についてはスピーチの出力や要素とその子孫要素の相互作用に影響を与えるが、displayプロパティは見た目のレイアウトにのみ影響を与える。これはデザイナーがdocumentのセマンティクスの影響を気にしないで、要素のレイアウト上の振る舞いを自由に変更できるようにするためである。


