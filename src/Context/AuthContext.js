import React,{useContext, useState, useEffect} from 'react'
import {auth} from '../firebase'
import { GoogleAuthProvider, OAuthProvider } from 'firebase/auth'
import { useHistory } from 'react-router-dom'



const AuthContext = React.createContext();


export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
const history = useHistory()
const [currentUser, setCurrentUser] = useState()
const [loading, setLoading] = useState()

function signup(email,password){
    return auth.createUserWithEmailAndPassword(email,password)
}

function login(email,password){
    return auth.signInWithEmailAndPassword(email,password)
}

function logout(){
    return auth.signOut()
}

function resetPwd(email){
    return auth.sendPasswordResetEmail
}

function updateEmail(email){
    return currentUser.updateEmail(email)
}

function updatePassword(password){
    return currentUser.updatePassword(password)
}

useEffect(()=> {
    const unsubscribe = auth.onAuthStateChanged(user => {
        setCurrentUser(user)
        setLoading(false)
    })

    return unsubscribe
}, [])

function googleSignin() {
    const provider = new GoogleAuthProvider()   
    return auth.signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
      history.push("/")
      console.log(token)
      console.log(user)
   }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
		
      console.log(errorCode)
      console.log(errorMessage)
   });
} 

function microsoftSignin() {
    const provider = new OAuthProvider('microsoft.com');
    return auth.signInWithPopup(provider).then(function(result) {
      const credential = OAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        const idToken = credential.idToken;
      history.push("/")
      console.log(accessToken)
      console.log(idToken)
   }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
		
      console.log(errorCode)
      console.log(errorMessage)
   });
} 




const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPwd,
    updateEmail,
    updatePassword,
    googleSignin,
    microsoftSignin
}

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
