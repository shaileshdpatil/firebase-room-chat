import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDDgplVT9Mxwz7yLYy-kQwJB2AJlSQI6gw",
    authDomain: "chatapp-27144.firebaseapp.com",
    projectId: "chatapp-27144",
    storageBucket: "chatapp-27144.appspot.com",
    messagingSenderId: "924970591821",
    appId: "1:924970591821:web:176bf15137568501789e04"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);