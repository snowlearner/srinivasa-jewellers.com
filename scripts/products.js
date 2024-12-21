// Initialize Firebase  
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";  
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";  
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js";  
  
const firebaseConfig = {  
  apiKey: "AIzaSyDt_ePCpK6FVGe4tmJgMaz-DmlvGQm5wk4",  
  authDomain: "srinivasa-jewellers.firebaseapp.com",  
  projectId: "srinivasa-jewellers",  
  storageBucket: "srinivasa-jewellers.firebasestorage.app",  
  messagingSenderId: "861877666540",  
  appId: "1:861877666540:web:f1c4557fdb19732ffc1bc9",  
  measurementId: "G-WV4L6HXEXF",  
};  
  
// Initialize Firebase app and Firestore  
const app = initializeApp(firebaseConfig);  
const db = getFirestore(app);  
  
// Function to fetch product data from Firestore  
async function fetchAndDisplayProducts() {  
  //console.log("Fetching products from Firestore...");  
  
  try {  
   // Fetching products from productData collection  
   const productsRef = collection(db, "productData");  // Correct collection name based on your Firestore structure  
   const querySnapshot = await getDocs(productsRef);  
  
   // Check if any products are returned  
   if (querySnapshot.empty) {  
    //console.log("No products found in Firestore.");  
   }  
  
   const productsList = [];  
  
   querySnapshot.forEach((doc) => {  
    const data = doc.data();  
    // Loop through the products array in the document  
    data.products.forEach((product) => {  
      const productData = {  
       id: doc.id,  
       name: product.name,  
       category: product.category,  
       weight: product.weight,  
       imageUrl: product.imageUrl,  // The image URL stored in Firestore  
      };  
      //console.log("Fetched product:", productData); // Debugging product data  
      productsList.push(productData);  
    });  
   });  
  
   // Display the products once they're fetched  
   if (productsList.length > 0) {  
    displayProducts(productsList);  
   } else {  
    console.log("No products to display.");  
   }  
  
  } catch (error) {  
   console.error("Error fetching products:", error);  
  }  
}  
  
// Function to display products on the page  
function displayProducts(products) {  
  const productsContainer = document.getElementById("productsContainer");  
  
  if (!productsContainer) {  
   console.error("Products container not found!");  
   return;  
  }  
  
  products.forEach(product => {  
   const productElement = document.createElement("div");  
   productElement.classList.add("product");  
  
   // Create product content  
   const productImage = document.createElement("img");  
   productImage.src = product.imageUrl || "images/default-image.jpg";  // Use the URL from Firestore, or a fallback  
   productImage.alt = product.name;  
  
   const productName = document.createElement("h3");  
   productName.textContent = product.name;  
  
   const productCategory = document.createElement("p");  
   productCategory.textContent = `Category: ${product.category}`;  
  
   const productWeight = document.createElement("p");  
   productWeight.textContent = `Weight: ${product.weight}`;  
  
   // Append product elements to the product container  
   productElement.appendChild(productImage);  
   productElement.appendChild(productName);  
   productElement.appendChild(productCategory);  
   productElement.appendChild(productWeight);  
   productsContainer.appendChild(productElement);  
  });  
}  
  
// Go back to the main page when the button is clicked  
document.addEventListener("DOMContentLoaded", function () {  
  const goBackButton = document.getElementById("goBackButton");  
  
  if (goBackButton) {  
   goBackButton.addEventListener("click", function () {  
    window.location.href = "index.html"; // Redirect to the main page  
   });  
  }  
});  
  
// Call the function to fetch and display products when the page loads  
document.addEventListener('DOMContentLoaded', fetchAndDisplayProducts);
