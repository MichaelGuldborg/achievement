import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD8usAtVboYqopXhwl5LtzE4hUbmCr22mc",
    authDomain: "achievo-c6128.firebaseapp.com",
    projectId: "achievo-c6128",
    storageBucket: "achievo-c6128.appspot.com",
    messagingSenderId: "351788172799",
    appId: "1:351788172799:web:31f548faf82d5aab55d3ca",
    measurementId: "G-47KL2R6L9J"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();

// https://aggelosarvanitakis.medium.com/a-real-time-hook-with-firebase-react-query-f7eb537d5145

export {
    app,
    analytics,
    db
}