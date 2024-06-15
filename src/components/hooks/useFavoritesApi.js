import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API_BASE_URL = import.meta.env.VITE_JSON_SERVER_BASE_URL;
const API_URL = `${API_BASE_URL}/favorites`;

const useFavoritesApi = () => {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(API_URL);
        setFavorites(response.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchFavorites();
  }, []);

  const addFavorite = async (city) => {
    try {
      const response = await axios.post(API_URL, { ...city, id: `${city.id}` }); // Ensure ID is a string
      setFavorites([...favorites, response.data]);
      toast.success(`Added ${city.name} to favorites!`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (err) {
      setError(err);
      toast.error(
        `Failed to add ${city.name} to favorites. Please try again.`,
        {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
    }
  };

  const deleteFavorite = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setFavorites(favorites.filter((city) => city.id !== id));
      toast.error(`Removed city from favorites!`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (err) {
      setError(err);
      toast.error(`Failed to remove city from favorites. Please try again.`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return { favorites, addFavorite, deleteFavorite, error };
};

export default useFavoritesApi;
