"use client"
import Header from "@/app/_components/Header";
import "./../style.css"
import FoodItemList from "@/app/_components/FoodItemList";
const Dashboard=()=>{

    return(
        <div>
            <Header />

            <FoodItemList />

            {/* <button onClick={()=>setAddItem(true)}> Add Food</button>
          <button onClick={()=>setAddItem(false)}>Dashboard</button>
           {
            addItem ?  <AddFoodItem setAddItem={setAddItem}/> : <FoodItemList />
           } */}
            
        </div>
    )
}
export default Dashboard;