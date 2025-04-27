import React, { useState } from "react";

function ChatGenerator() {
  const [prompt, setPrompt] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const askAI = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError('');
    setChatResponse('');
    try {
      const response = await fetch(`http://localhost:8080/ask-ai?prompt=${encodeURIComponent(prompt)}`);
      if (!response.ok) throw new Error('Failed to fetch response');
      const data = await response.text();
      setChatResponse(data);
    } catch (error) {
      setError('Error generating response.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ChatGenerator max-w-xl mx-auto p-6 border shadow-md rounded-lg my-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Talk to AI</h2>

      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter a prompt for AI"
        className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        onClick={askAI}
        disabled={loading}
        className="w-full p-2 bg-indigo-500 text-white font-bold rounded hover:bg-indigo-600 transition duration-200 mb-6"
      >
        {loading ? 'Asking...' : 'Ask AI'}
      </button>

      {error && <p className="text-center text-red-500">{error}</p>}

      {chatResponse && (
        <div className="output-box">
          <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96 whitespace-pre-wrap">
            {chatResponse}
          </pre>
        </div>
      )}
    </div>
  );
}

export default ChatGenerator;
