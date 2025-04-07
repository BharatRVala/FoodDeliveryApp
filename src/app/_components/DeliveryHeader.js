"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DeliveryHeader = () => {
  const [user, setUser] = useState(undefined);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("delivery");
    router.push("/"); // Redirect to home page
  };

  return (
    <div className="header-wrapper flex justify-between items-center p-4 shadow-md">
      <div className="logo">
        <Image src="/logo.png" width={100} height={100} alt="Logo" />
      </div>
      <ul className="flex gap-6 items-center font-semibold">
        <li>
          <Link href="/deliverydashboard">Orders</Link>
        </li>
        <li>
          <Link href="/">Profile</Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="text-red-500 hover:underline"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default DeliveryHeader;
