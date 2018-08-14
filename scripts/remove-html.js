const jsdom = require('jsdom');
const { JSDOM } = jsdom;

hexo.extend.helper.register('remove_html', function(content){
  return new JSDOM(`<div>${content}</div>`).window.document.getElementsByTagName('div')[0].textContent || '';
});
