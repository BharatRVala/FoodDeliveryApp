'use client'
import { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";

const Page = () => {

    const [myOrders, setMyOrders] = useState([]);
    const [user, setUser] = useState('');
    useEffect(() => {
        getMyOrders();
    }, [])

    const getMyOrders = async () => {
const userStorage= JSON.parse(localStorage.getItem('user'))
setUser(userStorage);
        let response = await fetch('http://localhost:3000/api/order?id='+userStorage._id);
        response = await response.json();
        if (response.success) {
            setMyOrders(response.result)
        }
    }
    return (
        <div>
            <CustomerHeader />

            {user && (
    <div className="profileInfo">
        <div>name: {user.name}</div>
        <div>mobile: {user.mobile}</div>
        <div>email: {user.email}</div>
        <div>city: {user.city}</div>
        <div>address: {user.address}</div>
    </div>
)}
<h2> Order History</h2>
            {myOrders.map((item, index) => (
        
            
  <div className="restaurant-wrapper" style={{marginLeft:'auto', marginRight:'auto'}} key={index}>
    <h4>Restaurat Name : {item.data?.name}</h4>
    <div>
FoodNames : <strong>{item.foodNames || "N/A"}</strong>
</div>

    <div>
        Amount : {item.amount}
    </div>

    <div>
    City:{item.data.city}
    </div>

    <div>
        Address:{item.data.fullAddress}
    </div>

    <div>
        Status:{item.status}
    </div>

    <div>
    Order Date: <strong>{item.createdAtIST || "N/A"}</strong>
</div>



    
  </div>
  
))}


            <Footer />
        </div>
    )
}

export default Page;