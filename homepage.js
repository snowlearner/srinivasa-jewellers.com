import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";   
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";   
import { getFirestore, getDoc, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";   
   
const firebaseConfig = {   
   apiKey: "AIzaSyDt_ePCpK6FVGe4tmJgMaz-DmlvGQm5wk4",  
   authDomain: "srinivasa-jewellers.firebaseapp.com",  
   projectId: "srinivasa-jewellers",  
   storageBucket: "srinivasa-jewellers.firebasestorage.app",  
   messagingSenderId: "861877666540",  
   appId: "1:861877666540:web:f1c4557fdb19732ffc1bc9",  
   measurementId: "G-WV4L6HXEXF"   
};   
   
// Initialize Firebase   
const app = initializeApp(firebaseConfig);   
   
const auth = getAuth();   
const db = getFirestore();   
   
onAuthStateChanged(auth, (user) => {   
  const loggedInUserId = localStorage.getItem('loggedInUserId');   
  if (loggedInUserId) {   
    console.log(user);   
    const docRef = doc(db, "users", loggedInUserId);   
    getDoc(docRef)   
      .then((docSnap) => {   
        if (docSnap.exists()) {   
          const userData = docSnap.data();   
          document.getElementById('loggedUserFName').innerText = userData.firstName;   
          document.getElementById('loggedUserEmail').innerText = userData.email;   
          document.getElementById('loggedUserLName').innerText = userData.lastName;   
        }   
        else {   
          console.log("No document found matching id");   
        }   
      })   
      .catch((error) => {   
        console.log("Error getting document");   
      });   
  } else {   
    console.log("User Id not Found in Local storage");   
  }   
});   
   
const logoutButton = document.getElementById('logout');   
   
logoutButton.addEventListener('click', () => {   
  localStorage.removeItem('loggedInUserId');   
  signOut(auth)   
    .then(() => {   
      window.location.href = 'index.html';   
    })   
    .catch((error) => {   
      console.error('Error Signing out:', error);   
    });   
});   
   
// Price Form Handling   
const priceForm = document.getElementById('priceForm');   
const savePricesButton = document.getElementById('savePrices');   
   
priceForm.addEventListener('submit', (e) => {   
  e.preventDefault();   
   
  const loggedInUserId = localStorage.getItem('loggedInUserId');   
  if (loggedInUserId) {   
    const priceData = {   
      price18Karat: parseFloat(document.getElementById('price18Karat').value),   
      price20Karat: parseFloat(document.getElementById('price20Karat').value),   
      price22Karat: parseFloat(document.getElementById('price22Karat').value),   
      price24Karat: parseFloat(document.getElementById('price24Karat').value),   
      priceSilver1: parseFloat(document.getElementById('priceSilver1').value),   
      priceSilver2: parseFloat(document.getElementById('priceSilver2').value),   
      wastageCharges: parseFloat(document.getElementById('wastageCharges').value),   
      makingCharges: parseFloat(document.getElementById('makingCharges').value)   
    };   
   
    const docRef = doc(db, "priceData", "r8NuFZ36WWbuuBv5muZDXgRJIxB2");   
   
    setDoc(docRef, priceData)   
      .then(() => {   
        alert("Price details updated successfully!");   
      })   
      .catch((error) => {   
        console.error("Error saving price details: ", error);   
      });   
  } else {   
    alert("User not logged in.");   
  }   
});
