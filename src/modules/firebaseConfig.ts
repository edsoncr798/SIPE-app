import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


firebase.initializeApp( {
  apiKey: "AIzaSyDOoaTnWHDEvF9PxK5h2VthOtCmYEx1Bb4",
  authDomain: "linkedin-app-d3789.firebaseapp.com",
  projectId: "linkedin-app-d3789",
  storageBucket: "linkedin-app-d3789.appspot.com",
  messagingSenderId: "902259345218",
  appId: "1:902259345218:web:b8182cd81c3e93467b2adb",
});

const firestore = firebase.firestore();

export { firestore };