import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Exchange() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetch('/api/exchanges')
      .then((res) => res.json())
      .then((data) => setListings(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="exchange-page">
      <h1>Exchange Books</h1>
      <Link to="/exchange/create" className="create-listing-button">
        + Create New Listing
      </Link>
      <div className="listings-grid">
        {listings.map((listing) => (
          <div key={listing._id} className="listing-card">
            <img src={`/uploads/${listing.offeringBook.image}`} alt={listing.offeringBook.title} />
            <h3>{listing.offeringBook.title}</h3>
            <p>Author: {listing.offeringBook.author}</p>
            <p>Looking for: {listing.requestedBooks.join(', ')}</p>
            <button onClick={() => alert('Propose Exchange!')}>Propose Exchange</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Exchange;
