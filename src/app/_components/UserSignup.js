import { useRouter } from "next/navigation";
import { useState } from "react";

const UserSignup = (props) => {
    const [name, setname] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [city, setCity] = useState('')
    const [address, setAddress] = useState('')
    const [password, setPasswor] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
const router =useRouter();

    const handleSignup = async () => {
        console.log(name, email, mobile, city, address, password, confirmPassword);
        let response = await fetch('/api/user',
            {
                method: 'post',
                body: JSON.stringify({ name, email, mobile, city, address, password })
            }
        )
        response = await response.json();
        if (response.success) {
            const {result}=response;
            delete result.password;
            localStorage.setItem('user',JSON.stringify(result));
            if(props?.redirect?.order){
                router.push('/order')

            }else{
                router.push('/');
            }
            
        } else {
            alert('failed')
        }
    }

    return (
        <div>
            <div className="input-wrapper">
                <input className="input-field" type="text" value={name} onChange={(e) => setname(e.target.value)} placeholder="enter name" />
            </div>

            <div className="input-wrapper">
                <input className="input-field" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="enter email" />
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
                <button className="button" onClick={handleSignup}>SignUp</button>
            </div>

        </div>
    )
}
export default UserSignup;