import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, initializeFirestore, initializeAuth, indexedDBLocalPersistence, browserLocalPersistence, browserSessionPersistence, browserPopupRedirectResolver, setDoc, doc, setLogLevel} from 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCxzsrrcQCCsm0M4lM8AT4XvN4gghK2JX0",
  authDomain: "exampleapp-94fab.firebaseapp.com",
  projectId: "exampleapp-94fab",
  storageBucket: "exampleapp-94fab.appspot.com",
  messagingSenderId: "658029614295",
  appId: "1:658029614295:web:94d16d6de20efecec6cc92"
};

setLogLevel('debug');

const firebaseApp = initializeApp(firebaseConfig);
 
const auth = getAuth(firebaseApp);

const db = initializeFirestore (firebaseApp, {
  experimentalForceLongPolling: true, // and this line
});


export {auth, db}