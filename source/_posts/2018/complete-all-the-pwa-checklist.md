---
title: PWAのチェックリストを満たす
featured:
  image: cloudvisual-146380-unsplash
  author: CloudVisual
  authorLink: https://unsplash.com/photos/sm8OE9daK2A?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2018-07-14 11:32:41
---

たいして更新もしない個人のブログで Service Worker とか入れる必要まったくないと思いながらも、[Lighthouse](https://developers.google.com/web/tools/lighthouse/?hl=ja) の結果を見るたびに「PWAのチェックリストだけ100点に至らない」というなんとも言えないモヤモヤ感があった。別にそんなに大変でもないんだから入れてしまえ、ということでPWAのチェックリストを満たすべく、Service Worker と App manifest に対応しました。<!-- more -->

Service Worker をサイトに追加するのはとても簡単で、Service Worker 用のスクリプトファイルを用意して、`navigator.servceWoeker.register` で読み込むだけ。HTTPSでないといけないとか、スクリプトファイルの置き場所がscopeと異なる場合は `Service-Worker-Allowed` のヘッダーが必要とか、いろいろ考慮すべきところはあるけれど、Github pagesはHTTPSだし、ファイルもどこにでも置けるので特に気にしなくても大丈夫。

```javascript
<script async>
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js');
  }
</script>
```

service-worker.js では、今のところ最新10件分のHTMLとfeatured imageに使っているsvgファイルをプリキャッシュするようにした。

最新10件のポストデータを得るのに、まず script ディレクトリに service-worker.js を入れて、generatorを登録。

```javascript
hexo.extend.generator.register('service-worker', (locals) => {
  const posts = locals.posts.sort('-date').filter(post => post.draft !== true).limit(10).toArray();

  const lastUpdated = posts.sort((a, b) => a.updated < b.updated ? 1 : -1 )[0].updated.valueOf();

  const precacheList = posts.map(post => post.path);
  precacheList.unshift('/');

  posts.forEach(post => {
    const featuredImage = post.featured && post.featured.image;
    if (featuredImage) {
      precacheList.push(`/assets/images/${featuredImage}/${featuredImage}.svg`);
    }
  });

  return {
    path: 'service-worker.js',
    data: {
      precacheList: precacheList,
      lastUpdated: lastUpdated
    },
    layout: 'service-worker'
  }
});
```

そのあと theme の layout に service-worker.ejs を追加して、Service Worker のスクリプトファイルを生成。

```javascript
const precacheList = [
  <% page.precacheList.forEach(function(item){ %>
  '<%- url_for(item) %>',<% }); %>
];
```

詳細は [service-worker.js](https://github.com/memolog/blog/blob/master/scripts/service-worker.js) と [service-worker.ejs](https://github.com/memolog/blog/blob/master/themes/little-code-bricks/layout/service-worker.ejs) を参照。

App Manifest については静的なファイルを用意して、manifestへのリンクを追加しただけ。 theme-color はLight House がそう言ってくるので追加している。
```html
  <link rel="manifest" href="/manifest.json" >
  <meta name="theme-color" content="white">
```

詳細は [manifest.json](https://github.com/memolog/blog/blob/master/themes/little-code-bricks/source/manifest.json)。ただ値を入れるだけではあるけど、[スプラッシュスクリーンを有効にする](https://developers.google.com/web/tools/lighthouse/audits/custom-splash-screen)ためにいくつか要件があり、それを満たすようにアイコン画像を用意している。

そして Lighthouse の結果。100点になりました👍

![](../../assets/images/lighthouse-100s.png)
