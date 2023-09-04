import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, initializeFirestore, initializeAuth, indexedDBLocalPersistence, browserLocalPersistence, browserSessionPersistence, browserPopupRedirectResolver, setDoc, doc, setLogLevel} from 'firebase/firestore';

// Initialize Firebase
/// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAexUGtbpviiDP3W23LnF5sRABl0_c3KpI",
  authDomain: "oakparkinternship.firebaseapp.com",
  projectId: "oakparkinternship",
  storageBucket: "oakparkinternship.appspot.com",
  messagingSenderId: "957062291328",
  appId: "1:957062291328:web:72a74f37cfc3f1d559ab65",
};

setLogLevel('debug');

const firebaseApp = initializeApp(firebaseConfig);
 
const auth = getAuth(firebaseApp);

const db = initializeFirestore (firebaseApp, {
  experimentalForceLongPolling: true, // and this line
});


export {auth, db}