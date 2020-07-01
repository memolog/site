---
title: 'Flex Item Margin, Padding and Z-Ordering'
featured:
  image: marc-klemm-rXDoLi1nqJo-unsplash
  author: Marc Klemm
  authorLink: https://unsplash.com/@marcklemm?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2020-04-04 19:27:59
---
今回は[4.2. Flex Item Margins and Paddings](https://www.w3.org/TR/css-flexbox-1/#item-margins)と[4.3. Flex Item Z-Ordering](https://www.w3.org/TR/css-flexbox-1/#painting)について<!-- more  -->

> **4.2. Flex Item Margins and Paddings**
>
> The margins of adjacent flex items do not collapse.
>
> Percentage margins and paddings on flex items, like those on block boxes, are resolved against the inline size of their containing block, e.g. left/right/top/bottom percentages all resolve against their containing block’s width in horizontal writing modes.
>
> Auto margins expand to absorb extra space in the corresponding dimension. They can be used for alignment, or to push adjacent flex items apart. See [Aligning with auto margins](https://www.w3.org/TR/css-flexbox-1/#auto-margins).

隣接するflex itemsのマージンは相殺されない。

flex itemsのmarginとpaddingのパーセントは、ブロックのboxと同じように、containing blockのインラインのサイズに対して解決される。たとえば、left/right/top/bottomのパーセントはすべてhorizontal writing modeにおけるcontaining blockのwidthに対して解決される。

auto marginsは、対応する次元の中で余分なスペースを吸収するように広がる。それらはalignmentのために利用されるか、隣接するflex itemsを話すために利用される。

> **4.3. Flex Item Z-Ordering**
>
> Flex items paint exactly the same as inline blocks [CSS21], except that order-modified document order is used in place of raw document order, and z-index values other than auto create a stacking context even if position is static (behaving exactly as if position were relative).
>
> **Note**: Descendants that are positioned outside a flex item still participate in any stacking context established by the flex item.

Flex itemはインラインブロックと同じように描画されるが、orderが修正されているドキュメントの並び順は生のドキュメントの並び順の代わりに使われる。また、たとえ配置がstaticであっても、auto以外のz-indexの値は自動的にstacking contextを作成する（まるで配置がrelativeであるかのように振舞う）。

flex itemの外側に配置された子孫は、そのflex itemによって構築されたすべてのstacking contextに参加する。
