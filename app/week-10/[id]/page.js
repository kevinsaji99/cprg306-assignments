"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { useUserAuth } from "../_utils/auth-context";
import { getItem } from "../_services/shopping-list-service";

export default function Page({ params }) {
  const { id } = use(params); // params is a Promise in Next.js 15+
  const { user } = useUserAuth();
  const [item, setItem] = useState({});

  const fetchItem = async () => {
    try {
      const item = await getItem(user.uid, id);
      setItem(item);
    } catch (error) {
      console.error("Error fetching item:", error);
      setItem(null);
    }
  };

  useEffect(() => {
    if (user) {
      fetchItem();
    }
  }, [user, id]);

  if (!user) {
    return (
      <main className="bg-slate-950 text-white min-h-screen p-6">
        <p>You must be logged in to view this page.</p>
      </main>
    );
  }

  if (!item) {
    return (
      <main className="bg-slate-950 text-white min-h-screen p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Item Details</h1>
        <div className="mx-auto max-w-md p-4 bg-slate-800 rounded-lg border-l-4 border-red-500">
          <h2 className="text-xl font-bold text-red-300">Item Not Found</h2>
        </div>
        <p className="text-center mt-6">
          <Link href="/week-10/shopping-list" className="text-blue-400 underline">
            Back to Shopping List
          </Link>
        </p>
      </main>
    );
  }

  return (
    <main className="bg-slate-950 text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Item Details</h1>
      <div className="mx-auto max-w-md p-4 bg-slate-800 rounded-lg border-l-4 border-emerald-500">
        {item ? (
          <>
            <h2 className="text-xl font-bold text-emerald-300 mb-2">
              Item: {item.name}
            </h2>
            <p className="text-emerald-400 font-bold">
              Quantity: <span className="font-normal text-white">{item.quantity}</span>
            </p>
            <p className="text-emerald-400 font-bold">
              Category:{" "}
              <span className="font-normal text-white capitalize">{item.category}</span>
            </p>
            <p className="text-emerald-400 font-bold">
              Added by:{" "}
              <span className="font-normal text-white">{user.displayName}</span>
            </p>
          </>
        ) : (
          <h2 className="text-xl font-bold text-red-300">Item Not Found</h2>
        )}
      </div>
      <p className="text-center mt-6">
        <Link href="/week-10/shopping-list" className="text-blue-400 underline">
          Back to Shopping List
        </Link>
      </p>
    </main>
  );
}
