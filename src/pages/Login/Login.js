import { useState } from 'react';
import LoginUI from './LoginUI';
import API from '../../services/api';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state on new submission

    try {
      // Envoi des données de connexion à l'API backend
      const res = await API.post('/auth/login/', {
        email: formData.email,
        password: formData.password,
      });

      const { access, refresh, user } = res.data;

      // Stockage des tokens et des données utilisateur dans localStorage
      localStorage.setItem('accessToken', access); // Token d'accès
      localStorage.setItem('refreshToken', refresh); // Token de rafraîchissement
      localStorage.setItem('user', JSON.stringify(user)); // Données utilisateur

      // Redirection vers la page d'accueil après la connexion réussie
      window.location.href = '/';
    } catch (err) {
      // Gestion des erreurs selon la réponse de l'API
      if (err.response && err.response.status === 401) {
        setError('Email ou mot de passe invalide');
      } else {
        setError('Erreur lors de la connexion');
      }
    }
  };

  return (
    <LoginUI
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      error={error}
    />
  );
}

export default Login;