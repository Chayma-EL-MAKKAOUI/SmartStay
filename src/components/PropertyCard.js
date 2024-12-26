import React, { useState } from "react";
import "./PropertyCard.css";

const PropertyCard = ({ property }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <div className="property-card">
      <img src={property.image} alt={property.name} />
      <h3>{property.name}</h3>
      <p>{property.location}</p>
      <p className="property-price">{property.price}</p>
      <i
        className={`fa-solid fa-heart favorite-icon ${
          isFavorited ? "favorited" : ""
        }`}
        onClick={toggleFavorite}
      ></i>
    </div>
  );
};

export default PropertyCard;