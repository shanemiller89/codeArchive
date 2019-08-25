import * as firebase from "firebase/app";
import "firebase/auth";
import { existsTypeAnnotation } from "@babel/types";

const url = "http://localhost:8088/users";
// const url = "https://code-archive-api.herokuapp.com/users"

const setUserInLocalStorage = user => {
  localStorage.setItem("user", JSON.stringify(user.id));
};

export const saveUserToJsonServer = user => {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(res => res.json())
    .then(newUser => {
      setUserInLocalStorage(newUser);
      return newUser;
    });
};

export const getUser = userId => {
  return fetch(`${url}/${userId}`).then(res => res.json());
};

export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");

  if (!user) return null;

  return JSON.parse(user);
};

export const logout = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("logged out");
    });
  localStorage.removeItem("user");
};

// This is the method that should do all the things to register a user
// It will return a promise after all these things resolve
// 1. Add user to firebase
// 2. Strip out password, add firebaseId to the user object
// 3. Add user to JSON Server and save in local storage
export const register = user => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(user.email, user.password)
    .then(credentials => {
      const id = credentials.user.uid;
      user.id = id;
      delete user.password;
    })
    .then(() => {
      return saveUserToJsonServer(user);
    })
    .catch(function(error) {
      alert(error.message, 7000);
    });
};

// This is the method that should do all the Login things
// It will return a promise after all these things resolve
// 1. Send email and pw to firebase to verify (show err msg if invalid)
// 2. Use the Id that firebase sends back to search for user in JSON Server
// 3. Save user in local storage
export const login = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(credentials => {
      const id = credentials.user.uid;
      return getUser(id);
    })
    .then(user => {
      setUserInLocalStorage(user);
      return user;
    })
    .catch(function(error) {
      alert(error.message, 7000);
    });
};
