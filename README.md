# RecallRhythm

**RecallRhythm** is an online platform that uses flashcards to facilitate learning and memorization of concepts. Create your own decks improve your skills in any subject.

<img src="images/deckview.png" alt="Deck view"/>

[Click here to see the live demo](https://recallrhythm.netlify.app/#/)

This web application is written with Typescript. It uses Vue as frontend framework. The compilation process is done using Vite.

The Vuetify library provides a sleek and professional look for the UI, while Sass is used for CSS preprocessing.

With Supabase integration, this application can take advantage of a powerful and scalable database and an easy-to-use API to perform CRUD operations and store images.

![Vue](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

## Features

### User auth

Using the supabasejs client my application ensures that sensitive data is stored securely and that only authenticated users can access restricted operations.

<p align="middle">
  <img src="images/signin.png" alt="Sign in page" height="400"/>
  <img src="images/signup.png" alt="Sign up page" height="400" />
</p>

### Spaced repetition

I use a spaced repetition algorithm based on the one used by Anki but much less complex. This allows cards to be recalled for extended periods of time at the time the recall relapses.

<p align="middle">
  <img src="images/srsFunction.png" alt="Spaced repetition function" />
</p>

## Future implementations

- Image optimization (maybe with Sharp).
- Skeleton loaders.
- User update page.

## Get started

To get started using **RecallRhythm**, you need to install:

- Node.js
- All the needed dependencies using <code>npm install</code> after cloning the repository

### Running the application

To run the application, use the following commands:

1. <code>npm run build</code>

2. <code>npm run preview</code>
