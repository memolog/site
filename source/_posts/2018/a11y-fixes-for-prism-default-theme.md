---
title: A11y fixes for prism default theme
featured:
  image: stas-ovsky-781959-unsplash
  author: Stas Ovsky
  authorLink: https://unsplash.com/photos/JlBYy9eaOxg?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2018-08-18 00:18:27
---
[Lighthouse](https://developers.google.com/web/tools/lighthouse) reported [color contrast issues](https://paulirish.github.io/lighthouse/docs/api/lighthouse/2.5.1/lighthouse-core_audits_accessibility_color-contrast.js.html) in the code block colored by [prism.js](https://prismjs.com/). Actually I don't care about these issues because people doesn't read code blocks carefully. However, I just did the quick fixes for them by changing the color to see the contrast ratio in Chrome developer console.<!-- more -->

Fixes are the following. The full CSS is attached to the [gist](https://gist.github.com/memolog/219ce21e3d059f149d5230bb93f57a01).
```diff
--- themes/little-code-bricks/source/css/prism.css	2018-08-17 22:04:12.000000000 +0900
+++ themes/little-code-bricks/source/css/prism-default-a11.css	2018-08-17 22:05:53.000000000 +0900
@@ -71,11 +71,11 @@
 .token.prolog,
 .token.doctype,
 .token.cdata {
-  color: slategray;
+  color: #5f6d7b;
 }

 .token.punctuation {
-  color: #999;
+  color: #525252;
 }

 .namespace {
@@ -98,7 +98,7 @@
 .token.char,
 .token.builtin,
 .token.inserted {
-  color: #690;
+  color: #055a01;
 }

 .token.operator,
@@ -106,24 +106,23 @@
 .token.url,
 .language-css .token.string,
 .style .token.string {
-  color: #a67f59;
-  background: hsla(0, 0%, 100%, .5);
+  color: #695037;
 }

 .token.atrule,
 .token.attr-value,
 .token.keyword {
-  color: #07a;
+  color: #03427b;
 }

 .token.function {
-  color: #DD4A68;
+  color: #9a213b;
 }

 .token.regex,
 .token.important,
 .token.variable {
-  color: #e90;
+  color: #714902;
 }

 .token.important,
@@ -174,7 +173,7 @@

     .line-numbers-rows > span:before {
       content: counter(linenumber);
-      color: #999;
+      color: #6f6f6f;
       display: block;
       padding-right: 0.8em;
       text-align: right;
```

Although I prefer to the default colors, I think the a11y edition (all colors become darker) is decent and able to get 100 scores on Lighthouse 👍.
