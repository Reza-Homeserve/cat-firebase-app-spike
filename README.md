# CAT mobile app spike

A spike to determine the suitability of Expo managed workflow with Firebase authentication.

## Current login methods:

- Email + password
- Google

## Setup

### env variables

Create a personal firebase account & project [here](https://firebase.google.com/)

Once logged in, go to console and select create project (for now, name it anything you like)

Navigate to project settings. Under "apps" section, select to add a web app.

Once web app created, under "Firebase SDK snippet" section, you'll find:

- apiKey
- authDomain
- databaseURL
- projectId
- storageBucket
- messagingSenderId
- appId
- measurementId

These will need to be added to your .env file of this project.

### logging in/signup

Before leaving your project in firebase, be sure to navigate to "Authentication", in the "Sign-in method" tab, enable email/password & any others you may want/need.

After you'll be able to add a user under the "Users" tab next to "Sign-in method", or yarn start your project and sign up through the app.
