---
title: Convert video files with the ffmpeg.js worker
featured:
  image: greg-rakozy-0LU4vO5iFpM-unsplash
  author: Greg Rakozy
  authorLink: https://unsplash.com/@grakozy?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2020-02-12 05:26:00
---
[Convert screen capture to animation GIF](https://memolog.org/2020/convert-screen-capture-with-ffmpeg.html)の話でffmpegを使ってキャプチャをGIFに変えるということをした。Macだとffmpegのインストールは簡単だしその方が良いと思うけど、環境によっては難しい場合もあるだろうし、そもそもインストールしてはならない状況もあるかもしれない。そんな時に[ffmpeg.js](https://github.com/Kagami/ffmpeg.js)をWeb Workersで動かすのはどうだろうかと思ってやってみた。<!-- more -->

[デモ](https://memolog.github.io/ffmpeg_worker/)。ソースコードは[memolog/ffmpeg_worker](https://github.com/memolog/ffmpeg_worker/blob/master/src/browser/ts/app/app.tsx)あたりにある（とりあえず動くというだけの実装だけど）。ファイルを選択すると、読み込んだファイルをwebmに変換して表示する。見た目は下のキャプチャような感じになる。このデモサイトでは、mp4やmovファイルをwebmに変換できるけれど、iPhoneで撮った動画はエラーになって変換できない（おそらくエンコーダ的にffmpeg-worker-mp4.jsの方を使わないといけない）

<img src="/assets/images/screen_ffmpegjs.png" width="400" style="border:5px solid #f0f0f0" />

基本的な実装は二つで、一つはWeb Workerを起動させて実行結果を受け取る処理。ffmpeg.jsは変換処理が終わるとWorker自身に`done`イベントを送るのでそこで実行結果を受け取る。

```javascript
this.worker = new Worker("./lib/ffmpeg-worker-webm.js");
this.worker.addEventListener("message", ev => {
  const msg = ev.data;
  const type = msg?.type ?? "";
  switch (type) {
    case "done":
      const data = msg?.data?.MEMFS[0]?.data;
      this.setState({
        converted: URL.createObjectURL(new Blob([data])),
      });
      break;
  }
});
```

もう一つは`type="file"`のchangeイベントで、`event.target.files`からファイルオブジェクトを受け取って、ArrayBufferにしてworkerに渡す処理。

```javascript
const reader = new FileReader();
reader.onload = () => {
  const result = reader.result;
  if (result instanceof ArrayBuffer) {
    this.worker.postMessage({
      type: "run",
      MEMFS: [{ name: file.name, data: result }],
      arguments: ["-y", "-i", file.name, "-crf", "30", "-b:v", "0", "out.webm"],
    });
  }
};
reader.readAsArrayBuffer(file);
```

上のキャプチャで使った動画は[Cosmic Origin of the Chemical Elements](https://ocw.mit.edu/resources/res-8-007-cosmic-origin-of-the-chemical-elements-fall-2019/Videos/episode1/)の講義からダウンロードしてきたものだけど、12MBのデータを10MBに、見た感じ劣化もなく変換することができたと思う。実行時間は測ってないけど10分とかもうちょっとかかってたかも。

それで、動画をGIFに変換できるのかというと、、できない。Githubの[GIF Encoding?](https://github.com/Kagami/ffmpeg.js/issues/66)のissueによると、Makefileにgifを追加してビルドすれば対応できるらしい。それで[Build instructions](https://github.com/Kagami/ffmpeg.js#build-instructions)を参考にビルドしようと試みたのだが、[Can't compile with recent emscripten.](https://github.com/Kagami/ffmpeg.js/issues/85)と同じところでエラーになって手詰まりになって諦めた。

というメモ。
