# Create a new post

1. Create a new md file
```
hexo new 'Post Title' --path ./2018/snake-case-of-post-entry-title
```
And then write its content

2. Create a feature image
Pick some image from unsplash, and run primitive images like the following

```
primitive_bulk -i /path/to/Downloads/pierre-chatel-innocenti-477580-unsplash.jpg
```

Choose preferred primitive mode, and then generate it again with svg and jpg formats
```
primitive_bulk -i /path/to/Downloads/erwan-hesry-166245-unsplash.jpg -d path/to/hexo-site/source/assets/images/erwan-hesry-166245-unsplash --output erwan-hesry-166245-unsplash --format jpg,svg -m 5
```

