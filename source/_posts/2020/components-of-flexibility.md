---
title: Components of Flexibility
featured:
  image: 700244ansdl
  author: Emile-Allain Séguy
  authorLink: https://artvee.com/dl/papillons-pl-13/
date: 2020-07-01 17:46:00
---
[7.2. Components of Flexibility](https://www.w3.org/TR/css-flexbox-1/#flex-components)について。各ロングハンドの説明は[flex ショートハンド](https://memolog.org/2020/flex-shorthand.html)の方に書かれていて、ここには載ってない。今回は読み飛ばして良い感じの内容になってる。
<!-- more -->

> Individual components of flexibility can be controlled by independent longhand properties.

個々のflexibilityの組み合わせは、独立したロングハンドプロパティによって制御される。

> **Authors are encouraged to control flexibility using the flex shorthand rather than with its longhand properties directly, as the shorthand correctly resets any unspecified components to accommodate common uses.**

ショートハンドは一般的な使用法に対応するために不特定のコンポーネントを正しくリセットするので、制作者はflexibilityを制御するのにロングハンドプロパティよりもショートハンドを利用することを推奨する。

### 7.2.1. The flex-grow property

|key|value|
--|--
|Name|flex-grow|
|Value|&lt;number&gt;|
|Initial|0|
|Applies to|flex items|
|Inherited|no|
|Percentages|n/a|
|Computed value|specified number|
|Canonical order|per grammar|
|Animation type|by computed value type|

> **Authors are encouraged to control flexibility using the flex shorthand rather than with flex-grow directly, as the shorthand correctly resets any unspecified components to accommodate common uses.**

> The flex-grow property sets the flex grow factor to the provided &lt;number&gt;. Negative numbers are invalid.

flex-growプロパティは&lt;number&gt;を渡して、flex grow factorをセットする。負の数値はinvalidになる。

### 7.2.2. The flex-shrink property

|key|value|
--|--
|Name|flex-shrink|
|Value|<number>|
|Initial|1|
|Applies to|flex items|
|Inherited|no|
|Percentages|n/a|
|Computed value|specified value|
|Canonical order|per grammar|
|Animation type|number|

> **Authors are encouraged to control flexibility using the flex shorthand rather than with flex-shrink directly, as the shorthand correctly resets any unspecified components to accommodate common uses.**

> The flex-shrink property sets the flex shrink factor to the provided &lt;number&gt;. Negative numbers are invalid.

flex-shrinkプロパティは&lt;number&gt;を渡して、flex shrink factorをセットする。負の値はinvalidになる。

### 7.2.3. The flex-basis property

|key|value|
--|--
|Name|flex-basis|
|Value|content | <‘width’>|
|Initial|auto|
|Applies to|flex items|
|Inherited|no|
|Percentages|relative to the flex container’s inner main size|
|Computed value|specified keyword or a computed &lt;length-percentage&gt; value|
|Canonical order|per grammar|
|Animation type|by computed value type|

> **Authors are encouraged to control flexibility using the flex shorthand rather than with flex-basis directly, as the shorthand correctly resets any unspecified components to accommodate common uses.**

> The flex-basis property sets the flex basis. It accepts the same values as the width and height property, plus content.

flex-basisプロパティはflex basisをセットする。widthとheightと同じ値、それとcontentキーワードを使うことができる。

> For all values other than auto and content (defined above), flex-basis is resolved the same way as width in horizontal writing modes [CSS21], except that if a value would resolve to auto for width, it instead resolves to content for flex-basis. For example, percentage values of flex-basis are resolved against the flex item’s containing block (i.e. its flex container); and if that containing block’s size is indefinite, the used value for flex-basis is content. As another corollary, flex-basis determines the size of the content box, unless otherwise specified such as by box-sizing [CSS3UI].

autoとcontent以外の全ての値に対して、flex-basisはhorizontal writing modeにおけるwidthと同じ方法で解決する。例外として、もしwidthがautoの場合に、値を解決する場合、代わりにflex-basisのcontentで値を解決する。例えば、flex-basisをパーセンテージで指定している場合、flex itemの包含ブロック（例えばflex container）に対して解決される。そして、もし包含ブロックのサイズが不定の場合、そのflex-basisの使用値はcontentになる。別の結果として、flex-basisは、box-sizingなどによって他で指定されていない限り、content boxのサイズを決定する。
