---
title: 'Display Order: the order property'
featured:
  image: estudio-bloom-ezqnxsqUZ80-unsplash
  author: Estúdio Bloom
  authorLink: https://unsplash.com/@estudiobloom?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2020-05-25 00:00:00
---
今回は[5.4. Display Order: the order property](https://www.w3.org/TR/css-flexbox-1/#order-property)について。<!-- more -->

> Flex items are, by default, displayed and laid out in the same order as they appear in the source document. The order property can be used to change this ordering.

Flex itemsはデフォルトでsource documentに出現するのと同じ順番で表示・配置される。`order`プロパティはこの並び順を変更するために使われる。

|key|value|
--|--
|Name|order|
|Value|&lt;integer&gt;|
|Initial|0|
|Applies to|flex items|
|Inherited|no|
|Percentages|n/a|
|Computed value|specified integer|
|Canonical order|per grammar|
|Animation type|by computed value type|

> The order property controls the order in which flex items appear within the flex container, by assigning them to ordinal groups. It takes a single <integer> value, which specifies which ordinal group the flex item belongs to.

`order`プロパティはflex itemsにordinal groupを割り当てることで、それらがflex container内で表示される順番を制御する。integer値を渡して、flex itemが所属するordinal groupを指定する。

> A flex container lays out its content in order-modified document order, starting from the lowest numbered ordinal group and going up. Items with the same ordinal group are laid out in the order they appear in the source document. This also affects the painting order [CSS21], exactly as if the flex items were reordered in the source document. Absolutely-positioned children of a flex container are treated as having order: 0 for the purpose of determining their painting order relative to flex items.

flex containerは、order-modifiedされたdocumentの並び順に沿ってコンテンツをordinal groupの数値の小さい順に配置する。同じordinal groupのitemsは、source documentに出現する順番で配置される。これは、まるでflex itemsがsource documentで並び変えられたかのように正確に、描画の順番にも影響を与える。flex containerの絶対配置された子供たちは、flex itemsと相対的な描画順序を決定するために、`0`のorderを持っているとみなして扱われる。

> **EXAMPLE 6**
> The following figure shows a simple tabbed interface, where the tab for the active pane is always first:
>
> <img src="https://www.w3.org/TR/css-flexbox-1/images/flex-order-example.png" />
>
> This could be implemented with the following CSS (showing only the relevant code):

上記の図は、簡単なタブインターフェイスを表したもので、アクティブなタブは常に最初（一番左）に表示される。
これは下のようなCSS（関連する部分のみ）で実装される

```css
.tabs {
  display: flex;
}
.tabs > .current {
  order: -1; /* デフォルトの0より小さくする */
}
```

> Unless otherwise specified by a future specification, this property has no effect on boxes that are not flex items.

将来的な仕様で指定されない限りは、このプロパティはflex itemsではないboxesには何も効果を与えない。

### 5.4.1. Reordering and Accessibility

> The order property does not affect ordering in non-visual media (such as speech). Likewise, order does not affect the default traversal order of sequential navigation modes (such as cycling through links, see e.g. tabindex [HTML]).

orderプロパティはnon-visual media（スピーチなど）の順番には影響を与えない。同様に、orderプロパティはsequential navigation mode（tabindexのようなリンクを巡回するようなもの）のデフォルトの走査順序にも影響を与えない。

> **Authors must use order only for visual, not logical, reordering of content. Style sheets that use order to perform logical reordering are non-conforming.**

制作者はコンテンツの視覚的な（論理的なのではなく）並び替えに対してのみorderプロパティを使わなければならない。論理的なコンテンツの並び替えにorderプロパティを利用したスタイルシートは非準拠である。

> **Note:** This is so that non-visual media and non-CSS UAs, which typically present content linearly, can rely on a logical source order, while order is used to tailor the visual order. (Since visual perception is two-dimensional and non-linear, the desired visual order is not always logical.)

**注意**：これは、一般的に現在のコンテンツを直線的に出力する、non-visual mediaとnon-CSS ユーザーエージェント（ブラウザなど）が、論理的なsource orderに依拠できるようにしつつ、一方でorderプロパティを利用することで視覚的な順番を調整できるようにするためである。（視覚による知覚は、二次元的であり直線的ではない。望ましい視覚的な順番は常に論理的なものであるとは限らないので。）

> **EXAMPLE 7**
> Many web pages have a similar shape in the markup, with a header on top, a footer on bottom, and then a content area and one or two additional columns in the middle. Generally, it’s desirable that the content come first in the page’s source code, before the additional columns. However, this makes many common designs, such as simply having the additional columns on the left and the content area on the right, difficult to achieve. This has been addressed in many ways over the years, often going by the name "Holy Grail Layout" when there are two additional columns. order makes this trivial. For example, take the following sketch of a page’s code and desired layout:

多くのウェブページがマークアップにおいて同じような形、上の方にヘッダーがあり、下側にフッターがあり、真ん中にコンテンツエリアと1つか2つの付帯的なカラムを持つ。一般的に、ページのsource code上では、付帯的なカラムの前に、コンテンツが最初に来るのが望ましい。しかしながら、この（ソースコードの並び順は）多くのよくあるデザインがするような、付帯的なカラムを左において、コンテンツエリアを右に置くようなシンプルなデザインを作るのが難しくなる。これは長年に渡って様々な方法で対処されてきた課題で、二つの付帯的なカラムを持つレイアウトはしばしば「Holy Grail Layout」という名前で呼ばれてきた。orderプロパティはこの課題を簡単なものにする。例えば、次のようなページコードと、望ましいレイアウトのスケッチがあるとする。

```html
<!DOCTYPE html>
<header>...</header>
<main>
   <article>...</article>
   <nav>...</nav>
   <aside>...</aside>
</main>
<footer>...</footer>
```

<img src="https://www.w3.org/TR/css-flexbox-1/images/flex-order-page.svg" />

> This layout can be easily achieved with flex layout:

このレイアウトはflexレイアウトで簡単に作ることができる。

```css
main { display: flex; }
main > article { order: 2; min-width: 12em; flex:1; }
main > nav     { order: 1; width: 200px; }
main > aside   { order: 3; width: 200px; }
```

> As an added bonus, the columns will all be equal-height by default, and the main content will be as wide as necessary to fill the screen. Additionally, this can then be combined with media queries to switch to an all-vertical layout on narrow screens:

追加特典として、カラムはデフォルトで同じ高さになり、メインコンテンツは画面を埋めるのに必要なだけの幅になる。さらに、media queriesと組み合わせることで、狭い画面上においては縦一列（all-vertical）のレイアウトにスイッチすることができる。

```css
@media all and (max-width: 600px) {
  /* 3カラムに対応するには狭すぎる */
  main { flex-flow: column; }
  main > article, main > nav, main > aside {
    /* documentの並び順にする */
    order: 0; width: auto;
  }
}
```

> (Further use of multi-line flex containers to achieve even more intelligent wrapping left as an exercise for the reader.)

（読者のための演習として、複数行のflex containerを使ってよりインテリジェントに囲う方法もあることを記しておく）

----

> In order to preserve the author’s intended ordering in all presentation modes, authoring tools—including WYSIWYG editors as well as Web-based authoring aids—must reorder the underlying document source and not use order to perform reordering unless the author has explicitly indicated that the underlying document order (which determines speech and navigation order) should be out-of-sync with the visual order.

すべての表示モードにおいて制作者が意図した並び順を保持するためには、（WYSIWYGエディタやWebベースのオーサリング補助機能を含む）オーサリングツールは、制作者が基になるdocument order（スピーチやナビゲーションの順番を決定する）と視覚的な順序とを同期しないことを明示的に示していない限り基になるdocument sourceを並び替える必要があり、並び替えするためにorderプロパティを使用してはいけない。

> **EXPAMLE 8**
> For example, a tool might offer both drag-and-drop reordering of flex items as well as handling of media queries for alternate layouts per screen size range.

例えば、あるツールが、media queriesを使った画面サイズに応じたレイアウト処理と、ドラッグアンドドロップでのflex itemsの並び替えの機能を両方提供していたとする。

> Since most of the time, reordering should affect all screen ranges as well as navigation and speech order, the tool would perform drag-and-drop reordering at the DOM layer. In some cases, however, the author may want different visual orderings per screen size. The tool could offer this functionality by using order together with media queries, but also tie the smallest screen size’s ordering to the underlying DOM order (since this is most likely to be a logical linear presentation order) while using order to determine the visual presentation order in other size ranges.

たいていの場合、並び替えはすべてのスクリーンサイズと共に、ナビゲーション、speech orderにも影響を与えるから、ツールはDOMレイヤーでのドラッグアンドドロップによる並び替えを実行するだろう。しかしながら、あるケースにおいては、制作者はスクリーンサイズごとに異なる視覚順にしたいかもしれない。ツールはmedia queriesとorderプロパティを一緒に使うことによってこの機能を提供することができる。しかし、それは同時に、最小サイズの画面の順番と基になるDOM order（たいていの場合、最小サイズが論理的で直線的な表示順になるだろうから）を結びつけつつ、他のサイズでは視覚的な表示順を決めるためにorderプロパティを使うことになる。

> This tool would be conformant, whereas a tool that only ever used order to handle drag-and-drop reordering (however convenient it might be to implement it that way) would be non-conformant.

このツールは準拠しているが、一方でドラッグアンドロドップの並び替えを処理するのにorderプロパティ（実装するには便利だが）のみを利用しているツールは非準拠になる。

> **Note:** User agents, including browsers, accessible technology, and extensions, may offer spatial navigation features. This section does not preclude respecting the order property when determining element ordering in such spatial navigation modes; indeed it would need to be considered for such a feature to work. But order is not the only (or even the primary) CSS property that would need to be considered for such a spatial navigation feature. A well-implemented spatial navigation feature would need to consider all the layout features of CSS that modify spatial relationships.

**注意**：ユーザーエージェント（ブラウザー、accessible technology、機能拡張などを含む）は空間的に広がりのあるナビゲーション機能を提供するかもしれない。このセクションは、そのような空間的に広がりのあるナビゲーションモードにおいて、要素の順序を決定するときに、orderプロパティが関連することを排除するものではない。実際に、そのような機能が機能するためには考慮される必要のあるものである。しかしorderプロパティは空間的に広がりのあるナビゲーション機能において考慮する必要がある唯一のCSSプロパティではない（主要なものでさえない）。よく実装された空間ナビゲーション機能は、空間との関係性を変更するCSSのレイアウト機能をすべて考慮する必要ある。
