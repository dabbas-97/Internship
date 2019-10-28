import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
const firebaseConfig = {
    apiKey: "AIzaSyAH0hTQvTmtxFoUPQeoIEYP6O4HKNWbWQs",
    authDomain: "internship-platform-11678.firebaseapp.com",
    databaseURL: "https://internship-platform-11678.firebaseio.com",
    projectId: "internship-platform-11678",
    storageBucket: "internship-platform-11678.appspot.com",
    messagingSenderId: "51675847999",
    appId: "1:51675847999:web:27a0758f36d80daddcc78a",
    measurementId: "G-E7KT6TQW7Y"
};
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth()
export default firebase