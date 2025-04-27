import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import ChatGenerator from "./components/ChatGenerator";
import RecipeGenerator from "./components/RecipeGenerator";
import WeatherUpdate from "./components/WeatherUpdate";
import Translator from "./components/Translator";
import TextSummarizer from "./components/TextSummarizer";
import NavBar from './pages/NavBar';
import Footer from './pages/Footer';

function App() {
  return (
    
      <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
       <NavBar />

        <div className="flex-1 p-6">
          <div className="flex flex-col items-center space-y-4 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a href="/ask-ai">
                <button className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded shadow">
                  Talk To AI
                </button>
              </a>
              <a href="/generate-recipe">
                <button className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded shadow">
                  Generate Recipe
                </button>
              </a>
              <a href="/translator">
                <button className="w-full px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded shadow">
                  Translator
                </button>
              </a>
              <a href="/weather-update">
                <button className="w-full px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded shadow">
                  Weather Update
                </button>
              </a>
              <a href="/text-summarizer">
                <button className="w-full px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded shadow">
                  Text Summarizer
                </button>
              </a>
            </div>
          </div>

          {/* Routes */}
          <div className="mt-6">
            <Routes>
              <Route path="/ask-ai" element={<ChatGenerator />} />
              <Route path="/generate-recipe" element={<RecipeGenerator />} />
              <Route path="/translator" element={<Translator />} />
              <Route path="/weather-update" element={<WeatherUpdate />} />
              <Route path="/text-summarizer" element={<TextSummarizer />} />
            </Routes>
          </div>
        </div>

       <div><Footer /></div>
      </div>
   
  );
}

export default App;
