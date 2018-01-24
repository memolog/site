hexo.extend.tag.register('amazonBookList', function(args, content){
  content = hexo.render.renderSync({text: content, engine: 'markdown'});
  const numberOfBooksInRow = args[0] || 5;
  return `<div class="amazon-book-list amazon-book-list-${numberOfBooksInRow}">${content}</div>`;
}, {ends: true});
