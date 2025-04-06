import { useRouter } from "next/navigation";
import { useState } from "react";

const AddFoodItem = () => {

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [path, setPath] = useState("")
    const [description, setDescription] = useState("")
    const [error, setError]=useState(false)
    const router =useRouter();

    const handleAddFoodItem = async () => {
        console.log(name, price, path, description);
        if(!name || !price || !path || !description){
            setError(true)
            return false
        }
        else{
            setError(false)
        }
        let resto_id;
        const restaurantData = JSON.parse(localStorage.getItem("RestaurantUser"));
        if (restaurantData) {
            resto_id = restaurantData._id;
        }
        let response = await fetch("http://localhost:3000/api/restaurant/foods", {
            method: "POST",
            body: JSON.stringify({ name, price, img_path: path, description, resto_id})
        })

        response = await response.json();
        if(response.success){
            alert("food item added")
            router.push('/restaurant/dashboard')
        }
        else{
            alert("food item not added")
        }

    }

    return (
        <div className="container">
            <h1>Add new Food</h1>
            <div className="input-wrapper">
                <input type="text" className="input-field" placeholder="enter food name"
                    value={name} onChange={(e) => setName(e.target.value)}/>
{
    error && !name && <span className="input-error">Plase enter valid name</span>
}

            </div>

            <div className="input-wrapper">
                <input type="text" className="input-field" placeholder="enter food price"
                    value={price} onChange={(e) => setPrice(e.target.value)}/>
           {
    error && !price && <span className="input-error">Plase enter valid price</span>
}
            </div>

            <div className="input-wrapper">
                <input type="text" className="input-field" placeholder="enter food img path"
                    value={path} onChange={(e) => setPath(e.target.value)}/>
            {
    error && !path && <span className="input-error">Plase enter valid img_path</span>
}
            </div>

            <div className="input-wrapper">
                <input type="text" className="input-field" placeholder="enter food description"
                    value={description} onChange={(e) => setDescription(e.target.value)}/>
            {
    error && !description && <span className="input-error">Plase enter valid description</span>
}
            </div>

            <div className="input-wrapper">
                <button className="button" onClick={handleAddFoodItem}>Add Food Item</button>
            </div>

        </div>
    )
}

export default AddFoodItem;