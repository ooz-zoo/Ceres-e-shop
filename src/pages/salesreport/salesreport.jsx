import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase';
import Navbar from '../../components/Navbar';
import "./salesreport.css";

const SalesReport = () => {
    const [salesData, setSalesData] = useState([]);

    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                const ordersCollection = collection(firestore, 'orders');
                const ordersSnapshot = await getDocs(ordersCollection);
                const ordersData = ordersSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setSalesData(ordersData);
            } catch (error) {
                console.error('Error fetching sales data:', error);
            }
        };

        fetchSalesData();
    }, []);

    return (
        <div>
            <Navbar/>    
            <div className="sales-report">
                <h2 className='sales-report-title'>Sales Report</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Branch</th>
                            <th>Customer ID</th>
                            <th>Customer Name</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Purchase Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salesData.length > 0 && salesData.map((order, index) => (
                            order.purchasedItems.map((item, itemIndex) => (
                                <tr key={index + '-' + itemIndex}>
                                    <td>{order.branch}</td>
                                    <td>{order.customerId}</td>
                                    <td>{order.customerName}</td>
                                    <td>{item.productName}</td>
                                    <td>{item.quantity}</td>
                                    <td>Ksh {item.price}</td>
                                    <td>{order.purchaseDate.toDate().toLocaleString()}</td>
                                </tr>
                            ))
                        ))}
                    </tbody>
                </table>
                {/* <button>Get Sales Report for HQ</button> */}
            </div>
        </div>
    );
};

export default SalesReport;
