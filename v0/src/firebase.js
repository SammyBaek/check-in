import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyDsnhRz_NWutROfM3_ZVbUxVyqdfYbKaHE",
        authDomain: "check-in-v0.firebaseapp.com",
        databaseURL: "https://check-in-v0.firebaseio.com",
        projectId: "check-in-v0",
        storageBucket: "check-in-v0.appspot.com",
        messagingSenderId: "104356766736"
    }
};
var fire = firebase.initializeApp(config);
export default fire;