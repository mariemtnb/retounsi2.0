import { useEffect, useState } from 'react';
import HomeUI from './HomeUI';
import API, { refreshAccessToken, logoutUser } from '../../services/api';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [annonces, setAnnonces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('accessToken'));
  const navigate = useNavigate();

  const fetchAnnonces = async () => {
    try {
      const response = await API.get('annonces/');
      setAnnonces(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        setError('Votre session a expiré, veuillez vous reconnecter');
        setIsAuthenticated(false);
      } else {
        setError('Erreur lors du chargement des annonces');
      }
      setLoading(false);
    }
  };

  const handleReLogin = async () => {
    try {
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        setIsAuthenticated(true);
        setError(null);
        setLoading(true);
        await fetchAnnonces(); // refetch after refresh
      } else {
        logoutAndRedirect();
      }
    } catch (error) {
      console.error('Échec de reconnexion :', error);
      logoutAndRedirect();
    }
  };

  const logoutAndRedirect = () => {
    logoutUser();
    setIsAuthenticated(false);
    navigate('/login');
  };

  useEffect(() => {
    fetchAnnonces();
  }, []);

  return (
    <HomeUI
      annonces={annonces}
      loading={loading}
      error={error}
      isAuthenticated={isAuthenticated}
      handleReLogin={handleReLogin}
    />
  );
}

export default Home;