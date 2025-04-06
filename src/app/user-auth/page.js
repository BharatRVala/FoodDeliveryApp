"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import UserLogin from "../_components/UserLogin"
import UserSignup from "../_components/UserSignup"
import CustomerHeader from "../_components/CustomerHeader"
import Footer from "../_components/Footer"

const UserAuth = () => {
    const [login, setLogin] = useState(true);
    const searchParams = useSearchParams(); // ✅ Correct usage in client component

    // If you need specific query param like ?order=xyz
    const redirectParam = {
        order: searchParams.get("order") || "",
        redirectTo: searchParams.get("redirectTo") || ""
    };

    return (
        <div>
            <CustomerHeader />
            <div className="container">
                <h1>{login ? "User Login" : "User Signup"}</h1>

                {
                    login
                        ? <UserLogin redirect={redirectParam} />
                        : <UserSignup redirect={redirectParam} />
                }

                <button className="button-link" onClick={() => setLogin(!login)}>
                    {login ? "Don't have an account? Signup" : "Already have an account? Login"}
                </button>
            </div>
            <Footer />
        </div>
    )
}

export default UserAuth;
