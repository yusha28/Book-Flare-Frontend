import React from 'react';

const books = [
  { title: 'Snowbound', price: '$15.00' },
  { title: 'The Half Known Life', price: '$20.00' },
  { title: 'May It Please The Court', price: '$12.00' },
];

function BookList() {
  return (
    <section style={styles.container}>
      <h2>Popular Books</h2>
      <div style={styles.grid}>
        {books.map((book, index) => (
          <div key={index} style={styles.bookCard}>
            <h3>{book.title}</h3>
            <p>{book.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const styles = {
  container: {
    padding: '40px',
    textAlign: 'center',
  },
  grid: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
  },
  bookCard: {
    padding: '20px',
    border: '1px solid #ddd',
    width: '200px',
    textAlign: 'center',
  },
};

export default BookList;
