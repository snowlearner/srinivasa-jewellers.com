import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

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

const calculatorForm = document.getElementById('calculator-form');
const priceResultDiv = document.getElementById('price-result');

calculatorForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const goldTypeInput = document.querySelector('input[name="gold-type"]:checked');
  const silverTypeInput = document.querySelector('input[name="silver-type"]:checked');

  if (!goldTypeInput && !silverTypeInput) {
    priceResultDiv.innerText = 'Please select a gold or silver type';
    return;
  }

  const goldType = goldTypeInput ? goldTypeInput.value : null;
  const goldWeight = parseFloat(document.getElementById('gold-weight').value);
  const silverType = silverTypeInput ? silverTypeInput.value : null;
  const silverWeight = parseFloat(document.getElementById('silver-weight').value);

  // Ensure gold weight is positive number only if gold is selected
  if (goldType && (isNaN(goldWeight) || goldWeight <= 0)) {
    priceResultDiv.innerText = 'Please enter a valid gold weight';
    return;
  }

  // Ensure silver weight is positive number only if silver is selected
  if (silverType && (isNaN(silverWeight) || silverWeight <= 0)) {
    priceResultDiv.innerText = 'Please enter a valid silver weight';
    return;
  }

  const db = getFirestore();
  const docRef = doc(db, "priceData", "r8NuFZ36WWbuuBv5muZDXgRJIxB2");

  getDoc(docRef)
    .then((docSnap) => {
      if (docSnap.exists()) {
        const priceData = docSnap.data();
        let resultText = '';

        let totalGoldPrice = 0;
        let totalSilverPrice = 0;

        // Debugging: Log price data
      //console.log("Price Data:", priceData);

        // Calculate Gold Price if Gold Type is selected
        if (goldType && goldWeight) {
          let goldPricePerGram;
          switch (goldType) {
            case '18-Karat':
              goldPricePerGram = priceData.price18Karat;
              break;
            case '20-Karat':
              goldPricePerGram = priceData.price20Karat;
              break;
            case '22-Karat':
              goldPricePerGram = priceData.price22Karat;
              break;
            case '24-Karat':
              goldPricePerGram = priceData.price24Karat;
              break;
            default:
              console.log('Invalid gold type');
              return;
          }

          if (goldPricePerGram) {
            const goldPriceForWeight = goldPricePerGram * goldWeight;
            const goldWastageCharges = goldPriceForWeight * (priceData.wastageCharges / 100);
            const goldMakingCharges = priceData.makingCharges * goldWeight;
            totalGoldPrice = goldPriceForWeight + goldWastageCharges + goldMakingCharges;

            resultText += `
            <table border="1" cellpadding="10">
              <tr><td colspan="2"><strong>Gold Details</strong></td></tr>
              <tr><td>Gold Type</td><td>${goldType}</td></tr>
              <tr><td>Weight</td><td>${goldWeight.toFixed(3)} Grams</td></tr>
              <tr><td>Price per Gram</td><td>₹ ${goldPricePerGram.toFixed(2)}</td></tr>
              
              <tr><td>Wastage Charges (${priceData.wastageCharges}%)</td><td>₹ ${goldWastageCharges.toFixed(2)}</td></tr>
              <tr><td>Making Charges</td><td>₹ ${goldMakingCharges.toFixed(2)}</td></tr>
              <tr><td><strong>Total Gold Price</strong></td><td><strong>₹ ${totalGoldPrice.toFixed(2)}</strong></td></tr>
            </table>
          `;
          }
        }
        //<tr><td>Wastage</td><td>₹ ${goldWastageCharges.toFixed(2)}</td></tr>
        // Calculate Silver Price if Silver Type is selected
        if (silverType && silverWeight) {
          let silverPricePerGram;
          switch (silverType) {
            case 'silver-1':
              silverPricePerGram = priceData.priceSilver1;
              break;
            case 'silver-2':
              silverPricePerGram = priceData.priceSilver2;
              break;
            default:
              console.log('Invalid silver type');
              return;
          }

          if (silverPricePerGram) {
            const silverPriceForWeight = silverPricePerGram * silverWeight;
            const silverWastageCharges = silverPriceForWeight * (priceData.wastageCharges / 100);
            const silverMakingCharges = priceData.makingCharges * silverWeight;
            totalSilverPrice = silverPriceForWeight + silverWastageCharges + silverMakingCharges;

            resultText += `
            <table border="1" cellpadding="10">
              <tr><td colspan="2"><strong>Silver Details</strong></td></tr>
              <tr><td>Silver Type</td><td>${silverType}</td></tr>
              <tr><td>Weight</td><td>${silverWeight.toFixed(3)} Grams</td></tr>
              <tr><td>Price per Gram</td><td>₹ ${silverPricePerGram.toFixed(2)}</td></tr>
             
              <tr><td>Wastage Charges (${priceData.wastageCharges}%)</td><td>₹ ${silverWastageCharges.toFixed(2)}</td></tr>
              <tr><td>Making Charges</td><td>₹ ${silverMakingCharges.toFixed(2)}</td></tr>
              <tr><td><strong>Total Silver Price</strong></td><td><strong>₹ ${totalSilverPrice.toFixed(2)}</strong></td></tr>
            </table>
          `;
          }
        }

        // <tr><td>Wastage</td><td>₹ ${silverWastageCharges.toFixed(2)}</td></tr>
        // Gross Total
        const grossTotal = totalGoldPrice + totalSilverPrice;
        resultText += `
        <table border="1" cellpadding="10" style="width: 84%; border-collapse: collapse;">
        <tr><td >Gross Total</td><td><strong>${grossTotal.toFixed(2)}</strong></td></tr>
        
      </table>
      `;
        
        // Display the final results
        priceResultDiv.innerHTML = resultText;

        // Clear the inputs   
        document.getElementById('gold-weight').value = '';
        document.getElementById('silver-weight').value = '';
        if (goldTypeInput) {
          goldTypeInput.checked = false;
        }
        if (silverTypeInput) {
          silverTypeInput.checked = false;
        }
      } else {
        console.log("No document found matching id");
        priceResultDiv.innerText = 'No price data found';
      }
    })
    .catch((error) => {
      console.error("Error getting document:", error);
      priceResultDiv.innerText = 'Error calculating price';
    });
});

document.getElementById("loginBtn").addEventListener("click", function (e) {  
  e.preventDefault();  
  // Show the signIn form and hide signUp form  
  document.getElementById("signIn").style.display = "block";  
  document.getElementById("signup").style.display = "none";  
});  
 
// Toggle between Sign Up and Sign In Forms  
document.getElementById("signInButton").addEventListener("click", function () {  
  document.getElementById("signIn").style.display = "block";  
  document.getElementById("signup").style.display = "none";  
});  
 
document.getElementById("signUpButton").addEventListener("click", function () {  
  document.getElementById("signIn").style.display = "none";  
  document.getElementById("signup").style.display = "block";  
});



// // Handle Sign-In
// document.getElementById("submitSignIn").addEventListener("click", async (e) => {
//   e.preventDefault();

//   const email = document.getElementById("email").value.trim();
//   const password = document.getElementById("password").value.trim();

//   // Validate input fields
//   if (!email || !password) {
//     alert("Please enter both email and password.");
//     return;
//   }

//   try {
//     // Sign in the user using Firebase Authentication
//     const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     const user = userCredential.user;

//     console.log("Authentication successful:", user);

//     // Verify if the user exists in Firestore
//     const docRef = doc(db, "users", user.uid);
//     const userDoc = await getDoc(docRef);

//     if (userDoc.exists()) {
//       console.log("User found in Firestore:", userDoc.data());

//       // Show success message and redirect
//       alert("User logged in successfully!");
//       localStorage.setItem("loggedInUserId", user.uid);
//       window.location.href = "homepage.html";
//     } else {
//       console.warn("No Firestore document found for UID:", user.uid);
//       alert("User details not found in the database. Please register first.");
//     }
//   } catch (error) {
//     console.error("Error during login:", error);

//     // Error handling based on Firebase error codes
//     if (error.code === "auth/user-not-found") {
//       alert("No user found with this email. Please register.");
//     } else if (error.code === "auth/wrong-password") {
//       alert("Incorrect password. Please try again.");
//     } else if (error.code === "auth/invalid-email") {
//       alert("Invalid email address. Please check and try again.");
//     } else {
//       alert("Login failed. Please try again with correct user credentials.");
//     }
//   }
// });



