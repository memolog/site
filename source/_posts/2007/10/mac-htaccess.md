---
title: Macで.htaccessを利用する
date: 2007-10-31T12:22:00.000Z
categories:
- web
tags:
- mac
---
メモ。MacのSitesフォルダの中で.htaccessを利用するには、/private/etc/httpd/users の中にある、username.confの中に記述されている、AllowOverrideを「All」に変更する。<!-- more -->

```
<Directory "/Users/username/Sites/">
    Options Indexes MultiViews ExecCGI
    AllowOverride All
    Order allow,deny
    Allow from all
</Directory>
```

設定を有効にするにはApache再起動が必要。Macのシステム環境設定の「共有」から「パーソナルWeb共有」の設定をオフにしてオンし直すか、ターミナルで sudo /usr/sbin/apachectl restart して再起動する。

設定を変更して再起動をしても.htaccessが利用できない場合は、/private/etc/httpd/httpd.conf の最後の行にある「Include /private/etc/httpd/users/*.conf」がコメントアウトされていないかを確認する。

.htaccessを入れた後に、ローカルページがinternal server error を発生している場合は、tail -f /var/log/httpd/error_log して、エラーが出ていないかどうかを確認する。
