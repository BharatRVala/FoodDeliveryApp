import { useRouter } from "next/navigation";
import { useState } from "react";

const UserLogin = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const loginHandle = async () => {
        console.log(email, password);
        let response = await fetch('http://localhost:3000/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        response = await response.json();
        if (response.success) {
            const { result } = response;
            delete result.password;
            localStorage.setItem('user', JSON.stringify(result));
            if(props?.redirect?.order){
                router.push('/order')

            }else{
                router.push('/');
            }
            
        } else {
            alert('Failed to login. Please try again with valid email and password');
        }
    }

    return (
        <div>
            <div className="input-wrapper">
                <input
                    type="text"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                />
            </div>
            <div className="input-wrapper">
                <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                />
            </div>
            <div className="input-wrapper">
                <button onClick={loginHandle} className="button">Login</button>
            </div>
        </div>
    );
};

export default UserLogin;
