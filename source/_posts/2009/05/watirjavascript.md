---
title: watirでJavascriptのアラートを操作する
date: 2009-05-09T16:27:30.000Z
categories:
- software testing
tags:
- watir
---
watirで操作をしているときに、Javascriptのアラートを操作しないといけないときがたまにあります。私は、最近は下記のようにautoitを使って操作しています。<!-- more -->

```ruby
def handling_javascript()
  title = @ie.Name
  Watir.autoit.WinWait(title,"","10")
  if Watir.autoit.WinExists(title) == 1
    Watir.autoit.ControlFocus(title,"","")
    Watir.autoit.ControlClick(title,"","OK")
  end
end

```

title=@ie.Name では、IEの名称を取得しています。これはJavascriptのアラートを操作するときのwindowのtitleとして必要なのですが、IEの名称はIE6とIE7以降では異なるため、その都度取得しています。WinWaitは、titleに合致したwindowが表示されるまで待ちます。3つ目の引数でタイムアウトを設定できます。WinExistsは、titleで指定したwindowが存在する場合は1を返します。ControlFocusはtitleで指定したwindowにフォーカスします。ControlClickではtitleで指定したwindowにある、3つ目の引数で指定した文字列のボタンをクリックします。

これだけなのですが、最低限の操作はこれで可能です。そのほかJavascriptの操作の方法は、[watirのFAQ](http://wiki.openqa.org/display/WTR/JavaScript+Pop+Ups)や[WinClickerによる操作](http://wtr.rubyforge.org/rdoc/)とかを参照するといいかもしれません。
