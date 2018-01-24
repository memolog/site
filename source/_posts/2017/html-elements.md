---
title: HTMLの構造を再確認する
date: 2017-12-31
featured:
  image: ilya-pavlov-87438
  author: Ilya Pavlov
  authorLink: https://unsplash.com/photos/OqtafYT5kTw?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
  transformed: true
  format: svg
---

久しくHTML要素について振り返っていなかったので、このタイミングで一度主要な構造についてのHTML要素について振り返ってみようと思う。（TL;DR:適切な見出し要素が大事。あとはおまけ）
<!-- more -->
## セクショニングコンテンツについて
[HTML 5.2: 3.2.4.2.3. Sectioning content](https://www.w3.org/TR/2017/REC-html52-20171214/dom.html#sectioning-content-2) より
> Sectioning content is content that defines the scope of headings and footers.
>
> -&gt; article aside nav section
>
> Each sectioning content element potentially has a heading and an outline. See the section on headings and sections for further details.

セクショニングコンテンツは見出し（h1〜h6要素）やフッター（footer要素）のスコープを定義するためのコンテンツで、articleやaside、nav、sectionなどの要素がそれに当たる。それぞれのセクショニングコンテンツは見出しとアウトラインを持つ可能性がある。それぞれのセクショニングコンテンツの要素については[HTML5.2: 4.3. Sections](https://www.w3.org/TR/2017/REC-html52-20171214/sections.html#sections) に詳細が記載されているが、特に詳述するほどでもないので、箇条書きに記す。

* article: いわゆる記事とか論文、レポート、ブログとかのポストなんかで、ドキュメント内の完結または独立した構成に使われる。
* section: 汎用的な要素で、セクションを区切るために使われる。
* nav: ナビゲーションリンクを構成するセクションに使われる。
* aside: 親セクションと関連したコンテンツであるが、内容的には独立したものとみなせるセクションで、サイドバーとかPull Quoteなどに使われる。

後述するが、ブラウザが構築するアウトライン上ではセクショニングコンテンツの要素自体は考慮されないため、文書構造のアウトラインとして機能させるには、見出し要素と併用してアウトラインを作成する必要がある。

## セクショニングルートについて
[HTML 5.2: Sectioning Root](https://www.w3.org/TR/2017/REC-html52-20171214/sections.html#sectioning-roots) より
> Certain elements are said to be sectioning roots, including blockquote and td elements. These elements can have their own outlines, but the sections and headings inside these elements do not contribute to the outlines of their ancestors.

> -> blockquote body details dialog fieldset figure td

以上のセクショニングルートは独自のアウトライン構造を持つことができ、親要素の構造には影響与えないとされる。仕様の中でセクショニングコンテンツと併記して扱われることが多いが、あまり意識しなくても大丈夫（と思う）。

## アウトラインについて
[HTML 5.2: 4.3.9.1. Creating an outline](https://www.w3.org/TR/2017/REC-html52-20171214/sections.html#outline) より
> The outline for a sectioning content element or a sectioning root element consists of a list of one or more potentially nested sections. The element for which an outline is created is said to be the outline’s owner.

つまりアウトラインとはセクショニングコンテンツの入れ子構造をさす。ドキュメントにはアウトラインをどのように構築するのかの仕様が書かれているけど割愛。このセクションの最初に書かれているWarningが重要

> There are currently **no known native implementations of the outline algorithm in graphical browsers or assistive technology user agents**, although the algorithm is implemented in other software such as conformance checkers and browser extensions. Therefore the outline algorithm cannot be relied upon to convey document structure to users. **Authors should use heading rank (h1-h6) to convey document structure.**

現状では、アウトラインの処理を行うブラウザが存在しないため、このセクションで書かれているアウトラインの処理に依拠したかたちでドキュメント構造をユーザーには提供できない。**なので、実際のHTMLにおいては、セクショニングコンテンツのアウトライン構造に関わらず、ドキュメント全体で見出しのランクを扱うことでドキュメント構造を用意するしかない。**

この現状を踏まえると、アウトラインを構成する要素はあまり気にしないで見出しレベルだけ気にすれば良いということになるが、将来性という意味でできるだけ適切な構造を用意しておく方が良いは良いと思われる。

参考
* [The Truth about “The Truth About Multiple H1 Tags” | Adrian Roselli](http://adrianroselli.com/2013/12/the-truth-about-truth-about-multiple-h1.html)
* [There Is No Document Outline Algorithm | Adrian Roselli](http://adrianroselli.com/2016/08/there-is-no-document-outline-algorithm.html)

## header 要素
[HTML 5.2: 4.3.7 The header element](https://www.w3.org/TR/2017/REC-html52-20171214/sections.html#the-header-element) より
> The header element represents introductory content for its nearest ancestor main element or sectioning content or sectioning root element. A header typically contains a group of introductory or navigational aids.

main要素やセクショニングコンテンツ、セクショニングルートの一番近い親要素に対する、introductory contentを現す。

> A header element is intended to usually contain the section’s heading (an h1–h6 element), but this is not required. The header element can also be used to wrap a section’s table of contents, a search form, or any relevant logos.

**header要素はたいていの場合そのセクションの見出しが含まれることが想定されているけど、それは必須ではない。**その以外には、そのセクションの目次とか検索フォームとか関連するロゴとかを入れることができる。W3CのページにはExampleにはdl/dt要素で、コンテンツのバージョンとか、著者名とかのリストを入れていたりしてる。

> For cases where an developer wants to nest a header or footer within another header: The header element can only contain a header or footer if they are themselves contained within sectioning content.

header要素の中にheader要素を入れ子にしたい場合は、セクショニングコンテンツで区切ることで入れることができる。

```html
<article>
  <header>
    <h1>Flexbox: The definitive guide</h1>
    <aside>
      <header>
        <h2>About the author: Wes McSilly</h2>
        <p><a href="./wes-mcsilly/">Contact him! (Why would you?)</a></p>
      </header>
      <p>Expert in nothing but Flexbox. Talented circus sideshow.</p>
    </aside>
  </header>
  <p><ins>The guide about Flexbox was supposed to be here, but it
    turned out Wes wasn’t a Flexbox expert either.</ins></p>
</article>
```

## footer 要素
[HTML5.2: The footer element](https://www.w3.org/TR/2017/REC-html52-20171214/sections.html#the-footer-element)
> The footer element represents a footer for its nearest ancestor main element or sectioning content or sectioning root element. A footer typically contains information about its section, such as who wrote it, links to related documents, copyright data, and the like.
>
> A footer element can also contain entire sections representing appendices, indexes, long colophons, verbose license agreements, and other such content.

footer要素のアウトライン上の扱いは基本的にheader要素と同じ。footer要素には著者や関連ドキュメント、コピーライトとかそんな情報が含まれる。それ以外に附則や索引、奥付とか利用許諾といったものも含むことができる。

> Contact information for the author or editor of a section belongs in an address element, possibly itself inside a footer. Bylines and other information that could be suitable for both a header or a footer can be placed in either (or neither).

著作者の情報は（そのセクションのintroductory contentだから）headerにも入る余地がある。[address要素](https://www.w3.org/TR/2017/REC-html52-20171214/grouping-content.html#elementdef-address) で扱われるようなコンタクト情報などはフッターに入る方が良さそうだけど、Bylineとかその他の著者情報はheaderかfooter、どちらにも適しているかもしれない（あるいはどちらにも適さないかもしれない）。

上記のあたり、大変微妙なところではあるけど、headerには基本的にセクションの内容を補足する情報が入るのに対して、footerにはセクションの内容と関連するけど独立したコンテンツが入るみたいな感覚で良いのではなかろうか。

> Footers don’t necessarily have to appear at the end of a section, though they usually do.

footer要素は別にセクションの最後に配置する必要はない。EXAMPLEで示すようにセクションの前後に配置することもできる。
```html
<body>
  <footer><a href="../">Back to index...</a></footer>
  <div>
    <h1>Lorem ipsum</h1>
    <p>The ipsum of all lorems</p>
  </div>
  <p>A dolor sit amet, consectetur adipisicing elit, sed do eiusmod
  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
  ea commodo consequat. Duis aute irure dolor in reprehenderit in
  voluptate velit esse cillum dolore eu fugiat nulla
  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
  culpa qui officia deserunt mollit anim id est laborum.</p>
  <footer><a href="../">Back to index...</a></footer>
</body>
```

## heading要素とセクションについて
[HTML5.2: 4.3.9. Headings and sections](https://www.w3.org/TR/2017/REC-html52-20171214/sections.html#headings-and-sections) より

> The first element of heading content in an element of sectioning content represents the heading for that explicit section. Subsequent headings of equal or higher rank start new implied subsections that are part of the previous section’s parent section. Subsequent headings of lower rank start new implied subsections that are part of the previous one. In both cases, the element represents the heading of the implied section.

h1–h6 elements must not be used to markup subheadings, subtitles, alternative titles and taglines unless intended to be the heading for a new section or subsection. Instead use the markup patterns in the §4.13 Common idioms without dedicated elements section of the specification.

セクションコンテンツ内の最初にある見出し要素がそのセクションの見出しとして使われる。その後に続く見出し要素は、見出しレベルの大きさによって、そのセクションのサブセクションとして扱われるか、親セクションのサブセクションとして扱われる。

ただアウトラインの項目で記述した通り、**実際のブラウザはセクショニングコンテンツでアウトラインを構成しない**ので、ドキュメント全体で見出しのランクを調整する必要はある。見出し要素をセクションを区切る目的以外で、たとえばサブタイトルには使用してはいけない。

EXAMLE 25 には以下の2つの例が記されている
```html
<body>
  <h1>Apples</h1>
  <p>Apples are fruit.</p>
  <section>
    <h2>Taste</h2>
    <p>They taste lovely.</p>
    <h3>Sweet</h3>
    <p>Red apples are sweeter than green ones.</p>
    <h3>Color</h3>
    <p>Apples come in various colors.</p>
  </section>
</body>
```

```html
<body>
  <h1>Apples</h1>
  <p>Apples are fruit.</p>
  <section>
    <h2>Taste</h2>
    <p>They taste lovely.</p>
    <section>
      <h3>Sweet</h3>
      <p>Red apples are sweeter than green ones.</p>
    </section>
    <section>
      <h3>Color</h3>
      <p>Apples come in various colors.</p>
    </section>
  </section>
</body>
```

文書構造的には同一で同じアウトラインで構築されるが、後者の方がアウトラインの構造が明確にわかる。

> Authors are also encouraged to explicitly wrap sections in elements of sectioning content, instead of relying on the implicit sections generated by having multiple headings in one element of sectioning content.

と、見出し要素で暗黙的にセクションを区切るより、セクショニングコンテンツの要素で区切る方を奨励されてはいる。

見出し要素のないセクショニングコンテンツは、セクショニングコンテンツの要素で区切った方がすっきりはするけど、実際にブラウザが構築するアウトラインとしては意味がないものとなる。ので、セクションを区切りたいときは見出しも用意した方がいい。
