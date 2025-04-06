"use client"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CustomerHeader = (props) => {
    const [user, setUser] = useState(undefined);
    const [cartNumber, setCartNumber] = useState(0);
    const [cartItem, setCartItem] = useState([]);

    const router = useRouter();

    useEffect(() => {
        const userStorage = localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));
        const cartStorage = localStorage.getItem("cart") && JSON.parse(localStorage.getItem("cart"));
        if (userStorage) setUser(userStorage);
        if (cartStorage) {
            setCartItem(cartStorage);
            setCartNumber(cartStorage.length);
        }
    }, []);

    useEffect(() => {
        if (props.cartData) {
            if (cartNumber) {
                if (cartItem[0].resto_id !== props.cartData.resto_id) {
                    localStorage.removeItem("cart");
                    setCartNumber(1);
                    setCartItem([props.cartData]);
                    localStorage.setItem("cart", JSON.stringify([props.cartData]));
                } else {
                    const updatedCart = [...cartItem, { ...props.cartData }];
                    setCartItem(updatedCart);
                    setCartNumber(updatedCart.length);
                    localStorage.setItem("cart", JSON.stringify(updatedCart));
                }
            } else {
                setCartNumber(1);
                setCartItem([props.cartData]);
                localStorage.setItem("cart", JSON.stringify([props.cartData]));
            }
        }
    }, [props.cartData]);

    useEffect(() => {
        if (props.removeCartData) {
            const updatedCart = cartItem.filter(item => item._id !== props.removeCartData);
            setCartItem(updatedCart);
            setCartNumber(updatedCart.length);
            if (updatedCart.length === 0) {
                localStorage.removeItem("cart");
            } else {
                localStorage.setItem("cart", JSON.stringify(updatedCart));
            }
        }
    }, [props.removeCartData]);

    const logout = () => {
        localStorage.removeItem("user");
        router.push("/user-auth");
    };

    return (
        <div className="header-wrapper">
            <div className="logo">
                <Image src="/logo.png" width={100} height={100} alt="Logo" />
            </div>
            <ul>
                <li><Link href="/">Home</Link></li>
                {
                    user ? (
                        <>
                            <li><Link href={cartNumber ? "/cart" : "#"}>Cart({cartNumber || 0})</Link></li>
                            <li><Link href="/myprofile">{user.name}</Link></li>
                            <li><button onClick={logout}>Logout</button></li>
                        </>
                    ) : (
                        <>

                            <li><Link href="/user-auth">UserSignin/SignUp</Link></li>
                            <li><Link href="/restaurant">RestaurantSignin/SignUp</Link></li>
                            <li><Link href="/deliverypartner">DeliverypartnerSignin/SignUp</Link></li>
                            
                        </>
                    )
                }


            </ul>
        </div>
    );
};

export default CustomerHeader;
