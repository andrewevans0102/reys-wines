# Reys Wines

![ReyRey](./src/assets/pages/home.jpg)

This is the open source project for "Wines With ReyRey." A fun way to record and share your favorite wines.

I created a YouTube video that showcased how the app works at the following:

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/urC7mZpIRKA/0.jpg)](https://www.youtube.com/watch?v=urC7mZpIRKA)

I also created a blog post with some additional information on `Rhythmandbinary.com` at [Wines with ReyRey!](https://rhythmandbinary.com/post/2021-04-20-wines-with-reyrey).

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

This project is an Angular PWA. I'm using a serviceworker with some minimal caching and detection of connections. If you'd like to learn more about how that works, check out [Getting Started with Service Workers](https://angular.io/guide/service-worker-getting-started).

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

I also setup authentication with Firebase Auth in the Firebase Function that this project uses. Check out a sample implementation in the [Firebase Examples](https://github.com/firebase/functions-samples/blob/master/authorized-https-endpoint/functions/index.js).

I also built the file storage and firestore rules such that all data queries are secured by UserID. You can learn more about that at [the firestore rules page](https://firebase.google.com/docs/firestore/security/rules-query).

## Husky

I'm using [Husky](https://typicode.github.io/husky/#/) for precommit hooks. This is a great tool, and just wanted to share.

## Future Plans

There are a lot of things you could do with this project. If you're interested in contributing, open a PR and let me know!

