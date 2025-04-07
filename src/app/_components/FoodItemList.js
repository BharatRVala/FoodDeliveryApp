"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const FoodItemList = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadFoodItems();
  }, []);

  const loadFoodItems = async () => {
    const restaurantData = JSON.parse(localStorage.getItem("RestaurantUser"));
    const id = restaurantData?._id;

    let response = await fetch("/api/restaurant/foods/" + id);
    response = await response.json();

    if (response.success) {
      setFoodItems(response.result);
    } else {
      alert("Food items not loading");
    }

    setLoading(false);
  };

  const deleteFoodItem = async (id) => {
    let response = await fetch("/api/restaurant/foods/" + id, {
      method: "delete",
    });
    response = await response.json();

    if (response.success) {
      loadFoodItems();
    } else {
      alert("Food item not deleted");
    }
  };

  return (
    <div className="restaurant-profile-container">
      <div className="profile-content-wrapper">
        <h1 className="profile-main-heading">Food Items</h1>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading food items...</p>
          </div>
        ) : foodItems.length === 0 ? (
          <p className="no-orders-message">No food items found</p>
        ) : (
          <div className="orders-table-container">
            <table className="orders-table">
              <thead className="orders-table-header">
                <tr>
                  <th className="orders-table-th">S.N</th>
                  <th className="orders-table-th">Name</th>
                  <th className="orders-table-th">Price</th>
                  <th className="orders-table-th">Description</th>
                  <th className="orders-table-th">Image</th>
                  <th className="orders-table-th">Actions</th>
                </tr>
              </thead>
              <tbody className="orders-table-body">
                {foodItems.map((item, index) => (
                  <tr key={index} className="orders-table-row">
                    <td className="orders-table-td">{index + 1}</td>
                    <td className="orders-table-td">{item.name}</td>
                    <td className="orders-table-td">₹{item.price}</td>
                    <td className="orders-table-td">{item.description}</td>
                    <td className="orders-table-td">
                      <img
                        src={item.img_path}
                        alt={item.name}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          borderRadius: "6px",
                        }}
                      />
                    </td>
                    <td className="orders-table-td">
                      <button
                        className="status-badge status-failed"
                        onClick={() => deleteFoodItem(item._id)}
                      >
                        Delete
                      </button>
                      <button
                        className="status-badge status-preparing ml-2"
                        onClick={() => router.push("dashboard/" + item._id)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodItemList;
