---
title: JavaScriptでハッシュテーブルを作る
featured:
  image: jan-laugesen-186574-unsplash
  author: Jan Laugesen
  authorLink: https://unsplash.com/photos/4UbSaPKGRqc?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2018-07-26 06:31:02
---
[JavaScriptオブジェクトのプロパティアクセスにおけるビッグ・オー](https://memolog.org/2018/javascript-property-access-big-o.html)で書いたようにJavaScriptのオブジェクトは基本ハッシュテーブルであるし、[Map](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Map)オブジェクトも中の実装はChromeではハッシュテーブルであると書かれてある([Optimizing hash tables: hiding the hash code](https://v8project.blogspot.com/2018/01/hash-code.html))。だからJavaScriptで自前のハッシュテーブルを作るというのは必要のないことなのだけど試しに作ってみたかった。<!-- more -->

```javascript
const stringHash = require("string-hash");

module.exports = class MyHashTable {
  constructor(numberOfBucket) {
    this.numberOfBucket = parseInt(numberOfBucket, 10);
    this.hashTable = new Array(this.numberOfBucket);
  }
  get(key) {
    key = '' + key;
    const hashTableIndex = this.getHashTableIndex(key);
    const bucket = this.hashTable[hashTableIndex] || [];
    const bucketLength = bucket.length;
    for (let i=0; i<bucketLength; i++) {
      const data = bucket[i];
      if (data[0] === key) {
        return data[1];
      }
    }
  }
  set(key, value) {
    key = '' + key;
    const hashTableIndex = this.getHashTableIndex(key);
    if (!this.hashTable[hashTableIndex]) {
      this.hashTable[hashTableIndex] = [];
    }
    this.hashTable[hashTableIndex].push([key, value]);
  }
  getHashTableIndex(key){
    const hash = stringHash(key);
    return hash % this.numberOfBucket;
  }
}
```

実装は[How to implement a simple hash table in JavaScript – freeCodeCamp](https://medium.freecodecamp.org/how-to-implement-a-simple-hash-table-in-javascript-cb3b9c1f2997)や[Implementing a hash table in JavaScript](http://www.mattzeunert.com/2017/02/01/implementing-a-hash-table-in-javascript.html)を参考にしている。

[string-hash](https://github.com/darkskyapp/string-hash)は、与えられた文字列を0から4294967295の数値にして返してくれる。

ハッシュテーブルのサイズは、ハッシュ関数の処理やコンフリクトしたときの対応方法によるらしいのだけど、とりあえずインスタンス作成時に設定するようにして、ハッシュテーブルに入れるデータ数に1.3をかけた値より大きな素数を使うようにした。素数については[The Prime Database: The Nth Prime Page](https://primes.utm.edu/nthprime/index.php#nth)を使って出した。

> But a good general “rule of thumb” is:
The hash table should be an array with length about 1.3 times the maximum number of keys that will actually be in the table, and
Size of hash table array should be a prime number
http://cseweb.ucsd.edu/~kube/cls/100/Lectures/lec16/lec16-8.html#pgfId-975583

下記のような感じで簡単に測定してみた。
```javascript
const dataLength =  10000;
const numberOfBucket = 13003;
const MyHashTable = require('./my-hash-table');
const myHashTable = new MyHashTable(numberOfBucket);
console.time('set');
let key, value;
for (let i=0; i<dataLength; i++) {
  key = Math.floor(Math.random()*dataLength).toString(16);
  value = Math.floor(Math.random()*dataLength).toString(16);
  myHashTable.set(key, value);
}
console.timeEnd('set');
console.time('get');
myHashTable.get(key);
console.timeEnd('get');
```

結果が10000件の追加に`19.117ms`で取得に`0.067ms`。

データを以下のように変更して再度実行
```javascript
const dataLength =  100000;
const numberOfBucket = 130003;
```

結果が100000件の追加に`112.608ms`で取得が`0.061ms`。

データを1000000件にすると追加に`1592.088ms`で取得に`0.068ms`。データの件数が増えても、データの取得に時間がかかるようにはなっていない。いい感じに見える。

なおデータを1000000件でハッシュテーブルのサイズを1（検索に`O(n)`かかるはず）にしたら、追加には`870.672ms`となり取得には`12.525ms`かかった（繰り返し測定してみると、早い時は2msくらいで終わる）。

上記の計測をオブジェクトに置き換えて
```javascript
const dataLength =  1000000;
const myHashTable = {};
console.time('set');
let key, value;
for (let i=0; i<dataLength; i++) {
  key = Math.floor(Math.random()*dataLength).toString(16);
  value = Math.floor(Math.random()*dataLength).toString(16);
  myHashTable[key] = value;
}
console.timeEnd('set');
console.time('get');
myHashTable[key];
console.timeEnd('get');
```
としてみたろころ、データの追加には`1632.026ms`で、取得には`0.008ms`になった。繰り返し計測してみないと誤差の範囲かどうかは明確には言えないけど、ほぼ同じパフォーマンスのように思う。

さらにMapに置き換えてみた。
```javascript
const dataLength =  1000000;
const myHashTable = new Map();
console.time('set');
let key, value;
for (let i=0; i<dataLength; i++) {
  key = Math.floor(Math.random()*dataLength).toString(16);
  value = Math.floor(Math.random()*dataLength).toString(16);
  myHashTable.set(key, value);
}
console.timeEnd('set');
console.time('get');
myHashTable.get(key);
console.timeEnd('get');
```

データの追加には`1178.558ms`で、取得には`0.006ms`になった。

そのほか参考
* https://www.quora.com/What-is-a-good-hash-table-array-size
* http://srinvis.blogspot.com/2006/07/hash-table-lengths-and-prime-numbers.html
* https://en.wikipedia.org/wiki/Hash_table

以上。
