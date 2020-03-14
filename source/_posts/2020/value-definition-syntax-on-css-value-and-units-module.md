---
title: Value Definition Syntax on CSS Value and Units Module
featured:
  image: debby-hudson-LQHW1hEO3RA-unsplash
  author: Debby Hudson
  authorLink: https://unsplash.com/@hudsoncrafted?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2020-02-27 18:10:13
---
前回の[CSS property conventions](https://memolog.org/2020/css-property-conventions.html)から引き続き。[CSS Value and Units Module](https://www.w3.org/TR/css-values-3/)がvalueについての定義を、拡張または置き換えるものとして用意されているので、CSS2との差分を確認する。<!-- more -->

Component Value Multipliersなど、いくつかの記法が追加されているけど、基本的な内容は同じ感じ。

### Component Value Types

> 1. keyword values (such as auto, disc, etc.), which appear literally, without quotes (e.g. auto)
> 2. basic data types, which appear between < and > (e.g., <length>, <percentage>, etc.). For numeric data types, this type notation can annotate any range restrictions using the bracketed range notation described below.
> 3. types that have the same range of values as a property bearing the same name (e.g., <'border-width'>, <'background-attachment'>, etc.). In this case, the type name is the property name (complete with quotes) between the brackets. Such a type does not include CSS-wide keywords such as inherit, and also does not include any top-level comma-separated-list multiplier (i.e. if property pairing is defined as [ <custom-ident> <integer>? ]#, then <'pairing'> is equivalent to [ <custom-ident> <integer>? ], not <custom-ident> <integer> ]#).
> 4. non-terminals that do not share the same name as a property. In this case, the non-terminal name appears between < and >, as in <spacing-limit>. Notice the distinction between <border-width> and <'border-width'>: the latter is defined as the value of the border-width property, the former requires an explicit expansion elsewhere. The definition of a non-terminal is typically located near its first appearance in the specification.

CSS2からの差分で言うと、
1. は同じ
2. データのタイプが数値の場合に`<integer[0, 10]>`みたいに制限範囲を記述できる旨が追加されてる。
3. `inherit`だけでなく **CSS-wide keywords**についても言及されていて、これらはプロパティの値には含めない。あと **top-level-comma-separated-list multiplier**も含まれない。これはたとえば `paring`というプロパティが`[ <custom-ident> <integer>? ]#`と定義されている場合（`#`は直前の内容をカンマ区切りで繰り返し表記できる（後述））、`<'paring'>`は`[ <custom-ident> <integer>? ]`と同じになる（繰り返しにならない）。
4. は内容的には同じ

> Some property value definitions also include the slash (/), the comma (,), and/or parentheses as literals. These represent their corresponding tokens. Other non-keyword literal characters that may appear in a component value, such as “+”, must be written enclosed in single quotes.

内容的にはCSS2とほぼ同じで、プロパティ名に含まれる/や,()などは文字列として扱う。`+`のように、component valueの中で文字列として扱いたい場合は、クオートで囲う。

> **Commas specified in the grammar are implicitly omissible** in some circumstances, when used to separate optional terms in the grammar. Within a top-level list in a property or other CSS value, or a function’s argument list, a comma specified in the grammar must be omitted if:
* all items preceding the comma have been omitted
* all items following the comma have been omitted
* multiple commas would be adjacent (ignoring white space/comments), due to the items between the commas being omitted.

> EXAMPLE1
For example, if a function can accept three arguments in order, but all of them are optional, the grammar can be written like:
`example( first? , second? , third? )`
Given this grammar, writing example(first, second, third) is valid, as is example(first, second) or example(first, third) or example(second). However, example(first, , third) is invalid, as one of those commas are no longer separating two options; similarly, example(,second) and example(first,) are invalid. example(first second) is also invalid, as commas are still required to actually separate the options.
If commas were not implicitly omittable, the grammar would have to be much more complicated to properly express the ways that the arguments can be omitted, greatly obscuring the simplicity of the feature.

オプショナルなtermsを分ける時に使われるカンマは、状況によって暗黙的に省略可能。プロパティのtop-level一覧とか、他のCSSの値、または関数の引数一覧など、grammer上、カンマと分かるところは省略されるべき。たとえば、
* カンマの前のすべてのアイテムが省略されている
* カンマの後のすべてのアイテムが省略されている
* 間にあったアイテムが省略されていて、複数のカンマが隣り合っている

`example(first?, second?, third?)`と、すべての引数がオプショナルな場合、`example(first, second, third)`とか`example(first, third)`とかはvalidだけど、`example(first, ,third)`とか`example(,second)`、`example(first,)`とか、省略すべきカンマが残っているのはinvalidとなる。

> All CSS properties also accept the **CSS-wide keyword** values as the sole component of their property value. For readability these are not listed explicitly in the property value syntax definitions. For example, the full value definition of border-color is <color>{1,4} | inherit | initial | unset (even though it is listed as <color>{1,4}).

[CSS-wide keywords](https://www.w3.org/TR/css-values-3/#common-keywords)は、`initial`,`inherit`,`unset`の3つのキーワードのことで、可読性のため、たとえば`<color>{1,4} | inherit | initial | unset`みたいに明示的に表記されないが、全てのプロパティで利用することができる。

> Note: This implies that, in general, combining these keywords with other component values in the same declaration results in an invalid declaration. For example, background: url(corner.png) no-repeat, inherit; is invalid.

基本的には同じ宣言の中でCSS-wide keywordsと他のcomponent valueを組み合わせて使うとinvalidとなることに注意。たとえば`background: url(corner.png) no-repeat, inherit;`はinvalidとなる。

### Component Value Combinators

Component Value Combinatorsについては、CSS2からの変更はない。

> Component values can be arranged into property values as follows:
* Juxtaposing components means that all of them must occur, in the given order.
* A double ampersand (&&) separates two or more components, all of which must occur, in any order.
* A double bar (||) separates two or more options: one or more of them must occur, in any order.
* A bar (|) separates two or more alternatives: exactly one of them must occur.
* Brackets ([ ]) are for grouping.

> Juxtaposition is stronger than the double ampersand, the double ampersand is stronger than the double bar, and the double bar is stronger than the bar. Thus, the following lines are equivalent:
```
    a b   |   c ||   d &&   e f
  [ a b ] | [ c || [ d && [ e f ]]]
```

ここまでの箇所はCSS2と同じ内容。

> For reorderable combinators (||, &&), ordering of the grammar does not matter: components in the same grouping may be interleaved in any order. Thus, the following lines are equivalent:
```
a || b || c
b || a || c
```

ここについても、`||`と`&&`は順不同だから`a || b || c`と`b || a || c`は同じ意味になると追記しているだけという感じ。

### Component Value Multipliers

> Every type, keyword, or bracketed group may be followed by one of the following modifiers:
* An asterisk (*) indicates that the preceding type, word, or group occurs zero or more times.
* A plus (+) indicates that the preceding type, word, or group occurs one or more times.
* A question mark (?) indicates that the preceding type, word, or group is optional (occurs zero or one times).
* A single number in curly braces ({A}) indicates that the preceding type, word, or group occurs A times.
* A comma-separated pair of numbers in curly braces ({A,B}) indicates that the preceding type, word, or group occurs at least A and at most B times. The B may be omitted ({A,}) to indicate that there must be at least A repetitions, with no upper bound on the number of repetitions.
* A hash mark (#) indicates that the preceding type, word, or group occurs one or more times, separated by comma tokens (which may optionally be surrounded by white space and/or comments). It may optionally be followed by the curly brace forms, above, to indicate precisely how many times the repetition occurs, like <length>#{1,4}.
* An exclamation point (!) after a group indicates that the group is required and must produce at least one value; even if the grammar of the items within the group would otherwise allow the entire contents to be omitted, at least one component value must not be omitted.

* `*` はCSS2と同じ
* `+` はCSS2と同じ
* `?` はCSS2と同じ。
* `{A}` は直前のタイプ、単語、グループをA回繰り返す
* `{A,B}` は基本的にCSS2と同じ。`{A,}`というようにBが省略されている場合は、A回繰り返す必要があるが、上限はない、という意味になる。
* `#` は直前のタイプ、単語、グループをカンマ区切りで1回以上繰り返す。`<length>#{1,4}`のように、`#`の後ろに`{A, B}`がついて繰り返す回数を厳密に指定される場合もある。
* `!` のついているグループは、必須項目となり、少なくとも一つの値はないといけない。そのグループ内のアイテムがすべてのコンテンツを省略可能としていても、一つのvalueは省略せずに記述しないといけない。

> For repeated component values (indicated by *, +, or #), UAs must support at least 20 repetitions of the component. If a property value contains more than the supported number of repetitions, the declaration must be ignored as if it were invalid.

`*`,`+`,`#`で繰り返す場合、ブラウザは少なくとも20回の繰り返し処理をサポートしなければならない。もしプロパティの値がサポートしている繰り返し回数より多く含まれていた場合は、invalidの場合と同様に宣言自体を無視しないといけない。

### Combinator and Multiplier Patterns

> There are a small set of common ways to combine multiple independent component values in particular numbers and orders. In particular, it’s common to want to express that, from a set of component value, the author must select zero or more, one or more, or all of them, and in either the order specified in the grammar or in any order.

> All of these can be easily expressed using simple patterns of combinators and multipliers:

component valueについて、よくありがちな組み合わせ方法を紹介してる。

 |順番通り|順不同
---|---|---
**0回以上**| A? B? C? | A? &#x7c;&#x7c; B? &#x7c;&#x7c; C?
**1回以上**| [ A? B? C? ]! | A &#x7c;&#x7c; B &#x7c;&#x7c; C
**すべて**| A B C | A && B && C

### Component Values and White Space

> Unless otherwise specified, white space and/or comments may appear before, after, and/or between components combined using the above combinators and multipliers.

> Note: In many cases, spaces will in fact be required between components in order to distinguish them from each other. For example, the value 1em2em would be parsed as a single <dimension-token> with the number 1 and the identifier em2em, which is an invalid unit. In this case, a space would be required before the 2 to get this parsed as the two lengths 1em and 2em.

CSS2と基本的には同じ内容のこと、スペースがcomponentsの間とかに入るかもしれな旨が書いてある。
