---
title: jQueryで要素を作成するときのパフォーマンス
date: 2013-01-15T16:15:00.000Z
categories:
- web
tags:
- javascript
- jquery
- performance
---
jQueryで要素を作成する場合、[jQuery()のExample](http://api.jquery.com/jQuery/#entry-examples-1)を参考にすると、作り方としては下記の二通りの方法があります。<!-- more -->

```javascript
$( "<div><p>Hello</p></div>" ).appendTo( "body" )
```

```javascript
$( "<div/>", {
    "class": "test",
    text: "Click me!",
    click: function() {
    $( this ).toggleClass( "test" );
  }
}).appendTo( "body" );
```

処理としては、前者は最終的にdocumentFragmentにappendしたdiv要素のinnerHTMLを使って要素を作成して、後者はcreateElementで要素を作成した後に二番目の引数に指定したattributeをそれぞれ設定していく感じ。

それでどちらの方法が処理的に速いのかなと思って、[jsperfにテストを用意してみました](http://jsperf.com/innerhtml-vs-addattribute-later)。このテストでは、前者のinnerHTMLを使用する方が速かったです。後者の場合はattributeを一つずつ設定していくので、結果としてinnerHTMLより遅くなる雰囲気（たぶん）。設定するプロパティが増えてくると、innerHTMLとの差がより顕著に出るかもしれません。

jsperfのテストでは、さらに下記のような素のJavaScriptで実行した場合の結果もつけてみました。素の方が当たり前ですが、色々何もしないので高速。

```javascript
var div = document.createElement('div');
div.setAttribute('class','foobar');
'textContent' in div ? div.textContent = 'foobar' : div.appendChild(document.createTextNode('foobar'));
var $div = $(div);
```

最後の行の「var $div = $(div);」のように、引数がDOMElementの場合はjQueryオブジェクトのcontextにその引数を設定するだけみたいなので、素のJavaScriptでDOMElementを生成して、それをjQueryオブジェクトとしてラップする方が速い雰囲気（buildFragmentの過程で生成されるキャッシュが有効に活用できる場合はjQueryで生成した方が総合的には速いのかもしれないけど未確認）。

このテストの場合、[IE8でtextContentが使用できない](http://www.quirksmode.org/dom/w3c_html.html)ので、そこだけ調整をしています（IE8まで対応したかった）。jQueryにはクロスブラウザを意識した細かい対応が随所にあるので、互換性が低い要素やその操作の場合にはやはりjQueryを使用するのが良さそう。

（追記）[jQuery 1.9でも同様のテストをしてみました](http://jsperf.com/innerhtml-vs-addattribute-later-with-jquery1-9)（上のテストは1.8.3）。createElementしたあとのattributeの設定が簡素化されたようで（[#12840 (Remove (private) parameter "pass" from jQuery.attr and jQuery.access)](http://bugs.jquery.com/ticket/12840)）、innerHTMLと遜色なく動作する雰囲気。createElementした後でchainで個別にattributeを設定する方が少しだけ早い。
