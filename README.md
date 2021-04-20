# Reys Wines

![ReyRey](./src/assets/pages/home.jpg)

This is the open source project for [wineswithreyrey.com](https://www.wineswithreyrey.com).

It is a fun way to record (and share) wine that you like and try out in the world. Most of the functionality is pretty straightforward, but I'll be creating a YouTube video soon that showcases it and will link it here.

You just create a free account on the site, and then you can store and share all your wine adventures. The entire site is secured with [Firebase Auth](https://firebase.google.com/docs/auth).

## Features

The project has the following features:

1. record wine
2. edit wine
3. view wine
4. share wine

## JAMstack angularfire

To connect this project to Firebase, I use the [angularfire](https://github.com/angular/angularfire) library. I recommend checking out the link there for any questions about the API usage etc.

I've built some services that wrap the API calls, which can be found in the [src/app/services](./src/app/services) folder.

## Angular PWA

This project is an Angular PWA. I'm using a serviceworker with some minimal caching and detection of connections. If you'd like to learn more about how that works, check out [Getting STarted with Service Workers](https://angular.io/guide/service-worker-getting-started).

## Running Locally

If you want to run this project locally, you'll need to setup environment variables on your machine. I mainly work with Apple computers, so you'll need to google more if you work with windows.

You'll need a [Firebase Account](https://firebase.google.com/) to run this project. I also have an integration with Twilio, which is specifically for the "share" feature. If you want to play with that, you'll need to create a Twilio account and deploy your own Function.

The Firebase variables you can find [by "adding an app" to Firebase](https://support.google.com/firebase/answer/9326094?hl=en). I wrote a small script that sets up the environment variables in this project. You can run this with `npm run environment`. Before you can run the environment script, you must first create the following in your `bash profile` or `zshrc file` similar to the following:

```bash
export RW_PROJECT_ID=<Firebase Project ID>
export RW_API_KEY=<Firebase Project API Key>
export RW_AUTH_DOMAIN=<Firebase Auth Domain>
export RW_DATABASE_URL=<Firebase Database URL>
export RW_STORAGE_BUCKET=<Firebase Storage Bucket>
export RW_MESSAGING_SENDER_ID=<Firebase Messaging Sender ID>
export RW_APP_ID=<Firebase APP ID>
export RW_MEASUREMENT_ID=<Firebase Measurement ID>
```

Once you have those setup, run `npm run environment` to setup the values and then `npm run start` and you should be good to go. As stated above, if you wanted to play with the "share" feature, you'll need to create a Twilio Account and replace the appropriate values in the [functions](./functions) project.

# Security

For Routing, I did some fun things with [angularfire](https://github.com/angular/angularfire) with routing. I created a few protected routes to ensure security. Check out [the angularfire page on protected routes](https://github.com/angular/angularfire/blob/master/docs/auth/router-guards.md).

I also setup authentication with Firebase Auth in the Firebase Function that this project uses. Check out a sample implementation in the [Firebase Examples](// https://github.com/firebase/functions-samples/blob/master/authorized-https-endpoint/functions/index.js
).

I also built the file storage and firestore rules such that all data queries are secured by UserID. You can learn more about that at [the firstore rules page](https://firebase.google.com/docs/firestore/security/rules-query).

## CICD Pipeline

I'm using GitHub actions for this project's CICD. I'm only using that for the hosting portion of the app, the function that I've built I deploy locally.

## Husky

I'm using [Husky](https://typicode.github.io/husky/#/) for precommit hooks. This is a great tool, and just wanted to share.

## Future Plans

I plan to continue working on this project. If you're interested in contributing (or just want to follow my work), I'm planning to do the following:

1. build out unit tests with [Jest](https://jestjs.io/)
2. build end to end (e2e) tests with [Cypress](https://www.cypress.io/)
3. add tests to the CICD pipeline
4. Add build notifications to the CICD pipeline
