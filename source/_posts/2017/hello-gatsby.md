---
title: Gatsbyでスタティックサイトを作成する
date: 2017-12-29
---
更新しなくなったブログをリニューアルしようと思って、[Gatsby](https://www.gatsbyjs.org) で構築しようと思い立って、今作成してみている。

Gatsbyは「Blazing-fast static site generator for React」ということで、Reactベースのスタティックサイトジェネレータらしいのだけど、実のところまだよくわかっていない。[Getting Started](https://www.gatsbyjs.org/docs/) のドキュメントをみて、[gatsby-starter-blog](https://github.com/gatsbyjs/gatsby-starter-blog) のstarterをGithub pages で公開しているだけなのだ。<!-- more -->

とはいえ、一応最初に行ったことをそのまま書き記しておこうと思う。

## nvmで Node 9.xをインストール
インストール時か`gatsby develop`のときか失念してしまったが、どこかのタイミングで`error serve@6.4.3: The engine "node" is incompatible with this module. Expected version ">=6.9.0".`というエラーが発生してしまったので、ローカル環境に9.2をインストール（今確認したらすでに最新は9.3だったが）。[nvm](https://github.com/creationix/nvm) はだいぶ前にインストールしたのでどうインストールしたか失念。[Homebrew](https://brew.sh/) でインストールしたのかもしれない。

```bash
nvm install 9
nvm alias default 9
```

デフォルトの設定を6.xにしていたのだけど、これを機にローカルで使用するバージョンは9.xに変更した。

## Gatsby CLI のインストール とサイトの作成
ここから先は基本的には[Gatsby getting started](https://www.gatsbyjs.org/docs/) と同じことをただやった。

```bash
npm install -g gatsby-cli
gatsby new memolog https://github.com/gatsbyjs/gatsby-starter-blog
```

## Github Pages へのデプロイ
Github pagesにデプロイするためにレポジトリをGithub上で作成して、レポジトリを設定。

```bash
git init
git remote add origin git@github.com:memolog/site.git
git add .
git commit
git push origin master
```

そのあと、 [Deploying Getsby](https://www.gatsbyjs.org/docs/deploy-gatsby/#github-pages) の内容にしたがって、Github Pagesへのデプロイ準備
[Yarn](https://yarnpkg.com/docs/install) はいつインストールしたか失念したが、`brew install yarn --without-node` でインストールしたと思う。

```bash
yarn add gh-pages --dev
yarn deploy
```

これで完了。いまのところデフォルトのテンプレートそのままなので、これからその辺りを更新していこうと思う。とりあえずプロフィール画像だけでも変更しておきたい。

個人的にはカスタムドメインを使用したかっただけど、SSL証明書の関係や、Amazon S3とCloudFront、Route53で新しいドメイン用意しても、個人サイトのトラフィックだとたいしてお金かからないらしいのだけど、個人サイトだし、いつ気が変わってやめるかもわからないし、お金かけずにやる方がいいかなと思ってgithub.ioをそのまま使うことにした。

（テスト投稿するつもりだけだったのに無駄に文字を書き連ねてしまった）

----
ちなみにこの文章を書いているエディタはVisual Code Basicを使用しているが、以前にSlack Appでも問題があった[Electronで日本語入力でバックスペースすると文字化けする問題](https://github.com/electron/electron/issues/9173) が残っていて、少々辛い。[Visual Code Base のソース](https://github.com/Microsoft/vscode/blob/master/package.json) を見ると、Electron 1.7.0 を使用している雰囲気だが、1.7でもまだ問題が残っているということなのでしょう。現状のステータスがよくわからないけど、公開前に不要な文字を消すように何か対策を考えようと今は思っている（何もしないかもしれないけど）。

----
それで上記の問題をExtension作って解決しようかなと思って、[Your First Visual Studio Code Extension - Hello World](https://code.visualstudio.com/docs/extensions/example-hello-world) を見ながらExtensionを作る方法を調べていたんだけど、[vscode-bs-ctrlchar-remover](https://github.com/satokaz/vscode-bs-ctrlchar-remover) が同じ問題をすでに解決していることを発見し、それをインストールしてしばらく様子見することにした。
