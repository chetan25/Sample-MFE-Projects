### React Micro Front end examples

This is a sample Micro front end app that uses React + Module federation. 

## Common Issues that one might encounter

#### Uncaught SyntaxError: Unexpected token '<'
This comes from how Webpack Module Federation Plugin works in production mode, since the 'src' path attach to the script does not contain the URL full path that points to the S3 bucket. it would try to fetch the script from the root, where as we need to go to specific folder.
> <script src="main.c390045ea51a9c0e8b3e.js"></script>
eg - https://ddx8fo6nyam9i.cloudfront.net/mian.js -- is what it tries to fetch
   https://ddx8fo6nyam9i.cloudfront.net/container/latest/main.js - should be there

- Fix is to update the HtmlWebpackPlugin in container app to point to correct path

#### CSS issues in MFE

- When we navigate from a container to a micro fe app, we might end up loading some css that gets attach to the page.And if we have a general css selector like 
  > div { color: red}
this would show right color in the MFE app we have just loaded, but if we navigate back to the container or any other micro app, this rule might conflict since it's a SPA and we are not reloading the page.
- We might also have some issues with the css-in-js libraries in Production, with css name collision, since they assume that in Prod, we would extract the generated css selector and rule in separate css stylesheets, so they try to limit the size of the generated css selector as small as possible like 'jdd1', 'jwww3', just as a space saving technique.But in development the generated name would we very big, which would avoid the name collision. So when two projects are build in Production mode, they might get the same randomly generated class name

> General fix would be scope the CSS, eg would be css-in-js like styled components etc
> Or Namespace the Css, example 
```js
   <div class="app1">
      <hi>App 1</h1>
   </div>
   
   css scoped by parent
   .app1 h1 {
      color: red
   }
```
> Or use a shared CSS library across the board in all Micro Apps.

#### publicPath
If we don't set publicPath in micro app, the scripts are loaded form the remoteEntry.js file relative to the url that remoteEntry was loaded from.

#### When sub app don't react to '/' they would not route properly
For example in Auth app we don't have a route listening to '/', we are only listening to '/auth/' routes. But the MemoryHistory Object we created would by default use '/' as initial route, so when we navigate from a main route to '/auth' the MemoryHistory of Auth would not pick that route, since for the first time it would get initialized with '/'. To fix this we need to set the initial route for this to be '/auth/signin'