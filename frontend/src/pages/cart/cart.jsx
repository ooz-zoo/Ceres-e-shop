// Cart.jsx
import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { Link } from "react-router-dom"; 
import "./cart.css";

const Cart = () => {
    const { cartItems, getTotalCartAmount, decrementItem, incrementItem } = useContext(ShopContext);
   
    const totalAmount = getTotalCartAmount();
   
    return (
       <div className="cart">
         <h2>Your Cart</h2>
         {Object.values(cartItems).map((item) => (
           <div key={item.id} className="cart-item">
             <img src={item.productImage} alt={item.productName} />
             <div className="cart-item-details">
               <p>{item.productName}</p>
               <p>Ksh {item.price}</p>
               <p>Quantity: {item.quantity}</p>
               <button onClick={() => decrementItem(item.id)}>-</button>
               <button onClick={() => incrementItem(item.id)}>+</button>
             </div>
           </div>
         ))}
         <div className="cart-total">Total: Ksh {totalAmount.toFixed(2)}</div>
         {/* Checkout button */}
         <Link to="/checkout">
           <button className="checkout-button">Proceed to Checkout</button>
         </Link>
       </div>
    );
};

export default Cart;


