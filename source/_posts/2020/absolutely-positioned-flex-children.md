---
title: Absolutely-Positioned Flex Children
featured:
  image: patrick-schneider-8bPJ0vagphw-unsplash
  author: Patrick Schneider
  authorLink: https://unsplash.com/@patrick_schneider?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2020-04-04 15:57:26
---
前回の[Flex Items](https://memolog.org/2020/flex-items.html)に引き続き、[4.1. Absolutely-Positioned Flex Children](https://www.w3.org/TR/css-flexbox-1/#abspos-items)についてを読む。<!-- more -->

> As it is out-of-flow, an absolutely-positioned child of a flex container does not participate in flex layout.
>
> The static position of an absolutely-positioned child of a flex container is determined such that the child is positioned as if it were the sole flex item in the flex container, assuming both the child and the flex container were fixed-size boxes of their used size. For this purpose, auto margins are treated as zero.

out-of-flow（flow レイアウトから外れてる状態）の状態になるので、絶対配置されたflex containerの子はflexレイアウトには参加しない。

flex containerの絶対配置された子の静的位置は、子とflex containerの両方が使用サイズの固定値のboxであると仮定して、子がまるでflex containerの中の単一のflex itemであるかのように配置されるように、決定される。このため、autoのマージンは0として扱われる。

> In other words, the static-position rectangle of an absolutely-positioned child of a flex container is the flex container’s content box, where the static-position rectangle is the alignment container used to determine the static-position offsets of an absolutely-positioned box.
>
> (In block layout the static position rectangle corresponds to the position of the “hypothetical box” described in [CSS2.1§10.3.7](https://www.w3.org/TR/CSS2/visudet.html#abs-non-replaced-width). Since it has no alignment properties, CSS2.1 always uses a block-start inline-start alignment of the absolutely-positioned box within the static-position rectangle. Note that this definition will eventually move to the CSS Positioning module.)

言い換えると、flex containerの絶対配置された子の静的位置のrectangle（長方形）は、flex containerのcontent boxであり、静的位置のrectangleは絶対配置されたboxの静的位置のオフセットを決定するために使われるalignment containerである。

（ブロックレイアウトでは、静的な位置のrectangleは[CSS2.1§10.3.7](https://www.w3.org/TR/CSS2/visudet.html#abs-non-replaced-width)で記述されている「仮想box」の位置に対応している。alignmentプロパティがないので、CSS2.1では静的位置のrectangle内の絶対配置されたboxのblock-start inline-startを常に利用する。この定義は最終的にCSS Positioning moduleに移行されることに注意。）

> **EXAMPLE 3**
The effect of this is that if you set, for example, align-self: center; on an absolutely-positioned child of a flex container, auto offsets on the child will center it in the flex container’s cross axis.
>
> However, since the absolutely-positioned box is considered to be “fixed-size”, a value of stretch is treated the same as flex-start.

たとえば、もし絶対配置されたflex containerの子に、`align-self: center;` を設定した場合、子のauto offsetはflex containerの交差軸（main axisと直交する軸）に対して中央揃えになるだろう。

しかしながら、絶対配置されたboxは「固定サイズ」であると考慮されるので、stretchの値はflex-startと同じように扱われる。
