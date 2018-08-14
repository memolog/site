const fs = require('fs');
const path = require('path');
const sizeOf = require('image-size');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

hexo.extend.tag.register('youtube', function(args){
  const options = {};
  args.forEach((arg) => {
    const [key, value, ...others] = arg.split(/=/);
    let otherStr = others.length ? '=' + others.join('=') : '';
    options[key] = value + otherStr;
  });

  let {id, width, height, title} = options;

  width = width || 560;
  height = height || 315;
  title = title ? `title="${title}"` : '';

  return `<div class="youtube-wrapper">
  <iframe width="${width}" height="${height}" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen ${title}></iframe>
  </div>`;
});
