import React, { useState } from "react";
import './SearchBar.css';

const SearchBar = () => {
  const [location, setLocation] = useState("");
  const [guests, setGuests] = useState(""); 

  const handleSearch = () => {
    console.log({ location, guests });
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Que recherchez-vous ?"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        type="number"
        placeholder="Nombre de chambres"
        min="1"
        value={guests}
        onChange={(e) => setGuests(e.target.value)}
      />
      <button onClick={handleSearch}>Chercher</button>
    </div>
  );
};

export default SearchBar;
