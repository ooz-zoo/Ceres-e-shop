import React, { useState, useContext, useEffect } from "react";
import { ShopContext } from "../../context/shop-context";
import { collection, query, where, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";
import { firestore } from "../../firebase";

const Checkout = () => {
    const { checkout, cartItems } = useContext(ShopContext);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [customerId, setCustomerId] = useState("");
    const [selectedBranch, setSelectedBranch] = useState("");
    const [receivingBranch, setReceivingBranch] = useState("");
    const [showBranchSelection, setShowBranchSelection] = useState(false);

    useEffect(() => {
        const branch = localStorage.getItem("selectedBranch");
        if (branch) {
            setSelectedBranch(branch);
            if (branch === 'hq') {
                setShowBranchSelection(true);
            }
        }
    }, []);

    const handlePhoneNumberChange = async (e) => {
        const enteredPhoneNumber = e.target.value;
        setPhoneNumber(enteredPhoneNumber);
        try {
            const customersCollection = collection(firestore, "customers");
            const q = query(customersCollection, where("phoneNumber", "==", enteredPhoneNumber));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                    const customerData = doc.data();
                    setCustomerName(customerData.fullName);
                    setCustomerId(customerData.userId);
                });
            } else {
                setCustomerName("Customer Not Found");
                setCustomerId("");
            }
        } catch (error) {
            console.error("Error fetching customer data:", error);
        }
    };

    const handleBranchSelection = (e) => {
        const selectedBranch = e.target.value;
        setReceivingBranch(selectedBranch);
        // console.log('Selected Receiving Branch:', selectedBranch); // This line prints the selected branch to the console
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const currentDate = new Date();
            const cartItemsArray = Object.values(cartItems);
            const order = {
                customerId,
                customerName,
                branch: selectedBranch,
                //receivingBranch,
                purchasedItems: cartItemsArray,
                purchaseDate: currentDate
            };
            await addDoc(collection(firestore, "orders"), order);
            await updateProductQuantity(cartItemsArray);
            await updateProductQuantityMom(cartItemsArray);
            checkout();
            alert("Purchase successful!");
            window.location.href = "./sales-report";
        } catch (error) {
            console.error("Error placing order:", error);
            alert("Error placing order. Please try again.");
        }
    };

    const handleHQSubmit = async () => {
        try {
            const currentDate = new Date();
            const cartItemsArray = Object.values(cartItems);
            // Send order details to HQOrders collection
            await addDoc(collection(firestore, "hqorders"), {
                customerName: receivingBranch, // Assuming customerName and receivingBranch are the same for HQ
                purchasedItems: cartItemsArray,
                purchaseDate: currentDate
            });
            // Update product quantities
            await updateHQProductQuantity(cartItemsArray);
            // Checkout process
            checkout();
            alert("HQ Purchase successful!");
            window.location.href = "./sales-report";
        } catch (error) {
            console.error("Error placing HQ order:", error);
            alert("Error placing HQ order. Please try again.");
        }
    };

    //WORkING CODE
    const updateHQProductQuantity = async (cartItemsArray) => {
        try {
            // Deduct from HQ inventory
            for (const item of cartItemsArray) {
                console.log("Deducting from HQ inventory:", item);
                const hqProductsCollection = collection(firestore, "hqinventory");
                const hqQuerySnapshot = await getDocs(hqProductsCollection);
                hqQuerySnapshot.forEach(async (hqProductDoc) => {
                    const hqProductData = hqProductDoc.data();
                    console.log("HQ Product Data:", hqProductData);
                    if (hqProductData.productName === item.productName) {
                        const hqProductRef = doc(firestore, "hqinventory", hqProductDoc.id);
                        console.log("Updating HQ Product:", hqProductRef);
                        await updateDoc(hqProductRef, {
                            productQty: hqProductData.productQty - item.quantity
                        });
                        console.log("HQ Product Updated Successfully.");
                    }
                });
            }
    
            // Increment in Nairobi inventory
            for (const item of cartItemsArray) {
                if (customerName === 'nairobi' || receivingBranch === 'nairobi') {
                    console.log("Incrementing Nairobi inventory:", item);
                    const nairobiProductsCollection = collection(firestore, "nairobiproducts");
                    const nairobiQuerySnapshot = await getDocs(nairobiProductsCollection);
                    nairobiQuerySnapshot.forEach(async (nairobiProductDoc) => {
                        const nairobiProductData = nairobiProductDoc.data();
                        if (nairobiProductData.productName === item.productName) {
                            const nairobiProductRef = doc(firestore, "nairobiproducts", nairobiProductDoc.id);
                            await updateDoc(nairobiProductRef, {
                                productQty: nairobiProductData.productQty + item.quantity
                            });
                            console.log("Nairobi Product Updated Successfully.");
                        }
                    });
                }
            }
            //Increment in Mombasa inventory
            for (const item of cartItemsArray) {
                if (customerName === 'mombasa' || receivingBranch === 'mombasa') {
                    console.log("Incrementing Mombasa inventory:", item);
                    const mombasaProductsCollection = collection(firestore, "mombasaproducts");
                    const mombasaQuerySnapshot = await getDocs(mombasaProductsCollection);
                    mombasaQuerySnapshot.forEach(async (mombasaProductDoc) => {
                        const mombasaProductData = mombasaProductDoc.data();
                        if (mombasaProductData.productName === item.productName) {
                            const mombasaProductRef = doc(firestore, "mombasaproducts", mombasaProductDoc.id);
                            await updateDoc(mombasaProductRef, {
                                productQty: mombasaProductData.productQty + item.quantity
                            });
                            console.log("Mombasa Product Updated Successfully.");
                        }
                    });
                }
            }
        } 
        catch (error) {
            console.error('Error updating HQ product quantity:', error);
        }
    };
    //test 
    
    //to update the cart when cashier makes a sale - nairobi
    const updateProductQuantity = async (cartItemsArray) => {
        try {
            for (const item of cartItemsArray) {
                const productsCollection =  collection(firestore, "nairobiproducts");
                const querySnapshot = await getDocs(productsCollection);
                querySnapshot.forEach(async (productDoc) => {
                    const productData = productDoc.data();
                    if (productData.productName === item.productName) {
                        const productRef = doc(firestore, "nairobiproducts", productDoc.id);
                        await updateDoc(productRef, {
                            productQty: productData.productQty - item.quantity
                        });
                    }
                });
            }
        } catch (error) {
            console.error('Error updating product quantity:', error);
        }
    };
    //to update the cart when cashier makes a sale - mombasa
    const updateProductQuantityMom = async (cartItemsArray) => {
        try {
            for (const item of cartItemsArray) {
                const productsCollection =  collection(firestore, "mombasaproducts");
                const querySnapshot = await getDocs(productsCollection);
                querySnapshot.forEach(async (productDoc) => {
                    const productData = productDoc.data();
                    if (productData.productName === item.productName) {
                        const productRef = doc(firestore, "mombasaproducts", productDoc.id);
                        await updateDoc(productRef, {
                            productQty: productData.productQty - item.quantity
                        });
                    }
                });
            }
        } catch (error) {
            console.error('Error updating product quantity:', error);
        }
    };  
    
    
    return (
        <div>
            <div className="checkout-form">
                <h2>Checkout</h2>
                {showBranchSelection ? (
                    <div>
                        <p>Please select the receiving branch:</p>
                        <select value={receivingBranch} onChange={handleBranchSelection}>
                            <option value="">Select Branch</option>
                            <option value="nairobi">Nairobi</option>
                            <option value="mombasa">Mombasa</option>
                        </select>
                        <button onClick={handleHQSubmit}>Submit for HQ</button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="phoneNumber">Phone Number:</label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                            required
                        />
                        <p>Customer Name: {customerName}</p>
                        <p>Customer ID: {customerId}</p>
                        <p>Selected Branch: {selectedBranch}</p>
                        <button type="submit">Checkout</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Checkout;



