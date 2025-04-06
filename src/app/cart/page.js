'use client'
import { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import { DELIVERY_CHARGES, TAX } from "../lib/constant";
import { useRouter } from "next/navigation";

const Page = () => {
    const [cartStorage, setCartStorage] = useState([]);
    const [removeCartData, setRemoveCartData] = useState();
    const [cartData, setCartData] = useState();
    const [cartIds, setCartIds] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            try {
                const parsed = JSON.parse(storedCart);
                const cartArray = Array.isArray(parsed) ? parsed : [];
                setCartStorage(cartArray);
                setCartIds(cartArray.map(item => item._id));
                if (cartArray.length === 0) {
                    router.push('/');
                }
            } catch (e) {
                setCartStorage([]);
                router.push('/');
            }
        } else {
            setCartStorage([]);
            router.push('/');
        }
    }, [router]);

    const total = cartStorage.reduce((acc, item) => acc + (item?.price || 0), 0);

    const removeFromCart = (id) => {
        setRemoveCartData(id);
        const localIds = cartIds.filter(item => item !== id);
        setCartIds(localIds);
        setCartData();

        const updatedCart = cartStorage.filter(item => item._id !== id);
        setCartStorage(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));

        if (updatedCart.length === 0) {
            router.push('/');
        }
    };

    const order = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
    
        if (!user) {
            router.push('/user-auth?order=true');
            return;
        }
    
        if (cartStorage.length === 0) {
            alert("Cart is empty");
            return;
        }
    
        // Fetch restaurant info using resto_id from the first item
        const restoId = cartStorage[0]?.resto_id;
        let restaurantCity = "";
    
        try {
            const res = await fetch(`http://localhost:3000/api/restaurant?id=${restoId}`);
            const data = await res.json();
    
            if (data.success && data.result?.city) {
                restaurantCity = data.result.city.toLowerCase().trim();
            } else {
                alert("Failed to get restaurant details");
                return;
            }
        } catch (err) {
            console.error("Error fetching restaurant city:", err);
            alert("Something went wrong while checking the restaurant city.");
            return;
        }
    
        const userCity = user?.city?.toLowerCase().trim();
    
        if (restaurantCity !== userCity) {
            alert("Your city does not match the restaurant city. Please order from your local city.");
            return;
        }
    
        router.push('/order');
    };
    

    return (
        <>
            <CustomerHeader removeCartData={removeCartData} />

            <div className="food-item-wrapper">
                {cartStorage.length > 0 ? (
                    cartStorage.map((item, index) => (
                        <div className="list-item" key={item._id || index}>
                            <div className="list-item-block-1">
                                <img style={{ width: 100 }} src={item.img_path} alt={item.name} />
                            </div>

                            <div className="list-item-block-1">
                                <div>{item.name}</div>
                                <div className="description">{item.description}</div>
                                <button onClick={() => removeFromCart(item._id)}>Remove from cart</button>
                            </div>

                            <div className="list-item-block-1">{item.price}</div>
                        </div>
                    ))
                ) : (
                    <p>No food items available.</p>
                )}
            </div>

            <div className="total-wrapper">
                <div className="block-1">
                    <div className="row">
                        <span>Food Charges : </span>
                        <span>{total}</span>
                    </div>
                    <div className="row">
                        <span>Tax : </span>
                        <span>{(total * TAX) / 100}</span>
                    </div>
                    <div className="row">
                        <span>Delivery Charges : </span>
                        <span>{DELIVERY_CHARGES}</span>
                    </div>
                    <div className="row">
                        <span>Total Amount : </span>
                        <span>{total + DELIVERY_CHARGES + (total * TAX) / 100}</span>
                    </div>
                </div>
                <div className="block-2">
                    <button onClick={order}>Order Now</button>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Page;
