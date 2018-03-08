---
title: Primitiveの変換をまとめて行う
featured:
  image: kazuend-25767
  author: kazuend
  authorLink: https://unsplash.com/photos/JHMDtWaNZaA?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2018-01-30 22:50:15
---
[Primitive](https://github.com/fogleman/primitive) を使って画像を変換すると、だいたい一回目ではしっくりこない。だから何回か画像を変えたりモードを変えてみたりとか色々試すのだけど、これがなかなか面倒くさい。一回の実行にも時間がかかるから待っている間に実行していたことを忘れてしまったりする。だから一回のPrimitiveの実行で全てのモードのパターンを出力するためのスクリプトを用意してみた。[primitive_bulk](https://github.com/memolog/primitive_bulk_output)という名前でnpmに公開している。個人的にはほとんど使っていないオプションもあるけど、一応primitiveのすべてのオプションを渡せるようにしている。名前はそのうち変えるかもしれない。

実行は`primitive_bulk -i photo.jpg`みたいにする。primitiveでは出力先（`-o`）を指定する必要があるが、primitive_bulkでは指定がない場合はphoto.jpgと同じディレクトリに出力ファイルを作成する。これが地味に便利。`-m`の指定がない場合は、modeの0から8まで全ての種類を出力する。primitiveの処理そのものは8回繰り返すのと同じだから、だいぶ重いし時間もそれなりにかかる。でも実行して時が経つのを待つだけなので、だいぶ気は楽になった。<!-- more -->

内容的には特に言うほどのことはしていない。[commander.js](https://github.com/tj/commander.js/)を使って引数をパースして
```javascript
  program
    .version(pkg.version)
    .option('-i, --input <file')
    .option('-o, --output <file>')
    .option('-n, --num <string>')
    .option('-m, --mode <string>')
    .option('--rep <number>')
    .option('--nth <number>')
    .option('-r, --resize <number>')
    .option('-s, --size <number>')
    .option('-a, --alpha <number>')
    .option('--bg <string>')
    .option('-v, --verbose <string>')
    .option('--vv <string>')
    .option('-f, --format <string>')
    .option('-d, --dist <dist>')
    .option('--fname <string>')
    .option('--sync')
    .parse(args);
```

オプションを用途にあわせて調整した上で、`child_process`を使ってprimitiveを実行しているだけである。
```javascript
  const childProcess = require('child_process');
  ...

  for (const key in options) {
    args.push('-' + key, options[key]);
  }

  const cp = childProcess.spawn('primitive', args);
```

単純なんだけど、手作業の回数が減らすことができて気分はだいぶ良い。

以上。
