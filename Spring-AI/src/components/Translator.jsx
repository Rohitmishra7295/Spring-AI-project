import React, { useState } from 'react';

const Translator = () => {
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const translateText = async () => {
    if (!text.trim() || !language.trim()) {
      setError('Please enter text and target language.');
      return;
    }
    setLoading(true);
    setError('');
    setTranslatedText('');
    try {
      const response = await fetch(`http://localhost:8080/translate?text=${encodeURIComponent(text)}&targetLanguage=${encodeURIComponent(language)}`);
      if (!response.ok) throw new Error('Failed to translate text.');
      const data = await response.text();
      setTranslatedText(data);
    } catch (error) {
      setError('Error translating text.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Translator max-w-2xl mx-auto p-6 border shadow-md rounded-lg my-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Text Translator</h2>

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to translate"
        className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="text"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        placeholder="Enter target language (e.g., 'fr' for French)"
        className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        onClick={translateText}
        disabled={loading}
        className="w-full p-2 bg-purple-500 text-white font-bold rounded hover:bg-purple-600 transition duration-200 mb-6"
      >
        {loading ? 'Translating...' : 'Translate'}
      </button>

      {error && <p className="text-center text-red-500">{error}</p>}

      {translatedText && (
        <div className="output-box">
          <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96 whitespace-pre-wrap">
            {translatedText}
          </pre>
        </div>
      )}
    </div>
  );
};

export default Translator;
