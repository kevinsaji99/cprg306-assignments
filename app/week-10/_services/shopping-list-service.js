import { db } from "../_utils/firebase";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  query,
  doc,
  deleteDoc,
} from "firebase/firestore";

// Retrieves all items in users/{userId}/items
export async function getItems(userId) {
  const items = [];
  const itemsRef = collection(db, "users", userId, "items");
  const q = query(itemsRef);
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((docSnap) => {
    items.push({ id: docSnap.id, ...docSnap.data() });
  });

  return items;
}

// Retrieves a single item users/{userId}/items/{itemId}, or null if it doesn't exist
export async function getItem(userId, itemId) {
  const itemRef = doc(db, "users", userId, "items", itemId);
  const docSnap = await getDoc(itemRef);

  if (!docSnap.exists()) {
    return null;
  }
  return { id: docSnap.id, ...docSnap.data() };
}

// Adds an item to users/{userId}/items and returns the new document id
export async function addItem(userId, item) {
  const itemsRef = collection(db, "users", userId, "items");
  const docRef = await addDoc(itemsRef, item);
  return docRef.id;
}

// Optional challenge: deletes users/{userId}/items/{itemId}
export async function deleteItem(userId, itemId) {
  const itemRef = doc(db, "users", userId, "items", itemId);
  await deleteDoc(itemRef);
}
