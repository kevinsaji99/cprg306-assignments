"use client"
import { useState } from "react";


export default function NewItem() {
    const [quantity,setQuantity] = useState(1);

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

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="flex flex-col items-center gap-4">
                <p className="text-9xl font-bold text-white justify-center ">{quantity}</p>
                <div className="space-x-4 flex  text-4xl ">   
                    <button 
                    onClick={decrement} 
                    disabled={quantity <= 1} 
                    title= {quantity <= 1 ? "Quantity cannot be less than 1" : ""}
                    className="justify-center text-6xl bg-red-400 text-black px-9 py-4 rounded-full disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                    -
                    </button>
                    <button 
                    onClick={increment} 
                    disabled={quantity >= 20} 
                    title={quantity >= 20 ? "Quantity cannot be more than 20" : ""}
                    className="justify-center text-6xl bg-green-400 text-black px-7 py-4 rounded-full disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                    +
                    </button>
                    
                </div>
           </div>
        </div>
    );
}
