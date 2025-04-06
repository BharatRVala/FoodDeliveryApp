"use client"
import Header from "@/app/_components/Header";
import "./../style.css"
import AddFoodItem from "@/app/_components/AddFoodItem";
import { useState } from "react";
const AddFoods=()=>{

    const [addItem, setAddItem]=useState(false)
    return(
        <div>
            <Header />
            <AddFoodItem setAddItem={setAddItem}/>

            {/* <button onClick={()=>setAddItem(true)}> Add Food</button>
          <button onClick={()=>setAddItem(false)}>Dashboard</button>
           {
            addItem ?  <AddFoodItem setAddItem={setAddItem}/> : <FoodItemList />
           } */}
            
        </div>
    )
}
export default AddFoods;