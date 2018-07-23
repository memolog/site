---
title: last-child は親要素からみて最後の子要素
date: 2012-05-24T15:00:00.000Z
categories:
- web
tags:
- css
---
（そのままではないか）

たとえば以下のようなHTMLがあるとして、<!-- more -->

```html
  <div class="entries">
    <article>foo</article>
    <article>bar</article>

    <article>baz</article>
    <article>qux</article>
    <ul>
      <li><a href="#">next</a></li>
    </ul>
  </div>
```

article要素の最後の子要素に枠線を入れたいとして、下記のようにCSSを入れるとする。でもこれだとうまくいかない。どこにもborderはつかないことになる。

```css
article:last-child{ border:1px solid #ddd; }

```

仕様を参照すると、下記のように書かれている（:last-childは:nth-last-child(1)と同義なので、そちらの仕様）。

> #### 6.6.5.3. :nth-last-child() pseudo-class
>
> The :nth-last-child(an+b) pseudo-class notation represents an element that has **an+b-1 siblings after it** in the document tree ...
>
> [http://www.w3.org/TR/selectors/#nth-last-child-pseudo](http://www.w3.org/TR/selectors/#nth-last-child-pseudo)

:nth-last-child(an+b)では、an+b-1個の兄弟ノード(siblings)が後ろに存在する要素が対象になる。article:last-childの指定は「article要素の最後の要素」という意味ではなく、「兄弟ノードが後ろにない要素（親要素の最後の子要素）で、かつarticle要素」というような意味になる。articleのlast-childではなくて、last-childのarticle。

上の例の場合では、div.entriesの最後にul要素が入っていて、これが「兄弟ノードが後ろにない要素」になる。しかしarticle要素ではないので、CSSの宣言の対象にならない。

この場合、article:nth-last-child(2)というかたちで指定するか、下記のようにHTMLの構造を変更する。

```html
  <div class="entries">
    <article>foo</article>
    <article>bar</article>
    <article>baz</article>
    <article>qux</article>
  </div>
  <ul>
    <li><a href="#">next</a></li>
  </ul>
```

（追記）HTMLを返る必要はなく、article:last-type-of を使用すればいい。
