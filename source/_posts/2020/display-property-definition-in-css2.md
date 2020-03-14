---
title: The display property definition in CSS2
featured:
  image: frankie-cordoba-YDBEIv9KcwE-unsplash
  author: frankie cordoba
  authorLink: https://unsplash.com/@byfoul?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2020-02-23 9:26:00
---
前回の[Inner and outer display types](https://memolog.org/2020/inner-and-outer-display-type.html)に引き続き。[1.1. Module interactions](https://www.w3.org/TR/css-display-3/#placement)にCSS Display Moduleは、CSS2の定義を置き換えるまたは拡張するものであると書かれているので、一応CSS2.2の[9.2.4 The 'display' property](https://www.w3.org/TR/CSS22/visuren.html#display-prop)をざっと確認しようと思う。<!-- more -->


内容的にそんなに多くないので、該当箇所を全部貼り付ける。特筆するところもないので特に確認しなくても良かったかもしれない。

**block**
> This value causes an element to generate a principal block box.

principal block box を作る。principalはその要素のためのメインとなるところみたいな感じ。

**inline-block**
> This value causes an element to generate a principal inline-level block container. (The inside of an inline-block is formatted as a block box, and the element itself is formatted as an atomic inline-level box.)

principal inline-level block containerを作る。（inline-blockの内側はblock boxとしてフォーマットされ、要素自身はatomic inline-level boxとしてフォーマットされる）。

atomicの意味が、正直よくわからないのだけど、[What is atomic? - Definition from WhatIs.com](https://whatis.techtarget.com/definition/atomic)には以下のように書かれており、つまりこれ以上、何かより小さい構成要素に分割することができない要素、みたいな意味だと思う。

> In computer programming, atomic describes a unitary action or object that is essentially indivisible, unchangeable, whole, and irreducible.

**inline**
> This value causes an element to generate one or more inline boxes.

一つ以上のinline boxesを生成する

**list-item**
> This value causes an element (e.g., LI in HTML) to generate a principal block box and a marker box. For information about lists and examples of list formatting, please consult the section on lists.

principal block box と marker boxを生成する。詳細はリストのセクションに書かれているが今のところ詳細は確認しない。

**none**
> This value causes an element to not appear in the formatting structure (i.e., in visual media the element generates no boxes and has no effect on layout). Descendant elements do not generate any boxes either; the element and its content are removed from the formatting structure entirely. This behavior cannot be overridden by setting the 'display' property on the descendants.

> Please note that a display of 'none' does not create an invisible box; it creates no box at all. CSS includes mechanisms that enable an element to generate boxes in the formatting structure that affect formatting but are not visible themselves. Please consult the section on visibility for details.

要素がformatting structureに出現しなくなる（要素がboxを生成しなくなり、レイアウト上の効果をあたえなくなる）。子孫要素もboxを生成しなくなる。この振る舞いは子孫要素にdisplayプロパティを設定しても上書きされない。

display:noneは不可視のboxを作るわけではないことが要注意。noneはboxを生成しない。CSSは要素からformatting structureの中にboxを生成することを可能にする機能を含んでいる。これはformattingに影響を与えるが、visible、可視であるかどうかそのものに影響をあたえない。

**table, inline-table, table-row-group, table-column, table-column-group, table-header-group, table-footer-group, table-row, table-cell, and table-caption**
> These values cause an element to behave like a table element (subject to restrictions described in the chapter on tables).

これらの値は、要素にテーブルっぽい振る舞いをもたらす。

> The computed value is the same as the specified value, except for positioned and floating elements (see Relationships between 'display', 'position', and 'float') and for the root element. For the root element, the computed value is changed as described in the section on the relationships between 'display', 'position', and 'float'.

算出される値はpositioned element, floating element, root要素をのぞいて、指定された値と同じになる。displayとposition, floatの関係性についての詳細は今は確認しない。

> Note that although the initial value of 'display' is 'inline', rules in the user agent's default style sheet may override this value. See the sample style sheet for HTML 4 in the appendix.

displayの初期値はinlineだけれども、ブラウザのデフォルトスタイルによって上書きされているかもしれない。

----

なお、none、inline、block、list-itemは、[Can I use CSS 2.1 properties](https://caniuse.com/#search=CSS%202.1%20properties)によるとIE6以降でサポートされており、

table関連の値も[Can I use CSS Table display](https://caniuse.com/#feat=css-table)によるとIE8以降で問題なく使える。

というメモ。
