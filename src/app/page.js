'use client';
import { useEffect, useState } from "react";
import CustomerHeader from "./_components/CustomerHeader";
import Footer from "./_components/Footer";
import { useRouter } from "next/navigation";

export default function Home() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [showLocation, setShowLocation] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [searchText, setSearchText] = useState('');
  const router = useRouter();

  
  useEffect(() => {
    const restaurantUser = localStorage.getItem("RestaurantUser");
    const deliveryUser = localStorage.getItem("delivery");

    if (restaurantUser) {
      router.push("/restaurant/dashboard"); 
    } else if (deliveryUser) {
      router.push("/deliverypartner"); 
    }
  }, []);

  useEffect(() => {
    loadLocations();
    loadRestaurants();
  }, []);

  const loadLocations = async () => {
    let response = await fetch('http://localhost:3000/api/customer/locations');
    response = await response.json();
    if (response.success) {
      setLocations(response.result);
    }
  };

  const loadRestaurants = async (params = {}) => {
    let url = "http://localhost:3000/api/customer";
    const queryParams = [];

    if (params.location) {
      queryParams.push(`location=${encodeURIComponent(params.location)}`);
    }

    if (params.restaurant) {
      queryParams.push(`restaurant=${encodeURIComponent(params.restaurant)}`);
    }

    if (queryParams.length > 0) {
      url += "?" + queryParams.join("&");
    }

    try {
      let response = await fetch(url);
      let data = await response.json();

      if (data.success) {
        setRestaurants(data.result);
      }
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  const handleListItem = (item) => {
    setSelectedLocation(item);
    setShowLocation(false);
    loadRestaurants({ location: item, restaurant: searchText });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    loadRestaurants({ location: selectedLocation, restaurant: value });
  };

  return (
    <main>
      <CustomerHeader />
      <div className="main-page-banner">
        <h1>Food delivery app</h1>
        <div className="input-wrapper">
          <input
            type="text"
            value={selectedLocation}
            onClick={() => setShowLocation(true)}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="select-input"
            placeholder="Select city"
          />
          {showLocation && (
            <ul className="location-list">
              {locations.map((item, index) => (
                <li key={index} onClick={() => handleListItem(item)}>
                  {item}
                </li>
              ))}
            </ul>
          )}
          <input
            type="text"
            className="search-input"
            placeholder="Enter food or restaurant name"
            value={searchText}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="restaurant-list-container">
        {restaurants.map((item, index) => (
          <div
            key={item._id || index}
            onClick={() => router.push('explore/' + item.name + "?id=" + item._id)}
            className="restaurant-wrapper"
          >
            <div className="heading-wrapper">
              <h3>{item.name}</h3>
              <h5>Contact: {item.phone}</h5>
            </div>
            <div className="address-wrapper">
              <div>{item.city},</div>
              <div className="address">
                {item.fullAddress}, Email: {item.email}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </main>
  );
}
