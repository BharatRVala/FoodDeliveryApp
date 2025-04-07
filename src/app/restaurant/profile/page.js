"use client";
import Header from "@/app/_components/Header";
import { useEffect, useState } from "react";

export const Page = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const restaurantUser = JSON.parse(localStorage.getItem("RestaurantUser"));
        if (!restaurantUser?._id) {
          throw new Error("No restaurant user found");
        }

        setRestaurant(restaurantUser);

        const response = await fetch(
          `/api/restaurant/order?id=${restaurantUser._id}`
        );
        const data = await response.json();

        console.log("API Response:", data);

        if (data.success) {
          setOrders(data.orders);
        } else {
          throw new Error(data.message || "Failed to fetch orders");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantData();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Preparing":
        return "status-preparing";
      case "On the Way":
        return "status-on-the-way";
      case "Delivered":
        return "status-delivered";
      case "Failed to Deliver":
        return "status-failed";
      default:
        return "status-default";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });
  };

  const formatFoodItems = (foodItems) => {
    try {
      if (!foodItems) return "No items";

      // If already an array
      if (Array.isArray(foodItems)) {
        return foodItems.map(item =>
          typeof item === "string" ? item : item?.name || JSON.stringify(item)
        ).join(", ");
      }

      // If stringified array
      if (typeof foodItems === "string") {
        try {
          const parsed = JSON.parse(foodItems);
          if (Array.isArray(parsed)) {
            return parsed.map(item =>
              typeof item === "string" ? item : item?.name || JSON.stringify(item)
            ).join(", ");
          }
          return parsed;
        } catch {
          return foodItems;
        }
      }

      // Any other object type
      return String(foodItems);
    } catch (error) {
      console.error("Error formatting food items:", error);
      return "Error loading items";
    }
  };

  return (
    <div className="restaurant-profile-container">
      <Header />
      <div className="profile-content-wrapper">
        <h1 className="profile-main-heading">Restaurant Dashboard</h1>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading restaurant data...</p>
          </div>
        ) : error ? (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            <span>{error}</span>
          </div>
        ) : (
          <>
            {/* Restaurant Profile Section */}
            <div className="restaurant-info-card">
              <div className="restaurant-header">
                <h2 className="restaurant-name">{restaurant?.name}</h2>
                <div className="restaurant-id">ID: {restaurant?._id}</div>
              </div>

              <div className="restaurant-details-grid">
                <div className="detail-item">
                  <span className="detail-label">Email Address</span>
                  <span className="detail-value">{restaurant?.email}</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Contact Number</span>
                  <span className="detail-value">{restaurant?.phone}</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Location</span>
                  <span className="detail-value">{restaurant?.city}</span>
                </div>

                <div className="detail-item full-width">
                  <span className="detail-label">Full Address</span>
                  <span className="detail-value">{restaurant?.fullAddress}</span>
                </div>
              </div>
            </div>

            {/* Orders Section */}
            <div className="orders-card">
              <h2 className="profile-section-heading">Recent Orders</h2>

              {orders.length === 0 ? (
                <p className="no-orders-message">No orders found</p>
              ) : (
                <div className="orders-table-container">
                  <table className="orders-table">
                    <thead className="orders-table-header">
                      <tr>
                        <th className="orders-table-th">Order ID</th>
                        <th className="orders-table-th">Food Items</th>
                        <th className="orders-table-th">Amount</th>
                        <th className="orders-table-th">Status</th>
                        <th className="orders-table-th">Order Date</th>
                      </tr>
                    </thead>
                    <tbody className="orders-table-body">
                      {orders.map((order) => (
                        <tr key={order._id} className="orders-table-row">
                          <td className="orders-table-td">
                            {order._id.substring(0, 8)}...
                          </td>
                          <td className="orders-table-td">
                            {formatFoodItems(order.foodItems)}
                          </td>
                          <td className="orders-table-td">₹{order.amount}</td>
                          <td className="orders-table-td">
                            <span className={`status-badge ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="orders-table-td">
                            {formatDate(order.createdAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
