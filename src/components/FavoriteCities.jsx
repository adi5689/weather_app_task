import React from 'react';

const FavoriteCities = ({ favorites, onSelect, onDelete }) => {
  const handleCityClick = (city) => {
    onSelect(city);
    // Optionally, navigate to Weather Display page here if needed
  };

  return (
    <div>
      <h2 className="text-2xl mb-4 text-center">Favorite Cities</h2>
      <ul>
        {favorites.map((fav, index) => (
          <li key={index}>
            <button onClick={() => handleCityClick(fav.name)} className="text-blue-500 underline cursor-pointer">
              {fav.name}
            </button>
            <button onClick={() => onDelete(fav.id)} className="ml-2 text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteCities;
