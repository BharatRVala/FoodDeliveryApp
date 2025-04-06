import { useState } from "react";
import Restaurant from "../restaurant/page";
import { useRouter } from "next/navigation";

const Signup = () => {

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [fullAddress, setFullAddress] = useState('');
    const [password, setPassword] = useState('');
    const [c_password, set_Cpassword] = useState('');
    const [error, setError] = useState(false)
    const [passwoedError, setPasswordError] = useState(false);
    const router = useRouter();

    const handleSignup = async () => {

        if (password !== c_password) {
            setPasswordError(true);
            return false

        }
        else {
            setPasswordError(false);
        }

        if (!email || !phone || !name || !city || !fullAddress || !password) {
            setError(true)
            return false

        }
        else {
            setError(false)
        }

        console.log(email, phone, name, city, fullAddress, password);
        let response = await fetch("http://localhost:3000/api/restaurant", {
            method: "POST",
            body: JSON.stringify({ email, phone, name, city, fullAddress, password })
        });
        response = await response.json();
        console.log(response);

        if (response.success) {
            console.log(response);
            const { result } = response
            delete result.password;
            localStorage.setItem("RestaurantUser", JSON.stringify(result));

            router.push('/restaurant/dashboard')
        }
    }

    return (
        <>
            <h3>Signup</h3>
            <div>

                <div className="input-wrapper">
                    <input type="text" placeholder="Enter email id" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} />
                    {
                        error && !email && <span className="input-error"> Please Enter Valid Email</span>
                    }
                </div>

                <div className="input-wrapper">
                    <input type="text" placeholder="Enter Phone No." className="input-field" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    {
                        error && !phone && <span className="input-error"> Please Enter Valid Phone No.</span>
                    }
                </div>

                <div className="input-wrapper">
                    <input type="text" placeholder="Enter Restaurant Name" className="input-field" value={name} onChange={(e) => setName(e.target.value)} />
                    {
                        error && !name && <span className="input-error"> Please Enter Valid Restaurant Name</span>
                    }
                </div>

                <div className="input-wrapper">
                    <input type="text" placeholder="Enter City Name" className="input-field" value={city} onChange={(e) => setCity(e.target.value)} />
                    {
                        error && !city && <span className="input-error"> Please Enter Valid City Name</span>
                    }
                </div>

                <div className="input-wrapper">
                    <input type="text" placeholder="Enter Full Address" className="input-field" value={fullAddress} onChange={(e) => setFullAddress(e.target.value)} />
                    {
                        error && !fullAddress && <span className="input-error"> Please Enter Valid Full Address</span>
                    }
                </div>

                <div className="input-wrapper">
                    <input type="password" placeholder="Enter Password " className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {
                        error && !password && <span className="input-error"> Please Enter Valid Password</span>
                    }
                </div>


                <div className="input-wrapper">
                    <input type="password" placeholder="Confirm Password " className="input-field" value={c_password} onChange={(e) => set_Cpassword(e.target.value)} />
                    {
                        error && !c_password && <span className="input-error"> Please Enter Valid Confirm Password</span>
                    }
                    {
                        passwoedError && <span className="input-error"> Password and confirm password not match</span>
                    }
                </div>


                <div className="input-wrapper">
                    <button className="button" onClick={handleSignup}>Signup</button>
                </div>

            </div>
        </>
    )
}

export default Signup;