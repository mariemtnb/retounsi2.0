import { useNavigate } from 'react-router-dom';

function CategoryUI({
  annonces = [],
  loading,
  error,
  isAuthenticated,
  handleReLogin,
  filters = {
    keyword: '',
    categorie: '',
    sousCategorie: '',
    minPrice: '',
    maxPrice: ''
  },
  onFilterChange,
  onFilterSubmit,
  categories = [],
  sousCategories = []
}) {
  const navigate = useNavigate();

  if (loading) {
    return <p>🕓 Chargement des annonces...</p>;
  }

  if (error) {
    return (
      <div style={{ color: 'red', padding: '10px' }}>
        <p>❗ Une erreur s'est produite : {error}</p>
        {!isAuthenticated && (
          <button onClick={handleReLogin} style={{ marginTop: '10px' }}>
            🔐 Se reconnecter
          </button>
        )}
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>📢 Nos Annonces</h2>

      <form onSubmit={onFilterSubmit} style={{ marginBottom: '20px' }}>
  <fieldset style={{
    border: '1px solid #ccc',
    padding: '15px',
    borderRadius: '8px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px'
  }}>
    <legend>🔎 Filtrer les annonces</legend>

    <input
      type="text"
      name="keyword"
      placeholder="Mot-clé"
      value={filters?.keyword || ''}
      onChange={onFilterChange}
      style={{ flex: '1' }}
    />

    <select
      name="categorie"
      value={filters?.categorie || ''}
      onChange={onFilterChange}
      style={{ flex: '1' }}
    >
      <option value="">Toutes les catégories</option>
      {categories.map(cat => (
        <option key={cat.id} value={cat.id}>{cat.nom}</option>
      ))}
    </select>

    <select
      name="sousCategorie"
      value={filters?.sousCategorie || ''}
      onChange={onFilterChange}
      style={{ flex: '1' }}
    >
      <option value="">Toutes les sous-catégories</option>
      {sousCategories.map(sub => (
        <option key={sub.id} value={sub.id}>{sub.nom}</option>
      ))}
    </select>

    <input
      type="number"
      name="minPrice"
      placeholder="Prix min"
      value={filters?.minPrice || ''}
      onChange={onFilterChange}
      style={{ width: '120px' }}
    />

    <input
      type="number"
      name="maxPrice"
      placeholder="Prix max"
      value={filters?.maxPrice || ''}
      onChange={onFilterChange}
      style={{ width: '120px' }}
    />

    <button type="submit">🔍 Rechercher</button>
  </fieldset>
</form>


      <div>
        {annonces.length === 0 ? (
          <p>😕 Aucune annonce trouvée avec les critères donnés.</p>
        ) : (
          annonces.map((annonce) => (
            <div
              key={annonce.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '10px',
                padding: '15px',
                marginBottom: '20px',
                backgroundColor: '#f7f7f7',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
              }}
            >
              <h3 style={{ margin: '0 0 10px' }}>
                {annonce.titre || 'Titre non disponible'}
              </h3>
              <p>{annonce.description || 'Pas de description fournie.'}</p>
              <p>
                <strong>Prix :</strong>{' '}
                {typeof annonce.prix === 'number'
                  ? new Intl.NumberFormat('fr-TN', {
                      style: 'currency',
                      currency: 'TND'
                    }).format(annonce.prix)
                  : 'Non précisé'}
              </p>
              <p>
                <strong>Vendeur :</strong>{' '}
                {annonce.user?.username || 'Utilisateur inconnu'}
              </p>
              <button
                onClick={() => navigate(`/annonce/${annonce.id}`)}
                style={{
                  marginTop: '10px',
                  padding: '8px 12px',
                  borderRadius: '5px',
                  backgroundColor: '#007bff',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                ➡️ Voir Détails
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CategoryUI;
