import firebase from "firebase/app";
import "firebase/auth";


export const auth = firebase.initializeApp ({  //intiializing the app using the firebase config data given, and setting the auth method to be a function auth making it easier to call
    apiKey: "AIzaSyAdMgFLbtrLf6Wj8T9eiIl9mnjHgj06qGQ",
    authDomain: "tychat-907ce.firebaseapp.com",
    projectId: "tychat-907ce",
    storageBucket: "tychat-907ce.appspot.com",
    messagingSenderId: "805114595320",
    appId: "1:805114595320:web:c61f8dee6c11367616380d"
  }).auth();