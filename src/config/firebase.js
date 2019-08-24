export const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "codearchive-app.firebaseapp.com",
    databaseURL: "https://codearchive-app.firebaseio.com",
    projectId: "codearchive-app",
    storageBucket: "codearchive-app.appspot.com",
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
  };