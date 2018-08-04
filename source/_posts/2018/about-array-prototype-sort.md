---
title: Array.prototype.sort について
featured:
  image: max-panama-387781-unsplash
  author: Max Panamá
  authorLink: https://unsplash.com/photos/Gt1A0jNzzbM?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2018-07-30 05:49:48
---
JavaScriptの配列には[sort](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)メソッドがあり配列のソートを実行することができるけど、この配列のソートの中の実装はどうなっているのかという話。[v8における配列ソートについて](http://kakts-tec.hatenablog.com/entry/2016/12/18/153845)の記事が大変参考になりました。<!-- more -->

Chrome(V8)の実装は[array.js](https://github.com/v8/v8/blob/master/src/js/array.js#L645)にあり、配列の要素数が10以下の場合は[Insertion sort](https://en.wikipedia.org/wiki/Insertion_sort)を使い、それ以上の場合は[Quicksort](https://en.wikipedia.org/wiki/Quicksort)を利用する。Insersion sortの計算量はO(n^2)であるけど、少ない要素数の場合はQuicksortなどより高速になるらしい。[直近のcommmit](https://github.com/v8/v8/commit/f7bad08397d922d7fe0bc10624f517c6f5412595)を見る限りだと、Chrome 69か70あたりで[Timsort](https://en.wikipedia.org/wiki/Timsort)に置き換えるつもりらしい。TimsortはaverageがO(n log n)で、最悪でもO(n log n)の計算量で済む。QuicksortをTimSortに置き換えるつもりに至った経緯などは調べてない（ので間違ってるかも）。Quicksortはstableではないソートであるけど、Timesortは[stable sort](https://ja.wikipedia.org/wiki/%E5%AE%89%E5%AE%9A%E3%82%BD%E3%83%BC%E3%83%88)になるので、その辺りの挙動は変わってくるかもしれない。

Firefox(Gecko)の実装は[Array.js](https://github.com/mozilla/gecko-dev/blob/64077545fac88592352819da9d5097d10d521667/js/src/builtin/Array.js#L186)あたりと思われる。最初にnative codeでの実装（[js/src/builtin/Array.cpp](https://github.com/mozilla/gecko-dev/blob/a80651653faa78fa4dfbd238d099c2aad1cec304/js/src/builtin/Array.cpp)）を試すようになっている。ざっと見た感じでは[Merge sort](https://en.wikipedia.org/wiki/Merge_sort)が使われている。Merge sortはaverageでO(n log n)の計算量になる。[TypedArrayの実装](https://github.com/mozilla/gecko-dev/blob/8d9f459c772562e5d8e2e12f53a005ab38293a70/js/src/builtin/TypedArray.js#L1159)ではQuicksortなどが使われている。

Safari(Webkit)の実装は[ArrayPrototype.js](https://github.com/WebKit/webkit/blob/master/Source/JavaScriptCore/builtins/ArrayPrototype.js)あたりと思われる。[What is the sorting algorithm behind a Javascript Array.sort method?](https://www.quora.com/What-is-the-sorting-algorithm-behind-a-Javascript-Array-sort-method)あたりの話だと、以前は[Selection sort](https://en.wikipedia.org/wiki/Selection_sort)が使われていたそうだが、現在の実装を見る限りではMerge sortが使われているようだ。

Microsoft Edege(ChakraCore)の実装は（EntrySortメソッドから入ってなんやかんやあって）[JavascriptArray.cpp](https://github.com/Microsoft/ChakraCore/blob/17dbf40e9470022795d912bc207a10cfc64ff7e2/lib/Runtime/Library/JavascriptArray.cpp#L6498)あたりになると思われる。配列の要素数が512個より大きい場合はQuicksortを使用する。512個以下の場合は見た感じ[Binary Insertion Sort](https://www.geeksforgeeks.org/binary-insertion-sort/)であると思われる。

という感じで、ざっとそれぞれのブラウザの実装を見たのですけど、Quicksort、Merge sort、Timsortで実装されているのがわかった。実装の違いはあるにせよ、ビック・オー的にはO(n log n)とみなしても問題ないのだろうと思う。

ChromeのsortがTimsortになると各ブラウザのsortの返りはstableになると思われるが、[ECMA2015の仕様](https://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.sort)では、sortメソッドにおいてstable sortである必要はないとされている。なので、実際にはstableな状態で返ってくるとしても、JavaScriptのsortはstable sortではないと認識しておいた方がいい。

> The elements of this array are sorted. The sort is not necessarily stable (that is, elements that compare equal do not necessarily remain in their original order). If comparefn is not undefined, it should be a function that accepts two arguments x and y and returns a negative value if x < y, zero if x = y, or a positive value if x > y.
https://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.sort

---
そしてこれは蛇足で調べ中に知ったのですが、`[100, 20, 0].sort()`みたいに、compare function なしでソートを実行すると、デフォルトでUnicodeコードポイントの昇順にソートにされる（文字列として評価される）。だから結果は`[0, 100, 20]`となる。[TypedArray](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/sort)の場合は数値として評価される。

>The following version of SortCompare is used by %TypedArray%.prototype.sort. It performs a numeric comparison rather than the string comparison used in 22.1.3.24. SortCompare has access to the comparefn and buffer values of the current invocation of the sort method.
https://www.ecma-international.org/ecma-262/6.0/#sec-%typedarray%.prototype.sort

その他参考。
* [高速な安定ソートアルゴリズム "TimSort" の解説](https://research.preferred.jp/2011/10/tim-sort/)
* [Why is the optimal cut-off for switching from Quicksort to Insertion sort machine dependent?](https://cs.stackexchange.com/questions/37956/why-is-the-optimal-cut-off-for-switching-from-quicksort-to-insertion-sort-machin)
* [Is there ever a good reason to use Insertion Sort?](https://stackoverflow.com/questions/736920/is-there-ever-a-good-reason-to-use-insertion-sort)
* [Sorting in place](https://stackoverflow.com/questions/16585507/sorting-in-place)
* [Javascript Array.sort implementation?](https://stackoverflow.com/questions/234683/javascript-array-sort-implementation)

以上。
