'use client';
import { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import { DELIVERY_CHARGES, TAX } from "../lib/constant";
import { useRouter } from "next/navigation";

const Page = () => {
    const [userStorage, setUserStorage] = useState(null);
    const [cartStorage, setCartStorage] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [cartNumber, setCartNumber] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUserStorage(parsedUser);
            } catch (e) {
                setUserStorage(null);
            }
        }

        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            try {
                const parsedCart = JSON.parse(storedCart);
                if (Array.isArray(parsedCart) && parsedCart.length > 0) {
                    setCartStorage(parsedCart);
                    setCartNumber(parsedCart.length);
                } else {
                    router.push('/'); 
                }
            } catch (e) {
                setCartStorage([]);
                setCartNumber(0);
                router.push('/'); 
            }
        } else {
            router.push('/'); 
        }
    }, [router]);

    const total = cartStorage.reduce((acc, item) => acc + (item?.price || 0), 0);
    const taxAmount = (total * TAX) / 100;
    const totalAmount = total + DELIVERY_CHARGES + taxAmount;

    const handlePlaceOrder = async () => {
        if (!userStorage || cartStorage.length === 0) return;

        const user_Id = userStorage._id;
        const city = userStorage.city;

        const foodItemsIds = cartStorage.map(item => item._id).join(',');
        const foodNames = cartStorage.map(item => item.name).join(',');
        const resto_id = cartStorage[0]?.resto_id || null; 
        let deliveryBoyResponse= await fetch('/api/deliverypartners/'+city);
        deliveryBoyResponse =await deliveryBoyResponse.json();
       let deliveryBoyIds=deliveryBoyResponse.result.map((item)=>item._id);
       let deliveryBoy_id=deliveryBoyIds[Math.floor(Math.random()*deliveryBoyIds.length)]
       if(!deliveryBoy_id){
        alert("delivery partner not available")
        return false
       }
        
       
        const amount = totalAmount.toFixed(2);

        const orderPayload = {
            user_Id,
            foodItemsIds,
            foodNames,
            resto_id,
            deliveryBoy_id,
           
            amount
        };

        try {
            const res = await fetch("/api/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderPayload),
            });

            const data = await res.json();
            console.log("Order API Response:", data);

            if (data.success) {
                localStorage.removeItem('cart');
                setCartStorage([]);
                setCartNumber(0);
                setOrderPlaced(true);
                router.push('/myprofile');
            } else {
                alert("Something went wrong while placing order.");
            }

        } catch (err) {
            console.error("Order placement error:", err);
        }
    };

    return (
        <>
            <CustomerHeader key={orderPlaced ? 'order-placed' : 'normal'} cartNumber={cartNumber} />

            <div className="order-wrapper">
                <h2 className="order-title">🧾 Order Summary</h2>

                {orderPlaced && (
                    <p className="success-msg">🎉 Order placed successfully!</p>
                )}

                {/* User Info */}
                {userStorage ? (
                    <div className="user-info">
                        <h3 className="section-title">Customer Details</h3>
                        <p><strong>Name:</strong> {userStorage.name}</p>
                        <p><strong>Address:</strong> {userStorage.address}</p>
                        <p><strong>Mobile:</strong> {userStorage.mobile}</p>
                    </div>
                ) : (
                    <p className="error-msg">User details not available.</p>
                )}

                {/* Cart Items */}
                <div className="cart-items">
                    <h3 className="section-title">Items in Cart</h3>
                    {cartStorage.length > 0 ? (
                        cartStorage.map((item, index) => (
                            <div key={index} className="cart-item">
                                <span>{item.name}</span>
                                <span>₹{item.price}</span>
                            </div>
                        ))
                    ) : (
                        <p>No items in cart.</p>
                    )}
                </div>

                {/* Total Section */}
                <div className="summary">
                    <div className="summary-row">
                        <span>Food Charges:</span>
                        <span>₹{total}</span>
                    </div>
                    <div className="summary-row">
                        <span>Tax ({TAX}%):</span>
                        <span>₹{taxAmount.toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                        <span>Delivery Charges:</span>
                        <span>₹{DELIVERY_CHARGES}</span>
                    </div>
                    <div className="summary-row total">
                        <span>Total Amount:</span>
                        <span>₹{totalAmount.toFixed(2)}</span>
                    </div>
                </div>

                {/* Order Button */}
                <div className="order-button-wrapper">
                    <button
                        onClick={handlePlaceOrder}
                        className="order-button"
                        disabled={cartStorage.length === 0}
                    >
                        Place Order
                    </button>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Page;