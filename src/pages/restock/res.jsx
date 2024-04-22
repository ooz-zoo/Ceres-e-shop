import React, { useState } from 'react';
import "./restock.css"; // Import the CSS file for the RestockForm component
import Navbar from '../../components/Navbar';

const RestockForm = () => {
    const [productName, setProductName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [branchLocation, setBranchLocation] = useState('Nairobi'); // Set default branch location to Nairobi

    const handleSubmit = (event) => {
        event.preventDefault();
        // You can add your logic for handling form submission here
        console.log('Form submitted:', { productName, quantity, branchLocation });

        // Show alert
        alert('Restock request sent!');
    };

    return (
        <div>
            <Navbar/>
            {/* <Navbar /> Render the Navbar component */}
            <form className="restock-form" onSubmit={handleSubmit}>
                <label>
                    Product Name:
                    <input className="input-field" type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
                </label>
                <label>
                    Quantity:
                    <input className="input-field" type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                </label>
                <label>
                    Branch Location:
                    <select className="select-field" value={branchLocation} onChange={(e) => setBranchLocation(e.target.value)}>
                        <option value="Nairobi">Nairobi</option>
                        <option value="Mombasa">Mombasa</option>
                        <option value="HQ">HQ</option>
                    </select>
                </label>
                <button className="submit-button" type="submit">Submit</button>
            </form>
        </div>
    );
};

export default RestockForm;
