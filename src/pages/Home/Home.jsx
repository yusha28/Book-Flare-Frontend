import React from 'react';
import './Home.css';
import ReadingImage from '../../assets/images/Reading.png'; 
import Book1 from '../../assets/images/Book1.jpg';  
import Book2 from '../../assets/images/Book2.jpg';
import Book3 from '../../assets/images/Book3.jpg';
import Book4 from '../../assets/images/Book4.jpg';
import Book5 from '../../assets/images/Book5.jpg';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Footer from '../../components/Footer'; 

function Home() {
  const books = [
    { id: 1, title: "Snowbound", price: 15, img: Book1 },
    { id: 2, title: "The Half-Known Life", price: 20, img: Book2 },
    { id: 3, title: "May It Please the Court", price: 18, img: Book3 },
    { id: 4, title: "The Alchemist", price: 22, img: Book4 },
    { id: 5, title: "Atomic Habits", price: 25, img: Book5 }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="home">
      <div className="container">
        <div className="hero">
          <div className="hero-text">
            <h1>Find your next great read at our online book store</h1>
            <p>Explore our curated collection</p>
          </div>
          <div className="hero-image">
            <img 
              src={ReadingImage}  
              alt="Illustration of people reading books" 
              onError={(e) => e.target.src = '/images/placeholder.png'}
            />
          </div>
        </div>
      </div>

      <section className="popular-books">
        <h2>Popular Books</h2>
        <Slider {...settings}>
          {books.map((book) => (
            <div className="book-card" key={book.id}>
              <img 
                src={book.img}  
                alt={`Cover of ${book.title}`} 
                onError={(e) => e.target.src = '/images/placeholder.png'}
              />
              <p>{book.title}</p>
              <span>${book.price}.00</span>
            </div>
          ))}
        </Slider>
      </section>

      <section className="cta">
        <h2>Start Your Reading Journey</h2>
        <p>No subscription needed. Dive into a world of stories today.</p>
        <button aria-label="Start Buying">Start Buying</button>
      </section>

      <section className="explore-section">
        <div className="explore-text">
          <h2>Find Your Favorite Books Here!</h2>
          <button aria-label="Explore more books">Explore</button>
        </div>
      </section>

      {/* Reusable Footer Component */}
      <Footer />
    </div>
  );
}

export default Home;
