---
title: Create a new icon
featured:
  image: new-icon
  author: null
  authorLink: null
date: 2018-08-12 07:28:32
---
アイコンをsvgで作り直してページの一番上につけた。<!-- more -->

svgにするということでベジェを使って書き直したい、svgフォーマットで書き出したい、しかし専門で使うわけでもないので有料のツールは高くて買う気がおきない... ということで今回は[Inkscape](https://inkscape.org/ja/)を試しに使ってみた。Inkscapeを使った理由は特になく、単に最初に見つかったツールだからである。メニューの場所とか何ができるのかわからないところはたくさんあるけど、フォトショップやイラストレーターと似たような感じではあり、何となく用を満たすことはできた。

Inkscapeのインストールは[homebrew](https://brew.sh/)でできるみたいなので、homebrewでインストールした。[Inkscape 0.92.2 - Mac-Os-X : Homebrew | Inkscape](https://inkscape.org/ja/release/0.92.2/mac-os-x/homebrew/dl/)
に書いてある

```bash
brew install caskformula/caskformula/inkscape
```

だと、`Downloading https://gitlab.com/inkscape/inkscape/commit/93ccf03162cd2e46d962822d5507865f3451168c.diff`のところで`503 Service Unavailable`となってしまいダウンロードが途中で失敗してしまった。[Update on our planned move from Azure to Google Cloud Platform | GitLab](https://about.gitlab.com/2018/07/19/gcp-move-update/)をパッと見た感じでは（読んでない）、ちょうどAzureからGoogle Cloudへの移行メンテナンスとタイミングが重なってしまったようだ。この記事を書いている時点では503にならない様子。

ということで、brew caskを使ってインストールした。

```bash
brew cask install inkscape
```

こちらは`https://inkscape.org/gallery/item/11269/Inkscape-0.92.2-1-x11-10.7-x86_64.dmg`してくるようで、わりとすんなりイントールすることができた。

Inkscapeで作成したファイルはsvgで保存される（みたい）。保存されたsvgをそのまま使うこともできるけど、そのsvgにはInkscapeで使う情報も入ってるみたいなので[ImageOptim](https://imageoptim.com/mac)使って最適化したものをWeb上では使っている。pngへの書き出しをサポートしているので、pngファイルを書き出して、[PWAのチェックリストを満たす | メモログ](/2018/complete-all-the-pwa-checklist.html)でてきとうに用意していたアイコン画像と差し替えた。

というメモ。
