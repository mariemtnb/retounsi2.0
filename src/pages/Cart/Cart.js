import { useEffect, useState } from 'react';
import CartUI from './CartUI';
import API from '../../services/api';

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    API.get('panier/') // ✅ Nouveau endpoint
      .then((res) => {
        setCart(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Impossible de charger le panier.');
        setLoading(false);
      });
  }, []);

  const handleRemoveItem = async (annonceId) => {
    try {
      await API.delete(`panier/supprimer/${annonceId}/`); // ✅ Nouveau endpoint
      setCart((prev) => ({
        ...prev,
        annonces: prev.annonces.filter((a) => a.id !== annonceId),
      }));
    } catch (err) {
      setError('Échec de la suppression.');
    }
  };

  const handleConfirmPurchase = async () => {
    try {
      await API.post('panier/confirmer/'); // ✅ Nouveau endpoint
      alert('Achat confirmé !');
      setCart({ annonces: [] }); // Vider localement le panier
    } catch (err) {
      setError('Erreur lors de la confirmation.');
    }
  };

  return (
    <CartUI
      cart={cart}
      loading={loading}
      error={error}
      onRemoveItem={handleRemoveItem}
      onConfirmPurchase={handleConfirmPurchase}
    />
  );
}

export default Cart;
