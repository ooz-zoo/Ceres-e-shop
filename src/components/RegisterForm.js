// import React, { useState } from "react";
// import "../RegisterForm.css";

// function RegisterForm() {
//   // State to manage form inputs
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phoneNumber: "",
//   });

//   // State to manage loading state
//   const [loading, setLoading] = useState(false);

//   // Function to handle form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   // Function to handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Set loading state to true
//     setLoading(true);
//     // Simulate registration process
//     await registerUser(formData);
//     // Set loading state to false
//     setLoading(false);
//     // Show alert dialog
//     alert('Registration successful! Redirecting to login page...');
//     // Redirect to login page after a brief delay
//     setTimeout(() => {
//       window.location.href = "/login";
//     }, 1000); // 1000 milliseconds (1 second) delay
//   };

//   // Function to simulate user registration (replace with actual backend logic)
//   const registerUser = async (userData) => {
//     // Simulate asynchronous operation (e.g., sending data to backend)
//     await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate 1 second delay
//   };

//   return (
//     <div className="container">
//       <h2>Welcome to Ceres Juice Bar</h2>
//       <h3>Register user details</h3>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="fullName">Full Name</label>
//           <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
//         </div>
//         <div>
//           <label htmlFor="email">Email</label>
//           <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
//         </div>
//         <div>
//           <label htmlFor="phoneNumber">Phone Number</label>
//           <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
//         </div>
        
//         <button type="submit" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
//       </form>
//     </div>
//   );
// }

// export default RegisterForm;

// import React, { useState } from "react";
// import "../RegisterForm.css";
// import firebase from "./firebase";

// function RegisterForm() {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phoneNumber: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // Store user details in Firestore
//       await firebase.firestore().collection("customers").add(formData);
//       alert('Customer registration successful!');

//       // Clear form data after successful registration
//       setFormData({
//         fullName: "",
//         email: "",
//         phoneNumber: ""
//       });
//     } catch (error) {
//       console.error("Error registering customer:", error);
//       alert("Error registering customer: " + error.message);
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="container">
//       <h2>Welcome to Ceres Juice Bar</h2>
//       <h3>Register Customer Details</h3>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="fullName">Full Name</label>
//           <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
//         </div>
//         <div>
//           <label htmlFor="email">Email</label>
//           <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
//         </div>
//         <div>
//           <label htmlFor="phoneNumber">Phone Number</label>
//           <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
//         </div>
        
//         <button type="submit" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
//       </form>
//     </div>
//   );
// }

// export default RegisterForm;


import React, { useState } from 'react';
import { firestore } from "../firebase";
import { addDoc, collection } from "firebase/firestore"; // Import the firestore instance
import { v4 as uuidv4 } from 'uuid'; // Import uuid library for generating unique IDs
import '../RegisterForm.css';

function RegisterForm() {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: ''
  });

  // State to manage loading state
  const [loading, setLoading] = useState(false);

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Set loading state to true
    setLoading(true);
    try {
      // Generate a unique ID for the customer
      const userId = uuidv4();
      // Add user ID to form data
      const userData = { ...formData, userId };
      // Add a new document with the generated user ID to the 'customers' collection
      await addDoc(collection(firestore, 'customers'), userData);
      // Show alert dialog
      alert('Registration successful! Redirecting to login page...');
      // Redirect to login page after a brief delay
      setTimeout(() => {
        window.location.href = '/login';
      }, 1000); // 1000 milliseconds (1 second) delay
    } catch (error) {
      console.error('Error adding document: ', error);
    } finally {
      // Set loading state to false
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Welcome to Ceres Juice Bar</h2>
      <h3>Register Customer Details</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
      </form>
    </div>
  );
}


export default RegisterForm;