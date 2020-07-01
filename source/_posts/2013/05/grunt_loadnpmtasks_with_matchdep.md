---
title: matchdepを使ってgrunt.loadNpmTasksする
date: 2013-05-06T05:38:00.000Z
categories:
- web
tags:
- grunt
---
matchdepを使用してgrunt.loadNpmTasksを毎回記述しないで済むようにするという話。`npm install --save-dev` でインストールしたgrunt pluginをGruntで使用する場合、Gruntfile.jsで[grunt.loadNpmTasks](http://gruntjs.com/api/grunt#grunt.loadnpmtasks)を使ってタスクのloadをする必要があります。

<!-- more -->

しかし、grunt pluginを追加するたびにgrunt.loadNpmTasksをGruntfileに追加するのはわずらわしいし、お試しで追加したpluginとか使わなくなったpluginを削除するときにloadNpmTasksをいちいち除かないといけないのもまた面倒くさい。

ので、[matchdep](https://npmjs.org/package/matchdep)を使用する。matchdepについては[matchdepを使ってGrunt.jsのプラグインを自動ロードする | Re* Programming](http://nantokaworks.com/?p=955)で簡潔に解説されています。

```javascript
require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
```

上記のように設定すると、package.jsonのdevDependenciesから、マッチングした対象の名前を返してくれます。そしてforEachでgrunt.loadNpmTasksに渡すと。devDependenciesにgrunt pluginを追加すれば、loadNpmTasksをGruntfileに記述しなくても、taskをloadしてくれるようになります。

ただ、[grunt-template-jasmine-requirejs](https://github.com/jsoverson/grunt-template-jasmine-requirejs)のように、taskのないgrunt pluginをインストールしていると、

```bash
>> Local Npm module "grunt-template-jasmine-requirejs" not found. Is it installed?
```

というwarningが発生するので、個人的には

```javascript
require('matchdep').filterDev('grunt-*').forEach(function (name) {
  if (!/template/.test(name)) {
    grunt.loadNpmTasks(name);
  }
});
```

という感じで、名前にtemplateがある場合は、taskはないだろうということにして、loadNpmTasksの対象から外すようにしています。もっと良い方法があるかもしれませんけど、今のところはこれで。
