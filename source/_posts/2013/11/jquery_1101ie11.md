---
title: jQuery 1.10.1とIE11の組み合わせでエラーが発生する場合がある
date: 2013-11-20T20:00:00.000Z
categories:
- web
tags:
- javascript
- jquery
---
モーダルなどjQueryでiframeを開いた場合に、jQuery 1.10.1とIE11の組み合わせだとエラーが発生する。ので、モーダル使っているなら、1.10.2にアップデートしないといけない。これはバンドルされてるSizzleに下記のような処理があるため。<!-- more -->

```javascript
setDocument = Sizzle.setDocument = function( node ) {
  var doc = node ? node.ownerDocument || node : preferredDoc,
    parent = doc.parentWindow;

  (... snip ...)

  // Support: IE>8
  // If iframe document is assigned to "document" variable and if iframe has been reloaded,
  // IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
  if ( parent && parent.frameElement ) {
    parent.attachEvent( "onbeforeunload", function() {
      setDocument();
    });
  }
```

parentWindowで値がとれて、かつframeElement（iframeとか）があると、attachEventが実行される。IE11にはattachEventは存在しないので、エラーとなるみたいな感じ。parentWindowは[quirksmode](http://www.quirksmode.org/dom/w3c_html.html)によるとIE（と古いOpera）でのみ使われているプロパティ。

この処理が、1.10.2だと下記のようになる。

```javascript
setDocument = Sizzle.setDocument = function( node ) {
  var doc = node ? node.ownerDocument || node : preferredDoc,
    parent = doc.defaultView;

  (... snip ...)

  // Support: IE>8
  // If iframe document is assigned to "document" variable and if iframe has been reloaded,
  // IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
  // IE6-8 do not support the defaultView property so parent will be undefined
  if ( parent && parent.attachEvent && parent !== parent.top ) {
    parent.attachEvent( "onbeforeunload", function() {
      setDocument();
    });
  }
```

parentにattachEventメソッドがある場合のみに実行されるので、IE11では処理されなくなる。parentの取得がparentWindowからdefaultViewになっているのは（[defaultViewはIE9以降しか使えない](http://www.quirksmode.org/dom/w3c_html.html)）、そもそもこの対応は[#13936 (SCRIPT70 Permission denied in selectors after iframe was submitted in IE9-10, jQuery 1.9.1 and 2.0.0)](http://bugs.jquery.com/ticket/14535)のissueに対するものなので、IE8以前は不要だからみたい。

ということで、1.10.2であればIE11でもエラーが発生しない。

けれども、どうも#13936の問題はIE11でも発生するようで、[#14535 (Selection fails in IE11 when the last context is a no-longer-present iframe document)](http://bugs.jquery.com/ticket/14535)で追加修正が1.11で入りそうな様子（child iframeでreloadをさせなければ発生しない問題みたい）。

というメモ。
