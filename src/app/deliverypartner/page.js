'use client'
import { useEffect, useState } from "react";
import DeliveryHeader from "../_components/DeliveryHeader";
import { useRouter } from "next/navigation";
import CustomerHeader from "../_components/CustomerHeader";

const Page = () => {
    const [loginMobile, setLoginMobile] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [name, setname] = useState('')
    const [mobile, setMobile] = useState('')
    const [city, setCity] = useState('')
    const [address, setAddress] = useState('')
    const [password, setPasswor] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const router = useRouter();

    useEffect(() => {
        const delivery = JSON.parse(localStorage.getItem('delivery'))
        if (delivery) {
            router.push('/deliverydashboard')
        }
    })

    const loginHandle = async () => {
        console.log(mobile, password);
        let response = await fetch('/api/deliverypartners/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ mobile: loginMobile, password: loginPassword })
        });

        response = await response.json();
        if (response.success) {
            const { result } = response;
            delete result.password;
            localStorage.setItem('delivery', JSON.stringify(result));

            router.push('/deliverydashboard')

        } else {
            alert('Failed to login. Please try again with valid mobile and password');
        }
    }

    const handleSignup = async () => {
        console.log(name, mobile, city, address, password, confirmPassword);
        let response = await fetch('/api/deliverypartners/signup',
            {
                method: 'post',
                body: JSON.stringify({ name, mobile, city, address, password })
            }
        )
        response = await response.json();
        if (response.success) {
            const { result } = response;
            delete result.password;
            localStorage.setItem('delivery', JSON.stringify(result));
            router.push('/deliverydashboard')
        } else {
            alert('failed')
        }
    }

    return (
        <div>
            <CustomerHeader />
            <h1>Deliverypartenar</h1>
            <div className="auth-container">
                <div className="login-wrapper">
                    <h2>Login</h2>
                    <div className="input-wrapper">
                        <input
                            type="text"
                            placeholder="Enter mobile"
                            value={loginMobile}
                            onChange={(e) => setLoginMobile(e.target.value)}
                            className="input-field"
                        />
                    </div>
                    <div className="input-wrapper">
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            className="input-field"
                        />
                    </div>
                    <div className="input-wrapper">
                        <button onClick={loginHandle} className="button">Login</button>
                    </div>
                </div>
                <div className="signup-wrapper">
                    <h2>Signup</h2>
                    <div>
                        <div className="input-wrapper">
                            <input className="input-field" type="text" value={name} onChange={(e) => setname(e.target.value)} placeholder="enter name" />
                        </div>


                        <div className="input-wrapper">
                            <input className="input-field" type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="enter mobile" />
                        </div>

                        <div className="input-wrapper">
                            <input className="input-field" type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="enter city" />
                        </div>

                        <div className="input-wrapper">
                            <input className="input-field" type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="enter address" />
                        </div>

                        <div className="input-wrapper">
                            <input className="input-field" type="password" value={password} onChange={(e) => setPasswor(e.target.value)} placeholder="enter Password" />
                        </div>

                        <div className="input-wrapper">
                            <input className="input-field" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="confirm Password" />
                        </div>

                        <div className="input-wrapper">
                            <button onClick={handleSignup} className="button">SignUp</button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Page;