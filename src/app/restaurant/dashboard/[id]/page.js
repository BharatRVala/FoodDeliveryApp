"use client";
import Header from "@/app/_components/Header";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { use } from "react";  // Import use() to unwrap the Promise

const EditFoodItem = (props) => {
    // Unwrap params using use()
    const params = use(props.params);
    const foodId = params.id;

    console.log(foodId);

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [path, setPath] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(false);
    const router = useRouter();

    useEffect(() => {
        handleLoadFoodItem();
    }, []);

    const handleLoadFoodItem = async () => {
        let response = await fetch(`/api/restaurant/foods/edit/${foodId}`);
        response = await response.json();
        if (response.success) {
            console.log(response.result);
            setName(response.result.name);
            setPrice(response.result.price);
            setPath(response.result.img_path);
            setDescription(response.result.description);
        }
    };

    const handleEditFoodItem = async () => {

        if (!name || !price || !path || !description) {
            setError(true);
            return;
        }
        else {
            setError(foodId)
        }
        console.log(name, price, path, description);

        let response = await fetch(`/api/restaurant/foods/edit/${foodId}`, {
            method: 'PUT',
            body: JSON.stringify({ name, price, img_path: path, description })
        });
        response = await response.json();
        if (response.success) {
            router.push("../dashboard")
        }

    };



    return (
        <div className="container">
            <Header />
            <h1>Update Food Item</h1>
            <div className="input-wrapper">
                <input
                    type="text"
                    className="input-field"
                    placeholder="Enter food name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {error && !name && <span className="input-error">Please enter a valid name</span>}
            </div>

            <div className="input-wrapper">
                <input
                    type="text"
                    className="input-field"
                    placeholder="Enter food price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                {error && !price && <span className="input-error">Please enter a valid price</span>}
            </div>

            <div className="input-wrapper">
                <input
                    type="text"
                    className="input-field"
                    placeholder="Enter food image path"
                    value={path}
                    onChange={(e) => setPath(e.target.value)}
                />
                {error && !path && <span className="input-error">Please enter a valid image path</span>}
            </div>

            <div className="input-wrapper">
                <input
                    type="text"
                    className="input-field"
                    placeholder="Enter food description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                {error && !description && <span className="input-error">Please enter a valid description</span>}
            </div>

            <div className="input-wrapper">
                <button className="button" onClick={handleEditFoodItem}>
                    Update Food Item
                </button>
            </div>

            <div className="input-wrapper">
                <button className="button" onClick={() => router.push("../dashboard")}>
                    Back to Food Item List
                </button>
            </div>
        </div>
    );
};

export default EditFoodItem;
