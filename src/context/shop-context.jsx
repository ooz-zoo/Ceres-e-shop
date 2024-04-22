import { createContext, useState, useEffect } from "react";
import { PRODUCTS } from "../JuiceProducts"; // Adjust the import path as necessary

export const ShopContext = createContext(null);

// Initialize an empty cart
const getDefaultCart = () => {
 return {};
};

export const ShopContextProvider = (props) => {
 const [cartItems, setCartItems] = useState(() => {
    // Load cart items from local storage when the component mounts
    const savedCartItems = localStorage.getItem("cartItems");
    return savedCartItems ? JSON.parse(savedCartItems) : getDefaultCart();
 });

 useEffect(() => {
    // Save cart items to local storage whenever they change
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
 }, [cartItems]);

 const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item].quantity > 0) {
        totalAmount += cartItems[item].quantity * cartItems[item].price;
      }
    }
    return totalAmount;
 };

 const addToCart = (itemId) => {
    setCartItems((prev) => {
      const item = prev[itemId];
      if (item) {
        // If the item exists, increment its quantity
        return { ...prev, [itemId]: { ...item, quantity: item.quantity + 1 } };
      } else {
        // If the item doesn't exist, add it to the cart with quantity 1
        const newItem = PRODUCTS.find((product) => product.id === itemId);
        return { ...prev, [itemId]: { ...newItem, quantity: 1 } };
      }
    });
 };

 const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const item = prev[itemId];
      if (item && item.quantity > 1) {
        return { ...prev, [itemId]: { ...item, quantity: item.quantity - 1 } };
      } else if (item) {
        // If the item's quantity is 1, remove it from the cart
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      return prev;
    });
 };

 const incrementItem = (itemId) => {
    setCartItems((prev) => {
      const item = prev[itemId];
      if (item) {
        return { ...prev, [itemId]: { ...item, quantity: item.quantity + 1 } };
      }
      return prev;
    });
 };

 const decrementItem = (itemId) => {
    setCartItems((prev) => {
      const item = prev[itemId];
      if (item && item.quantity > 1) {
        return { ...prev, [itemId]: { ...item, quantity: item.quantity - 1 } };
      } else if (item) {
        // If the item's quantity is 1, remove it from the cart
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      return prev;
    });
 };

 const checkout = () => {
  const cartItemsArray = Object.values(cartItems);
    // Store the array in localStorage
    localStorage.setItem('purchasedItems', JSON.stringify(cartItemsArray));
    // Optionally, clear the cart from the state
    setCartItems(getDefaultCart());
    // // Store the cart items in localStorage as purchased items
    // localStorage.setItem('purchasedItems', JSON.stringify(cartItems));

    // // Clear the cart
    // setCartItems(getDefaultCart());
    // localStorage.removeItem("cartItems"); // Also clear from local storage
 };

 const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    incrementItem,
    decrementItem,
    getTotalCartAmount,
    checkout,
 };

 return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
 );
};
