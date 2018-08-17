---
title: inputでwidth&#x3a;100&#x25;を使うと若干はみ出る
date: 2012-06-08T14:21:00.000Z
categories:
- web
tags:
- css
- html
featured:
  image: henrique-ferreira-306706-unsplash
  author: Henrique Ferreira
  authorLink: https://unsplash.com/photos/ySgSnJdPhZg?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
---
input要素にwidth:100&#x25;;を指定すると、微妙に包含ブロックからはみ出す。

なんでだろうなあと思っていたんですけど、input要素にはブラウザのデフォルトでpaddingやborderが入っているので、width:100&#x25;とするとpaddingやborderのサイズ分はみ出してしまうということでした。<!-- more -->

分かってしまうと大した話ではない。

なので、input要素にwidth:100&#x25;に広げるときは、box-sizingをborder-boxに設定するか、padding/borderを削るとかすると、はみ出さずにはまる。うむ。

```css
input[type="text"]{
  width: 100%;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
```

そして蛇足ですけど、[Paul Irish - Google+ - box-sizing: border-box; ...is clearly superior to our...](http://paulirish.com/wp-content/uploads/2011/gplus-boxsizing.html)あたりの話を参考に確認したら、入力系のinput要素のうちtype=searchだけがborder-boxを使用しているみたいです（Firefoxは現状ではcontent-box）。searchのUI的にborder-boxの方が便利ということなのだろうか。

とにかく。たとえばsearchとtext, email, urlなど別のtypeで同じwidthを指定したら、searchだけ少し幅が狭いみたいな現象が発生することになる。いっそのことinput要素はborder-boxに統一した方が便利な気がしなくもない。

そのへん、[normalize.css](http://necolas.github.com/normalize.css/)では、content-boxに統一するようにCSSが用意されていました（一緒にsearch用の外観も外しているんですけど、それをするなら普通にtype=text使えば良いんじゃないかと思わなくもない）。

```css
/*
 * 1. Addresses appearance set to searchfield in S5, Chrome
 * 2. Addresses box-sizing set to border-box in S5, Chrome (include -moz to future-proof)
 */

input[type="search"] {
    -webkit-appearance: textfield; /* 1 */
    -moz-box-sizing: content-box;
    -webkit-box-sizing: content-box; /* 2 */
    box-sizing: content-box;
}

/*
 * Removes inner padding and search cancel button in S5, Chrome on OS X
 */

input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button {
    -webkit-appearance: none;
}
```
