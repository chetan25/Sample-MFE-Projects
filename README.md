---
title: Webpack Module Federation Plugin Examples
excerpt: This is a mono repo that has examples of Module Federation with different javascript frameworks.
Tools: ['Reeact', 'Typescript', 'Webapck', 'Javascript', 'Material UI', 'XState', 'Github Actions']
---

# Webpack Module Federation Plugin Examples

This repos has examples on how to use module federation plugin with different javascript framework.

## Simple Javascript Example

This is a simple javascript based micro app, that is build with 3 micro front ends. 

- Container(host) -- This is the host app that renders the Cart and Products.
- Cart -- Simple Cart app that just prints total number.
- Products  -- Simple Products app that just use faker to generate random products.

All three app can be started up using `nmpm start` command and the result can be seen by visiting [http://localhost:8080](http://localhost:8080)


## React Micro Front Ends

This is a react based app that is built with 3 different micro front end apps. The UI is built using material UI and there is some type safety at build time using Typescript. The app consist of 3 parts

- Container(Host) - This renders the common Header and the other two apps based on the routes. It's also responsible to manage the App's routing and make sure the correct sub micro fe is loaded based on route.
- Marketing - This simple Micro Fe app, is a react based app that has it's own internal routing. It uses dummy data for the layout and exposes a mount function, that takes in the element to mount the app at and a options object that contains different call back functions.
- Authentication - This is again a simple react micro Fe app. This basically handles the login and signup process for the App. It uses dummy data for the layout and exposes a mount function, that takes in the element to mount the app at and a options object that contains different call back functions.

To run the apps locally, just run `npm start` in all the 3 folders and the result can be seen by visiting [http://localhost:8080](http://localhost:8080)

> Some common development problems have been listed in the readme file `react-mfe-example\README.md`
> There is a working demo at `https://ddx8fo6nyam9i.cloudfront.net/`