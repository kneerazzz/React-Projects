import React, { useContext } from 'react';
import RecipeContext from '../Context/recipeContext';

function RecipeFinder() {
  const { search, setSearch, recipes, setRecipes } = useContext(RecipeContext);

  const fetchRecipe = async () => {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
    const data = await res.json();
    setRecipes(data);
  };

  return (
    <div className="min-h-screen bg-gray-300 p-4">
      {/* Top search section */}
      <div className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4 mb-8">
        <input
          className="flex-1 p-3 rounded-lg border outline-1 outline-gray-600 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          placeholder="Search for recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition duration-200"
          onClick={fetchRecipe}
        >
          Search
        </button>
      </div>

      {/* Recipes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {recipes?.meals ? (
          recipes.meals.map((meal) => (
            <div
              key={meal.idMeal}
              className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition duration-300"
            >
              <h2 className="text-xl font-bold mb-2">{meal.strMeal}</h2>
              <div className="overflow-hidden rounded-lg mb-2">
                <img
                  className="w-full h-56 object-cover transform hover:scale-105 transition duration-300"
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                />
              </div>
              <p className="text-gray-700 text-sm mb-2">
                {meal.strInstructions.slice(0, 100)}...
              </p>
              {meal.strSource && (
                <a
                  href={meal.strSource}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-medium hover:underline"
                >
                  View Full Recipe
                </a>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 text-lg col-span-full">
            No recipes found. Try searching something else 🍔
          </p>
        )}
      </div>
    </div>
  );
}

export default RecipeFinder;
