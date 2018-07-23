---
title: Mac (tiger) で gem install mysql でエラー
date: 2009-06-28T12:30:00.000Z
categories:
- web
tags:
- mac
- mysql
---
Mac(10.4.11)にgem istall mysqlしようとしたら、下記のようなエラーが出たのでメモ。

```bash
~ sudo gem install mysql -- --with-mysql-config=/usr/local/mysql/bin/mysql_config

<!-- more -->
Password:
Building native extensions.  This could take a while...
ERROR:  Error installing mysql:
        ERROR: Failed to build gem native extension.

/opt/local/bin/ruby extconf.rb --with-mysql-config=/usr/local/mysql/bin/mysql_config
checking for mysql_ssl_set()... no
checking for mysql.h... yes
creating Makefile

make
gcc -I. -I. -I/opt/local/lib/ruby/1.8/i686-darwin8.10.1 -I. -DHAVE_MYSQL_H -I/opt/local/include -I/usr/local/mysql/include  -g -Os -arch i386 -no-cpp-precomp -mmacosx-version-min=10.4 -isysroot /Developer/SDKs/MacOSX10.4u.sdk -fno-common   -D_P1003_1B_VISIBLE -DSIGNAL_WITH_VIO_CLOSE -DSIGNALS_DONT_BREAK_READ -DIGNORE_SIGHUP_SIGQUIT -fno-common -O2  -fno-common -pipe -fno-common  -c mysql.c
cc -dynamic -bundle -undefined suppress -flat_namespace -L/opt/local/lib   -L"/opt/local/lib" -o mysql.bundle mysql.o  -lruby -arch i386  -L/usr/local/mysql/lib -lmysqlclient -lz -lm     -lmygcc  -lpthread -ldl -lobjc
/usr/bin/ld: /usr/local/mysql/lib/libmysqlclient.dylib load command 5 unknown cmd field
/usr/bin/ld: warning multiple definitions of symbol _setregid
/opt/local/lib/libruby.dylib(process.o) definition of _setregid
/usr/lib/gcc/i686-apple-darwin8/4.0.1/../../../libm.dylib(setregid.So) definition of _setregid
/usr/bin/ld: warning multiple definitions of symbol _setreuid
/opt/local/lib/libruby.dylib(process.o) definition of _setreuid
/usr/lib/gcc/i686-apple-darwin8/4.0.1/../../../libm.dylib(setreuid.So) definition of _setreuid
collect2: ld returned 1 exit status
make: *** [mysql.bundle] Error 1

```

いろいろ試してみましたが、最終的にはXcodeのバージョンが古かったのが原因みたいでした。2.5をWebからダウンロードしてインストールしたら、インストールすることができました。

```bash
~ sudo gem install mysql -- --with-mysql-config=/usr/local/mysql/bin/mysql_config
Password:
Building native extensions.  This could take a while...
Successfully installed mysql-2.7
1 gem installed
Installing ri documentation for mysql-2.7...
Installing RDoc documentation for mysql-2.7...

```

XcodeのバージョンアップにはApple developerサイトからダウンロードしてこないといけないのですが、Tiger用のXcodeはすでに最新のバージョンではないので、ダウンロードする場所がおそろしく分かりにくい。ので、メモ。

1.  [Mac Dev Center](http://developer.apple.com/mac/) にアクセス
2.  ログイン（登録していない場合は、まず登録する必要があります）
3.  右サイドバーにある「Member Site」をクリック
4.  左下にある「Downloads」のリンクをクリック。クリックできない場合は再度ログインしてみる。
5.  右サイドバーにある「Developer Tools」のリンクをクリック
6.  表示された画面を「Xcode 2.5」検索
7.  Xcode 2.5 Developer Tools (Disk Image) のリンクをクリック
