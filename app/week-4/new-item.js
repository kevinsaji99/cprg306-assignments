'use client';

import { useState } from 'react';
export default function NewItem() {
    const [quantity, setQuantity] = useState(1);

    function increment () {
        if (quantity < 20) {
            setQuantity(quantity + 1);
        }
    }

    function decrement (){
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }
    
    return (
    <div className="max-w-md rounded-lg border border-neutral-800 bg-neutral-900 p-6">
      <h2 className="mb-4 text-xl font-bold text-cyan-400">
        Quantity
      </h2>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={decrement}
          disabled={quantity === 1}
          className="rounded bg-cyan-600 px-4 py-2 font-bold text-white hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          -
        </button>

        <span className="min-w-12 text-center text-2xl font-bold">
          {quantity}
        </span>

        <button
          type="button"
          onClick={increment}
          disabled={quantity === 20}
          className="rounded bg-cyan-600 px-4 py-2 font-bold text-white hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          +
        </button>
      </div>

      <p className="mt-4 text-sm text-neutral-400">
        Choose a quantity between 1 and 20.
      </p>
    </div>
  );
}


