---
title: Bubble Sort in JavaScript
featured:
  image: jong-marshes-458354-unsplash
  author: Jong Marshes
  authorLink: https://unsplash.com/photos/79mNMAvSORg?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2018-08-04 07:00:11
---
[Array.prototype.sort について](https://memolog.org/2018/about-array-prototype-sort.html)と[TypedArray.prototype.sort について](https://memolog.org/2018/about-typedarray-prototype-sort.html)で書いたようにビルトインされているsortメソッドが効率的なソートを実行できるように実装されているので、JavaScript上で自前のソートを実装する意味はあまりないのだけど、試しにバブルソートをJavaScript上で作ってみた。<!-- more -->

[バブルソート](https://en.wikipedia.org/wiki/Bubble_sort)は隣り合う値を比較して順序が異なる場合は順番を入れ替える（swap）、ということを繰り返し行う。swapする必要がなくなったらソート終了となる。実装は簡単だけど繰り返しの数が多く実行速度が遅いので実践で使われることはない。でも悪い例みたいのでよく登場する。

下の動画はバブルソートをハンガリアンフォークダンスで表現したもの。うける。開始50秒くらいはただ踊ってるだけである。左から進んで、隣り合う人同士で数値を比較して、大きい人が右側に移動していく。

<iframe width="560" height="315" src="https://www.youtube.com/embed/lyZQPjUT5B4" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

ポイントとしては、

* 先頭から最後まですべての値を比較して、大きい数値を右に移動（swap）していく。
* 上記をswapする必要がなくなるまで上記を繰り返す。ただし比較した最後の値は（その中で一番大きな値なので）次の繰り返しでは比較しなくていい。
* 最後の値からswapしなかった箇所は大きな数値順に並んでいる状態なので、次の繰り返しでは比較しなくていい。

> **Optimizing bubble sort**
The bubble sort algorithm can be easily optimized by observing that the n-th pass finds the n-th largest element and puts it into its final place. So, the inner loop can avoid looking at the last n − 1 items when running for the n-th time:

> More generally, it can happen that more than one element is placed in their final position on a single pass. In particular, after every pass, all elements after the last swap are sorted, and do not need to be checked again. This allows us to skip over a lot of the elements, resulting in about a worst case 50% improvement in comparison count (though no improvement in swap counts), and adds very little complexity because the new code subsumes the "swapped" variable:
https://en.wikipedia.org/wiki/Bubble_sort

実装例は[バブルソート](https://en.wikipedia.org/wiki/Bubble_sort)のwikiや[The Bubble sort algorithm - Ben's Blog](http://blog.benoitvallon.com/sorting-algorithms-in-javascript/the-bubble-sort-algorithm/)などにもあるけど、実装してみたコードは下記。

```javascript
function bubbleSortTest(){
  const arrayLength = 10;
  const array = [];
  for (let i=0; i<arrayLength; i++) {
    array.push(Math.floor(Math.random()*10000));
  }
  console.log(array);
  bubbleSort(array);
}

function bubbleSort(array) {
  const arrayLength = array.length;
  let count = 0;
  let swapped;
  for (let i=arrayLength; i>0; i--) {
    swapped = 0;
    for ( let j=1; j<i; j++ ) {
      const a = array[j-1];
      const b = array[j];
      if (a > b) {
        array[j-1] = b;
        array[j] = a;
        swapped = j;
      }
      count++;
    }
    if (!swapped) {
      break;
    } else {
      i = swapped + 1;
    }
    console.log(array);
  }
  console.log(`number of iterates: ${count}`);
}
```

実行例
```javascript
> bubbleSortTest()
[ 5839, 1225, 6856, 5969, 1429, 1063, 4480, 1099, 7652, 8717 ]
[ 1225, 5839, 5969, 1429, 1063, 4480, 1099, 6856, 7652, 8717 ]
[ 1225, 5839, 1429, 1063, 4480, 1099, 5969, 6856, 7652, 8717 ]
[ 1225, 1429, 1063, 4480, 1099, 5839, 5969, 6856, 7652, 8717 ]
[ 1225, 1063, 1429, 1099, 4480, 5839, 5969, 6856, 7652, 8717 ]
[ 1063, 1225, 1099, 1429, 4480, 5839, 5969, 6856, 7652, 8717 ]
[ 1063, 1099, 1225, 1429, 4480, 5839, 5969, 6856, 7652, 8717 ]
number of iterates: 30

> bubbleSortTest()
[ 1031, 5942, 4589, 9940, 709, 8621, 4132, 3874, 5777, 7329 ]
[ 1031, 4589, 5942, 709, 8621, 4132, 3874, 5777, 7329, 9940 ]
[ 1031, 4589, 709, 5942, 4132, 3874, 5777, 7329, 8621, 9940 ]
[ 1031, 709, 4589, 4132, 3874, 5777, 5942, 7329, 8621, 9940 ]
[ 709, 1031, 4132, 3874, 4589, 5777, 5942, 7329, 8621, 9940 ]
[ 709, 1031, 3874, 4132, 4589, 5777, 5942, 7329, 8621, 9940 ]
number of iterates: 34

> bubbleSortTest()
[ 8733, 1776, 7538, 9281, 9712, 9931, 9236, 1486, 8151, 612 ]
[ 1776, 7538, 8733, 9281, 9712, 9236, 1486, 8151, 612, 9931 ]
[ 1776, 7538, 8733, 9281, 9236, 1486, 8151, 612, 9712, 9931 ]
[ 1776, 7538, 8733, 9236, 1486, 8151, 612, 9281, 9712, 9931 ]
[ 1776, 7538, 8733, 1486, 8151, 612, 9236, 9281, 9712, 9931 ]
[ 1776, 7538, 1486, 8151, 612, 8733, 9236, 9281, 9712, 9931 ]
[ 1776, 1486, 7538, 612, 8151, 8733, 9236, 9281, 9712, 9931 ]
[ 1486, 1776, 612, 7538, 8151, 8733, 9236, 9281, 9712, 9931 ]
[ 1486, 612, 1776, 7538, 8151, 8733, 9236, 9281, 9712, 9931 ]
[ 612, 1486, 1776, 7538, 8151, 8733, 9236, 9281, 9712, 9931 ]
number of iterates: 45
```

バブルソートでは、大きな数値はどんどんswapされるので配列の最後に移動していくのは早く移動できるけど、小さな数値が配列の最初の方に移動するのは、一回の繰り返しで一つずつしか移動できないので遅い。動きの遅い小さな数値を「ウサギとカメ」になぞらえて、カメ（turtles）と呼んでいる。このカメを効率的になくしていくことでバブルソートの効率を改善することができる。

[Cacktail shaker sort（シェーカーソート）](https://en.wikipedia.org/wiki/Cocktail_shaker_sort)では、最初から最後に向かって大きい数値を右に移動させた後に、反対方向（最後から最初）に向かって小さい数値を左に移動させる。これだと小さな数値が配列の最後にあった場合でも、効率的に移動させることができる。

[Comb sort（コムソート）](https://en.wikipedia.org/wiki/Comb_sort)では、隣り合う数値ではなく間隔を空けた2つの数値を比較して、それらをswapさせる。これも小さな数値が配列の最後の方にあった場合に通常のバブルソートよりも早く移動させることができる。

> **Rabbits and turtles**
The distance and direction that elements must move during the sort determine bubble sort's performance because elements move in different directions at different speeds. An element that must move toward the end of the list can move quickly because it can take part in successive swaps. For example, the largest element in the list will win every swap, so it moves to its sorted position on the first pass even if it starts near the beginning. On the other hand, an element that must move toward the beginning of the list cannot move faster than one step per pass, so elements move toward the beginning very slowly. If the smallest element is at the end of the list, it will take n−1 passes to move it to the beginning. This has led to these types of elements being named rabbits and turtles, respectively, after the characters in Aesop's fable of The Tortoise and the Hare.
https://en.wikipedia.org/wiki/Bubble_sort#Rabbits_and_turtles

以上。
