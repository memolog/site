---
title: TypedArray.prototype.sort について
featured:
  image: marcus-depaula-43304-unsplash
  author: Marcus dePaula
  authorLink: https://unsplash.com/photos/tk7OAxsXNL0?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2018-08-01 05:23:27
---
前回の「[Array.prototype.sort について](https://memolog.org/2018/about-array-prototype-sort.html)」に引き続き、今度は[TypedArray](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)の[sort](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/sort)について。実装は別だけど対応は基本的に同じなので簡単に。<!-- more -->

Chromeの実装は[typed-array.tq](https://github.com/v8/v8/blob/master/src/builtins/typed-array.tq#L257)あたりで、Quicksortが使われている。compareFunctionがない場合は、[TypedArraySortFast](https://github.com/v8/v8/blob/master/src/runtime/runtime-typedarray.cc#L107)が実行され、この実行の内部ではC++のstd:sortが使われている。

Firefoxの実装は[TypedArray.js](https://github.com/mozilla/gecko-dev/blob/master/js/src/builtin/TypedArray.js#L1159)あたりで、Quicksortが使われている。merge sortではなくquicksortなのはおそらくTypedArrayは数値のみなのでstableであることを気にかける必要がないからだと思う（たぶん）。compareFunctionがない場合は、8ビット長の場合はCountingSort、16・32ビット長の場合はRadixSortが使われている。

Safariの実装は[TypedArrayPrototype.js](https://github.com/WebKit/webkit/blob/master/Source/JavaScriptCore/builtins/TypedArrayPrototype.js#L190)あたりで、merge sortが使われている。compareFunctionがない場合は`@typedArraySort`が使われるのだけど、実装がどこにあるのか見つけられなかった。

Microsoft Edgeの実装は[TypedArray.cpp](https://github.com/Microsoft/ChakraCore/blob/17dbf40e9470022795d912bc207a10cfc64ff7e2/lib/Runtime/Library/TypedArray.cpp#L2444)あたりで、Quicksortが使われている。

TypedArrayのsortでも同様にO(n log n)を期待できる。

以上。
