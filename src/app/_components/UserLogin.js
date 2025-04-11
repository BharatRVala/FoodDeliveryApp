import { useRouter } from "next/navigation";
import { useState } from "react";

const UserLogin = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const loginHandle = async () => {
        if (!email || !password) {
            alert("Both email and password are required!");
            return;
        }

        try {
            let response = await fetch('/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            response = await response.json();

            if (response.success) {
                const { result } = response;
                delete result.password; // optional, if you want to clean up
                localStorage.setItem('user', JSON.stringify(result));

                if (props?.redirect?.order) {
                    router.push('/order');
                } else {
                    router.push('/');
                }
            } else {
                alert('Invalid email or password. Please try again.');
            }
        } catch (error) {
            console.error("Login failed:", error);
            alert("Something went wrong. Please try again later.");
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
                    required
                />
            </div>
            <div className="input-wrapper">
                <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                    required
                />
            </div>
            <div className="input-wrapper">
                <button onClick={loginHandle} className="button">Login</button>
            </div>
        </div>
    );
};

export default UserLogin;
