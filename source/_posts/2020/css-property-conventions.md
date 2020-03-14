---
title: CSS property conventions
featured:
  image: delaney-van-EUVN4bihZug-unsplash
  author: Delaney Van
  authorLink: https://unsplash.com/@delaneyvan?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2020-02-25 06:48:00
---
前回の[The display property definition in CSS2](https://memolog.org/2020/display-property-definition-in-css2.html)に引き続き。[1.2. Values](https://www.w3.org/TR/css-display-3/#values)に、プロパティの仕様については[1.4.2 CSS property definitions](https://www.w3.org/TR/CSS22/about.html#property-defs)の表記に従うと書いてあるので、そのあたりを確認していく。<!-- more -->

### CSS property definitions

プロパティの定義には以下の項目の情報が並ぶ。

* Name:	プロパティ名
* Value:	正しい値とシンタックス
* Initial:	初期値
* Applies to:	このプロパティが適用される要素（対象）
* Inherited:	プロパティが子孫要素に引き継がれるか
* Percentages:	パーセンテージ(%)が値として与えられた時にどのように解釈されるか。`n/a`の場合はプロパティがパーセンテージの値を受け取らないことを意味する
* Media:	プロパティが適用されるメディアグループ
* Computed value:	算出値（computed value）がどのように算出されるか

以下はCSS2の[1.4.2.1 Value](https://www.w3.org/TR/CSS22/about.html#value-defs)について。ValueについてはCSS3のValue and Unitの[2. Value Definition Syntax](https://www.w3.org/TR/css-values-3/#value-defs)で追記されている部分があるが、そこは改めて触れようかなと思う。章立てについては後で比較しやすいようにValue and Unitの方から持ってきている。

### Component Value Types

Component value types はいくつかの方法で指定される。

> 1. keyword values (e.g., auto, disc, etc.)
> 2. basic data types, which appear between "<" and ">" (e.g., <length>, <percentage>, etc.). In the electronic version of the document, each instance of a basic data type links to its definition.
> 3. types that have the same range of values as a property bearing the same name (e.g., <'border-width'> <'background-attachment'>, etc.). In this case, the type name is the property name (complete with quotes) between "<" and ">" (e.g., <'border-width'>). Such a type does not include the value 'inherit'. In the electronic version of the document, each instance of this type of non-terminal links to the corresponding property definition.
> 4. non-terminals that do not share the same name as a property. In this case, the non-terminal name appears between "<" and ">", as in <border-width>. Notice the distinction between <border-width> and <'border-width'>; the latter is defined in terms of the former. The definition of a non-terminal is located near its first appearance in the specification. In the electronic version of the document, each instance of this type of value links to the corresponding value definition.

1. `auto` とかのキーワード
2. `<length>`とか基本的なデータタイプ。`<`と`>`で囲われてる
3. `<'border-width'>`みたいにプロパティ名で指定するタイプ。`<'`と`'>`で囲われてる。このタイプでは`inherit`される値は含まない
4. `<border-width>`みたいにプロパティ名だけど、その定義が当該仕様の中に含まれているもの。

> Other words in these definitions are keywords that must appear literally, without quotes (e.g., red). The slash (/) and the comma (,) must also appear literally.

これらの定義に含まれる他の単語はキーワードであり、クオートなしで記述する。/や,もそのまま記述する。

### Component Value Combinators

> Component values may be arranged into property values as follows:
* Several juxtaposed words mean that all of them must occur, in the given order.
* A bar (|) separates two or more alternatives: exactly one of them must occur.
* A double bar (||) separates two or more options: one or more of them must occur, in any order.
* A double ampersand (&&) separates two or more components, all of which must occur, in any order.
* Brackets ([ ]) are for grouping.

* 並記されてる単語は、それらの全部が、順番通りに記述されないといけない。
* `|`は二つ以上の値に分ける。どれか一つが記述されないといけない。
* `||`は二つ以上のオプションに分ける。それらのうち一つ以上が記述されないといけない。順不同
* `&&`は二つ以上のcomponentsを分ける。それらのすべてが記述されないといけない。順不同
* `[]`はグループ化のため。`[]`の外側とは、内側の処理が解決した後に処理される。

並記（juxtaposed）については特段説明がないけど、スペースで区切られている複数の単語は並記されてる単語と理解して問題なさそう。

> Juxtaposition is stronger than the double ampersand, the double ampersand is stronger than the double bar, and the double bar is stronger than the bar. Thus, the following lines are equivalent:
```
    a b   |   c ||   d &&   e f
  [ a b ] | [ c || [ d && [ e f ]]]
```

`並記（Juxtaposition） > && > || > |` となる。`[]`はグループ化なので、どの値が強く結合しているかを明確にしてくれる。並記部分は順番が決まっているけど、それ以外は順不同になる。

### Component Value Multipliers

> Every type, keyword, or bracketed group may be followed by one of the following modifiers:
* An asterisk (*) indicates that the preceding type, word, or group occurs zero or more times.
* A plus (+) indicates that the preceding type, word, or group occurs one or more times.
* A question mark (?) indicates that the preceding type, word, or group is optional.
* A pair of numbers in curly braces ({A,B}) indicates that the preceding type, word, or group occurs at least A and at most B times.

モディファイア（意味を付け加えたりする）について。普通の正規表現と同じ。
* `*` 直前のタイプ、単語、グループを0回以上記述する
* `+` 直前のタイプ、単語、グループを1回以上記述する
* `?` 直前のタイプ、単語、グループを0回または1回記述する
* `{A, B}` 直前のタイプ、単語、グループを少なくともA回、最大でB回記述する

### Combinator and Multiplier Patterns

その下に書いてある例で言うと、
`N | NW | NE` なら、NかNWかNEのどれか一つ。`[ <length> | thick | thin ]{1,4}`なら、[&lt;length&gt;](https://www.w3.org/TR/css-values-3/#length-value)かthickかthinのどれかを1回〜4回記述する。`[<family-name> , ]* <family-name>`は、`<family-name>`をカンマ区切りで複数個記述できるということ。`<uri>? <color> [ / <color> ]?`は、`<uri>`（なくても可）で、colorは、`<color>`か`<color>/<color>`の形で記述できる...みたいな感じ。

### Component Values and White Space

> Component values are specified in terms of tokens, as described in Appendix G.2. As the grammar allows spaces between tokens in the components of the expr production, spaces may appear between tokens in property values.

値はtokenの記法で記述される。詳細は[Appendix G.2 Lexical scanner](https://www.w3.org/TR/CSS22/grammar.html#scanner)に書かれている。[grammer](https://www.w3.org/TR/CSS22/grammar.html#grammar)では、**expr** productionの構成において、トークンの間にスペースが許されているので、設定値のトークンの間にスペースが含まれるかもしれない。

ここでのproductionの意味は、[grammer](https://www.w3.org/TR/CSS22/grammar.html#grammar)に書かれている用語のことで、`expr`は`term [ operator? term ]*`の意味になる。`term`は`[ NUMBER S* | PERCENTAGE S* | LENGTH S* | EMS S* | EXS S* | ANGLE S* | TIME S* | FREQ S* ] | STRING S* | IDENT S* | URI S* | hexcolor | function`であり、`operator`は`'/' S* | ',' S*`となっている。`S`は`[ \t\r\n\f]+`だから、つまり、その、termとtermの間にスペースが入ってても問題ないということかなと思う。tokenとtermの違いが気になるが、、tokenはtokenizerで分割された要素のことだと思うので、ここでのtokenはtermの意味だと解釈してる。

> Note: In many cases, spaces will in fact be required between tokens in order to distinguish them from each other. For example, the value '1em2em' would be parsed as a single DIMEN token with the number '1' and the identifier 'em2em', which is an invalid unit. In this case, a space would be required before the '2' to get this parsed as the two lengths '1em' and '2em'.

実際のところ、多くのケースでスペースはトークンを分解するために必須となる。たとえば`1em2em`は、数値`1`の`DIMEN`tokenと、invalid unitな`em2em`というidentifierとしてパースされる。このケースでは`2`の前にスペースが必須になる。


