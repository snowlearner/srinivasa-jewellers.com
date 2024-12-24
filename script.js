// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
// import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// const firebaseConfig = {
//   apiKey: "AIzaSyDt_ePCpK6FVGe4tmJgMaz-DmlvGQm5wk4",
//   authDomain: "srinivasa-jewellers.firebaseapp.com",
//   projectId: "srinivasa-jewellers",
//   storageBucket: "srinivasa-jewellers.firebasestorage.app",
//   messagingSenderId: "861877666540",
//   appId: "1:861877666540:web:f1c4557fdb19732ffc1bc9",
//   measurementId: "G-WV4L6HXEXF"
// };

// const app = initializeApp(firebaseConfig);
// document.addEventListener('DOMContentLoaded', function () {
//   const calculatorForm = document.getElementById('calculator-form');
//   const priceResultDiv = document.getElementById('price-result');

//   if (calculatorForm) {
//       calculatorForm.addEventListener('submit', (e) => {
//           e.preventDefault();

//           const goldTypeInput = document.querySelector('input[name="gold-type"]:checked');
//           const silverTypeInput = document.querySelector('input[name="silver-type"]:checked');

//           if (!goldTypeInput && !silverTypeInput) {
//               priceResultDiv.innerText = 'Please select a gold or silver type';
//               return;
//           }

//           const goldType = goldTypeInput ? goldTypeInput.value : null;
//           const goldWeight = parseFloat(document.getElementById('gold-weight').value);
//           const silverType = silverTypeInput ? silverTypeInput.value : null;
//           const silverWeight = parseFloat(document.getElementById('silver-weight').value);

//           // Ensure gold weight is positive number only if gold is selected
//           if (goldType && (isNaN(goldWeight) || goldWeight <= 0)) {
//               priceResultDiv.innerText = 'Please enter a valid gold weight';
//               return;
//           }

//           // Ensure silver weight is positive number only if silver is selected
//           if (silverType && (isNaN(silverWeight) || silverWeight <= 0)) {
//               priceResultDiv.innerText = 'Please enter a valid silver weight';
//               return;
//           }

//           const db = getFirestore();
//           const docRef = doc(db, "priceData", "r8NuFZ36WWbuuBv5muZDXgRJIxB2");

//           getDoc(docRef)
//               .then((docSnap) => {
//                   if (docSnap.exists()) {
//                       const priceData = docSnap.data();
//                       let resultText = '';

//                       let totalGoldPrice = 0;
//                       let totalSilverPrice = 0;

//                       // Debugging: Log price data
//                       //console.log("Price Data:", priceData);

//                       // Calculate Gold Price if Gold Type is selected
//                       if (goldType && goldWeight) {
//                           let goldPricePerGram;
//                           switch (goldType) {
//                               case '18-Karat':
//                                   goldPricePerGram = priceData.price18Karat;
//                                   break;
//                               case '20-Karat':
//                                   goldPricePerGram = priceData.price20Karat;
//                                   break;
//                               case '22-Karat':
//                                   goldPricePerGram = priceData.price22Karat;
//                                   break;
//                               case '24-Karat':
//                                   goldPricePerGram = priceData.price24Karat;
//                                   break;
//                               default:
//                                   console.log('Invalid gold type');
//                                   return;
//                           }

//                           if (goldPricePerGram) {
//                               const goldPriceForWeight = goldPricePerGram * goldWeight;
//                               const goldWastageCharges = goldPriceForWeight * (priceData.wastageCharges / 100);
//                               const goldMakingCharges = priceData.makingCharges * goldWeight;
//                               totalGoldPrice = goldPriceForWeight + goldWastageCharges + goldMakingCharges;

//                               resultText += `
//                               <table border="1" cellpadding="10">
//                                 <tr><td colspan="2"><strong>Gold Details</strong></td></tr>
//                                 <tr><td>Gold Type</td><td>${goldType}</td></tr>
//                                 <tr><td>Weight</td><td>${goldWeight.toFixed(3)} Grams</td></tr>
//                                 <tr><td>Price per Gram</td><td>₹ ${goldPricePerGram.toFixed(2)}</td></tr>

//                                 <tr><td>Wastage Charges (${priceData.wastageCharges}%)</td><td>₹ ${goldWastageCharges.toFixed(2)}</td></tr>
//                                 <tr><td>Making Charges</td><td>₹ ${goldMakingCharges.toFixed(2)}</td></tr>
//                                 <tr><td><strong>Total Gold Price</strong></td><td><strong>₹ ${totalGoldPrice.toFixed(2)}</strong></td></tr>
//                               </table>
//                             `;
//                           }
//                       }
//                       // Calculate Silver Price if Silver Type is selected
//                       if (silverType && silverWeight) {
//                           let silverPricePerGram;
//                           switch (silverType) {
//                               case 'silver-1':
//                                   silverPricePerGram = priceData.priceSilver1;
//                                   break;
//                               case 'silver-2':
//                                   silverPricePerGram = priceData.priceSilver2;
//                                   break;
//                               default:
//                                   console.log('Invalid silver type');
//                                   return;
//                           }

//                           if (silverPricePerGram) {
//                               const silverPriceForWeight = silverPricePerGram * silverWeight;
//                               const silverWastageCharges = silverPriceForWeight * (priceData.wastageCharges / 100);
//                               const silverMakingCharges = priceData.makingCharges * silverWeight;
//                               totalSilverPrice = silverPriceForWeight + silverWastageCharges + silverMakingCharges;

//                               resultText += `
//                               <table border="1" cellpadding="10">
//                                 <tr><td colspan="2"><strong>Silver Details</strong></td></tr>
//                                 <tr><td>Silver Type</td><td>${silverType}</td></tr>
//                                 <tr><td>Weight</td><td>${silverWeight.toFixed(3)} Grams</td></tr>
//                                 <tr><td>Price per Gram</td><td>₹ ${silverPricePerGram.toFixed(2)}</td></tr>

//                                 <tr><td>Wastage Charges (${priceData.wastageCharges}%)</td><td>₹ ${silverWastageCharges.toFixed(2)}</td></tr>
//                                 <tr><td>Making Charges</td><td>₹ ${silverMakingCharges.toFixed(2)}</td></tr>
//                                 <tr><td><strong>Total Silver Price</strong></td><td><strong>₹ ${totalSilverPrice.toFixed(2)}</strong></td></tr>
//                               </table>
//                             `;
//                           }
//                       }

//                       // Gross Total
//                       const grossTotal = totalGoldPrice + totalSilverPrice;
//                       resultText += `
//                       <table border="1" cellpadding="10" style="width: 84%; border-collapse: collapse;">
//                       <tr><td >Gross Total</td><td><strong>${grossTotal.toFixed(2)}</strong></td></tr>

//                     </table>
//                     `;

//                       // Display the final results
//                       priceResultDiv.innerHTML = resultText;

//                       // Clear the inputs   
//                       document.getElementById('gold-weight').value = '';
//                       document.getElementById('silver-weight').value = '';
//                       if (goldTypeInput) {
//                         goldTypeInput.checked = false;
//                       }
//                       if (silverTypeInput) {
//                         silverTypeInput.checked = false;
//                       }
//                   } else {
//                       console.log("No document found matching id");
//                       priceResultDiv.innerText = 'Error: No price data available.';
//                   }
//               })
//               .catch((error) => {
//                   console.log("Error getting document:", error);
//                   priceResultDiv.innerText = 'Error: Unable to fetch price data.';
//               });
//       });
//   }
// });

// document.getElementById("loginBtn").addEventListener("click", function (e) {  
//   e.preventDefault();  
//   // Show the signIn form and hide signUp form  
//   document.getElementById("signIn").style.display = "block";  
//   document.getElementById("signup").style.display = "none";  
// });  

// // Toggle between Sign Up and Sign In Forms  
// document.getElementById("signInButton").addEventListener("click", function () {  
//   document.getElementById("signIn").style.display = "block";  
//   document.getElementById("signup").style.display = "none";  
// });  

// document.getElementById("signUpButton").addEventListener("click", function () {  
//   document.getElementById("signIn").style.display = "none";  
//   document.getElementById("signup").style.display = "block";  
// });



// // // Handle Sign-In
// // document.getElementById("submitSignIn").addEventListener("click", async (e) => {
// //   e.preventDefault();

// //   const email = document.getElementById("email").value.trim();
// //   const password = document.getElementById("password").value.trim();

// //   // Validate input fields
// //   if (!email || !password) {
// //     alert("Please enter both email and password.");
// //     return;
// //   }

// //   try {
// //     // Sign in the user using Firebase Authentication
// //     const userCredential = await signInWithEmailAndPassword(auth, email, password);
// //     const user = userCredential.user;

// //     console.log("Authentication successful:", user);

// //     // Verify if the user exists in Firestore
// //     const docRef = doc(db, "users", user.uid);
// //     const userDoc = await getDoc(docRef);

// //     if (userDoc.exists()) {
// //       console.log("User found in Firestore:", userDoc.data());

// //       // Show success message and redirect
// //       alert("User logged in successfully!");
// //       localStorage.setItem("loggedInUserId", user.uid);
// //       window.location.href = "homepage.html";
// //     } else {
// //       console.warn("No Firestore document found for UID:", user.uid);
// //       alert("User details not found in the database. Please register first.");
// //     }
// //   } catch (error) {
// //     console.error("Error during login:", error);

// //     // Error handling based on Firebase error codes
// //     if (error.code === "auth/user-not-found") {
// //       alert("No user found with this email. Please register.");
// //     } else if (error.code === "auth/wrong-password") {
// //       alert("Incorrect password. Please try again.");
// //     } else if (error.code === "auth/invalid-email") {
// //       alert("Invalid email address. Please check and try again.");
// //     } else {
// //       alert("Login failed. Please try again with correct user credentials.");
// //     }
// //   }
// // });


//------------------------//
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
// import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// const firebaseConfig = {
//   apiKey: "AIzaSyDt_ePCpK6FVGe4tmJgMaz-DmlvGQm5wk4",
//   authDomain: "srinivasa-jewellers.firebaseapp.com",
//   projectId: "srinivasa-jewellers",
//   storageBucket: "srinivasa-jewellers.firebasestorage.app",
//   messagingSenderId: "861877666540",
//   appId: "1:861877666540:web:f1c4557fdb19732ffc1bc9",
//   measurementId: "G-WV4L6HXEXF"
// };

// const app = initializeApp(firebaseConfig);
// document.addEventListener('DOMContentLoaded', function () {
//   const calculatorForm = document.getElementById('calculator-form');
//   const priceResultDiv = document.getElementById('price-result');

//   if (calculatorForm) {
//       calculatorForm.addEventListener('submit', (e) => {
//           e.preventDefault();

//           const goldTypeInput = document.querySelector('input[name="gold-type"]:checked');
//           const silverTypeInput = document.querySelector('input[name="silver-type"]:checked');

//           if (!goldTypeInput && !silverTypeInput) {
//               priceResultDiv.innerText = 'Please select a gold or silver type';
//               return;
//           }

//           const goldType = goldTypeInput ? goldTypeInput.value : null;
//           const goldWeight = parseFloat(document.getElementById('gold-weight').value);
//           const silverType = silverTypeInput ? silverTypeInput.value : null;
//           const silverWeight = parseFloat(document.getElementById('silver-weight').value);

//           // Ensure gold weight is positive number only if gold is selected
//           if (goldType && (isNaN(goldWeight) || goldWeight <= 0)) {
//               priceResultDiv.innerText = 'Please enter a valid gold weight';
//               return;
//           }

//           // Ensure silver weight is positive number only if silver is selected
//           if (silverType && (isNaN(silverWeight) || silverWeight <= 0)) {
//               priceResultDiv.innerText = 'Please enter a valid silver weight';
//               return;
//           }

//           const db = getFirestore();
//           const docRef = doc(db, "priceData", "r8NuFZ36WWbuuBv5muZDXgRJIxB2");

//           getDoc(docRef)
//               .then((docSnap) => {
//                   if (docSnap.exists()) {
//                       const priceData = docSnap.data();
//                       let resultText = '';

//                       let totalGoldPrice = 0;
//                       let totalSilverPrice = 0;

//                       // Debugging: Log price data
//                       //console.log("Price Data:", priceData);

//                       // Calculate Gold Price if Gold Type is selected
//                       if (goldType && goldWeight) {
//                           let goldPricePerGram;
//                           switch (goldType) {
//                               case '18-Karat':
//                                   goldPricePerGram = priceData.price18Karat;
//                                   break;
//                               case '20-Karat':
//                                   goldPricePerGram = priceData.price20Karat;
//                                   break;
//                               case '22-Karat':
//                                   goldPricePerGram = priceData.price22Karat;
//                                   break;
//                               case '24-Karat':
//                                   goldPricePerGram = priceData.price24Karat;
//                                   break;
//                               default:
//                                   console.log('Invalid gold type');
//                                   return;
//                           }

//                           if (goldPricePerGram) {
//                               const goldPriceForWeight = goldPricePerGram * goldWeight;
//                               const WastageChargesForGold = goldPriceForWeight * (priceData.goldwastageCharges / 100);
//                               const MakingChargesForGold = priceData.goldmakingCharges * goldWeight;
//                               totalGoldPrice = goldPriceForWeight + WastageChargesForGold + MakingChargesForGold;

//                               resultText += `
//                               <table border="1" cellpadding="10">
//                                 <tr><td colspan="2"><strong>Gold Details</strong></td></tr>
//                                 <tr><td>Gold Type</td><td>${goldType}</td></tr>
//                                 <tr><td>Weight</td><td>${goldWeight.toFixed(3)} Grams</td></tr>
//                                 <tr><td>Price per Gram</td><td>₹ ${goldPricePerGram.toFixed(2)}</td></tr>

//                                 <tr><td>Wastage Charges (${priceData.goldwastageCharges}%)</td><td>₹ ${WastageChargesForGold.toFixed(2)}</td></tr>
//                                 <tr><td>Making Charges</td><td>₹ ${MakingChargesForGold.toFixed(2)}</td></tr>
//                                 <tr><td><strong>Total Gold Price</strong></td><td><strong>₹ ${totalGoldPrice.toFixed(2)}</strong></td></tr>
//                               </table>
//                             `;
//                           }
//                       }
//                       // Calculate Silver Price if Silver Type is selected
//                       if (silverType && silverWeight) {
//                           let silverPricePerGram;
//                           switch (silverType) {
//                               case 'silver-1':
//                                   silverPricePerGram = priceData.priceSilver1;
//                                   break;
//                               case 'silver-2':
//                                   silverPricePerGram = priceData.priceSilver2;
//                                   break;
//                               default:
//                                   console.log('Invalid silver type');
//                                   return;
//                           }

//                           if (silverPricePerGram) {
//                               const silverPriceForWeight = silverPricePerGram * silverWeight;
//                               const WastageChargesForSilver = silverPriceForWeight * (priceData.wastageChargesSilver / 100);
//                               const MakingChargesForSilver = priceData.makingChargesSilver * silverWeight;
//                               totalSilverPrice = silverPriceForWeight + WastageChargesForSilver + MakingChargesForSilver;

//                               resultText += `
//                               <table border="1" cellpadding="10">
//                                 <tr><td colspan="2"><strong>Silver Details</strong></td></tr>
//                                 <tr><td>Silver Type</td><td>${silverType}</td></tr>
//                                 <tr><td>Weight</td><td>${silverWeight.toFixed(3)} Grams</td></tr>
//                                 <tr><td>Price per Gram</td><td>₹ ${silverPricePerGram.toFixed(2)}</td></tr>

//                                 <tr><td>Wastage Charges (${priceData.wastageChargesSilver}%)</td><td>₹ ${silverWastageCharges.toFixed(2)}</td></tr>
//                                 <tr><td>Making Charges</td><td>₹ ${makingChargesSilver.toFixed(2)}</td></tr>
//                                 <tr><td><strong>Total Silver Price</strong></td><td><strong>₹ ${totalSilverPrice.toFixed(2)}</strong></td></tr>
//                               </table>
//                             `;
//                           }
//                       }

//                       // Gross Total
//                       const grossTotal = totalGoldPrice + totalSilverPrice;
//                       resultText += `
//                       <table border="1" cellpadding="10" style="width: 84%; border-collapse: collapse;">
//                       <tr><td >Gross Total</td><td><strong>${grossTotal.toFixed(2)}</strong></td></tr>

//                     </table>
//                     `;

//                       // Display the final results
//                       priceResultDiv.innerHTML = resultText;

//                       // Clear the inputs   
//                       document.getElementById('gold-weight').value = '';
//                       document.getElementById('silver-weight').value = '';
//                       if (goldTypeInput) {
//                         goldTypeInput.checked = false;
//                       }
//                       if (silverTypeInput) {
//                         silverTypeInput.checked = false;
//                       }
//                   } else {
//                       console.log("No document found matching id");
//                       priceResultDiv.innerText = 'Error: No price data available.';
//                   }
//               })
//               .catch((error) => {
//                   console.log("Error getting document:", error);
//                   priceResultDiv.innerText = 'Error: Unable to fetch price data.';
//               });
//       });
//   }
// });
// -----------------------------------------------------//
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { collection, getDocs, writeBatch } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

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
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', function () {
  const calculatorForm = document.getElementById('calculator-form');
  const priceResultDiv = document.getElementById('price-result');

  if (calculatorForm) {
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

            // Calculate Gold Price if Gold Type is selected
            if (goldType && goldWeight) {
              let goldPricePerGram;
              let applyWastageMakingCharges = true;

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
                  applyWastageMakingCharges = false; // No wastage or making charges for 24Karat
                  break;
                default:
                  console.log('Invalid gold type');
                  return;
              }

              if (goldPricePerGram) {
                const goldPriceForWeight = goldPricePerGram * goldWeight;

                if (applyWastageMakingCharges) {
                  const WastageChargesForGold = goldPriceForWeight * (priceData.goldwastageCharges / 100);
                  const MakingChargesForGold = priceData.goldmakingCharges * goldWeight;
                  totalGoldPrice = goldPriceForWeight + WastageChargesForGold + MakingChargesForGold;
                } else {
                  totalGoldPrice = goldPriceForWeight; // No additional charges for 24Karat
                }

                resultText += `
                              <table border="1" cellpadding="10">
                                <tr><td colspan="2"><strong>Gold Details</strong></td></tr>
                                <tr><td>Gold Type</td><td>${goldType}</td></tr>
                                <tr><td>Weight</td><td>${goldWeight.toFixed(3)} Grams</td></tr>
                                <tr><td>Price per Gram</td><td>₹ ${goldPricePerGram.toFixed(2)}</td></tr>
                              `;

                if (applyWastageMakingCharges) {
                  resultText += `
                                    <tr><td>Wastage Charges (${priceData.goldwastageCharges}%)</td><td>₹ ${(goldPriceForWeight * (priceData.goldwastageCharges / 100)).toFixed(2)}</td></tr>
                                    <tr><td>Making Charges</td><td>₹ ${(priceData.goldmakingCharges * goldWeight).toFixed(2)}</td></tr>
                                  `;
                }

                resultText += `
                                <tr><td><strong>Total Gold Price</strong></td><td><strong>₹ ${totalGoldPrice.toFixed(2)}</strong></td></tr>
                              </table>
                            `;
              }
            }

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
                const WastageChargesForSilver = silverPriceForWeight * (priceData.wastageChargesSilver / 100);
                const MakingChargesForSilver = priceData.makingChargesSilver * silverWeight;
                totalSilverPrice = silverPriceForWeight + WastageChargesForSilver + MakingChargesForSilver;

                resultText += `
                              <table border="1" cellpadding="10">
                                <tr><td colspan="2"><strong>Silver Details</strong></td></tr>
                                <tr><td>Silver Type</td><td>${silverType}</td></tr>
                                <tr><td>Weight</td><td>${silverWeight.toFixed(3)} Grams</td></tr>
                                <tr><td>Price per Gram</td><td>₹ ${silverPricePerGram.toFixed(2)}</td></tr>
                                <tr><td>Wastage Charges (${priceData.wastageChargesSilver}%)</td><td>₹ ${(silverPriceForWeight * (priceData.wastageChargesSilver / 100)).toFixed(2)}</td></tr>
                                <tr><td>Making Charges</td><td>₹ ${(priceData.makingChargesSilver * silverWeight).toFixed(2)}</td></tr>
                                <tr><td><strong>Total Silver Price</strong></td><td><strong>₹ ${totalSilverPrice.toFixed(2)}</strong></td></tr>
                              </table>
                            `;
              }
            }

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
            priceResultDiv.innerText = 'Error: No price data available.';
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
          priceResultDiv.innerText = 'Error: Unable to fetch price data.';
        });
    });
  }
});

//-------------------- display updated price details-------------------//

// Reference to Firestore document
const priceDocRef = doc(db, "priceData", "r8NuFZ36WWbuuBv5muZDXgRJIxB2");

// Fetch price data and display
async function fetchAndDisplayPrices() {
  try {
    const docSnapshot = await getDoc(priceDocRef);
    if (docSnapshot.exists()) {
      const priceData = docSnapshot.data();

      // Extract data from Firestore
      const {
        goldmakingCharges, price18Karat, price20Karat,
        price22Karat, price24Karat, priceSilver1,
        priceSilver2, goldwastageCharges, wastageChargesSilver, makingChargesSilver
      } = priceData;

      // Get current timestamp
      const timestamp = new Date().toLocaleString();
      //<div class="price-item"><strong>Last Updated: ${timestamp}</div>
      // Display price data and timestamp
      //   <div class="price-item"><strong>Gold Wastage Charges: ₹${goldwastageCharges}%</div>
      //   <div class="price-item"><strong>Gold Making Charges: ₹${goldmakingCharges}</div>
      //  <div class="price-item"><strong>Silver Wastage Charges: ₹${wastageChargesSilver}%</div>
      //   <div class="price-item"><strong>Silver Making Charges: ₹${makingChargesSilver}</div>
      document.getElementById('priceDetails').innerHTML = `
    <h2>Todays Gold & Silver Prices Per Gram </h2>
    <div class="price-item"><strong>18 Karat: ₹${price18Karat}</div> 
    <div class="price-item"><strong>20 Karat: ₹${price20Karat}</div>
    <div class="price-item"><strong>22 Karat: ₹${price22Karat}</div>
    <div class="price-item"><strong>24 Karat: ₹${price24Karat}</div>
    <div class="price-item"><strong>Silver 1: ₹${priceSilver1}</div>
    <div class="price-item"><strong>Silver 2: ₹${priceSilver2}</div>
   
    
  `;
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error fetching price data: ", error);
  }
}

// Call the function to display prices when the page loads
fetchAndDisplayPrices();

//-------------------- end of display updated price details-------------//
//------------------------------------------------------//
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








