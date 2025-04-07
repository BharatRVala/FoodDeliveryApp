"use client";
import DeliveryHeader from "@/app/_components/DeliveryHeader";
import { useEffect, useState } from "react";

const DeliveryProfile = () => {
  const [deliveryUser, setDeliveryUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("delivery");
    if (storedUser) {
      setDeliveryUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="delivery-profile-container">
      <DeliveryHeader />
      <div className="profile-content-wrapper">
        <h1 className="profile-main-heading">Delivery Partner Profile</h1>

        {deliveryUser ? (
          <div className="delivery-info-card">
            <div className="delivery-header">
              <h2 className="delivery-name">{deliveryUser?.name}</h2>
     
            </div>

            <div className="delivery-details-grid">
             

              <div className="detail-item">
                <span className="detail-label">Contact Number</span>
                <span className="detail-value">{deliveryUser?.mobile}</span>
              </div>

              <div className="detail-item">
                <span className="detail-label">City</span>
                <span className="detail-value">{deliveryUser?.city}</span>
              </div>

              <div className="detail-item full-width">
                <span className="detail-label">Full Address</span>
                <span className="detail-value">{deliveryUser?.address}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="no-user-message">No delivery user found in localStorage.</div>
        )}
      </div>
    </div>
  );
};

export default DeliveryProfile;
