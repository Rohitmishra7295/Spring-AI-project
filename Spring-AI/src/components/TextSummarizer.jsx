import React, { useState } from 'react';

const TextSummarizer = () => {
  const [inputText, setInputText] = useState('');
  const [length, setLength] = useState('short');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTextChange = (e) => {
    setInputText(e.target.value);
  };

  const handleLengthChange = (e) => {
    setLength(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSummary('');

    try {
      const response = await fetch(
        `http://localhost:8080/summarize?length=${length}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ inputText }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch the summary');
      }

      const data = await response.text();
      setSummary(data);
    } catch (error) {
      setError('Error occurred while summarizing the text.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = () => {
    if (inputText.trim() !== '') {
      handleSubmit(new Event('submit'));
    }
  };

  return (
    <div className="text-summarizer container mx-auto my-8 p-6 border shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">AI Text Summarizer</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="inputText" className="block text-lg mb-2">Enter Text</label>
          <textarea
            id="inputText"
            rows="5"
            value={inputText}
            onChange={handleTextChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Paste your text here..."
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="length" className="block text-lg mb-2">Summary Length</label>
          <select
            id="length"
            value={length}
            onChange={handleLengthChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="short">Short</option>
            <option value="medium">Medium</option>
            <option value="long">Long</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition duration-200"
          disabled={loading}
        >
          {loading ? 'Summarizing...' : 'Summarize Text'}
        </button>
      </form>

      {error && (
        <p className="p-4 bg-gray-100 rounded overflow-auto max-h-96 whitespace-pre-wrap">{summary}</p>

      )}

      {summary && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Summary:</h2>
          <p className="p-4 bg-gray-100 rounded">{summary}</p>

          <button
            onClick={handleRegenerate}
            className="mt-4 p-2 bg-green-500 text-white font-bold rounded hover:bg-green-600 transition duration-200"
          >
            Regenerate Summary
          </button>
        </div>
      )}
    </div>
  );
};

export default TextSummarizer;
