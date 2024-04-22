// import React, { useContext } from "react";
// import { ShopContext } from "../../context/shop-context";

// export const Product = (props) => {
//  const { id, productName, productPrice, productImage, productQty } = props.data;
//  const { addToCart, cartItems } = useContext(ShopContext);

//  // Correctly access the quantity of the item in the cart
//  const cartItem = cartItems[id];
//  const cartItemCount = cartItem ? cartItem.quantity : 0;
//  const maxQuantity = quantity;

//  const handleAddToCart = () => {
//     if (cartItemCount < maxQuantity) {
//       addToCart(id);
//     } else {
//       alert(`You've reached the maximum quantity for ${productName}`);
//     }
//  };

//  return (
//     <div className="product">
//       <img src={productImage} alt={productName} />
//       <div className="description">
//         <p>
//           <b>{productName}</b>
//         </p>
//         <p> Ksh {price}</p>
//         <p> Quantity: {quantity}</p>
//       </div>
//       <button className="addToCartBttn" onClick={handleAddToCart} disabled={cartItemCount >= maxQuantity}>
//         Add To Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
//       </button>
//     </div>
//  );
// };


import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";

export const Product = (props) => {
 const { productID, productName, productPrice, productImage, productQty } = props.data;
 const { addToCart, cartItems } = useContext(ShopContext);

 // Correctly access the quantity of the item in the cart
 const cartItem = cartItems[productID];
 const cartItemCount = cartItem ? cartItem.quantity : 0;
 const maxQuantity = productQty;

 const handleAddToCart = () => {
    if (cartItemCount < maxQuantity) {
      addToCart(productID);
    } else {
      alert(`You've reached the maximum quantity for ${productName}`);
    }
 };

 return (
    <div className="product">
      <img src={productImage} alt={productName} />
      <div className="description">
        <p>
          <b>{productName}</b>
        </p>
        <p> Ksh {productPrice}</p>
        <p> Quantity: {productQty}</p>
      </div>
      <button className="addToCartBttn" onClick={handleAddToCart} disabled={cartItemCount >= maxQuantity}>
        Add To Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
      </button>
    </div>
 );
};
