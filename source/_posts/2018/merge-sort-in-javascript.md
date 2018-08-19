---
title: Merge Sort in JavaScript
featured:
  image: tj-holowaychuk-62184-unsplash
  author: Tj Holowaychu
  authorLink: https://unsplash.com/photos/lssS7acGDls?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2018-08-19 17:43:28
---
[Insertion Sort in JavaScript](https://memolog.org/2018/insertion-sort-in-javascript.html)からの引き続き。内容は[Merge sort](https://en.wikipedia.org/wiki/Merge_sort)からの抜粋なので、詳細はそちらを参照。<!-- more -->

マージソートにはn個の配列を、n個のサブ配列（配列の中には1個の要素が入ってる）に分割していって、それぞれソートした2つの配列を結合して、結合した配列でソートを行う。そして結合した2つ配列を結合して、ソートする...ということを繰り返していく。

{%  youtube id=XaqR3G_NVoo title="Merge-sort with Transylvanian-saxon (German) folk dance" %}

マージソートはトップダウンで行う実装とボトムアップで行う実装とがある。下の実装例は[Merge sort](https://en.wikipedia.org/wiki/Merge_sort#Top-down_implementation)のTop-down implementationをそのままJavaScriptに置き換えただけである。二つの配列を交互に使いまわしていく。ので、ちょっとわかりにくい。[The Merge sort algorithm - Ben's Blog](http://blog.benoitvallon.com/sorting-algorithms-in-javascript/the-merge-sort-algorithm/)にあるコードの方が見やすい。けど、マージを実行するたびに新しく配列を作成した上にそれをconcatで渡すので、上記URLの実装だと空間計算量的には良くない。

```javascript
function topDownMerge(sourceArray, begin, middle, end, resultArray, showArray, count) {
  let i = begin;
  let j = middle;

  for (let k = begin; k < end; k++) {
    if (i < middle && (j >= end || sourceArray[i] <= sourceArray[j])) {
      resultArray[k] = sourceArray[i];
      i = i + 1;
    } else {
      resultArray[k] = sourceArray[j];
      j = j + 1;
    }
    count.count++;
  }

  if (showArray) {
    console.log(resultArray);
  }
}

function topDownSplitMerge(sourceArray, begin, end, sortingArray, showArray, count) {
  const length = end - begin;
  if (length < 2) {
    return;
  }

  const middle = Math.floor((end + begin) / 2);

  topDownSplitMerge(sortingArray, begin, middle, sourceArray, showArray, count);
  topDownSplitMerge(sortingArray, middle, end, sourceArray, showArray, count);

  topDownMerge(sourceArray, begin, middle, end, sortingArray, showArray, count);
}

function topDownMergeSort(array, showArray) {
  const count = {
    count: 0
  };
  const workingArray = array.slice(); // copy array
  topDownSplitMerge(workingArray, 0, array.length, array, showArray, count);
  if (showArray) {
    console.log(array);
  }
  console.log(`number of iterates: ${count.count}`);
}
```

実行結果は以下のような感じ。スクリプトの全体は[Gist](https://gist.github.com/memolog/9e9475a1b91770dd7b25d44904771fbb/8e9c6274ebc743d9c29ac9868766db0e867c2f67)を参照。

配列が10要素の場合。
```javascript
node sortTest.js bubbleSort,selectionSort,insertionSort,topDownMergeSort 10 true
---- bubbleSort ----
[ 6489, 8505, 29, 5467, 2480, 3854, 4478, 2629, 8693, 2504 ]
[ 6489, 29, 5467, 2480, 3854, 4478, 2629, 8505, 2504, 8693 ]
[ 29, 5467, 2480, 3854, 4478, 2629, 6489, 2504, 8505, 8693 ]
[ 29, 2480, 3854, 4478, 2629, 5467, 2504, 6489, 8505, 8693 ]
[ 29, 2480, 3854, 2629, 4478, 2504, 5467, 6489, 8505, 8693 ]
[ 29, 2480, 2629, 3854, 2504, 4478, 5467, 6489, 8505, 8693 ]
[ 29, 2480, 2629, 2504, 3854, 4478, 5467, 6489, 8505, 8693 ]
[ 29, 2480, 2504, 2629, 3854, 4478, 5467, 6489, 8505, 8693 ]
number of iterates: 44
sorting: 0.692ms
---- selectionSort ----
[ 6489, 8505, 29, 5467, 2480, 3854, 4478, 2629, 8693, 2504 ]
[ 29, 8505, 6489, 5467, 2480, 3854, 4478, 2629, 8693, 2504 ]
[ 29, 2480, 6489, 5467, 8505, 3854, 4478, 2629, 8693, 2504 ]
[ 29, 2480, 2504, 5467, 8505, 3854, 4478, 2629, 8693, 6489 ]
[ 29, 2480, 2504, 2629, 8505, 3854, 4478, 5467, 8693, 6489 ]
[ 29, 2480, 2504, 2629, 3854, 8505, 4478, 5467, 8693, 6489 ]
[ 29, 2480, 2504, 2629, 3854, 4478, 8505, 5467, 8693, 6489 ]
[ 29, 2480, 2504, 2629, 3854, 4478, 5467, 8505, 8693, 6489 ]
[ 29, 2480, 2504, 2629, 3854, 4478, 5467, 6489, 8693, 8505 ]
[ 29, 2480, 2504, 2629, 3854, 4478, 5467, 6489, 8505, 8693 ]
number of iterates: 45
sorting: 0.605ms
---- insertionSort ----
[ 6489, 8505, 29, 5467, 2480, 3854, 4478, 2629, 8693, 2504 ]
[ 6489, 8505, 29, 5467, 2480, 3854, 4478, 2629, 8693, 2504 ]
[ 29, 6489, 8505, 5467, 2480, 3854, 4478, 2629, 8693, 2504 ]
[ 29, 5467, 6489, 8505, 2480, 3854, 4478, 2629, 8693, 2504 ]
[ 29, 2480, 5467, 6489, 8505, 3854, 4478, 2629, 8693, 2504 ]
[ 29, 2480, 3854, 5467, 6489, 8505, 4478, 2629, 8693, 2504 ]
[ 29, 2480, 3854, 4478, 5467, 6489, 8505, 2629, 8693, 2504 ]
[ 29, 2480, 2629, 3854, 4478, 5467, 6489, 8505, 8693, 2504 ]
[ 29, 2480, 2629, 3854, 4478, 5467, 6489, 8505, 8693, 2504 ]
[ 29, 2480, 2504, 2629, 3854, 4478, 5467, 6489, 8505, 8693 ]
number of iterates: 33
sorting: 0.559ms
---- topDownMergeSort ----
[ 6489, 8505, 29, 5467, 2480, 3854, 4478, 2629, 8693, 2504 ]
[ 6489, 8505, 29, 5467, 2480, 3854, 4478, 2629, 8693, 2504 ]
[ 6489, 8505, 29, 2480, 5467, 3854, 4478, 2629, 8693, 2504 ]
[ 6489, 8505, 29, 2480, 5467, 3854, 4478, 2629, 8693, 2504 ]
[ 29, 2480, 5467, 6489, 8505, 3854, 4478, 2629, 8693, 2504 ]
[ 6489, 8505, 29, 2480, 5467, 3854, 4478, 2629, 8693, 2504 ]
[ 29, 2480, 5467, 6489, 8505, 3854, 4478, 2629, 2504, 8693 ]
[ 6489, 8505, 29, 2480, 5467, 3854, 4478, 2504, 2629, 8693 ]
[ 29, 2480, 5467, 6489, 8505, 2504, 2629, 3854, 4478, 8693 ]
[ 29, 2480, 2504, 2629, 3854, 4478, 5467, 6489, 8505, 8693 ]
[ 29, 2480, 2504, 2629, 3854, 4478, 5467, 6489, 8505, 8693 ]
number of iterates: 34
sorting: 0.817ms
```

10件くらいだと他のソートとあまり変わらない。再帰するオーバーヘッドがある分、[挿入ソート](https://en.wikipedia.org/wiki/Insertion_sort)の方が効率的と言われている。

10000件で実行すると以下のような感じ。マージソートはかなり速い。
```javascript
node sortTest.js bubbleSort,selectionSort,insertionSort,topDownMergeSort 10000
---- bubbleSort ----
number of iterates: 49909120
sorting: 230.373ms
---- selectionSort ----
number of iterates: 49995000
sorting: 134.691ms
---- insertionSort ----
number of iterates: 24925812
sorting: 61.047ms
---- topDownMergeSort ----
number of iterates: 133616
sorting: 6.362ms
```

マージソートの実装は一般的に[in place](https://ja.wikipedia.org/wiki/In-place%E3%82%A2%E3%83%AB%E3%82%B4%E3%83%AA%E3%82%BA%E3%83%A0)ではなく、空間計算量のコストがO(n)かかる。wikiにはそのコストを2/nにしたり、in placeな実装にするといった提案がいくつか掲載されている。

tiled merge sortでは、[locality of reference](https://ja.wikipedia.org/wiki/%E5%8F%82%E7%85%A7%E3%81%AE%E5%B1%80%E6%89%80%E6%80%A7)を最適にするためにサブ配列をS個（CPUのキャッシュに最適になる個数）の配列に分割するところでストップして、そのサブ配列をin placeな挿入ソートでソートするという

[ヒープソート](https://en.wikipedia.org/wiki/Heapsort)は処理計算量では同じO(n log n)である一方空間計算量はθ(1)のみ求められる。また、効率的に実装された[Quicksort](https://en.wikipedia.org/wiki/Quicksort)はRAM-basedな配列をソートする場合、マージソートよりも効率的らしい。

> Although heapsort has the same time bounds as merge sort, it requires only Θ(1) auxiliary space instead of merge sort's Θ(n). On typical modern architectures, efficient quicksort implementations generally outperform mergesort for sorting RAM-based arrays.[citation needed] On the other hand, merge sort is a stable sort and is more efficient at handling slow-to-access sequential media.
https://en.wikipedia.org/wiki/Merge_sort#Comparison_with_other_sort_algorithms

以上。
