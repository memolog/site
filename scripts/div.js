hexo.extend.tag.register('div', function(args, content){
  content = hexo.render.renderSync({text: content, engine: 'markdown'});
  const className = args[0];
  return `<div class="${className}">${content}</div>`;
}, {ends: true});
