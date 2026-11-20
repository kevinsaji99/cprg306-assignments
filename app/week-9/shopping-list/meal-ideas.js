"use client";

import { useEffect, useState } from "react";

// API fetch function
async function fetchMealIdeas(ingredient) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );
    const data = await response.json();
    // TheMealDB returns { meals: null } when nothing matches
    return data.meals || [];
  } catch (error) {
    console.error("Error fetching meal ideas:", error);
    return [];
  }
}

export default function MealIdeas({ ingredient }) {
  const [meals, setMeals] = useState([]);

  async function loadMealIdeas() {
    const mealIdeas = await fetchMealIdeas(ingredient);
    setMeals(mealIdeas);
  }

  // iterates whenever the ingredient prop changes
  useEffect(() => {
    if (ingredient) {
      loadMealIdeas();
    } else {
      setMeals([]);
    }
  }, [ingredient]);

  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-2">Meal Ideas</h2>

      {!ingredient && <p>Select an item to see meal ideas.</p>}

      {ingredient && meals.length === 0 && (
        <p>No meal ideas found for {ingredient}.</p>
      )}

      {ingredient && meals.length > 0 && (
        <div>
          <p className="mb-3">Here are some meal ideas using {ingredient}:</p>
          {/* More than 15 meals output becomes 2 columns, 15 or fewer: one column. */}
          <ul
            className={
              meals.length > 15
                ? "grid grid-cols-2 gap-2"
                : "flex flex-col gap-2"
            }
          >
            {meals.map((meal) => (
              <li
                key={meal.idMeal}
                className="px-3 py-2 bg-slate-800 rounded text-sm"
              >
                {meal.strMeal}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}