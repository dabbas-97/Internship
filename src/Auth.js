import React, { useEffect, useState, createContext } from 'react'
import firebase from './Config/fbConfig'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState('');

    useEffect(() => {
        firebase.auth().onAuthStateChanged(setCurrentUser);
    }, []);


    return <AuthContext.Provider value={{ currentUser }}>
        {children}
    </AuthContext.Provider>
}
