### Micro federation examples

## Production Issues

#### Uncaught SyntaxError: Unexpected token '<'
This comes from how Webpack Module Federation Plugin works in production mode, since the 'src' path attach to the script does not contain the URL full path that points to the S3 bucket. it would try to fetch the script from the root, where as we need to go to specific folder.
> <script src="main.c390045ea51a9c0e8b3e.js"></script>
eg - https://ddx8fo6nyam9i.cloudfront.net/mian.js -- is what it tries to fetch
   https://ddx8fo6nyam9i.cloudfront.net/container/latest/main.js - should be there

- Fix is to update the HtmlWebpackPlugin in container app to point to correct path   