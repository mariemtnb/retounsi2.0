import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryUI from './CategoryUI';
import API, {
  refreshAccessToken,
  logoutUser,
  searchAnnonces,
  getCategories,
  getSousCategoriesByCategorie
} from '../../services/api';

function Category() {
  const navigate = useNavigate();

  const [annonces, setAnnonces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('accessToken'));

  const [filters, setFilters] = useState({
    keyword: '',
    categorie: '',
    sousCategorie: '',
    minPrice: '',
    maxPrice: ''
  });

  const [categories, setCategories] = useState([]);
  const [sousCategories, setSousCategories] = useState([]);

  const fetchAnnonces = async (customFilters = {}) => {
    setLoading(true);
    try {
      const response = await searchAnnonces(customFilters);
      setAnnonces(response.data);
      setError(null);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        setError('Votre session a expiré, veuillez vous reconnecter.');
        setIsAuthenticated(false);
      } else {
        setError('Erreur lors du chargement des annonces.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnonces(filters);
    getCategories()
      .then(res => setCategories(res.data))
      .catch(err => console.error('Erreur chargement des catégories', err));
  }, []);

  useEffect(() => {
    if (filters.categorie) {
      getSousCategoriesByCategorie(filters.categorie)
        .then(res => setSousCategories(res.data))
        .catch(err => console.error('Erreur chargement des sous-catégories', err));
    } else {
      setSousCategories([]);
      setFilters(prev => ({ ...prev, sousCategorie: '' }));
    }
  }, [filters.categorie]);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Filtres appliqués :", filters);
    fetchAnnonces(filters);
  };

  const handleReLogin = async () => {
    try {
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        setIsAuthenticated(true);
        setError(null);
        await fetchAnnonces(filters);
      } else {
        logoutAndRedirect();
      }
    } catch (err) {
      console.error('Échec de reconnexion :', err);
      logoutAndRedirect();
    }
  };

  const logoutAndRedirect = () => {
    logoutUser();
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <CategoryUI
      annonces={annonces}
      loading={loading}
      error={error}
      isAuthenticated={isAuthenticated}
      handleReLogin={handleReLogin}
      filters={filters}
      onFilterChange={handleSearchChange}
      onFilterSubmit={handleSearchSubmit}
      categories={categories}
      sousCategories={sousCategories}
    />
  );
}

export default Category;
