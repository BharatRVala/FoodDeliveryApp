"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Login from "../_components/Login";
import Signup from "../_components/Signup";
import Footer from "../_components/Footer";
import CustomerHeader from "../_components/CustomerHeader";
import "./style.css";

const Restaurant = () => {
  const [login, setLogin] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("RestaurantUser");
    if (user) {
      router.push("/restaurant/dashboard"); 
    }
  }, []);

  return (
    <>
      <div className="container">
        <CustomerHeader />
        <h1>Restaurant Login/Signup Page</h1>
        {login ? <Login /> : <Signup />}

        <button className="button-link" onClick={() => setLogin(!login)}>
          {login ? "Do not have account? Signup" : "Already have account? Login"}
        </button>
      </div>

      <Footer />
    </>
  );
};

export default Restaurant;
