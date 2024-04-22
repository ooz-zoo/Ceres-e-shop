import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/shop-context";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase";
import { Product } from "./product";
import "./shop.css";
import Navbar from "../../components/Navbar";

export const Shop = () => {
  const { addToCart, cartItems } = useContext(ShopContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const selectedBranch = localStorage.getItem("selectedBranch");
        let inventoryCollection = "products"; // Default to "products" collection

        if (selectedBranch === "nairobi") {
          inventoryCollection = "nairobiproducts";
        } else if (selectedBranch === "mombasa") {
          inventoryCollection = "mombasaproducts";
        } else if (selectedBranch === "hq") {
          inventoryCollection = "hqinventory";
        }

        const productsCollection = collection(firestore, inventoryCollection);
        const productsSnapshot = await getDocs(productsCollection);
        const productsData = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="shop">
      <div className="shopTitle">
        <Navbar />
        <h1>Juice Flavors</h1>
      </div>

      <div className="products">
        {loading ? (
          <p>Loading...</p>
        ) : (
          products.map((product) => (
            <Product key={product.id} data={product} addToCart={addToCart} cartItems={cartItems} />
          ))
        )}
      </div>
    </div>
  );
};
