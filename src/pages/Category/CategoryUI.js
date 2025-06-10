import { useNavigate } from 'react-router-dom';
import "../Category/Category.css";

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
  sousCategories = [],
  onAddToCart
}) {
  const navigate = useNavigate();

  if (loading) return <p>Loading announcements...</p>;

  if (error) {
    return (
      <div style={{ color: 'red', padding: '10px' }}>
        <p>An error occurred: {error}</p>
        {!isAuthenticated && (
          <button onClick={handleReLogin} style={{ marginTop: '10px' }}>
            Log in again
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="Category-container">
      <div className="Category-form">
        <h2 className="Category-title">All Announcements</h2>

        <button
          onClick={() => navigate('/annonce/ajouter')}
          style={{
            marginBottom: '20px',
            padding: '10px 16px',
            backgroundColor: '#fff',
            border: '2px solid #000',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Add New Announcement
        </button>

        <form onSubmit={onFilterSubmit} className="filter-section">
          <input type="text" name="keyword" placeholder="Keyword" value={filters.keyword} onChange={onFilterChange} />
          <input type="number" name="minPrice" placeholder="Min Price" value={filters.minPrice} onChange={onFilterChange} />
          <input type="number" name="maxPrice" placeholder="Max Price" value={filters.maxPrice} onChange={onFilterChange} />

          <select name="categorie" value={filters.categorie} onChange={onFilterChange}>
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.nom}</option>
            ))}
          </select>

          <select name="sousCategorie" value={filters.sousCategorie} onChange={onFilterChange}>
            <option value="">All Subcategories</option>
            {sousCategories
              .filter(sc => !filters.categorie || sc.categorie_id === filters.categorie)
              .map(sub => (
                <option key={sub.id} value={sub.id}>{sub.nom}</option>
              ))}
          </select>

          <button type="submit" className="search-btn">Search</button>
        </form>

        {annonces.length === 0 ? (
          <p className="no-result">No announcements found.</p>
        ) : (
          <div className="announcements-grid">
            {annonces.map((annonce) => (
              <div className="announcement-card" key={annonce.id}>
                {/* ✅ Image preview at top */}
                {annonce.image_url && (
                  <img
                    src={annonce.image_url}
                    alt={annonce.titre}
                    style={{
                      width: '100%',
                      borderRadius: '8px',
                      objectFit: 'cover',
                      maxHeight: '200px',
                      marginBottom: '10px'
                    }}
                  />
                )}

                <h3>{annonce.titre || 'Untitled'}</h3>
                <p>{annonce.description || 'No description provided.'}</p>
                <p>
                  <strong>Price:</strong>{' '}
                  {typeof annonce.prix === 'number'
                    ? new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'TND'
                      }).format(annonce.prix)
                    : 'Not specified'}
                </p>
                <p><strong>Seller:</strong> {annonce.user?.username || 'Unknown'}</p>

                <button onClick={() => navigate(`/annonce/${annonce.id}`)}>
                  View Details
                </button>

                <button
  onClick={() => onAddToCart(annonce.id)}
  style={{
    marginTop: '8px',
    padding: '6px 12px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }}
>
  Ajouter au panier
</button>



              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryUI;
