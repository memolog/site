---
title: The display value property (box / legacy)
featured:
  image: whoisbenjamin-ApJp5Nk24a0-unsplash
  author: Whoisbenjamin
  authorLink: https://unsplash.com/@whoisbenjamin?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2020-03-09 18:35:47
---
[The display value property (list-item / internal)](https://memolog.org/2020/display-value-property-2.html)の続き。[2. Box Layout Modes: the display property](https://www.w3.org/TR/css-display-3/#the-display-properties)からdisplayプロパティのvalueについて、残りのboxとlegacyについて確認していく。<!-- more -->

### display-box
> &lt;display-box&gt; = contents | none

> While display can control the types of boxes an element will generate, it can also control whether an element will generate any boxes at all.

`<display-box>`には`contens`と`none`の二つのキーワードがあって、要素が生成するboxのタイプや、要素がboxを生成するかどうかを制御する。

> The <display-box> keywords are defined as follows:

> **contents**
> The element itself does not generate any boxes, but its children and pseudo-elements still generate boxes and text runs as normal. For the purposes of box generation and layout, the element must be treated as if it had been replaced in the element tree by its contents (including both its source-document children and its pseudo-elements, such as ::before and ::after pseudo-elements, which are generated before/after the element’s children as normal).

その要素自身のboxは生成しなくなるが、子孫要素や擬似要素についてはboxとtext runを通常通りに生成する。その目的として、要素が中のコンテンツ（source-documentの子孫要素と`::before`や`::after`など子孫要素の前後に生成される擬似要素を両方含む）によって要素のツリーが置き換わるかのように扱われなければならない。

> Note: As only the box tree is affected, any semantics based on the document tree, such as selector-matching, event handling, and property inheritance, are not affected. As of writing, however, this is not implemented correctly in major browsers, so using this feature on the Web must be done with care as it can prevent accessibility tools from accessing the element’s semantics.

box treeのみが影響を受けるので、セレクタやイベントハンドリング、プロパティの継承など、document treeをベースにしたセマンティクスには影響を与えない。

しかしながら、現時点ではブラウザが正しく実装されていないので、この機能を使う時はアクセシビリティツールが要素のセマンティクスにアクセスするのを妨げないように気をつけないといけない。

> This value computes to display: none on replaced elements and other elements whose rendering is not entirely controlled by CSS; see Appendix B: Effects of display: contents on Unusual Elements for details.

この値は、置換要素などレンダリングがCSSによる制御の外にある要素上では、`display:none`として計算される。詳細は[Appendix B: Effects of display: contents on Unusual Elements](https://www.w3.org/TR/css-display-3/#unbox)

imgとかvideoに`display:contents`を指定しても、その子孫要素だけ独立して扱うことはできない、ということを説明している。このあたりは直観的に理解できるところだし、必要になったときに確認すれば良いと思うので、詳細については確認しない。

> Note: Replaced elements and form controls are treated specially because removing only the element’s own generating box is a more-or-less undefined operation. As this behavior may be refined if use cases (and more precise rendering models) develop, authors should use display: none rather than display: contents on such elements for forward-compatibility.

置換要素やフォームコントロールは、その要素のboxを削除することは多かれ少なかれ不定な操作になるので、特殊なものとして扱われる。この振る舞いは、もしユースケース（より精細なレンダリングモデル）が開発されたら見直されるかもしれない。なので、そのような要素に対して、前方互換性のために、`display:contents`よりも`display:none`を使うべきである。

> **none**
> The element and its descendants generate no boxes or text runs.
Similarly, if a text node is defined to behave as display: none, it generates no text runs.

`none`では、その要素および子孫要素がboxとtext runを生成しなくなる。同様に、もしテキストノードが`display:none`として振舞うように定義された場合、text runを生成しなくなる。

> Elements with either of these values do not have inner or outer display types, because they don’t generate any boxes at all.

display-boxがついた要素は、boxを生成しないため、innerとouter display typeを持たない。

> Note: As these values cause affected elements to not generate a box, anonymous box generation rules will ignore the elided elements entirely, as if they did not exist in the box tree.

> Markup-based relationships, however, are not affected by these values, as they are solely rendering-time effects. For example, although they may affect which table cell appears in a column, they do not affect which table cell is associated with a particular column element. Similarly, they cannot affect which HTML summary element is associated with a particular table or whether a legend is considered to be labelling the contents of a particular fieldset.

これらの値の影響下にある要素はboxを生成しないので、anonymous boxの生成ルールは、まるでbox treeに存在しないかのように、その生成されなかった要素を無視するだろう。

しかしながら、マークアップを基礎にしたリレーションシップの場合、それらがレンダリング時の効果であることから、display-boxの値による影響を受けない。たとえば、display-boxはカラム内にtable cellの表示に影響を与えるかもしれないけれど、特定のカラム要素に関係するtable cellには影響を与えない。

同様に、特定のtableに関連したsummary要素や、特定のfieldsetのコンテンツにlegendがラベリングされているとみなすかどうかに影響を与えない。

### display-legacy
> &lt;display-legacy&gt; = inline-block | inline-table | inline-flex | inline-grid

> CSS level 2 used a single-keyword syntax for display, requiring separate keywords for block-level and inline-level variants of the same layout mode. These <display-legacy> keywords map as follows:

`inline-block`など、CSS2で一つのキーワードとして使われていたもので、CSS3のDisplay moduleではoutsideとinsideに分けて記述されるべきものなのがここに入ってる。

> * inline-block
Behaves as inline flow-root.
* inline-table
Behaves as inline table.
* inline-flex
Behaves as inline flex.
* inline-grid
Behaves as inline grid.

