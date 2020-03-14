---
title: The Web Worker's lifetime
featured:
  image: harley-davidson-4ixHdlcROPI-unsplash
  author: Harley-Davidson
  authorLink: https://unsplash.com/@harleydavidson?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2020-02-13 20:17:00
---
Web Worker（以下worker）はいつ止まるのか。端的に言うと、画面遷移した時など、関連するDocumentがなくなった時に止まる。workerの実行は`closing`フラグで管理されていて、このフラグがtrueになるとworkerはそれ以降の処理をしなくなる。workerのインスタンスが削除されるかどうかは仕様上では考慮されていない雰囲気だけど（ガベージコレクトされたときに削除されるのではなかろうか）、とにかく、実質的に、closingフラグがtrueになったタイミングでworkerは止まると言える。<!-- more -->

[The worker's lifetime](https://www.w3.org/TR/workers/#the-worker-s-lifetime)には、Workerがどのように他のWorkerやDocumentと関係を持つかが記載されている。端的には、workerは関係するDocumentや、関係する他のworkerのポートのリストを持っている。

それで関係してるDocumentの状態によって、Workerの呼び名（状態）が定義されている。Shared Workerについては記述が煩雑になるので省略。

* **permissible worker**: 何らかのDocumentと関係している場合（リストが空ではない）
* **active needed worker**: 関係するDocumentのいずれかが `fully active` である場合
* **protected worker**: workerがactive needed workerであり、かつ、以下のいずれかの状態である
  * 未処理のタイマー、DBトランザクション、ネットワーク接続を持っている
  * Workerのポートが空ではない
* **suspendable worker**: active needed workerではないがpermissible workerである場合

[fully active](https://html.spec.whatwg.org/multipage/browsers.html#fully-active)は端的に言うと現在利用中の状態であることだから、workerと関連したページが移動したり閉じられたりしなければ、workerは「active needed worker」の状態を保つことになる。suspendable workerは、関係しているDocumentがすべて現在利用中（fully active）ではない場合になる。

そして[Processing model](https://www.w3.org/TR/workers/#processing-model)の10番目と11番目に以下のように記述されている。

> **10\. Closing orphan workers:** Start monitoring the worker such that no sooner than it stops being a protected worker, and no later than it stops being a permissible worker, worker global scope's closing flag is set to true.

> **11\. Suspending workers:** Start monitoring the worker, such that whenever worker global scope's closing flag is false and the worker is a suspendable worker, the user agent suspends execution of script in that worker until such time as either the closing flag switches to true or the worker stops being a suspendable worker.

仕様はShared Workerが考慮された記述なのでわかりにくいのだけど、つまり、関連するドキュメントがなくなりworkerが孤立（orphan）したと判定されたら、workerのclosingフラグがtrueになる。

suspendable状態のworkerはsuspendable状態から復帰（関連しているDocumentがfully activeに戻る）するまではスクリプトの処理を一時中断する。

そしてそして[The event loop](https://www.w3.org/TR/workers/#the-event-loop)には、closingフラグがtrueになったら以降の処理の実行はされなくなる旨が書かれている。

> Once the WorkerGlobalScope's closing flag is set to true, the event loop's task queues must discard any further tasks that would be added to them (tasks already on the queue are unaffected except where otherwise specified). **Effectively, once the closing flag is true, timers stop firing, notifications for all pending background operations are dropped, etc.**

というメモ。

----

参考
* [The event loop](https://www.w3.org/TR/workers/#the-event-loop)
* [The worker's lifetime](https://www.w3.org/TR/workers/#the-worker-s-lifetime)
* [Processing model](https://www.w3.org/TR/workers/#processing-model)
* [What happens to a Web Worker if I close the page that created this Web Worker?](https://stackoverflow.com/questions/20084348/what-happens-to-a-web-worker-if-i-close-the-page-that-created-this-web-worker)が比較的わかりやすい

