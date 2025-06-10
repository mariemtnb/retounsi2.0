import React from "react";
import "../AddAnnonce/AddAnnonce.css"; // Using the same design as the Announce page

function AddAnnonceUI({
  formData,
  handleChange,
  handleSubmit,
  handleImageAdd,
  error,
  successMsg,
  categories,
  sousCategories
}) {
  return (
    <div className="Announce-container">
      <div className="Announce-form">
        <h2 className="Announce-title">Create an Announcement</h2>

        {error && <p className="error">{error}</p>}
        {successMsg && <p style={{ color: "green", textAlign: "center" }}>{successMsg}</p>}

        <form onSubmit={handleSubmit}>
          <input
            name="titre"
            placeholder="Title"
            value={formData.titre}
            onChange={handleChange}
          />
           <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            style={{
              width: '92%',
              padding: '15px',
              marginBottom: '20px',
              fontSize: '16px',
              backdropFilter: 'blur(10px)',
              background: 'rgba(255, 255, 255, 0.284)',
              border: 'none',
              borderRadius: '10px',
              outline: 'none',
              color: 'white'
            }}
          ></textarea>
          <input
            name="prix"
            type="number"
            step="0.01"
            placeholder="Price (DT)"
            value={formData.prix}
            onChange={handleChange}
          />
          <input
            name="ville"
            placeholder="City"
            value={formData.ville}
            onChange={handleChange}
          />
          <input
            name="gouvernorat"
            placeholder="Governorate"
            value={formData.gouvernorat}
            onChange={handleChange}
          />
<select
  name="categorie"
  value={formData.categorie}
  onChange={handleChange}
  style={{
    width: '100%',
    padding: '15px',
    marginBottom: '20px',
    fontSize: '16px',
    backdropFilter: 'blur(10px)',
    background: 'rgba(255, 255, 255, 0.284)',
    border: 'none',
    borderRadius: '10px',
    outline: 'none',
    color: 'black'
  }}
>
  <option value="">Choose a Category</option>
  {categories.map((cat) => (
    <option key={cat.id} value={cat.id}>
      {cat.nom}
    </option>
  ))}
</select>
<select
  name="sous_categorie"
  value={formData.sous_categorie}
  onChange={handleChange}
  style={{
    width: '100%',
    padding: '15px',
    marginBottom: '20px',
    fontSize: '16px',
    backdropFilter: 'blur(10px)',
    background: 'rgba(255, 255, 255, 0.284)',
    border: 'none',
    borderRadius: '10px',
    outline: 'none',
    color: 'black'
  }}
>
  <option value="">-- Choose a Subcategory --</option>
  {sousCategories.map((sousCat) => (
    <option key={sousCat.id} value={sousCat.id}>
      {sousCat.nom}
      </option>
  ))}
</select>

          <input
            placeholder="Add an Image (URL)"
            onBlur={(e) => {
              handleImageAdd(e.target.value);
              e.target.value = "";
            }}
          />
          {formData.images_urls.length > 0 && (
            <ul>
              {formData.images_urls.map((url, i) => (
                <li key={i}>{url}</li>
              ))}
            </ul>
          )}

          
          <button type="submit">Publish</button>
        </form>
      </div>
    </div>
  );
}

export default AddAnnonceUI;
