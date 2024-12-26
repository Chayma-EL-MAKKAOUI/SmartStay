import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import PropertyCard from "../components/PropertyCard";
import axios from "axios";
import './HomePage.css';

const HomePage = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const response = await axios.get("http://localhost:5000/properties"); 
      setProperties(response.data);
    };
    fetchProperties();
  }, []);

  return (
    <div className="home-page">
      <SearchBar />
      <div className="property-list">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;