import React, { useEffect, useState, createContext, useContext } from 'react'

import * as firebase from "firebase/app";

import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

export const config = {
    apiKey: "AIzaSyAH0hTQvTmtxFoUPQeoIEYP6O4HKNWbWQs",
    authDomain: "internship-platform-11678.firebaseapp.com",
    databaseURL: "https://internship-platform-11678.firebaseio.com",
    projectId: "internship-platform-11678",
    storageBucket: "internship-platform-11678.appspot.com",
    messagingSenderId: "51675847999",
    appId: "1:51675847999:web:27a0758f36d80daddcc78a",
    measurementId: "G-E7KT6TQW7Y"
}

// Add your Firebase credentials
firebase.initializeApp(config);
export const db = firebase.firestore();
export const storage = firebase.storage();

export const authContext = createContext();

export const AuthProvider = ({ children }) => {

    const auth = useProvideAuth();


    return <authContext.Provider value={{ auth }}>
        {children}
    </authContext.Provider>
}
export const useAuth = () => {
    return useContext(authContext);
};


function useProvideAuth() {
    const [user, setUser] = useState(null);

    // Wrap any Firebase methods we want to use making sure ...
    // ... to save the user to state.
    const signin = (email, password) => {
        return firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(response => {
                setUser(response.user);
                return response.user;
            })
    };

    const signup = (email, password) => {
        return firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(response => {
                setUser(response.user);
                return response.user;
            })
    };

    const signout = () => {
        return firebase
            .auth()
            .signOut()
            .then(() => {
                setUser(false);
            })
    };



    // Subscribe to user on mount
    // Because this sets state in the callback it will cause any 
    // component that utilizes this hook to re-render with the latest auth object.
    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                setUser(user);
            } else {
                setUser(false);
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    // Return the user object and auth methods
    return {
        user,
        signin,
        signup,
        signout,
    };
}