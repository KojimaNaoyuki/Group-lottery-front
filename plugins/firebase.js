import firebase from 'firebase';

if (!firebase.apps.length) {
    firebase.initializeApp(
      {
        apiKey: "AIzaSyD8mOSpXetK7lFC_MJrpofSZDb2EBwLtKc",
        authDomain: "group-lottery-3409e.firebaseapp.com",
        projectId: "group-lottery-3409e",
        storageBucket: "group-lottery-3409e.appspot.com",
        messagingSenderId: "711775164530",
        appId: "1:711775164530:web:bc003cffbaf2c598694aeb"
      }
    )
  }
    
  export default firebase