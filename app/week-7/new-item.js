"use client"
import { useState} from "react";

const CATEGORIES = ["Produce", "Dairy", "Bakery", "Meat", "Frozen Foods", "Canned Goods", "Dry Goods", "Beverages", "Snacks", "Household", "Other"];

export default function NewItem() {
    const[name, setName] = useState("");
    const [quantity,setQuantity] = useState(1);
    const [category,setCategory] = useState("produce");


    const increment = () => {
        if(quantity < 20) { // to prevent the quantity from going above 20
        setQuantity(quantity + 1);// initial value is set to be 1.
        }
    };

    const decrement = () => {
        if (quantity > 1) { // to prevent the quantity from going below 1
            setQuantity(quantity - 1);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const item = {
            id: Math.random().toString(36).substring(2, 9),  // ✅ 2. random string id
            name,
            quantity,
            category,
        }

        oneAddItem(item); 

        setName("");
        setQuantity(1);
        setCategory("produce");

    }

    return (
        <div className="flex justify-center items-center">
            <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-sm flex-col items-center gap-6 rounded-lg bg-white p-4 shadow-lg outline-8 outline-emerald-300">

                {/* Product name input section */}
                <input 
                    id="item-name"
                    type="text"
                    placeholder="Item Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full text-2xl text-black border-4 border-gray-300 rounded-full px-5 py-3 focus:outline-none focus:border-black"
                />


                {/* Quantity + Category row */}
                <div className="flex w-full items-center gap-4">
                    {/* Category selection section */}
                    <select
                        id="item-category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="flex-1 min-w-0 text-2xl text-center text-black border-4 border-gray-300 rounded-full px-5 py-4 bg-white focus:outline-none focus:border-black"
                    >
                        {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat.toLowerCase()} className="text-center text-black text-2xl">
                                {cat}
                            </option>
                        ))}
                    </select>

                    {/* Quantity adjustment section */}
                    <div className="flex items-center space-x-1 bg-white rounded-full px-0.5 py-4 shrink-0">
                        <button 
                            type="button"
                            onClick={decrement} 
                            disabled={quantity <= 1} 
                            title= {quantity <= 1 ? "Quantity cannot be less than 1" : ""}
                            className="text-2xl bg-red-400 text-black w-8 h-8 rounded-full shrink-0 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                        −
                        </button>
                        <p className="text-3xl text-black w-12 text-center">{quantity}</p>
                        <button 
                            type="button"
                            onClick={increment} 
                            disabled={quantity >= 20} 
                            title={quantity >= 20 ? "Quantity cannot be more than 20" : ""}
                            className="text-2xl bg-green-400 text-black w-8 h-8 rounded-full shrink-0 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                        +
                        </button>
                    </div>


                </div>
                {/* Submit button section */}
                <button
                    type="submit"
                    className="w-full text-xl font-bold text-black bg-gray-300 rounded-full py-3 hover:bg-emerald-300"
                >
                    Add Item
                </button>
            </form>
        </div>
    );
}


