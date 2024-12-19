import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

firebase.initializeApp({
  apiKey: 'AIzaSyA0LiH8j2wJ34vcBEynU3WNvuYkLQ030hI',
  authDomain: 'sapback-221b4.firebaseapp.com',
  projectId: 'sapback-221b4',
  storageBucket: 'sapback-221b4.firebasestorage.app',
  messagingSenderId: '195650297607',
  appId: '1:195650297607:web:18c1545d3e55861f63afa2',
  measurementId: 'G-1RVLGWH39Q'
})

const firestore = firebase.firestore()

export { firestore }
