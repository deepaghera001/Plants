import React, { ChangeEvent, useEffect, useState } from 'react';
import plantNamesRaw from '../data/plantNames.json';

interface PlantNameProps {
  name: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
}

// Parse the new plantNames structure
const plantNamesObj = (Array.isArray(plantNamesRaw) && plantNamesRaw.length > 0 && typeof plantNamesRaw[0] === 'object') ? plantNamesRaw[0] : {};
const commonNames = Object.keys(plantNamesObj);

const PlantName: React.FC<PlantNameProps> = ({ name, required = false, value, onChange }) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (value.length > 0) {
      const filtered = commonNames.filter(pn =>
        pn.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 6));
    } else {
      setSuggestions([]);
    }
  }, [value]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-1">
        <span className="block text-sm font-medium text-gray-700 mb-2">{name}</span>
        {required && <span className="text-red-500">*</span>}
      </div>
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
        placeholder="e.g., Monstera Deliciosa"
        autoComplete="off"
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border border-gray-200 rounded-lg mt-1 w-full shadow-lg max-h-48 overflow-y-auto">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion}
              className="px-4 py-2 cursor-pointer hover:bg-emerald-50"
              onMouseDown={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlantName;
