---
title: CryptoJSを使ったクライアントとサーバー間の暗号化と復号化
date: 2015-08-17T03:30:00.000Z
categories:
- web
tags:
- javascript
- node
- security
featured:
  image: reuben-mcfeeters-684383-unsplash
  author: Reuben Mcfeeters
  authorLink: https://unsplash.com/photos/3clB7Pdjee0?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
---
CryptoJSを使ったクライアントサイド（Javascript）とサーバーサイド（Node.js）での暗号化と復号化について。CryptoJSは[brix/crypto-js](https://github.com/brix/crypto-js)のやつを使用します。<!-- more -->

### クライアントサイドの実装

CryptoJSのライブラリ（crypto-js.js）をheadで読み込ませているとします。

```javascript
var str = "Lorem ipsum dolor sit amet";
var key = "12345678901234567890123456789012";
var encrypted = CryptoJS.AES.encrypt(str, key);
console.log(encrypted.toString());
```

encryptメソッドで生成した変数をtoString()すると、ciphertextやiv、saltなど復号化に必要なものをまとめて一つのBase64フォーマットの文字列に変換してくれます。これをNode.js側に送ります。

### サーバーサイドの実装

```javascript
var CryptoJS = require('crypto-js');
var str = "U2FsdGVkX19c2KuWxFQsC9fhaum9z8w6MtoMikCmy0Om+Mi+cAEEFu7JZl8JLOf3";
var key = "12345678901234567890123456789012";
var decrypted = CryptoJS.AES.decrypt(str, key);
console.log(decrypted.toString(CryptoJS.enc.Utf8));
```

という感じで、CryptoJSを使うと簡単に暗号化と復号化ができます。ただ、クライアントサイドのソースは公開されてしまうので、クライントサイドとサーバーサイドでどうkeyを共有するかというのが考えどころ（ajaxで取得するようにするとか？）。また、keyはsaltingした上で使うらしいので（[\[JavaScript\]CryptoJSでAES暗号のsaltとパスフレーズからkeyを求める - Qiita](http://qiita.com/yaegaki/items/9701317a76a35bea1684)参照）、他の暗号化/復号化ライブラリと連携して使おうとすると、実際使われているkeyがわからなくて難儀するかもなあと思いました。

----
（追記）いわゆるブラウザ（クライアントサイド）とサーバーサイドで暗号化してやりとりするなら、[公開鍵](https://ja.wikipedia.org/wiki/&#x25;E5&#x25;85&#x25;AC&#x25;E9&#x25;96&#x25;8B&#x25;E9&#x25;8D&#x25;B5&#x25;E6&#x25;9A&#x25;97&#x25;E5&#x25;8F&#x25;B7)の方がいいよねと今さらながら思った。そして[Cryptico](https://github.com/wwwtyro/cryptico)なら、サーバーサイド（Node.js）で公開鍵を生成して、クライアントサイドに送信、それを使ってクライアントサイドで暗号化して、送り返すということができそう。そのうち試してみたい。

あとうっかり失念していたけど、標準の[Web Cryptography](http://www.w3.org/TR/WebCryptoAPI/)。[Can I use... Support tables for HTML5, CSS3, etc](http://caniuse.com/#feat=cryptography)を見ると、なかなかいい感じのサポート具合になっている。このあたりもそのうち見直してみたい（そのうち...）
