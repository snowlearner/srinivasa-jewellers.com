import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";  
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";  
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";  
//import { getStorage } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js";



//import { storage } from './firebase-config';  // Your firebase configuration file
//import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
//import { db } from './firebase-config';
//import { collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {  
   apiKey: "AIzaSyDt_ePCpK6FVGe4tmJgMaz-DmlvGQm5wk4",  
   authDomain: "srinivasa-jewellers.firebaseapp.com",  
   projectId: "srinivasa-jewellers",  
   storageBucket: "srinivasa-jewellers.firebasestorage.app",  
   messagingSenderId: "861877666540",  
   appId: "1:861877666540:web:f1c4557fdb19732ffc1bc9",  
   measurementId: "G-WV4L6HXEXF"  
};  
  
const app = initializeApp(firebaseConfig);  

//const db = getFirestore(app);  
  
// // Wait until the DOM is fully loaded.  
// document.addEventListener('DOMContentLoaded', () => {  
//    const signUpButton = document.getElementById("submitSignUp");  
//    const signInButton = document.getElementById("submitSignIn");  
  
//    if (signUpButton) {  
//       signUpButton.addEventListener("click", (event) => {  
//         event.preventDefault();  
//         const email = document.getElementById("rEmail").value;  
//         const password = document.getElementById("rPassword").value;  
//         const firstName = document.getElementById("fName").value;  
//         const lastName = document.getElementById("lName").value;  
  
//         const auth = getAuth();  
//         createUserWithEmailAndPassword(auth, email, password)  
//            .then((userCredential) => {  
//               const user = userCredential.user;  
//               const userData = {  
//                 email: email,  
//                 firstName: firstName,  
//                 lastName: lastName,  
//               };  
//               const docRef = doc(db, "users", user.uid);  
//               return setDoc(docRef, userData);  
//            })  
//            .then(() => {  
//               window.location.href = "index.html";  
//            })  
//            .catch((error) => {  
//               console.error("Error signing up:", error);  
//            });  
//       });  
//    }  
  
//    if (signInButton) {  
//       signInButton.addEventListener("click", (event) => {  
//         event.preventDefault();  
//         const email = document.getElementById("email").value;  
//         const password = document.getElementById("password").value;  
//         const auth = getAuth();  
  
//         signInWithEmailAndPassword(auth, email, password)  
//            .then((userCredential) => {  
//               const user = userCredential.user;  
//               localStorage.setItem("loggedInUserId", user.uid);  
//               window.location.href = "homepage.html";  
//            })  
//            .catch((error) => {  
//               console.error("Error signing in:", error);  
//            });  
//       });  
//    }  
// });

// const app = initializeApp(firebaseConfig);

// Show message
function showMessage(message, divId) {
    const messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    setTimeout(function () {
        messageDiv.style.display = "none";
    }, 5000);
}

// Sign Up functionality
document.getElementById("submitSignUp").addEventListener("click", (event) => {
    event.preventDefault();

    const email = document.getElementById("rEmail").value;
    const password = document.getElementById("rPassword").value;
    const firstName = document.getElementById("fName").value;
    const lastName = document.getElementById("lName").value;

    const auth = getAuth();
    const db = getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userData = {
                email: email,
                firstName: firstName,
                lastName: lastName,
            };
            showMessage("Account Created Successfully", "signUpMessage");
            const docRef = doc(db, "users", user.uid);
            setDoc(docRef, userData)
                .then(() => {
                    window.location.href = "index.html";
                })
                .catch((error) => {
                    console.error("Error writing document", error);
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === "auth/email-already-in-use") {
                showMessage("Email Address Already Exists!", "signUpMessage");
            } else {
                showMessage("Unable to create User", "signUpMessage");
            }
        });
});

// Sign In functionality
document.getElementById("submitSignIn").addEventListener("click", (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            showMessage("Login Successful", "signInMessage");
            const user = userCredential.user;
            localStorage.setItem("loggedInUserId", user.uid);
            window.location.href = "homepage.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === "auth/invalid-credential") {
                showMessage("Incorrect Email or Password", "signInMessage");
            } else {
                showMessage("Account does not exist", "signInMessage");
            }
        });
});
