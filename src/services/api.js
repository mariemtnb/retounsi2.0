import axios from 'axios';

const BASE_URL = 'http://localhost:8000/';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Endpoints publics
const publicEndpoints = [
  'auth/register/',
  'auth/login/',
  'auth/reset-password/',
  'api/token/',
  'api/token/refresh/',
];

// 🔁 Rafraîchissement du token
export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) return null;

  try {
    const response = await api.post('api/token/refresh/', { refresh: refreshToken });
    const { access } = response.data;
    localStorage.setItem('accessToken', access);
    return access;
  } catch (error) {
    console.error('Erreur lors du rafraîchissement du token:', error);
    logoutUser();
    return null;
  }
};

// 🔐 Intercepteur JWT
api.interceptors.request.use(
  async (config) => {
    const isPublic = publicEndpoints.some((endpoint) => config.url.includes(endpoint));
    if (isPublic) return config;

    let token = localStorage.getItem('accessToken');
    if (!token) token = await refreshAccessToken();

    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔓 Déconnexion
export const logoutUser = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
};

// 👤 Authentification
export const loginUser = (email, password) =>
  api.post('auth/login/', { email, password });

export const registerUser = (userData) =>
  api.post('auth/register/', userData);

export const resetPassword = (email) =>
  api.post('auth/reset-password/', { email });

export const getUserProfile = () => api.get('users/me/');

// 📢 Annonces
export const getAnnonces = () => api.get('annonces/');
export const getAnnonceById = (id) => api.get(`annonces/${id}/`);

// ✅ Ajout d’une annonce (adapté à ton backend)
export const createAnnonce = (data) => api.post('annonce/ajouter/', data);

export const updateAnnonce = (id, data) => api.put(`annonces/${id}/`, data);
export const deleteAnnonce = (id) => api.delete(`annonces/${id}/`);

// 🗂️ Catégories
export const getCategories = () => api.get('categories/');
export const createCategorie = (data) => api.post('categories/', data);
export const updateCategorie = (id, data) => api.put(`categories/${id}/`, data);
export const deleteCategorie = (id) => api.delete(`categories/${id}/`);

// 🧩 Sous-catégories
export const getSousCategories = () => api.get('sous-categories/');

// ✅ Récupération dynamique des sous-catégories d’une catégorie
export const getSousCategoriesByCategorie = (categorieId) =>
  api.get(`/api/sous-categories/${categorieId}/`);

export const createSousCategorie = (data) => api.post('sous-categories/', data);
export const updateSousCategorie = (id, data) => api.put(`sous-categories/${id}/`, data);
export const deleteSousCategorie = (id) => api.delete(`sous-categories/${id}/`);


export const searchAnnonces = async (filters) => {
  const params = new URLSearchParams();

  if (filters.keyword) params.append('search', filters.keyword);
  if (filters.categorie) params.append('sous_categorie__categorie', filters.categorie);

  return api.get(`/annonces/filter/?${params.toString()}`);

};


// 🛒 Panier
export const getCart = () => api.get('cart/');
export const addToCart = (annonceId) => api.post('cart/', { annonce: annonceId });
export const removeFromCart = (itemId) => api.delete(`cart/${itemId}/`);

// 💬 Messagerie
export const getConversations = () => api.get('messages/conversations/');
export const getMessages = (conversationId) => api.get(`messages/${conversationId}/`);
export const sendMessage = (conversationId, message) =>
  api.post(`messages/${conversationId}/send/`, { message });

// 🌟 Premium
export const getPremiumOptions = () => api.get('premium/');
export const purchasePremium = (annonceId, optionId) =>
  api.post('premium/acheter/', { annonce: annonceId, option: optionId });

export default api;
