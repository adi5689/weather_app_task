import React from 'react';
import { Link } from 'react-router-dom';

const FavoritesPage = ({ favorites, onDelete, onSelect }) => {

  const handleDelete = (id) => {
    onDelete(id);
  };

  const handleSelectCity = (city) => {
    onSelect(city);
  };

  return (
    <div className='p-4 border flex flex-col justify-center items-center rounded shadow-md w-full lg:h-[50vh]'>
      <h2 className="text-2xl mb-4">Favorite Cities</h2>
      {favorites.length === 0 ? (
        <p className="text-center text-gray-500">No cities to show</p>
      ) : (
        <ul className="space-y-2 w-[400px]">
          {favorites.map((city) => (
            <li key={city.id} className="flex justify-between items-center p-2 border rounded">
              <Link to="/" onClick={() => handleSelectCity(city.name)} className="text-blue-500 cursor-pointer">{city.name}</Link>
              <button onClick={() => handleDelete(city.id)} className="bg-red-500 text-white p-2 rounded">Delete</button>
            </li>
          ))}
        </ul>
      )}
      <Link to="/" className="block mt-4 text-center text-blue-500">Back to Weather Dashboard</Link>
    </div>
  );
};

export default FavoritesPage;
