// import React, { useState } from "react";
// import "../RegisterForm.css";

// function RegisterCashier() {
//   // State to manage form inputs
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phoneNumber: "",
//     location: ""
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
//       <h3>Register Cashier Details</h3>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="email">Email</label>
//           <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
//         </div>
        
//         <div>
//           <label htmlFor="Password">Password</label>
//           <input type="password" id="location" name="location" value={formData.location} onChange={handleChange} required />
//         </div>

//         {/* <div className="inputBx">
//               <span>Password</span>
//               <input type="password" name="password" required />
//             </div> */}

//         <button type="submit" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
//       </form>
//     </div>
//   );
// }

// export default RegisterCashier;


import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, firestore } from "../firebase"; // Import the firestore instance
import { createUserWithEmailAndPassword } from "firebase/auth";
import "../RegisterForm.css";

function RegisterCashier() {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    email: "",
    password: "", // Renamed location to password for clarity
  });

  // State to manage loading state
  const [loading, setLoading] = useState(false);

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Set loading state to true
    setLoading(true);
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      // Add a new document with a generated ID to the 'branchmanagers' collection
      await addDoc(collection(firestore, "branchmanagers"), {
        userId: user.uid,
        email: formData.email,
      });
      // Show alert dialog
      alert("Registration successful! Redirecting to login page...");
      // Redirect to login page after a brief delay
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000); // 1000 milliseconds (1 second) delay
    } catch (error) {
      console.error("Error registering: ", error.message);
    } finally {
      // Set loading state to false
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Welcome to Ceres Juice Bar</h2>
      <h3>Register Cashier Details</h3>
      <form onSubmit={handleSubmit}>
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
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}


export default RegisterCashier;
