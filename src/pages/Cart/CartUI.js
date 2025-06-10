import './Cart.css';

function CartUI({ cart, loading, error, onRemoveItem, onConfirmPurchase }) {
  if (loading) return <p>Chargement du panier...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="Cart-container">
      <div className="Cart-form">
        <h2 className="Cart-title">Mon panier</h2>
        {cart?.annonces?.length > 0 ? (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {cart.annonces.map((item) => (
              <li className="Cart-item" key={item.id}>
                <h4>{item.titre}</h4>
                <p>{item.description}</p>
                <strong>{item.prix} DT</strong><br />
                <button onClick={() => onRemoveItem(item.id)}>Retirer</button>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ textAlign: 'center' }}>Votre panier est vide.</p>
        )}
        {cart?.annonces?.length > 0 && (
          <button className="confirm-btn" onClick={onConfirmPurchase}>Confirmer l’achat</button>
        )}
      </div>
    </div>
  );
}

export default CartUI;
