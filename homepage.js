// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
// import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
// import { getFirestore, getDoc, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
// // Firebase imports for Firestore and Firebase Storage
// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js";

// const firebaseConfig = {
//   apiKey: "AIzaSyDt_ePCpK6FVGe4tmJgMaz-DmlvGQm5wk4",
//   authDomain: "srinivasa-jewellers.firebaseapp.com",
//   projectId: "srinivasa-jewellers",
//   storageBucket: "srinivasa-jewellers.firebasestorage.app",
//   messagingSenderId: "861877666540",
//   appId: "1:861877666540:web:f1c4557fdb19732ffc1bc9",
//   measurementId: "G-WV4L6HXEXF",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const storage = getStorage(); // Initialize Firebase Storage
// const db = getFirestore(); // Initialize Firestore
// const auth = getAuth(); // Initialize Firebase Authentication

// //----------------//

// onAuthStateChanged(auth, async (user) => {
//   if (user) {
//     console.log("User is logged in:", user);

//     // Fetch the user's document by their UID
//     const docRef = doc(db, "users", user.uid);
//     try {
//       const docSnap = await getDoc(docRef);

//       if (docSnap.exists()) {
//         const userData = docSnap.data();
//         document.getElementById("loggedUserFName").innerText = userData.firstName || "N/A";
//         document.getElementById("loggedUserLName").innerText = userData.lastName || "N/A";
//         document.getElementById("loggedUserEmail").innerText = userData.email || "N/A";
//       } else {
//         // User document not found
//         console.error("No user document found for this UID");
//         alert("User details not found! Redirecting to login page.");
//         localStorage.removeItem("loggedInUserId");
//         window.location.href = "index.html"; // Redirect to login page
//       }
//     } catch (error) {
//       console.error("Error retrieving user details:", error);
//       alert("An error occurred while retrieving user details. Please try again.");
//       localStorage.removeItem("loggedInUserId");
//       window.location.href = "index.html"; // Redirect to login page
//     }
//   } //else {
//   //   console.log("User is not logged in.");
//   //   alert("You are not logged in. Redirecting to login page.");
//   //   window.location.href = "index.html"; // Redirect to login page
//   // }
// });


// //----------------//

// // Logout functionality
// const logoutButton = document.getElementById("logout");
// logoutButton.addEventListener("click", () => {
//   signOut(auth)
//     .then(() => {
//       console.log("User signed out successfully.");
//       window.location.href = "index.html"; // Redirect to login page
//     })
//     .catch((error) => {
//       console.error("Error signing out:", error);
//     });
// });

// // Price Form Handling
// const priceForm = document.getElementById("priceForm");

// priceForm.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const priceData = {
//     price18Karat: parseFloat(document.getElementById("price18Karat").value),
//     price20Karat: parseFloat(document.getElementById("price20Karat").value),
//     price22Karat: parseFloat(document.getElementById("price22Karat").value),
//     price24Karat: parseFloat(document.getElementById("price24Karat").value),
//     priceSilver1: parseFloat(document.getElementById("priceSilver1").value),
//     priceSilver2: parseFloat(document.getElementById("priceSilver2").value),
//     wastageCharges: parseFloat(document.getElementById("wastageCharges").value),
//     makingCharges: parseFloat(document.getElementById("makingCharges").value),
//   };

//   const docRef = doc(db, "priceData", "r8NuFZ36WWbuuBv5muZDXgRJIxB2");

//   setDoc(docRef, priceData)
//     .then(() => {
//       alert("Price details updated successfully!");
//     })
//     .catch((error) => {
//       console.error("Error saving price details:", error);
//     });
// });

// // Add products///
// // Add product form handling


// const addProductForm = document.getElementById("addProductForm");

// addProductForm.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     // Get form input values
//     const category = document.getElementById("product-category").value;
//     const name = document.getElementById("product-name").value;
//     const weight = parseFloat(document.getElementById("product-weight").value);
//     const fileInput = document.getElementById("product-image"); // Assuming file input for image
//     const imageFile = fileInput.files[0]; // Get the file

//     // Get the current logged-in user
//     const user = auth.currentUser;

//     if (user) {
//         // If there's an image selected, upload it to Firebase Storage
//         if (imageFile) {
//             const storageRef = ref(storage, 'products/' + imageFile.name); // Define the path in Firebase Storage
//             const uploadTask = uploadBytesResumable(storageRef, imageFile);

//             // Track upload progress and handle errors
//             uploadTask.on('state_changed', 
//                 (snapshot) => {
//                     // You can track the progress of the upload here
//                 },
//                 (error) => {
//                     console.error("Error uploading file:", error);
//                     alert("Error uploading image. Please try again.");
//                 }, 
//                 () => {
//                     // After the upload completes, get the download URL of the image
//                     getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
//                         // Prepare the product data including the image URL
//                         const productData = {
//                             category,
//                             name,
//                             weight,
//                             image: downloadURL, // Use the image URL from Firebase Storage
//                             userId: user.uid,
//                             timestamp: new Date()
//                         };

//                         // Save product data to Firestore
//                         try {
//                             const docRef = doc(db, "products", `${category}-${name}-${Date.now()}`);
//                             await setDoc(docRef, productData);

//                             alert("Product added successfully!");
//                             addProductForm.reset(); // Reset form fields
//                         } catch (error) {
//                             console.error("Error adding product:", error);
//                             alert("Error adding product. Please try again.");
//                         }
//                     });
//                 }
//             );
//         } else {
//             // If no image is uploaded, proceed without the image URL
//             const productData = {
//                 category,
//                 name,
//                 weight,
//                 image: "", // No image
//                 userId: user.uid,
//                 timestamp: new Date()
//             };

//             // Save product data to Firestore
//             try {
//                 const docRef = doc(db, "products", `${category}-${name}-${Date.now()}`);
//                 await setDoc(docRef, productData);

//                 alert("Product added successfully!");
//                 addProductForm.reset(); // Reset form fields
//             } catch (error) {
//                 console.error("Error adding product:", error);
//                 alert("Error adding product. Please try again.");
//             }
//         }
//     } else {
//         alert("You must be logged in to add products.");
//     }
// });

// --------------------------------------------------------------------- //
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, getDoc, doc, setDoc, updateDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { arrayRemove } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDt_ePCpK6FVGe4tmJgMaz-DmlvGQm5wk4",
  authDomain: "srinivasa-jewellers.firebaseapp.com",
  projectId: "srinivasa-jewellers",
  storageBucket: "srinivasa-jewellers.firebasestorage.app",
  messagingSenderId: "861877666540",
  appId: "1:861877666540:web:f1c4557fdb19732ffc1bc9",
  measurementId: "G-WV4L6HXEXF",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(); // Initialize Firestore  
const auth = getAuth(); // Initialize Firebase Authentication  

// ------------ to prevent accessing the homepahe without login --------------//


// By default, hide the body content until we confirm the user is logged in  
document.body.style.visibility = "hidden";

onAuthStateChanged(auth, (user) => {
  if (!user) {
    // If the user is not logged in, redirect to index.html  
    //alert("You are not logged in please login to access the page!");

    alert("User signed out successfully!");

    window.location.replace("index.html");
  } else {

    // If the user is logged in, render the homepage content  
    document.body.style.visibility = "visible";

  }
})
// ---------------------------//

// Listen for the authentication state  
onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log("User is logged in:", user);

    const docRef = doc(db, "users", user.uid);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        document.getElementById("loggedUserFName").innerText = userData.firstName || "N/A";
        document.getElementById("loggedUserLName").innerText = userData.lastName || "N/A";
        document.getElementById("loggedUserEmail").innerText = userData.email || "N/A";
      } else {
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
  }
});

// Price Form Handling
priceForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const priceData = {
    price18Karat: parseFloat(document.getElementById("price18Karat").value),
    price20Karat: parseFloat(document.getElementById("price20Karat").value),
    price22Karat: parseFloat(document.getElementById("price22Karat").value),
    price24Karat: parseFloat(document.getElementById("price24Karat").value),
    priceSilver1: parseFloat(document.getElementById("priceSilver1").value),
    priceSilver2: parseFloat(document.getElementById("priceSilver2").value),
    goldwastageCharges: parseFloat(document.getElementById("goldwastageCharges").value),
    goldmakingCharges: parseFloat(document.getElementById("goldmakingCharges").value),
    wastageChargesSilver: parseFloat(document.getElementById("wastageChargesSilver").value),
    makingChargesSilver: parseFloat(document.getElementById("makingChargesSilver").value),
  };

  setDoc(doc(db, "priceData", "r8NuFZ36WWbuuBv5muZDXgRJIxB2"), priceData)
    .then(() => {
      alert("Price details updated successfully!");
    })
    .catch((error) => {
      console.error("Error saving price details:", error);
    });
});

// Logout functionality  
document.addEventListener('DOMContentLoaded', function () {
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
});

// Add Product Form Handling  
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOMContentLoaded fired');
  const addProductForm = document.getElementById("addProductForm");

  if (!addProductForm) {
    console.error('Form not found!');
    return;
  }

  addProductForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Access form fields  
    const categoryElement = document.getElementById("product-category");
    const nameElement = document.getElementById("product-name");
    const weightElement = document.getElementById("product-weight");
    const imageUrlElement = document.getElementById("product-image-url");

    const category = categoryElement.value;
    const name = nameElement.value;
    const weight = parseFloat(weightElement.value);
    const imageUrl = imageUrlElement.value;

    console.log(category, name, weight, imageUrl); // Debug output for checking values  

    // Get the current logged-in user  
    const user = auth.currentUser;

    if (user) {
      // Prepare product data  
      const productData = {
        category,
        name,
        weight,
        imageUrl: imageUrl || "", // Store the image URL in Firestore  
        userId: user.uid,
        timestamp: new Date()
      };

      // Save product data to Firestore (specific collection with a predefined document ID)  
      try {
        const docRef = doc(db, "productData", "np6cJBFNPXdUpdnULNAF"); // Using predefined document ID  
        await updateDoc(docRef, {
          products: arrayUnion(productData) // Append the product to the products array  
        });

        alert("Product added successfully!");
        addProductForm.reset(); // Reset form fields  
      } catch (error) {
        console.error("Error adding product:", error);
        alert("Error adding product. Please try again.");
      }
    } else {
      alert("You must be logged in to add products.");
    }
  });
});

// --------- delete product------------//  

// Fetch products and populate the delete dropdown  
const deleteProductForm = document.getElementById('deleteProductForm'); // Form to delete products  
const productDropdown = document.getElementById('product-select'); // Dropdown for selecting products  

async function fetchProducts() {
  const productsCollection = doc(db, 'productData', 'np6cJBFNPXdUpdnULNAF');
  const docSnap = await getDoc(productsCollection);

  if (docSnap.exists()) {
    const productData = docSnap.data().products;

    // Populate the dropdown with product names  
    productDropdown.innerHTML = ''; // Clear previous options  
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.text = 'Select a product to delete';
    productDropdown.appendChild(defaultOption);

    productData.forEach(product => {
      const option = document.createElement('option');
      option.value = product.name; // Or product ID if you need more precision  
      option.innerText = product.name;
      productDropdown.appendChild(option);
    });
  } else {
    console.error('No products found');
  }
}

// Call fetchProducts on page load  
document.addEventListener('DOMContentLoaded', fetchProducts);

// Handle product deletion  
deleteProductForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const selectedProductName = productDropdown.value;

  if (!selectedProductName) {
    alert("Please select a product to delete.");
    return;
  }

  // Ask for user confirmation  
  const confirmDelete = confirm(`Are you sure you want to delete the product: ${selectedProductName}?`);

  if (confirmDelete) {
    // Fetch the product data from Firestore  
    const productCollectionRef = doc(db, "productData", "np6cJBFNPXdUpdnULNAF");
    try {
      const docSnap = await getDoc(productCollectionRef);
      if (docSnap.exists()) {
        const productData = docSnap.data().products;

        // Find the product to delete  
        const productToDelete = productData.find(product => product.name === selectedProductName);

        if (productToDelete) {
          // Remove the product from Firestore  
          await updateDoc(productCollectionRef, {
            products: arrayRemove(productToDelete)
          });

          alert("Product deleted successfully!");
          fetchProducts(); // Refresh the list of products  
        } else {
          alert("Product not found or invalid selection.");
        }
      } else {
        alert("Error fetching product data.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("An error occurred while deleting the product. Please try again.");
    }
  }
});

// ------------------------- add image form handling--------------------------//
// Add Image Form Handling   
document.addEventListener('DOMContentLoaded', function () {  
  const addImageForm = document.getElementById("addImageForm");  
  
  if (!addImageForm) {  
   console.error('Form not found!');  
   return;  
  }  
  
  addImageForm.addEventListener("submit", async (e) => {  
   e.preventDefault();  
  
   // Access form fields   
   const imageUrlElement = document.getElementById("image-url");  
   const imageUrl = imageUrlElement.value;  
  
   console.log(imageUrl); // Debug output for checking values   
  
   // Get the current logged-in user   
   const user = auth.currentUser;  
  
   if (user) {  
    // Prepare image data   
    const imageData = {  
      imageUrl: imageUrl || "", // Store the image URL in Firestore   
      userId: user.uid,  
      timestamp: new Date()  
    };  
  
    // Save image data to Firestore (specific collection with a predefined document ID)   
    try {  
      const docRef = doc(db, "imageData", "IU8pbWm1r1Z0oTKzxJ6U"); // Using predefined document ID   
      const docSnap = await getDoc(docRef);  
  
      if (docSnap.exists()) {  
       await updateDoc(docRef, {  
        images: arrayUnion(imageData) // Append the image to the images array   
       });  
      } else {  
       await setDoc(docRef, {  
        images: [imageData] // Initialize images field as an array with the new image  
       });  
      }  
  
      alert("Image added successfully!");  
      addImageForm.reset(); // Reset form fields   
      fetchImages(); // Refresh the list of images   
    } catch (error) {  
      console.error("Error adding image:", error);  
      alert("Error adding image. Please try again.");  
    }  
   } else {  
    alert("You must be logged in to add images.");  
   }  
  });  
});  
  
// Fetch images and populate the delete dropdown   
const deleteImageForm = document.getElementById('deleteImageForm'); // Form to delete images   
const imageDropdown = document.getElementById('image-select'); // Dropdown for selecting images   
  
async function fetchImages() {  
  const imagesCollection = doc(db, 'imageData', 'IU8pbWm1r1Z0oTKzxJ6U');  
  const docSnap = await getDoc(imagesCollection);  
  
  if (docSnap.exists()) {  
   const imageData = docSnap.data().images;  
  
   // Check if imageData is an array before trying to call forEach on it  
   if (Array.isArray(imageData)) {  
    // Populate the dropdown with image URLs   
    imageDropdown.innerHTML = ''; // Clear previous options   
    const defaultOption = document.createElement('option');  
    defaultOption.value = '';  
    defaultOption.text = 'Select an image to delete';  
    imageDropdown.appendChild(defaultOption);  
  
    imageData.forEach((image) => {  
      const option = document.createElement('option');  
      option.value = image.imageUrl; // Or image ID if you need more precision   
      option.innerText = image.imageUrl;  
      imageDropdown.appendChild(option);  
    });  
   } else {  
    console.log('No images found or images field is not an array');  
   }  
  } else {  
   console.error('No images found');  
  }  
}  
  
// Call fetchImages on page load   
document.addEventListener('DOMContentLoaded', fetchImages);  
  
// Handle image deletion   
deleteImageForm.addEventListener('submit', async (e) => {  
  e.preventDefault();  
  
  const selectedImageUrl = imageDropdown.value;  
  
  if (!selectedImageUrl) {  
   alert("Please select an image to delete.");  
   return;  
  }  
  
  // Ask for user confirmation   
  const confirmDelete = confirm(`Are you sure you want to delete the image: ${selectedImageUrl}?`);  
  
  if (confirmDelete) {  
   // Fetch the image data from Firestore   
   const imagesCollectionRef = doc(db, "imageData", "IU8pbWm1r1Z0oTKzxJ6U");  
   try {  
    const docSnap = await getDoc(imagesCollectionRef);  
    if (docSnap.exists()) {  
      const imageData = docSnap.data().images;  
  
      // Find the image to delete   
      const imageToDelete = imageData.find((image) => image.imageUrl === selectedImageUrl);  
  
      if (imageToDelete) {  
       // Remove the image from Firestore   
       await updateDoc(imagesCollectionRef, {  
        images: arrayRemove(imageToDelete)  
       });  
  
       alert("Image deleted successfully!");  
       fetchImages(); // Refresh the list of images   
      } else {  
       alert("Image not found or invalid selection.");  
      }  
    } else {  
      alert("Error fetching image data.");  
    }  
   } catch (error) {  
    console.error("Error deleting image:", error);  
    alert("An error occurred while deleting the image. Please try again.");  
   }  
  }  
});

