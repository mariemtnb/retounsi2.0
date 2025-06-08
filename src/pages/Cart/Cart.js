import { useEffect, useState } from 'react';
import CartUI from './CartUI';
import API from '../../services/api';

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    API.get('cart/') // Endpoint pour récupérer le panier
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
      await API.delete(`cart/supprimer/${annonceId}/`); // Endpoint pour supprimer un article du panier
      setCart((prev) => ({
        ...prev,
        articles: prev.articles.filter((a) => a.id !== annonceId),
      }));
    } catch (err) {
      setError('Échec de la suppression.');
    }
  };

  const handleConfirmPurchase = async () => {
    try {
      await API.post('cart/confirmer/'); // Endpoint pour confirmer l'achat
      alert('Achat confirmé !');
      setCart({ articles: [] }); // Vider le panier après confirmation
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