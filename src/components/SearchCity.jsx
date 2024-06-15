import React, { useState } from 'react';

const SearchCity = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSearch = () => {
    onSearch(city);
    setCity(''); // Optionally clear the input after search
  };

  return (
    <div className="mb-4 mt-14 flex flex-col items-center">
      <div className="flex mb-2">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="border rounded p-2 mr-2"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white p-2 rounded">Search</button>
      </div>
    </div>
  );
};

export default SearchCity;
