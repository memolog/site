---
title: 'Flex Direction and Wrap: the flex-flow shorthand'
featured:
  image: ben-mcleod-2UfVYE2S7B4-unsplash
  author: Ben McLeod
  authorLink: https://unsplash.com/@ben_mcleod?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2020-05-24 00:00:00
---
今回は[5.3. Flex Direction and Wrap: the flex-flow shorthand](https://www.w3.org/TR/css-flexbox-1/#flex-flow-property)について。flex-flowは`flex-direction`と`flex-wrap`をまとめて設定できる。<!-- more -->

|key|value|
--|--
|Name|flex-flow|
|Value|<‘flex-direction’> &#124;&#124; <‘flex-wrap’>|
|Initial|see individual properties|
|Applies to|see individual properties|
|Inherited|see individual properties|
|Percentages|see individual properties|
|Computed value|see individual properties|
|Animation type|see individual properties|
|Canonical order|per grammar|

`||`は[CSS property conventions](https://memolog.org/2020/css-property-conventions.html)で書いたように、||で別れた値のどれか1つ以上が記述される必要がある。順不同。

> The flex-flow property is a shorthand for setting the flex-direction and flex-wrap properties, which together define the flex container’s main and cross axes.

flex-flowプロパティは`flex-direction`と`flex-wrap`プロパティを設定するためのショートハンドで、flex containerのmainとcross axesの両方を一緒に設定することができる。

flex-directionは[Flex Flow Direction: the flex-direction property](https://memolog.org/2020/flex-flow-direction.html)
にて、flex-wrapについては[Flex Line Wrapping: the flex-wrap property](https://memolog.org/2020/flex-wrap-property.html)にて書いた。

> **EXAMPLE 5**
> Some examples of valid flows in an English (left-to-right, horizontal writing mode) document:

英語ドキュメント（左から右、horizontal writing mode）でのvalid flowsの例。

```css
div { flex-flow: row; }
/* 初期値。main axisはインラインで、折り返さない。
  （itemsは収まるように収縮するか、オーバーフローする。） */
```

<img src="https://www.w3.org/TR/css-flexbox-1/images/flex-flow1.svg" />

```css
div { flex-flow: column wrap; }
/* main axisはblock-direction（上から下）
   で行はインライン方向（右方向）へ折り返しする。*/
```

<img src="https://www.w3.org/TR/css-flexbox-1/images/flex-flow2.svg" />

```css
div { flex-flow: row-reverse wrap-reverse; }
/* main axisはインライン方向と反対になる（右から左）。
   新しい行は上側に折り返される。*/
```

<img src="https://www.w3.org/TR/css-flexbox-1/images/flex-flow3.svg" />

> Note that the flex-flow directions are writing mode sensitive. In vertical Japanese, for example, a row flex container lays out its contents from top to bottom, as seen in this example:

flex-flow は writing mode sensitiveなのに注意。例えば縦書きの日本語では行のflex containerはコンテンツを上から下に配置する。
