import { useEffect, useState } from 'react';
import AddAnnonceUI from './AddAnnonceUI';
import {
  createAnnonce,
  getCategories,
  getSousCategoriesByCategorie,
} from '../../services/api';

function AddAnnonce() {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    prix: '',
    ville: '',
    gouvernorat: '',
    categorie: '',
    sous_categorie: '',
    images_urls: [],
    is_premium: false,
  });

  const [categories, setCategories] = useState([]);
  const [sousCategories, setSousCategories] = useState([]);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // 🔄 Charger les catégories
  useEffect(() => {
    getCategories()
      .then((res) => setCategories(res.data))
      .catch((err) => console.error('Erreur chargement catégories:', err));
  }, []);

  // 🔄 Charger les sous-catégories selon la catégorie sélectionnée
  useEffect(() => {
  const catId = parseInt(formData.categorie);
  console.log("Catégorie sélectionnée :", catId); // Ajout

  if (catId) {
    getSousCategoriesByCategorie(catId)
      .then((res) => {
        console.log("Sous-catégories récupérées :", res.data); // Ajout
        setSousCategories(res.data);
      })
      .catch((err) => {
        console.error('Erreur chargement sous-catégories:', err);
        setSousCategories([]);
      });
  } else {
    setSousCategories([]);
  }
}, [formData.categorie]);

  // ✏️ Gestion des champs du formulaire
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // ➕ Ajouter une image
  const handleImageAdd = (url) => {
    if (url.trim()) {
      setFormData((prev) => ({
        ...prev,
        images_urls: [...prev.images_urls, url.trim()],
      }));
    }
  };

  // ✅ Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        titre: formData.titre,
        description: formData.description,
        prix: parseFloat(formData.prix),
        ville: formData.ville,
        gouvernorat: formData.gouvernorat,
        categorie: parseInt(formData.categorie),
        sous_categorie: formData.sous_categorie
          ? parseInt(formData.sous_categorie)
          : null,
        is_premium: formData.is_premium,
        images_urls: formData.images_urls.filter((url) => url.trim() !== ''),
      };

      const res = await createAnnonce(payload);
      console.log('✅ Annonce créée :', res.data);
      setSuccessMsg('Annonce créée avec succès !');
      setError(null);

      // Réinitialiser le formulaire
      setFormData({
        titre: '',
        description: '',
        prix: '',
        ville: '',
        gouvernorat: '',
        categorie: '',
        sous_categorie: '',
        images_urls: [],
        is_premium: false,
      });
      setSousCategories([]);
    } catch (err) {
      console.error("❌ Erreur backend :", err.response?.data || err.message);
      const details = err.response?.data;
      if (details && typeof details === 'object') {
        const messages = Object.entries(details)
          .map(([field, msgs]) => `${field}: ${msgs.join(', ')}`)
          .join(' | ');
        setError(messages);
      } else {
        setError("Erreur lors de la création de l'annonce.");
      }
    }
  };

  return (
    <AddAnnonceUI
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleImageAdd={handleImageAdd}
      error={error}
      successMsg={successMsg}
      categories={categories}
      sousCategories={sousCategories}
    />
  );
}

export default AddAnnonce;
