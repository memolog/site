---
title: Selection Sort in JavaScript
featured:
  image: pietro-mattia-764559-unsplash
  author: Pietro Mattia
  authorLink: https://unsplash.com/photos/zXqizKxnbBU?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2018-08-05 05:57:21
---
[Bubble Sort in JavaScript](https://memolog.org/2018/bubble-sort-in-javascript.html)の記事から引き続き。内容はほぼ[選択ソート](https://en.wikipedia.org/wiki/Selection_sort)から抜粋してるだけなので、詳しくはそちらを参照。JavaScript上で自前のソートを実装する意味はあまりないのだが、試しに選択ソートを実装してみた。<!-- more -->

[選択ソート](https://en.wikipedia.org/wiki/Selection_sort)は配列の中から一番小さい値を見つけて、それを配列の最初の値と入れ替える（swap）、ということを繰り返し行う。配列は左（最初）から順々にソート済みの状態となり、最後までソート済みになったところで終了。同じO(n^2)の処理量であるバブルソートよりはたいていの場合高速だけど、[挿入ソート](https://en.wikipedia.org/wiki/Insertion_sort)の方が後半の処理性能が良い。

swapをする回数が1回の繰り返しで1度しか発生しないので、挿入ソートより書き込みする量が少なくて済むけど、書き込み量でいうと[cycle sort](https://en.wikipedia.org/wiki/Cycle_sort)より良くなることはない。書き込み量は[フラッシュメモリ](https://ja.wikipedia.org/wiki/%E3%83%95%E3%83%A9%E3%83%83%E3%82%B7%E3%83%A5%E3%83%A1%E3%83%A2%E3%83%AA#%E5%AF%BF%E5%91%BD)みたいに書き込みが製品寿命を縮めてしまう状況では重要となる。

下の動画は選択ソートをGypsy folk danceで表現したもの。長い... 途中で倍速になるけど長い。最小値が変更されるときにそれぞれの人の場所がswapしてしまってるけど、実際はそのタイミングでswapしない。

{% youtube id=Ns4TPTC8whw title="Select-sort with Gypsy folk dance" %}

実装例は[選択ソート](https://en.wikipedia.org/wiki/Selection_sort#Implementation)や[The Selection sort algorithm - Ben's Blog](http://blog.benoitvallon.com/sorting-algorithms-in-javascript/the-selection-sort-algorithm/)のと変わらないけど下記。

```javascript
function test(method, arrayLength, showArray){
  const array = [];
  for (let i=0; i<arrayLength; i++) {
    array.push(Math.floor(Math.random()*10000));
  }
  if (showArray) {
    console.log(array);
  }
  console.time('sorting');
  method(array, showArray);
  console.timeEnd('sorting');
}
...
function selectionSort(array, showArray) {
  let count = 0;
  const arrayLength = array.length;
  for (let j=0; j<arrayLength - 1; j++) {
    let minIndex = j;
    for (let i=j+1; i<arrayLength; i++) {
      if (array[i] < array[minIndex]) {
        minIndex = i;
      }
      count++;
    }
    if (j !== minIndex) {
      const temp = array[j];
      array[j] = array[minIndex];
      array[minIndex] = temp;
    }
    if (showArray) {
      console.log(array);
    }
  }
  console.log(`number of iterate: ${count}`);
}
```

実装の全体はバブルソートの実装と合わせて[Gist](https://gist.github.com/memolog/9e9475a1b91770dd7b25d44904771fbb)に載せてある。

実行例
```javascript
> test(selectionSort, 10, true);
[ 1409, 5188, 1745, 8167, 4188, 4479, 7428, 482, 6257, 4114 ]
[ 482, 5188, 1745, 8167, 4188, 4479, 7428, 1409, 6257, 4114 ]
[ 482, 1409, 1745, 8167, 4188, 4479, 7428, 5188, 6257, 4114 ]
[ 482, 1409, 1745, 8167, 4188, 4479, 7428, 5188, 6257, 4114 ]
[ 482, 1409, 1745, 4114, 4188, 4479, 7428, 5188, 6257, 8167 ]
[ 482, 1409, 1745, 4114, 4188, 4479, 7428, 5188, 6257, 8167 ]
[ 482, 1409, 1745, 4114, 4188, 4479, 7428, 5188, 6257, 8167 ]
[ 482, 1409, 1745, 4114, 4188, 4479, 5188, 7428, 6257, 8167 ]
[ 482, 1409, 1745, 4114, 4188, 4479, 5188, 6257, 7428, 8167 ]
[ 482, 1409, 1745, 4114, 4188, 4479, 5188, 6257, 7428, 8167 ]
number of iterates: 45
sorting: 0.800ms

> test(selectionSort, 10, true);
[ 1612, 2369, 1126, 4794, 6236, 1002, 4346, 2365, 2331, 5504 ]
[ 1002, 2369, 1126, 4794, 6236, 1612, 4346, 2365, 2331, 5504 ]
[ 1002, 1126, 2369, 4794, 6236, 1612, 4346, 2365, 2331, 5504 ]
[ 1002, 1126, 1612, 4794, 6236, 2369, 4346, 2365, 2331, 5504 ]
[ 1002, 1126, 1612, 2331, 6236, 2369, 4346, 2365, 4794, 5504 ]
[ 1002, 1126, 1612, 2331, 2365, 2369, 4346, 6236, 4794, 5504 ]
[ 1002, 1126, 1612, 2331, 2365, 2369, 4346, 6236, 4794, 5504 ]
[ 1002, 1126, 1612, 2331, 2365, 2369, 4346, 6236, 4794, 5504 ]
[ 1002, 1126, 1612, 2331, 2365, 2369, 4346, 4794, 6236, 5504 ]
[ 1002, 1126, 1612, 2331, 2365, 2369, 4346, 4794, 5504, 6236 ]
number of iterates: 45
sorting: 0.505ms

> test(selectionSort, 10, true);
[ 2478, 4363, 7507, 2617, 133, 1870, 2599, 7785, 1134, 3066 ]
[ 133, 4363, 7507, 2617, 2478, 1870, 2599, 7785, 1134, 3066 ]
[ 133, 1134, 7507, 2617, 2478, 1870, 2599, 7785, 4363, 3066 ]
[ 133, 1134, 1870, 2617, 2478, 7507, 2599, 7785, 4363, 3066 ]
[ 133, 1134, 1870, 2478, 2617, 7507, 2599, 7785, 4363, 3066 ]
[ 133, 1134, 1870, 2478, 2599, 7507, 2617, 7785, 4363, 3066 ]
[ 133, 1134, 1870, 2478, 2599, 2617, 7507, 7785, 4363, 3066 ]
[ 133, 1134, 1870, 2478, 2599, 2617, 3066, 7785, 4363, 7507 ]
[ 133, 1134, 1870, 2478, 2599, 2617, 3066, 4363, 7785, 7507 ]
[ 133, 1134, 1870, 2478, 2599, 2617, 3066, 4363, 7507, 7785 ]
number of iterates: 45
sorting: 0.501ms
```

配列の数が10件くらいだと、バブルソートと変わらない感じはある。環境による違いかもしれない。配列の数が10000件になると選択ソートの方が実行時間が少なくなる。

```javascript
> test(bubbleSort, 10000);
number of iterates: 49988928
sorting: 178.587ms

> test(bubbleSort, 10000);
number of iterates: 49946367
sorting: 178.879ms

> test(bubbleSort, 10000);
number of iterates: 49945386
sorting: 178.817ms

> test(selectionSort, 10000);
number of iterates: 49995000
sorting: 136.341ms

> test(selectionSort, 10000);
number of iterates: 49995000
sorting: 134.343ms

> test(selectionSort, 10000);
number of iterates: 49995000
sorting: 134.303ms
```

ただ配列の数が大きくなると、[merge sort](https://en.wikipedia.org/wiki/Merge_sort)のようなO(n log n)の方が性能が良くなる。

double selection sortでは、一回の繰り返しの中で最小値と最大値を両方探して、それぞれswapする。最小値・最大値を探す回数は減るけど、比較やswapの処理が減るわけではない。

[bingo sort](http://www.ce.sharif.edu/~ghodsi/ds-alg-dic/HTML/bingosort.html)では配列の中の一番大きい数値を探して、一番大きな数値を持つアイテムをすべて配列の最後に移動させていく。配列の中に重複している値が多くある場合は効率的となる。

以上。
