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
  measurementId: "G-WV4L6HXEXF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

//----------------//

onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log("User is logged in:", user);

    // Fetch the user's document by their UID
    const docRef = doc(db, "users", user.uid);
    try {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        document.getElementById("loggedUserFName").innerText = userData.firstName || "N/A";
        document.getElementById("loggedUserLName").innerText = userData.lastName || "N/A";
        document.getElementById("loggedUserEmail").innerText = userData.email || "N/A";
      } else {
        // User document not found
        console.error("No user document found for this UID");
        alert("User details not found! Redirecting to login page.");
        localStorage.removeItem("loggedInUserId");
        window.location.href = "index.html"; // Redirect to login page
      }
    } catch (error) {
      console.error("Error retrieving user details:", error);
      alert("An error occurred while retrieving user details. Please try again.");
      localStorage.removeItem("loggedInUserId");
      window.location.href = "index.html"; // Redirect to login page
    }
  } //else {
  //   console.log("User is not logged in.");
  //   alert("You are not logged in. Redirecting to login page.");
  //   window.location.href = "index.html"; // Redirect to login page
  // }
});


//----------------//

// Logout functionality
const logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      console.log("User signed out successfully.");
      window.location.href = "index.html"; // Redirect to login page
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
});

// Price Form Handling
const priceForm = document.getElementById("priceForm");

priceForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const priceData = {
    price18Karat: parseFloat(document.getElementById("price18Karat").value),
    price20Karat: parseFloat(document.getElementById("price20Karat").value),
    price22Karat: parseFloat(document.getElementById("price22Karat").value),
    price24Karat: parseFloat(document.getElementById("price24Karat").value),
    priceSilver1: parseFloat(document.getElementById("priceSilver1").value),
    priceSilver2: parseFloat(document.getElementById("priceSilver2").value),
    wastageCharges: parseFloat(document.getElementById("wastageCharges").value),
    makingCharges: parseFloat(document.getElementById("makingCharges").value),
  };

  const docRef = doc(db, "priceData", "r8NuFZ36WWbuuBv5muZDXgRJIxB2");

  setDoc(docRef, priceData)
    .then(() => {
      alert("Price details updated successfully!");
    })
    .catch((error) => {
      console.error("Error saving price details:", error);
    });
});


