"use client";

import { useState } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import itemsData from "./items.json";

export default function Page() {
  const [items, setItems] = useState(itemsData);

  const handleAddItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  return (
    <main className="min-h-screen bg-slate-950 p-4">
      <div className="mx-auto flex w-full max-w-md flex-col items-center space-y-4">
        <h1 className="m-2 mb-4 text-3xl font-bold text-emerald-400">Add to Cart</h1>
        <NewItem onAddItem={handleAddItem} />
        <h2 className="m-2 mb-4 text-3xl font-bold text-emerald-400">Shopping List</h2>
        <ItemList items={items} />
      </div>
    </main>
  );
}