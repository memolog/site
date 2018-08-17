---
title: IE10 で input フォームでエンターすると button要素 に click イベントが発生する
date: 2013-08-09T14:55:00.000Z
categories:
- web
tags:
- ie
featured:
  image: dave-blahlentino-149508-unsplash
  author: Dave Blahlentino
  authorLink: https://unsplash.com/photos/iRm292XKwA4?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText

---
[javascript - IE10 find first button on page and trigger click event on input submit - Stack Overflow](http://stackoverflow.com/questions/13497606/ie10-find-first-button-on-page-and-trigger-click-event-on-input-submit)参考。Internet Explorer 10 にて input fieldで Enter keyを押すと、<button>要素にclick eventが発生する。

<!-- more -->

理由としては、button elementは、type属性が省略されている場合のdefaultが「submit」であるためらしい。[w3cのspec](http://www.w3.org/html/wg/drafts/html/master/forms.html#the-button-element)にも「default is the Submit Button state」と記述されている。IE10では、button要素でtype属性が省略されている場合、submitと同じと見なして、input fieldでエンターしたときに、buttonに対してclickイベントが発生させる、ということみたい。

対策としては、submitではないbuttonではtype="button"というように、属性を明記すること。またはinput fieldをform要素で囲うこと（同じformに存在するbuttonが、click eventを発生させる対象のボタンになる）。

input fieldがform要素で囲われていない場合は、document全体で最初に見つかったbutton要素（form要素で囲われていない）に対して、clickイベントが発生する。そのため、わりと予想しないところでclick eventが発生することになる可能性があり、びっくりすることになる。[現象確認用のcodepen](http://codepen.io/memolog/pen/afGmI)

form要素に囲われていないようなbuttonで、submitする意図がないことが明白な場合でも、button要素には適切なtype属性をつけておく方が良さそう。

というメモ（わりと走り書き）。
