// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { 
    getFirestore, 
    collection, 
    addDoc, 
    getDocs,
    onSnapshot,
    deleteDoc,
    doc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut 
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMAEpynxBRzIvjc7qema3bIWJ7WVyr5jU",
  authDomain: "inventario-b90e4.firebaseapp.com",
  projectId: "inventario-b90e4",
  storageBucket: "inventario-b90e4.appspot.com",
  messagingSenderId: "820394038166",
  appId: "1:820394038166:web:c12ad28f53d7bd0fcac3b7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export const saveTask = (producto, cantidad, precio_unitario, fecha_compra) => {
  addDoc(collection(db, 'productos'), {producto, cantidad, precio_unitario, fecha_compra});
}

export const getTasks = () => getDocs(collection(db, 'productos'));

export const onGetTask = (callback) => onSnapshot(collection(db, 'productos'), callback);

export const deleteTask = id => deleteDoc(doc(db, 'productos', id));

export const getTask = id => getDoc(doc(db, 'productos', id));

export const updateTask = (id, newFields) => updateDoc(doc(db, 'productos', id), newFields);

const auth = getAuth();
//----- New Registration code start	  
document.getElementById("register").addEventListener("click", function() {
  var email =  document.getElementById("email").value;
  var password = document.getElementById("password").value;
  //For new registration
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    alert("Registration successfully!!");
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    console.log(errorMessage);
    alert(error);
  });		  		  
});
//----- End

//----- Login code start	  
document.getElementById("login").addEventListener("click", function() {
  var email =  document.getElementById("login_email").value;
  var password = document.getElementById("login_password").value;

  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    alert(user.email+" Login successfully!!!");
    document.getElementById('logout').style.display = 'block';
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    alert(errorMessage);
  });		  		  
});
//----- End

//----- Logout code start	  
document.getElementById("logout").addEventListener("click", function() {
  signOut(auth).then(() => {
    // Sign-out successful.
    console.log('Sign-out successful.');
    alert('Sign-out successful.');
    document.getElementById('logout').style.display = 'none';
  }).catch((error) => {
    // An error happened.
    console.log('An error happened.');
  });		  		  
});
//----- End
