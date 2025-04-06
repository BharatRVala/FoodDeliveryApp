"use client";
import Header from "@/app/_components/Header";
import { useEffect, useState } from "react";

export const Page = () => {
  const [userStorage, setUserStorage] = useState(null);

  useEffect(() => {
    const getMyData = async () => {
      const user = localStorage.getItem("RestaurantUser");
      if (user) {
        setUserStorage(JSON.parse(user));
      }
    };

    getMyData();
  }, []);

  return (
    <div className="restaurant-profile-page">
      <Header />
      <div className="profile-container">
        <h1 className="profile-heading">Restaurant Profile</h1>

        {userStorage ? (
          <div className="profile-card">
            <div className="profile-item">
              <span className="label">Name:</span>
              <span className="value">{userStorage.name}</span>
            </div>

            <div className="profile-item">
              <span className="label">Email:</span>
              <span className="value">{userStorage.email}</span>
            </div>

            <div className="profile-item">
              <span className="label">Phone:</span>
              <span className="value">{userStorage.phone}</span>
            </div>

            <div className="profile-item">
              <span className="label">City:</span>
              <span className="value">{userStorage.city}</span>
            </div>

            <div className="profile-item">
              <span className="label">Full Address:</span>
              <span className="value">{userStorage.fullAddress}</span>
            </div>
          </div>
        ) : (
          <p className="loading-text">Loading user data...</p>
        )}
      </div>
    </div>
  );
};

export default Page;
