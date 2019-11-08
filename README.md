# code.Archive

code.Archive is a resource management tool meant to help developers keep track of information, issues, and code relating to software development.

Users are able to create different libraries about languages or tools used, and create archives about different concepts relating to those languages or tools.

Users may also archive different issues and solutions they have encountered, and useful code they have written.

As an added bonus, a user may log code related article and events as well.

## Getting Started

To get started, clone down the repository into the directory you need it to be in: `git@github.com:shanemiller89/codeArchive.git`.

Once cloned, in the root of the directory, run the following command:

```npm install```

To set up images support, set up a [firebase](https://firebase.google.com/) account and create the following files

```
src/confif/firebase.js
```

From the side menu, click the ***Storage*** menu item, and create file bucket. Once created, click the Rules tab and change the config to the following:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write;
    }
  }
}
```

Then click the gear icon in the side Menu and look for ***Firebase SDK Snippet***. Cick the Config Radio Button and copy the cofig below. Should look something like this:

```
const firebaseConfig = {
  apiKey: "{ Your Key }",
  authDomain: "app.firebaseapp.com",
  databaseURL: "https://app.firebaseio.com",
  projectId: "app-client",
  storageBucket: "app-client.appspot.com",
  messagingSenderId: "{ Your Id }",
  appId: "{ Your Id }"
};
```


Paste this into the firebase.js file you created above.

Next, Google Custom Search API. Follow there instructions [here](https://developers.google.com/custom-search/docs/tutorial/introduction) to get an API key and paste the key in the cofig located in:

```
src/modules/API_key.js
```
Then insert your key in this file, should look like this:

```
export const API_KEY = "{ INSERT KEY HERE }"
```

Next, clone the associated API and located [here](https://github.com/shanemiller89/codeArchive_API) and follow those setup instructions.

Now, just run this command

```
npm start
```

And your all set, simply run this command each time you need to start the app.


## Entity Relationship Diagram

![alt text](https://firebasestorage.googleapis.com/v0/b/codearchive-app.appspot.com/o/app_resources%2FcodearchiveERD.png?alt=media&token=709a880e-3505-4346-b168-a1e5b2a0d2c9 "ERD")

## Technologies Used

+ React JS
+ Firebase
+ Semantic UI
+ Google Custom Search API
+ Django Rest Framework




### Author
Shane Miller
