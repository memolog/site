---
title: Web Workers work on IE10
featured:
  image: josue-isai-ramos-figueroa-Pj4je7OjrME-unsplash
  author: Josue Isai Ramos Figueroa
  authorLink: https://unsplash.com/@jramos10?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2020-02-07 06:18:11
---
JavaScriptはシングルスレッドでイベントドリブンであり、実行を非同期にすることはできるけど、基本的に同時に一つのことしかできない。[Web Workers](https://developer.mozilla.org/ja/docs/Web/API/Web_Workers_API)を使えば、メインスレッドとは別のスレッドで処理を実行することができるので、メインスレッドとは別の処理を同時に実行することができる。Web Workersを使ったメインスレッドの負荷低減は今後のフロンドエンドにおいて必携の技術になると思われる。

なのだけど、Web Workersは意外と歴史があり（よく知らないけど）、IE10でも動作する（[Can I use Web Workers](https://caniuse.com/#feat=webworkers)）。<!-- more -->

IE10はIE8と比べるとだいぶ良いのだけど、それでもES5（ES2015ではない）までしか対応していない（[ECMAScript 5 compatibility table](https://kangax.github.io/compat-table/es5/)）。Fetch API など一部のWeb APIにも対応していない（[Can I use Fetch API](https://caniuse.com/#feat=fetch)）など、いろいろつらい部分がある。

とはいえ、Babelとかでtranspileしてしまえばたぶん問題は起きないと思し、Fetch APIについてもpolyfillを入れることで解決する。だから「Web Workersはモダンブラウザでしか動作しないから、モダンブラウザ向きの処理をしても良い」と誤解しなければ、さほど困らない。たぶん。

このあたり、[Service Worker](https://developer.mozilla.org/ja/docs/Web/API/Service_Worker_API) では少し事情が異なり、Service Workerの場合は、Service Worker自体がモダンブラウザでしか動作しない。Service Worker用のスクリプトはモダンブラウザ向けに書いてしまっても特段問題ない。

Web Workersの方が歴史があるわりに今まで必携の機能ではなかった。プッシュ通知などの機能を持ったService Workerの方がサービスに先に導入されやすい。そうした事情から、Service Workerに携わった後に、Web Workersを導入し始める場合も多いと思う。そこに「Web WorkerもService Workerと同じように動く（モダンブラウザでしか動作しないからそれを前提に作ってもいい）」と誤解するという罠がある。

というメモ。
