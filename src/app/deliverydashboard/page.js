'use client'
import { useEffect, useState } from "react";
import DeliveryHeader from "../_components/DeliveryHeader";
import { useRouter } from "next/navigation";

const Page = () => {
    const router = useRouter();
    const [myOrders, setMyOrders] = useState([]);

    useEffect(() => {
        const delivery = JSON.parse(localStorage.getItem('delivery'));
        if (!delivery) {
            router.push('/deliverypartner');
        }
    }, []);

    useEffect(() => {
        getMyOrders();
    }, []);

    const getMyOrders = async () => {
        const deliveryData = JSON.parse(localStorage.getItem('delivery'));
        let response = await fetch('/api/deliverypartners/orders/' + deliveryData._id);
        response = await response.json();
        if (response.success) {
            setMyOrders(response.result);
        }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        console.log("Updating:", orderId, newStatus); // ✅ DEBUG

        const res = await fetch('/api/order', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ orderId, status: newStatus }),
        });

        const data = await res.json();
        console.log(data); // ✅ DEBUG

        if (data.success) {
            alert("Order status updated!");
            getMyOrders(); // refresh list
        } else {
            alert("Failed to update status: " + (data.message || data.error));
        }
    };

    return (
        <div>
            <DeliveryHeader />
            <h1>My OrderList</h1>
            {myOrders.map((item, index) => (
                <div
                    className="restaurant-wrapper"
                    style={{ marginLeft: 'auto', marginRight: 'auto' }}
                    key={index}
                >
                    <h4>Name: {item?.data?.name}</h4>
                    <div>Amount: {item.amount}</div>
                    <div>Address: {item?.data?.fullAddress}</div>
                    <div>Status: {item.status}</div>

                    <div>
                        Update Status:
                        <select
                            value={item.status}
                            onChange={(e) => handleStatusChange(item._id, e.target.value)}
                        >
                            <option value="Preparing">Preparing</option>
                            <option value="On the Way">On the Way</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Page;
