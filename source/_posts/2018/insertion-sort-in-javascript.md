---
title: Insertion Sort in JavaScript
featured:
  image: mingwei-dong-651103-unsplash
  author: mingwei dong
  authorLink: https://unsplash.com/photos/irA2xa68xNA?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2018-08-07 05:47:14
---
[Selection Sort in JavaScript](https://memolog.org/2018/selection-sort-in-javascript.html)の記事から引き続き。内容は[挿入ソート](https://en.wikipedia.org/wiki/Insertion_sort)からの抜粋なので詳細はそちらを参照。<!-- more -->

[挿入ソート](https://en.wikipedia.org/wiki/Insertion_sort)は配列から左から順に値を取り出して、ソート済みの配列の適切な場所に値を挿入していく、ということを繰り返し行う。配列は左から順にソート済み状態となり、最後までソート済みになったところで終了。[選択ソート](https://en.wikipedia.org/wiki/Selection_sort)と同じO(n^2)であるけど、選択ソートが取り出す値を見つけるのにソートされていない値をすべて確認しなければならないのに対して、挿入ソートはソート済みの値を比較して挿入位置が見つかったらそこで確認を終えることができる。ので、挿入ソートの方が実際の効率は良いとされている。

{% youtube id=ROalU379l3U title="Insert-sort with Romanian folk dance" %}

実装例は[The Insertion sort algorithm - Ben's Blog](http://blog.benoitvallon.com/sorting-algorithms-in-javascript/the-insertion-sort-algorithm/)と[V8のarray.js](https://github.com/v8/v8/blob/master/src/js/array.js#L645)を参考にしている。

テストの箇所は省略。[Gist](https://gist.github.com/memolog/9e9475a1b91770dd7b25d44904771fbb/6416fc2f3fcfff0c2e0b61fb01ea67c5f1a8b54c)を参照してください。今回は前回の[Selection Sort in JavaScript](https://memolog.org/2018/selection-sort-in-javascript.html)と同じ配列を使って比較してみた。

```javascript
function insertionSort(array, showArray) {
  let count = 0;
  const arrayLength = array.length;
  for (let i=1; i<arrayLength; i++) {
    const a = array[i];
    let j = i-1;
    for (; j>=0; j--) {
      count++;
      const b = array[j];
      if (a < b) {
        array[j+1] = b
      } else {
        break;
      }
    }
    array[j+1] = a;
    if (showArray) {
      console.log(array);
    }
  }
  console.log(`number of iterates: ${count}`);
}
```

実行例
```javascript
> test([bubbleSort, selectionSort, insertionSort], 10, true);
---- bubbleSort ----
[ 8020, 3904, 5318, 5951, 5754, 8284, 9043, 7898, 4501, 5629 ]
[ 3904, 5318, 5951, 5754, 8020, 8284, 7898, 4501, 5629, 9043 ]
[ 3904, 5318, 5754, 5951, 8020, 7898, 4501, 5629, 8284, 9043 ]
[ 3904, 5318, 5754, 5951, 7898, 4501, 5629, 8020, 8284, 9043 ]
[ 3904, 5318, 5754, 5951, 4501, 5629, 7898, 8020, 8284, 9043 ]
[ 3904, 5318, 5754, 4501, 5629, 5951, 7898, 8020, 8284, 9043 ]
[ 3904, 5318, 4501, 5629, 5754, 5951, 7898, 8020, 8284, 9043 ]
[ 3904, 4501, 5318, 5629, 5754, 5951, 7898, 8020, 8284, 9043 ]
number of iterates: 43
sorting: 0.375ms

---- selectionSort ----
[ 8020, 3904, 5318, 5951, 5754, 8284, 9043, 7898, 4501, 5629 ]
[ 3904, 8020, 5318, 5951, 5754, 8284, 9043, 7898, 4501, 5629 ]
[ 3904, 4501, 5318, 5951, 5754, 8284, 9043, 7898, 8020, 5629 ]
[ 3904, 4501, 5318, 5951, 5754, 8284, 9043, 7898, 8020, 5629 ]
[ 3904, 4501, 5318, 5629, 5754, 8284, 9043, 7898, 8020, 5951 ]
[ 3904, 4501, 5318, 5629, 5754, 8284, 9043, 7898, 8020, 5951 ]
[ 3904, 4501, 5318, 5629, 5754, 5951, 9043, 7898, 8020, 8284 ]
[ 3904, 4501, 5318, 5629, 5754, 5951, 7898, 9043, 8020, 8284 ]
[ 3904, 4501, 5318, 5629, 5754, 5951, 7898, 8020, 9043, 8284 ]
[ 3904, 4501, 5318, 5629, 5754, 5951, 7898, 8020, 8284, 9043 ]
number of iterates: 45
sorting: 0.477ms

---- insertionSort ----
[ 8020, 3904, 5318, 5951, 5754, 8284, 9043, 7898, 4501, 5629 ]
[ 3904, 8020, 5318, 5951, 5754, 8284, 9043, 7898, 4501, 5629 ]
[ 3904, 5318, 8020, 5951, 5754, 8284, 9043, 7898, 4501, 5629 ]
[ 3904, 5318, 5951, 8020, 5754, 8284, 9043, 7898, 4501, 5629 ]
[ 3904, 5318, 5754, 5951, 8020, 8284, 9043, 7898, 4501, 5629 ]
[ 3904, 5318, 5754, 5951, 8020, 8284, 9043, 7898, 4501, 5629 ]
[ 3904, 5318, 5754, 5951, 8020, 8284, 9043, 7898, 4501, 5629 ]
[ 3904, 5318, 5754, 5951, 7898, 8020, 8284, 9043, 4501, 5629 ]
[ 3904, 4501, 5318, 5754, 5951, 7898, 8020, 8284, 9043, 5629 ]
[ 3904, 4501, 5318, 5629, 5754, 5951, 7898, 8020, 8284, 9043 ]
number of iterates: 29
sorting: 0.432ms
```

配列の数が10件くらいだと他のソートと比較してそこまで変わらない感じだけど（console.logで途中経過を出力しているせいもある）、繰り返しテストしてみても挿入ソートがわずかに速い感じはある。

```javascript
>  test([bubbleSort, selectionSort, insertionSort], 10000);
---- bubbleSort ----
number of iterates: 49965117
sorting: 181.487ms
---- selectionSort ----
number of iterates: 49995000
sorting: 142.477ms
---- insertionSort ----
number of iterates: 24947072
sorting: 62.062ms

> test([bubbleSort, selectionSort, insertionSort], 10000);
---- bubbleSort ----
number of iterates: 49967415
sorting: 187.717ms
---- selectionSort ----
number of iterates: 49995000
sorting: 133.253ms
---- insertionSort ----
number of iterates: 25001157
sorting: 68.090ms

> test([bubbleSort, selectionSort, insertionSort], 10000);
---- bubbleSort ----
number of iterates: 49925349
sorting: 184.928ms
---- selectionSort ----
number of iterates: 49995000
sorting: 131.695ms
---- insertionSort ----
number of iterates: 24960792
sorting: 66.688ms
```

配列の数が10000件になると挿入ソートの実行時間が顕著に少なくなる。ざっと見た雰囲気では100件くらいでも差が出てくる。

派生形として[Shell sort](https://en.wikipedia.org/wiki/Shellsort)があり、こちらは間隔(gap)をあけた数値同士で挿入ソートをしつつ、だんだんその間隔を狭くして挿入ソートを実行していく。

{%youtube id=CmPA7zE8mx0 title="Shell-sort with Hungarian (Székely) folk dance" %}

動画では、gapを5, 3, 1と狭めつつソートを実行している。このgapをどうやって決めるかのが難しくて、いろいろな決め方が提案されている。complexityもgapの取り方が変わるようで一意的には決まらないようである。

[Binary Insertion Sort](https://www.geeksforgeeks.org/binary-insertion-sort/)は、挿入する位置を探すのに[Binary Search](https://ja.wikipedia.org/wiki/%E4%BA%8C%E5%88%86%E6%8E%A2%E7%B4%A2)を使う。探すのにかかるコストはO(n log n)になる。とはいえ必要なswapにかかるコストがO(n^2)なので、全体もO(n^2)のままになる。値が移動する位置をあらかじめ計算しておくことで、swapの回数を減らすことができる。

[ChakraCore](https://github.com/Microsoft/ChakraCore/blob/17dbf40e9470022795d912bc207a10cfc64ff7e2/lib/Runtime/Library/JavascriptArray.cpp#L6498)の実装ではBinary Insertion Sortを使っていて、要素のswapは[MoveArray](https://github.com/Microsoft/ChakraCore/blob/4e26a257a35878d3944be9dfb5b2da6368b12dc8/lib/Common/Memory/RecyclerPointers.h#L236)メソッドのところで、[memmove](https://linuxjm.osdn.jp/html/LDP_man-pages/man3/memmove.3.html)を使って移動させている。

そのほか[Link list](https://en.wikipedia.org/wiki/Skip_list)や[Skip List](https://en.wikipedia.org/wiki/Linked_list)を使ってswapの回数を減らす方法も紹介されている。

以上。
