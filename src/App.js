import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Signup from './pages/Signup/Signup';
import Navbar from './components/Navbar';
import AuthenticatedNavbar from './components/AuthenticatedNavbar';
import Login from './pages/Login/Login';
import Books from './pages/Books/Books';
import BookDetails from './pages/Books/BookDetails';
import CartPage from './pages/Cart/Cart';
import AudioBooks from './pages/AudioBooks/AudioBooks';  // Import AudioBooks Page
import AudioBookDetails from './pages/AudioBooks/AudioBookDetails'; // Import AudioBookDetails Page
import AdminPanel from './pages/AdminPanel/AdminPanel';
import { ToastContainer } from 'react-toastify';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import 'react-toastify/dist/ReactToastify.css';

function MainApp() {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      {/* Conditionally Render Navbar Based on Authentication */}
      {isAuthenticated ? <AuthenticatedNavbar /> : <Navbar />}
      
      {/* Toast Notifications */}
      <ToastContainer />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/audiobooks" element={<AudioBooks />} />  {/* AudioBooks Page */}
        <Route path="/audiobooks/:title" element={<AudioBookDetails />} /> {/* AudioBook Details Page */}
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <MainApp />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
