import firebase from 'firebase/app'
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyCduuQTa3QPtSc9X_sxjtW-2LfINePC6T8",
    authDomain: "logintemplate-71251.firebaseapp.com",
    projectId: "logintemplate-71251",
    storageBucket: "logintemplate-71251.appspot.com",
    messagingSenderId: "358775363590",
    appId: "1:358775363590:web:f8a10d49be17d4b1c64b87",
    measurementId: "G-VL41X6TN11"
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);


export const auth = app.auth()
export {app}