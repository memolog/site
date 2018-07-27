---
title: npm run script に引数を渡す
featured:
  image: chelsea-aaron-312666-unsplash
  author:  Chelsea Aaron
  authorLink: https://unsplash.com/photos/IeTmKYls1vM?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2018-07-27 05:31:39
---
この記事の上にあるFeatured Imageを生成するときに毎回`primitive_bulk`のコマンドを入力していたのだけど、
しかしさすがに面倒になってきたので、`npm run script` にショートカットを用意してショートカットに引数を渡すようにしてみた。<!-- more -->

今までのコマンド
```bash
primitive_bulk -i ~/Downloads/chelsea-aaron-312666-unsplash.jpg -d ./source/assets/images/chelsea-aaron-312666-unsplash --output chelsea-aaron-312666-unsplash --format jpg,svg -m 0
```

`package.json`に用意したコマンド
```json
"scripts": {
  "pb": "primitive_bulk -i ~/Downloads/$DIRNAME.jpg -d ./source/assets/images/$DIRNAME --output $DIRNAME --format jpg,svg"
},
"devDependencies": {
  "primitive_bulk": "^1.2.1"
}
```

実行例
```bash
DIRNAME=chelsea-aaron-312666-unsplash npm run pb -- -m 0
```

`$DIRNAME`に値を渡しつつ、`--`の後ろで`primitive_bulk`用の追加のオプションを渡している（`-m`の値はそのまま`primitive_bulk`に渡すので）。このショートカットだと入力用のファイルが`~/Downloads`フォルダ以下に`.jpg`で存在しないとエラーになってしまうのだけど、いつもjpgだしまあこの方が良いかなと思っている。

というメモ。

関連記事
* [Primitiveの変換をまとめて行う](https://memolog.org/2018/convert-multiple-primitive-images-at-once.html)
* [Featured Image を設置する](https://memolog.org/2018/display-featured-image.html)
