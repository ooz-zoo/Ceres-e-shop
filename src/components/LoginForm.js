import "../LoginForm.css";
import React, { useState } from 'react'; // Import useState from React
import { Link } from "react-router-dom"; // Import Link for routing
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // Import the auth instance

function LoginForm() {
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;

    try {
      // Sign in with email and password
      await signInWithEmailAndPassword(auth, username, password);
      // Successful login
      alert("Login successful!"); // Replace with your alert or notification component
      // Redirect or perform any other actions after successful login
      window.location.href = "/shop";
    } catch (error) {
      // Failed login
      setError(error.message);
    }
  };

  return (
    <section>
      <div className="imgBx">
        <img src="/juice4.jpg" alt="Ceres Fruit Juice" />
      </div>
      <div className="contentBx">
        <div className="formBx">
          <h2>Cashier Log In</h2>
          <p className="intro">
            Log in to access cashier dashboard and manage transactions
            efficiently.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="inputBx">
              <span>Username</span>
              <input type="email" name="username" required />
            </div>
            <div className="inputBx">
              <span>Password</span>
              <input type="password" name="password" required />
            </div>
            {error && <p className="error">{error}</p>}
            <div className="inputBx">
              <button type="submit">Log In</button>
            </div>
          </form>

          <div className="registerCustomer">
            <p>
              New Customer? <Link to="/register">Register Customer</Link>
              <br />
              <br /> Cashier Registration?{" "}
              <Link to="/register-cashier">Register Cashier</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginForm;
