---
title: Convert screen capture to animation GIF
featured:
  image: jakob-owens-CiUR8zISX60-unsplash
  author: Jakob Owens
  authorLink: https://unsplash.com/@jakobowens1?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2020-02-10 06:49:09
---
Macの場合、[Quicktime Player](https://support.apple.com/ja-jp/HT201066#record)のファイルメニューの「新規画面収録」から簡単にスクリーンキャプチャを録画することができる（iPhoneの場合は[iPhone、iPad、iPod touch で画面を録画する方法](https://support.apple.com/ja-jp/HT207935)参照）。再現性が難しいケースなどで複雑な手順を書き記すよりずっとわかりやすく動作を見せることができるのでとても便利。だけれども、動画はmov形式で保存されるので、githubのissueに貼り付ける事ができない。なので、[ffmpeg](https://www.ffmpeg.org/)を使ってgifに変換しようという話。gifならgithubのissueに貼り付けられる。<!-- more -->

ffmpegのインストールは[Homebrew](https://brew.sh/)にて行う。

```bash
brew install ffmpeg
```

ffmpegをインストールしたら、以下のようなコマンドを実行

```bash
ffmpeg -i foo.mov -r 24 foo.gif
```

`-r`のオプションは[フレームレート](https://ja.wikipedia.org/wiki/%E3%83%95%E3%83%AC%E3%83%BC%E3%83%A0%E3%83%AC%E3%83%BC%E3%83%88)の設定でfpsで指定する。このオプションはなくても良いけど、24くらいなら品質を損わずにファイルサイズを減らすことができる。場合によってはもっと減らしても大丈夫と思う。

というメモ。
