const fs = require('fs');
const path = require('path');
const sizeOf = require('image-size');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

hexo.extend.tag.register('picture', function(args){
  const options = {};
  args.forEach((arg) => {
    const [key, value, ...others] = arg.split(/=/);
    let otherStr = others.length ? '=' + others.join('=') : '';
    options[key] = value + otherStr;
  });

  let {src, width, height, color, alt} = options;

  const picture = render({width, height, color, alt, src});
  return `<div class="content__image">${picture}</div>`;
});

hexo.extend.helper.register('picture', function(src, options){
  let {width, height, color, alt} = options && options.data || {};
  return render({width, height, color, alt, src});
});

function render(data) {
  let {width, height, color, alt, src} = data;
  const {dir, name, ext} = path.parse(src);

  if ((!width || !height)) {
    const source = dir.replace(/^\//, '/source/');
    if (ext === '.svg') {
      const file = fs.readFileSync(path.resolve(__dirname, `../${source}/${name}${ext}`), {encoding: 'utf8'});
      const svgDom = new JSDOM(file).window.document.getElementsByTagName('svg')[0];
      width = svgDom.getAttribute('width');
      height = svgDom.getAttribute('height');
      color = color || svgDom.getAttribute('fill') || svgDom.children[0].getAttribute('fill');
    } else {
      const dimension = sizeOf(path.resolve(__dirname, `../${source}/${name}_medium${ext}`));
      width = Math.min(dimension.width, 900);
      height = parseInt(dimension.height * (width / dimension.width), 10);
    }
  }

  width = width || 900;
  height = height || 500;
  color = color || '#f5f2f0';
  alt = alt || '';

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="${width}" height="${height}"><rect x="0" y="0" width="${width}" height="${height}" fill="${color}" /></svg>`;

  const inlineSVG = 'data:image/svg+xml;base64,' + Buffer.from(svg).toString('base64');

  if (ext === '.svg') {
    return `<img src="${inlineSVG}" data-src="${dir}/${name}${ext}" class="lazyload blur-up" itemprop="image" alt="${alt}" role="none" />`;
  }

  return `<picture>
    <source data-srcset="${dir}/${name}_small${ext}, ${dir}/${name}_small@2x${ext} 2x, ${dir}/${name}_small@3x${ext} 3x" type="image/jpg" media="(max-width: 450px)" />
    <source data-srcset="${dir}/${name}_medium.webp, ${dir}/${name}_medium@2x.webp 2x" type="image/webp" />
    <source data-srcset="${dir}/${name}_medium${ext}, ${dir}/${name}_medium@2x${ext} 2x" type="image/jpg" />
    <img src="${inlineSVG}" data-src="${dir}/${name}_medium${ext}" class="lazyload blur-up" itemprop="image" alt="${alt}" role="none" />
  </picture>`;
}
