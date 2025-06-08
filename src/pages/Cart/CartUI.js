
function CartUI({ cart, loading, error, onRemoveItem, onConfirmPurchase }) {
  if (loading) return <p>Chargement du panier...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Mon panier</h2>
      {cart?.articles?.length > 0 ? (
        <ul>
          {cart.articles.map((item) => (
            <li key={item.id} style={{ marginBottom: "15px" }}>
              <h4>{item.titre}</h4>
              <p>{item.description}</p>
              <strong>{item.prix} DT</strong><br />
              <button onClick={() => onRemoveItem(item.id)}>Retirer</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Votre panier est vide.</p>
      )}
      {cart?.articles?.length > 0 && (
        <button onClick={onConfirmPurchase}>Confirmer l’achat</button>
      )}
    </div>
  );
}

export default CartUI;

