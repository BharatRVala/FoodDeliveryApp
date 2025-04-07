"use client";

import Header from "@/app/_components/Header";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const EditFoodItem = ({ foodId }) => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [path, setPath] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleLoadFoodItem();
  }, []);

  const handleLoadFoodItem = async () => {
    try {
      const response = await fetch(`/api/restaurant/foods/edit/${foodId}`);
      const data = await response.json();

      if (data.success) {
        const food = data.result;
        setName(food.name);
        setPrice(food.price);
        setPath(food.img_path);
        setDescription(food.description);
      } else {
        setError("Failed to load food item.");
      }
    } catch (err) {
      console.error("Error fetching food item:", err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditFoodItem = async () => {
    if (!name || !price || !path || !description) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(`/api/restaurant/foods/edit/${foodId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, price, img_path: path, description }),
      });

      const data = await response.json();

      if (data.success) {
        router.push("../dashboard");
      } else {
        setError("Update failed. Try again.");
      }
    } catch (err) {
      console.error("Update error:", err);
      setError("Something went wrong.");
    }
  };

  return (
    <div className="restaurant-profile-container">
      <Header />
      <div className="profile-content-wrapper">
        <h1 className="profile-main-heading">Edit Food Item</h1>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading food data...</p>
          </div>
        ) : (
          <>
            <div className="restaurant-info-card">
              <div className="restaurant-details-grid">
                <div className="detail-item full-width">
                  <span className="detail-label">Food Name</span>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Enter food name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="detail-item">
                  <span className="detail-label">Price</span>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <div className="detail-item">
                  <span className="detail-label">Image Path</span>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Enter image URL/path"
                    value={path}
                    onChange={(e) => setPath(e.target.value)}
                  />
                </div>

                <div className="detail-item full-width">
                  <span className="detail-label">Description</span>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="input-wrapper full-width">
                  <button className="button" onClick={handleEditFoodItem}>
                    Update Food Item
                  </button>
                  <button
                    className="button secondary-button"
                    onClick={() => router.push("../dashboard")}
                  >
                    Back to Dashboard
                  </button>
                </div>

                {error && (
                  <div className="error-message">
                    <span className="error-icon">⚠️</span>
                    <span>{error}</span>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EditFoodItem;
