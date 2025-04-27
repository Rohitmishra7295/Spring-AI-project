import React, { useState } from "react";

function RecipeGenerator() {
  const [ingredients, setIngredients] = useState('');
  const [cuisine, setCuisine] = useState('any');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [recipe, setRecipe] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const createRecipe = async () => {
    if (!ingredients.trim()) return;
    setLoading(true);
    setError('');
    setRecipe('');
    try {
      const response = await fetch(`http://localhost:8080/recipe-creator?ingredients=${encodeURIComponent(ingredients)}&dietaryRestrictions=${encodeURIComponent(dietaryRestrictions)}&cuisine=${encodeURIComponent(cuisine)}`);
      if (!response.ok) throw new Error('Failed to fetch recipe');
      const data = await response.text();
      setRecipe(data);
    } catch (error) {
      setError('Error generating recipe.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="RecipeGenerator max-w-2xl mx-auto p-6 border shadow-md rounded-lg my-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Create a Recipe</h2>

      <input
        type="text"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Enter ingredients (comma separated)"
        className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="text"
        value={cuisine}
        onChange={(e) => setCuisine(e.target.value)}
        placeholder="Enter cuisine type"
        className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="text"
        value={dietaryRestrictions}
        onChange={(e) => setDietaryRestrictions(e.target.value)}
        placeholder="Enter dietary restrictions"
        className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        onClick={createRecipe}
        disabled={loading}
        className="w-full p-2 bg-green-500 text-white font-bold rounded hover:bg-green-600 transition duration-200 mb-6"
      >
        {loading ? 'Creating...' : 'Create Recipe'}
      </button>

      {error && <p className="text-center text-red-500">{error}</p>}

      {recipe && (
        <div className="output-box">
          <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96 whitespace-pre-wrap">
            {recipe}
          </pre>
        </div>
      )}
    </div>
  );
}

export default RecipeGenerator;
