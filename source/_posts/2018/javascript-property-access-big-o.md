---
title: JavaScriptオブジェクトのプロパティアクセスにおけるビッグ・オー
featured:
  image: emre-karatas-194353-unsplash
  author: Emre Karataş
  authorLink: https://unsplash.com/photos/Ib2e4-Qy9mQ?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2018-07-23 20:51:00
---
配列に格納しているオブジェクトをそのIDで検索するとしたら、ES2015的にはfindを使って検索する。処理量は（線形探索だろうから）ビッグ・オー記法としては `O(n)` になるだろう。<!-- more -->

```javascript
const obj = array.find( item => item.id === id );
```

配列の数が多くなければそこまで気にしなくて良いかもしれないけど
```javascript
entries.forEach(entry => {
  const image = images.find( image => image.id === entry.id )
  entry.image = image
});
```

みたいな感じで、M個の記事についてN個の画像の中から対象になる画像を選んでプロパティに割り当てるみたいなことをしだすと処理量は `O(M*N)` となり、パフォーマンスの懸念は大きくなる（imageのidとentryのidは同じ値のものが入ると想定）。例えば、10個の記事について10個の画像中から対象の画像を探そうとすると、100回の処理が必要になる。これが20個の記事で20個の画像になれば400回になり、数が増えれば増えるだけ処理量が上がっていく。

この場合、IDをキーにしたマップを作成してそこから探す方がいい。

```javascript
const imagesMap = {};
images.forEach( image => imagesMap[image.id] = image );
entries.forEach( entry => entry.image = imageMap[entry.id] )
```

処理量的には `O(N+M)` となるので、良いように思う。

ちなみに上の処理量は、オブジェクトのプロパティへのアクセス（およびinsert）が `O(1)` の処理量で終わることを前提にしているけれど、
オブジェクトのプロパティにアクセスするときにどのくらいの処理量でデータが取得できるかどうかについては特に仕様がない。

[A Survey of the JavaScript Programming Language](https://crockford.com/javascript/survey.html)によると、オブジェクトはたいていの場合ハッシュテーブルで実装されているようで、`O(1)` でデータの取得と追加ができると考えて良いように思う。とはいえ明確にそうとは言えない。

> Objects are usually implemented as hash-tables, but none of the hash-table nature (such as hash functions or rehashing methods) is visible.
https://crockford.com/javascript/survey.html

ES2015では新しく[Map](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Map)が用意されていて、こちらは[ECMAの仕様](http://www.ecma-international.org/ecma-262/6.0/index.html#sec-map-objects)によると、線形よりも低い（sublinear）処理量になるように規定されている。

>Map object must be implemented using either hash tables or other mechanisms that, on average, provide access times that are sublinear on the number of elements in the collection. The data structures used in this Map objects specification is only intended to describe the required observable semantics of Map objects. It is not intended to be a viable implementation model.
http://www.ecma-international.org/ecma-262/6.0/index.html#sec-map-objects

ハッシュテーブルで実装されているかどうかはブラウザの実装を確認しないとわからない。[連想配列](https://en.wikipedia.org/wiki/Associative_array)の説明を読むと、[ハッシュテーブル](https://en.wikipedia.org/wiki/Hash_table)か[探索木](https://en.wikipedia.org/wiki/Search_tree)が代表的な実装方法で、探索木では平衡二分探索木が使われるようだ。

>Compared to hash tables, these structures have both advantages and weaknesses. The worst-case performance of self-balancing binary search trees is significantly better than that of a hash table, with a time complexity in big O notation of O(log n). This is in contrast to hash tables, whose worst-case performance involves all elements sharing a single bucket, resulting in O(n) time complexity. In addition, and like all binary search trees, self-balancing binary search trees keep their elements in order. Thus, traversing its elements follows a least-to-greatest pattern, whereas traversing a hash table can result in elements being in seemingly random order. However, hash tables have a much better average-case time complexity than self-balancing binary search trees of O(1), and their worst-case performance is highly unlikely when a good hash function is used.
https://en.wikipedia.org/wiki/Associative_array#Comparison

平衡二分探索木（Self-balancing binary search trees）での実装とハッシュテーブルを比較すると、最悪なケースの場合のパフォーマンスは平衡二分探索木の方が `O(log n)` で良くなる。一方ハッシュテーブルは最悪のケース（すべての要素が同じ場所に格納されてしまう）では `O(n)` になる（線形探索と同じになる）。とはいえ、平均的なケースではハッシュテーブルは `O(1)` の処理量で済むし、ハッシュ関数がうまく実装されていれば最悪のケースになる可能性は低いと。

Mapオブジェクトを利用すると下記のような感じになる。

```javascript
const imageMap = new Map();
images.forEach( image => imageMap.set(image.id, image) );
entries.forEach( entry => entry.image = imageMap.get(entry.id) );
```

Mapオブジェクトも中の実装はハッシュテーブルであると想定しても大丈夫な気はするけど、Mapオブジェクトが（たぶんハッシュテーブルだけど）平衡二分探索木で実装されていると想定すると、lookupとinsertaionがそれぞれ `O(log n)` の処理量になるので、`O(Log M + N Log M)` といった処理量になる。それでもやはり `O(M * N)` より効率的と言える。

オブジェクトを使ったマップでも、Mapオブジェクトを使ったマップでも中の実装はハッシュテーブルであると想定しても大丈夫そうな気はするし、実際の処理速度は変わらないように思う。とはいえMapオブジェクトの方は sublinear であると明確に言えるし、使い方としてもより idiomatic であるし、今後はMapオブジェクト使って行く方がいいかなあと思ったところ次第である（既存のプロジェクトでは状況によるけど）。

以下はそのほか参考にしたページ
* [data structures - Is there anything that guarantees constant time for accessing a property of an object in JavaScript? - Stack Overflow](https://stackoverflow.com/questions/34292087/is-there-anything-that-guarantees-constant-time-for-accessing-a-property-of-an-o)
* [Javascript ES6 computational/time complexity of collections - Stack Overflow](https://stackoverflow.com/questions/31091772/javascript-es6-computational-time-complexity-of-collections)
* [Javascript big-O property access performance - Stack Overflow](https://stackoverflow.com/questions/7374171/javascript-big-o-property-access-performance)
* [連想配列 - Wikipedia](https://ja.wikipedia.org/wiki/%E9%80%A3%E6%83%B3%E9%85%8D%E5%88%97)
* [連想配列はMapを使うべきは本当か？ - Qiita](https://qiita.com/raccy/items/816a322fb330193e788b)
* [V8 Today and in the Future (Chrome Dev Summit 2017)](https://youtu.be/7rx9fSUG8H0?t=23m22s)

というメモ。
