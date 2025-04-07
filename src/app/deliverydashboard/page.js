'use client';
import { useEffect, useState } from "react";
import DeliveryHeader from "../_components/DeliveryHeader";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const delivery = JSON.parse(localStorage.getItem('delivery'));
    if (!delivery) {
      router.push('/deliverypartner');
    }
  }, [router]);

  useEffect(() => {
    getMyOrders();
  }, []);

  const getMyOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const deliveryData = JSON.parse(localStorage.getItem('delivery'));
      let response = await fetch('/api/deliverypartners/orders/' + deliveryData._id);
      response = await response.json();
      if (response.success) {
        setMyOrders(response.result);
      } else {
        throw new Error(response.message || "Failed to fetch orders");
      }
    } catch (error) {
      console.error("Order fetch error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const res = await fetch("/api/order", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status: newStatus }),
      });

      const data = await res.json();

      if (data.success) {
        alert("✅ Status updated successfully!");
        getMyOrders(); // Refresh the list
      } else {
        alert("⚠️ " + (data?.error || data?.message || "Something went wrong"));
      }
    } catch (error) {
      alert("❌ Failed to update status: " + error.message);
    }
  };

  return (
    <div className="delivery-orders-page">
      <DeliveryHeader />
      <h1 className="text-2xl font-bold text-center my-4">My Order List</h1>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading orders...</p>
        </div>
      ) : error ? (
        <div className="error-message text-center text-red-600">
          <span>⚠️ {error}</span>
        </div>
      ) : myOrders.length === 0 ? (
        <p className="text-center text-gray-500">No orders assigned yet.</p>
      ) : (
        myOrders.map((item, index) => (
          <div
            className="restaurant-wrapper p-4 border rounded-md shadow-md mb-4 max-w-xl mx-auto"
            key={index}
          >
            <h4 className="text-lg font-bold">Name: {item.data.name}</h4>
            <p><strong>Order Id:</strong> {item.orderId}</p>
            <p><strong>FoodNames:</strong> {item.foodNames}</p>
            <p><strong>Amount:</strong> ₹{item.amount}</p>
            <p><strong>Address:</strong> {item.data.fullAddress}</p>
            <p><strong>Status:</strong> <span className="text-blue-600">{item.status}</span></p>

            <div className="mt-2">
              <label className="mr-2 font-medium">Update Status:</label>
              <select
                className="border p-1 rounded-md"
                value={item.status}
                onChange={(e) => handleStatusUpdate(item.orderId, e.target.value)}
              >
                <option value="Preparing">Preparing</option>
                <option value="On the Way">On the Way</option>
                <option value="Failed to Deliver">Failed to Deliver</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>

            <p><strong>Order Time:</strong> {item.createdAtIST}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Page;
