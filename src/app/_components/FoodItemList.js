import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const FoodItemList = () => {

    const [foodItems, setFoodItems]=useState();
    const router=useRouter()

    useEffect(() => {
        loadFoodItems();
    }, []);

    const loadFoodItems = async () => {
     const restaurantData= JSON.parse(localStorage.getItem('RestaurantUser'));
     const id = restaurantData._id;

        let response = await fetch("/api/restaurant/foods/"+id);
        response = await response.json();
        if(response.success){
            setFoodItems(response.result)
        }
        else{
            alert("food item not laoding")
        }
    }

const deleteFoodItem=async(id)=>{
    let response = await fetch("/api/restaurant/foods/"+id,{
        method:'delete'
    });
    response = await response.json();
    if(response.success){
loadFoodItems();
    }else{
alert("food item not deleted")
    }
}

    return (
        <div>
            <h1>Food List</h1>
            <table>
                <thead>
                    <tr>
                        <td>S.N</td>
                        <td>Name</td>
                        <td>Price</td>
                        <td>Description</td>
                        <td>Image</td>
                        <td>Operations</td>
                    </tr>
                </thead>

                <tbody>
                    {
                     foodItems && foodItems.map((item, key)=>(
<tr key={key}>
                        <td>{key+1}</td>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>{item.description}</td>
                        <td><img src={item.img_path} /></td>
                        <td><button onClick={()=>deleteFoodItem(item._id)}>delete</button> <button onClick={()=>router.push('dashboard/'+item._id)}>edit</button></td>
                    </tr>
                        ))
                    }
                    
                </tbody>
            </table>
        </div>
    )
}

export default FoodItemList;