"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const AddFoodItem = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [path, setPath] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleAddFoodItem = async () => {
    if (!name || !price || !path || !description) {
      setError(true);
      return;
    } else {
      setError(false);
    }

    const restaurantData = JSON.parse(localStorage.getItem("RestaurantUser"));
    const resto_id = restaurantData?._id;

    let response = await fetch("/api/restaurant/foods", {
      method: "POST",
      body: JSON.stringify({
        name,
        price,
        img_path: path,
        description,
        resto_id,
      }),
    });

    response = await response.json();
    if (response.success) {
      alert("Food item added");
      router.push("/restaurant/dashboard");
    } else {
      alert("Food item not added");
    }
  };

  return (
    <div className="add-food-container">
      <h1 className="title">Add New Food Item</h1>

      <div className="form-grid">
        <div className="form-group">
          <input
            type="text"
            className="input-field"
            placeholder="Enter food name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {error && !name && <span className="error-text">Please enter a valid name</span>}
        </div>

        <div className="form-group">
          <input
            type="text"
            className="input-field"
            placeholder="Enter food price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          {error && !price && <span className="error-text">Please enter a valid price</span>}
        </div>

        <div className="form-group">
          <input
            type="text"
            className="input-field"
            placeholder="Enter image path"
            value={path}
            onChange={(e) => setPath(e.target.value)}
          />
          {error && !path && <span className="error-text">Please enter a valid image path</span>}
        </div>

        <div className="form-group full-width">
          <input
            type="text"
            className="input-field"
            placeholder="Enter food description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {error && !description && (
            <span className="error-text">Please enter a valid description</span>
          )}
        </div>

        <div className="form-group full-width">
          <button className="submit-button" onClick={handleAddFoodItem}>
            Add Food Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFoodItem;
