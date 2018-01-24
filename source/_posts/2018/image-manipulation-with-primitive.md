---
title: Primitiveを使って画像を変換する
date: 2018-01-14 06:44:06
featured:
  author: Rommanas Kongmeng
  image: rommanas-kongmeng-422586
  authorLink: https://unsplash.com/photos/yGIuVb3Pr_k?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
---

Featured Imageとか言いながら、ただ写真を置くだけなのも何だなあとか思い、[Primitive](https://github.com/fogleman/primitive)を使用して、上に表示されている画像を変換してみた。Primitiveは画像を幾何学的なPrimitive（線とか丸、三角、四角）の集まりに変換してくれる。試行錯誤した結果を貼り付けていく。画像の下に変換するときに使用したオプションを添付してある。
<!-- more -->
## オリジナル画像
オリジナル画像はこちら
{% picture src=/blog/assets/images/rommanas-kongmeng-422586/rommanas-kongmeng-422586.jpg color=#2b452d %}

## 変換例
{% picture src=/blog/assets/images/rommanas-kongmeng-422586-beziers3/rommanas-kongmeng-422586-beziers3.jpg color=#2b452d %}
`-n 2000 -m 6`
-nは`number of shapes`で、使用するPrimitiveの数を設定できる。ベジェ(mode=6)の場合、-nが2000だとラフスケッチ的というかまあまあ原形がわかる雰囲気になる。処理は結構時間かかる。

{% picture src=/blog/assets/images/rommanas-kongmeng-422586-beziers4/rommanas-kongmeng-422586-beziers4.jpg color=#2b452d %}
`-n 1000 -m 6`
-nが1000だとだいぶ抽象化が上がる感じ。個人的には好きなバランスで収まっている。

{% picture src=/blog/assets/images/rommanas-kongmeng-422586-beziers7/rommanas-kongmeng-422586-beziers7.jpg color=#2b452d %}
`-n 300 -m 6`
-nが300になるとだとだいぶ謎な感じになる。嫌いではない。Featured Image ならこのくらい謎でも良いような気がしている。

{% picture src=/blog/assets/images/rommanas-kongmeng-422586-beziers6/rommanas-kongmeng-422586-beziers6.jpg color=#2b452d %}
`-n 2000 -m 6 -bg ffffff`

-bgは`starting background color (hex)`で背景色になる。背景を指定していない場合と比べ、背景全体的に線が描かれてだいぶごちゃっとした感じになる。

{% picture src=/blog/assets/images/rommanas-kongmeng-422586-beziers5/rommanas-kongmeng-422586-beziers5.jpg color=#2b452d %}
`-n 1000 -m 6 -bg ffffff`

線の数が少ない状態で背景色を選ぶと、背景の描画に表現力がなくなり、もはや何だかわからない感じになる。

{% picture src=/blog/assets/images/rommanas-kongmeng-422586-beziers2/rommanas-kongmeng-422586-beziers2.jpg color=#2b452d %}
` -n 300 -m 6 -rep 50`
repのオプションは`add N extra shapes each iteration with reduced search (mostly good for beziers)`とあり、-nで設定したshapeそれぞれで追加のshapeを入れてくれる。ので、処理量を減らしつつ書き込みを増やすことができる。

{% picture src=/blog/assets/images/rommanas-kongmeng-422586-beziers/rommanas-kongmeng-422586-beziers.jpg color=#2b452d %}
`-n 300 -m 6 rep 50 -bg ffffff`
背景の白が混じるので、少しデコボコっとした印象になる。

{% picture src=/blog/assets/images/rommanas-kongmeng-422586-beziers12/rommanas-kongmeng-422586-beziers12.jpg color=#2b452d %}
`-n 400 -m 6 -rep 5`

-n 2000 の画像
{% picture src=/blog/assets/images/rommanas-kongmeng-422586-beziers3/rommanas-kongmeng-422586-beziers3.jpg color=#2b452d %}
と比較すると、だいぶ似ているけどけど細部の表現力は劣る感じはある。400の場合が65秒で、2000の場合が257秒なので、処理はまあまあ早くなる（`-n 50 -rep 40`だと18秒だけど表現色は多少落ちる）。

{% picture src=/blog/assets/images/rommanas-kongmeng-422586-compo/rommanas-kongmeng-422586-compo.jpg color=#2b452d %}
`-n 400 -m 8`
combo（丸三角四角のミックス）を使った例。

{% picture src=/blog/assets/images/rommanas-kongmeng-422586-ellipse/rommanas-kongmeng-422586-ellipse.jpg color=#2b452d %}
`-n 400 -m 8`
ellipse（長円）を使った例。ちょっと合わないかなあという感じはある。見慣れてくると逆にありかもと思うときもあるので、何とも言えないけど。

{% picture src=/blog/assets/images/rommanas-kongmeng-422586-triangle/rommanas-kongmeng-422586-triangle.jpg color=#2b452d %}
`-n 400 -m 8`
triangleを使った例。


## Primitive所感
背景がシンプルな画像の方がわりと綺麗にいくように感じた。建物とか細かい描写があると写実さと抽象さみたいなところのバランスが悪い感じになる。サンプルを見ると背景にグラデーションがあるのも良さそうに見える。

写真の対象が鋭角なものはtriangleにするなど、対象の形にあったmodeを使うと綺麗にいきやすい気はする（一方でそれをあえて外してみると良い時もありそうなので何とも言い難いけど）。

多くの場合、オリジナルの写真の方がやっぱり良いなと感じた。写実性を残しすぎるとオリジナルの方が勝り、抽象度を上げすぎると何の写真だかさっぱりわからんという点でなかなか調整が難しい。

Primitiveを使用した画像のサンプルは[@PrimitivePic](https://twitter.com/PrimitivePic)がたくさんアップロードしているので、参考になるかもしれない。

## Primitiveのインストール
PrimitiveはGoで動作するアプリケーションなので、GoがなければまずGoをインストールする必要がある。自分は[HomeBrew](https://brew.sh/)でインストールした。

```bash
brew update
brew install go
```

その後、Primitiveをインストール
```bash
go get -u github.com/fogleman/primitive
```

インストール先のパスが通ってなかったので.bash_profileにPATHを追加
```bash
export PATH=$PATH:/Users/USERNAME/go/bin
```

## 実行時間の計測
下記のように行った。

```bash
start_time=`date +%s` && \
primitive -i rommanas-kongmeng-422586.jpg -r 256 -o rommanas-kongmeng-422586-beziers13.jpg -n 50 -m 6 -rep 40 -s 1500 && \
end_time=`date +%s` && \
time=$((end_time - start_time)) && \
echo $time
```

以上。
