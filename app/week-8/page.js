"use client";

import { useState } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import itemsData from "./items.json";

export default function Page() {
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState("");

  function handleAddItem(newItem) {
    setItems([...items, newItem]);
  }

  
  function handleItemSelect(item) {
    const cleanedName = item.name
      .split(",")[0] // drops the size after the comma
      .replace(
        /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
        "" 
      )// drop the emoji
      .trim();
    setSelectedItemName(cleanedName);
  }

  return (
    <main className="bg-slate-950 text-white min-h-screen p-6">
      <div className="mx-auto w-full md:w-fit">
        <h1 className="text-3xl font-bold mb-6">Shopping List</h1>
        <div className="flex flex-col md:flex-row gap-10 items-start">
          <div className="flex flex-col gap-6 w-full md:w-[28rem] shrink-0">
            <NewItem onAddItem={handleAddItem} />
            <ItemList items={items} onItemSelect={handleItemSelect} />
          </div>
          <div className="w-full md:w-[36rem] shrink-0">
            <MealIdeas ingredient={selectedItemName} />
          </div>
        </div>
      </div> 
    </main>
  );
}