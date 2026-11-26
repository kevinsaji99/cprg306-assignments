"use client";

import { useState, useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context";
import { getItems, addItem, deleteItem } from "../_services/shopping-list-service";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";

export default function Page() {
  const { user } = useUserAuth();
  const [items, setItems] = useState([]);
  const [selectedItemName, setSelectedItemName] = useState("");

  async function loadItems() {
    try {
      const userItems = await getItems(user.uid);
      setItems(userItems);
    } catch (error) {
      console.error("Error loading items:", error);
    }
  }

  // Load the user's items once they are logged in (and again if the user changes)
  useEffect(() => {
    if (user) {
      loadItems();
    } else {
      setItems([]);
    }
  }, [user]);

  async function handleAddItem(newItem) {
    try {
      // Firestore generates the id, so don't store the temporary one from NewItem
      const { id, ...itemData } = newItem;
      const newId = await addItem(user.uid, itemData);
      setItems((prevItems) => [...prevItems, { ...itemData, id: newId }]);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  }

  async function handleDeleteItem(itemId) {
    try {
      await deleteItem(user.uid, itemId);
      setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }

  function handleItemSelect(item) {
    const cleanedName = item.name
      .split(",")[0] // drops the size after the comma
      .replace(
        /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
        ""
      ) // drop the emoji
      .trim();
    setSelectedItemName(cleanedName);
  }

  //block the page if nobody is logged in
  if (!user) {
    return (
      <main className="bg-slate-950 text-white min-h-screen p-6">
        <p>You must be logged in to view this page.</p>
      </main>
    );
  }

  return (
    <main className="bg-slate-950 text-white min-h-screen p-6">
      <div className="mx-auto w-full md:w-fit">
        <h1 className="text-3xl font-bold mb-6">Shopping List</h1>
        <div className="flex flex-col md:flex-row gap-10 items-start">
          <div className="flex flex-col gap-6 w-full md:w-md shrink-0">
            <NewItem onAddItem={handleAddItem} />
            <ItemList
              items={items}
              onItemSelect={handleItemSelect}
              onDeleteItem={handleDeleteItem}
            />
          </div>
          <div className="w-full md:w-xl shrink-0">
            <MealIdeas ingredient={selectedItemName} />
          </div>
        </div>
      </div>
    </main>
  );
}
