import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError]=useState();
    const router = useRouter();

    const handleLogin=async()=>{
        if(!email || !password){
            setError(true)
            return false
        }
        else{
            setError(false)
        }

        let response = await fetch("/api/restaurant", {
            method: "POST",
            body: JSON.stringify({ email, password, login:true })
        });
       
        response=await response.json();
        if(response.success){
            const {result}=response;
            delete result.password;
            localStorage.setItem("RestaurantUser",JSON.stringify(result));
            router.push("/restaurant/dashboard")
            
        }
        else
        {
            
            alert("Something went wrong. Please try again.");
        }
    }
    return (
        <>
            <h3>login</h3>
            <div>
                <div className="input-wrapper">
                    <input type="text" placeholder="Enter email id" className="input-field" 
                    value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    {
                        error && !email && <span className="input-error">Plaase enter valid email</span>
                    }
                
                </div>

                <div className="input-wrapper">
                    <input type="text" placeholder="Enter Password " className="input-field" 
                    value={password} onChange={(e)=>setPassword(e.target.value)} />
                     {
                        error && !password && <span className="input-error">Plaase enter valid password</span>
                    }
                </div>
                <div className="input-wrapper">
                    <button className="button" onClick={handleLogin}>Login</button>
                </div>

            </div>
        </>
    )
}

export default Login;