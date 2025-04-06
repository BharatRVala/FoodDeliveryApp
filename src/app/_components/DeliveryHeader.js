"use client"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DeliveryHeader = (props) => {
    const [user, setUser] = useState(undefined);
    const [cartNumber, setCartNumber] = useState(0);
    const [cartItem, setCartItem] = useState([]);

    const router = useRouter();

  

    return (
        <div className="header-wrapper">
            <div className="logo">
                <Image src="/logo.png" width={100} height={100} alt="Logo" />
            </div>
            <ul>
                <li><Link href="/">Home</Link></li>
               
            </ul>
        </div>
    );
};

export default DeliveryHeader;
