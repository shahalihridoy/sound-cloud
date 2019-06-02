import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDNqU_-YLiudfO93w0uiDqOuCGxlA9J0uY",
  authDomain: "sound-cloud-1a470.firebaseapp.com",
  databaseURL: "https://sound-cloud-1a470.firebaseio.com",
  projectId: "sound-cloud-1a470",
  storageBucket: "sound-cloud-1a470.appspot.com",
  messagingSenderId: "241098932958",
  appId: "1:241098932958:web:456cece967e97225"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
