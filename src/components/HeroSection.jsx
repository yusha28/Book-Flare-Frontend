import React from 'react';

function HeroSection() {
  return (
    <section style={styles.hero}>
      <h1>Find your next great read at our online book store</h1>
      <p>Explore our curated collection</p>
      <div style={styles.searchBox}>
        <input type="text" placeholder="Find your book here..." />
        <button>Search Now</button>
      </div>
    </section>
  );
}

const styles = {
  hero: {
    textAlign: 'center',
    padding: '60px 20px',
    backgroundColor: '#f0f8f7',
  },
  searchBox: {
    marginTop: '20px',
  },
};

export default HeroSection;
