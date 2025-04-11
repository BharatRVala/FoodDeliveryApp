'use client';
import CustomerHeader from "@/app/_components/CustomerHeader";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Footer from "@/app/_components/Footer";

const Page = () => {
    const params = useParams();
    const searchParams = useSearchParams();
    const name = params?.name || "";
    const id = searchParams.get("id");

    const [restaurantDetails, setRestaurantDetails] = useState(null);
    const [foodItems, setFoodItems] = useState([]);
    const [cartData, setCartData] = useState();
    const [cartStorage, setCartStorage] = useState(JSON.parse(localStorage.getItem('cart')));
    const [cartIds, setCartIds] = useState(cartStorage ? cartStorage.map((item) => item._id) : []);
    const [removeCartData, setRemoveCartData] = useState();
    const [loading, setLoading] = useState(true); // Added loading state

    useEffect(() => {
        if (id) {
            loadRestaurantDetails();
        }
    }, [id]);

    const loadRestaurantDetails = async () => {
        try {
            let response = await fetch(`/api/customer/${id}`);
            response = await response.json();
            if (response.success) {
                setRestaurantDetails(response.details);
                setFoodItems(response.foodItems);
            }
        } catch (error) {
            console.error("Error fetching restaurant details:", error);
        } finally {
            setLoading(false); // Set loading to false once data is fetched
        }
    };

    const addTocart = (item) => {
        let localCartIds = cartIds;
        localCartIds.push(item._id);
        setCartIds(localCartIds);
        setCartData(item);
        setRemoveCartData();
        setRemoveCartData();
    };

    const removeFromCart = (id) => {
        setRemoveCartData(id);
        const localIds = cartIds.filter(item => item !== id);
        setCartIds(localIds);
        setCartData();
        const updatedCart = cartStorage.filter(item => item._id !== id);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    return (
        <div>
            <CustomerHeader cartData={cartData} removeCartData={removeCartData} />
            <div className="restaurant-page-banner">
                <h1>{decodeURIComponent(name)}</h1>
            </div>
            {loading ? (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading restaurant details...</p>
                </div>
            ) : (
                <>
                    <div className="detail-wrapper">
                        <h3>Contact: {restaurantDetails?.phone}</h3>
                        <h3>City: {restaurantDetails?.city}</h3>
                        <h3>Address: {restaurantDetails?.fullAddress}</h3>
                        <h3>Email: {restaurantDetails?.email}</h3>
                    </div>
                    <div className="food-item-wrapper">
                        {foodItems.length > 0 ? (
                            foodItems.map((item, index) => (
                                <div className="list-item" key={item._id || index}>
                                    <div> <img style={{ width: 100 }} src={item.img_path} alt={item.name} /></div>
                                    <div>
                                        <div>{item.name}</div>
                                        <div>{item.price}</div>
                                        <div className="description">{item.description}</div>
                                        {
                                            cartIds.includes(item._id) 
                                                ? <button onClick={() => removeFromCart(item._id)}>Remove from cart</button>
                                                : <button onClick={() => addTocart(item)}>Add to cart</button>
                                        }
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No food items available.</p>
                        )}
                    </div>
                </>
            )}
            <Footer />
        </div>
    );
};

export default Page;
