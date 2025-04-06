'use client'
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Restaurant from "../restaurant/page";


const Header = () => {


    const [details, setDetails] = useState();
    const router = useRouter();
    const pathName = usePathname();
    useEffect(() => {
        let data = localStorage.getItem("RestaurantUser");
        if (!data && pathName=="/restaurant/dashboard") {
            router.push("/restaurant")
        }else if(data && pathName=="/restaurant"){
            router.push("/restaurant/dashboard")

        }
        else {
            setDetails(JSON.parse(data))
        }
    }, [])

    const logout=()=>{
        localStorage.removeItem("RestaurantUser");
        router.push("/")
    }
    return (
        <div className="header-wrapper">
            <div className="logo">
                <Image src="/logo.png" width={100} height={100} alt="Logo" />
            </div>
            <ul>
                
                {
                    details && details.name ? 
                        <>
                            <li><Link href="/restaurant/addFoods">AddFood</Link></li>
                            <li><Link href="/restaurant/dashboard">Dashboard</Link></li>
                            <li><Link href="/restaurant/profile">Profile</Link></li>
                            <li><button onClick={logout}>Logout</button></li>
                        </>
                     : 
                        <li><Link href="/restaurant">Login</Link></li>
                    
                }
            </ul>
        </div>
    );
    
}

export default Header;