hexo.extend.generator.register('service-worker', (locals) => {
  const posts = locals.posts.sort('-date').filter(post => post.draft !== true).limit(10).toArray();

  const lastUpdated = posts.sort((a, b) => a.updated < b.updated ? 1 : -1 )[0].updated.valueOf();

  const precacheList = posts.map(post => post.path);
  precacheList.unshift('/');

  posts.forEach(post => {
    const featuredImage = post.featured && post.featured.image;
    if (featuredImage) {
      precacheList.push(`/assets/images/${featuredImage}/${featuredImage}.svg`);
    }
  });

  precacheList.push('/css/prism.css');

  const appendThemeConfigToPrecache = (data) => {
    for (const key in data) {
      const config = data[key];
      if (typeof config === 'string') {
        precacheList.push(config);
        continue;
      }
      appendThemeConfigToPrecache(config);
    }
  }

  appendThemeConfigToPrecache(hexo.theme.config);

  return {
    path: 'service-worker.js',
    data: {
      precacheList: precacheList,
      lastUpdated: lastUpdated
    },
    layout: 'service-worker'
  }
});
