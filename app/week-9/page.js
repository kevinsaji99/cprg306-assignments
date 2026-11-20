"use client";

import Link from "next/link";
import { useUserAuth } from "./_utils/auth-context";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  async function handleSignIn() {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSignOut() {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Shopping List App</h1>

      {user ? (
        <div className="space-y-4">
          <p>
            Welcome, {user.displayName} ({user.email})
          </p>
          <button
            onClick={handleSignOut}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
          <p>
            <Link href="/week-9/shopping-list" className="text-blue-400 underline">
              Continue to your Shopping List
            </Link>
          </p>
        </div>
      ) : (
        <button
          onClick={handleSignIn}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Login with GitHub
        </button>
      )}
    </main>
  );
}