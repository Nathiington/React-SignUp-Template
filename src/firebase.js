import firebase from 'firebase/app'
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "dummy value",
    authDomain: "dummy value",
    projectId: "dummy value",
    storageBucket: "dummy value",
    messagingSenderId: "dummy value",
    appId: "dummy value",
    measurementId: "dummy value"
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);


export const auth = app.auth()
export {app}
