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
  
// Calculator form submission handler    
// Calculator form submission handler    
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
   
  const db = getFirestore();   
  const docRef = doc(db, "priceData", "r8NuFZ36WWbuuBv5muZDXgRJIxB2");   
   
  getDoc(docRef)   
  .then((docSnap) => {   
    if (docSnap.exists()) {   
      const priceData = docSnap.data();   
      let totalPrice = 0;   
      let resultText = '';   
   
      if (goldType && goldWeight) {   
        let goldPricePerGram;   
        switch (goldType) {   
          case '18-carat':   
           goldPricePerGram = priceData.price18Carat;   
           break;   
          case '20-carat':   
           goldPricePerGram = priceData.price20Carat;   
           break;   
          case '22-carat':   
           goldPricePerGram = priceData.price22Carat;   
           break;   
          case '24-carat':   
           goldPricePerGram = priceData.price24Carat;   
           break;   
          default:   
           console.log('Invalid gold type');   
           return;   
        }   
        const goldPriceForWeight = goldPricePerGram * goldWeight;   
        const goldWastageCharges = goldPriceForWeight * (priceData.wastageCharges / 100);   
        const goldMakingCharges = goldPriceForWeight * (priceData.makingCharges / 100);   
        const totalGoldPrice = goldPriceForWeight + goldWastageCharges + goldMakingCharges;   
        resultText += `Price for ${goldWeight.toFixed(3)} grams of ${goldType} gold is: ${totalGoldPrice.toFixed(2)}\n`;   
        totalPrice += totalGoldPrice;   
      }   
   
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
        const silverPriceForWeight = silverPricePerGram * silverWeight;   
        const silverWastageCharges = silverPriceForWeight * (priceData.wastageCharges / 100);   
        const silverMakingCharges = silverPriceForWeight * (priceData.makingCharges / 100);   
        const totalSilverPrice = silverPriceForWeight + silverWastageCharges + silverMakingCharges;   
        resultText += `Price for ${silverWeight.toFixed(3)} grams of ${silverType} silver is: ${totalSilverPrice.toFixed(2)}\n`;   
        totalPrice += totalSilverPrice;   
      }   
   
      resultText += `Total Price: ${totalPrice.toFixed(2)}`;   
      priceResultDiv.innerText = resultText;   
   
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
   
// // Allow floating values up to 3 decimals in the weight inputs   
// document.getElementById('gold-weight').addEventListener('input', function() {   
//   this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1').replace(/^0+(\d)/, '$1').replace(/^\./, '0.').replace(/\.(\d{3})\d+/, '.$1');   
// });   
   
// document.getElementById('silver-weight').addEventListener('input', function() {   
//   this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1').replace(/^0+(\d)/, '$1').replace(/^\./, '0.').replace(/\.(\d{3})\d+/, '.$1');   
// });  
  
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
