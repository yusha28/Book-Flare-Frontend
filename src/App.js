import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Main Navbar
import AuthenticatedNavbar from './components/AuthenticatedNavbar'; // Authenticated Navbar
import Home from './pages/Home/Home';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Books from './pages/Books/Books'
import BookExchange from './pages/Exchange/BookExchange'; // Book Exchange Page
import MyExchange from './pages/Exchange/MyExchange'; // My Exchange Page
import UploadBook from './pages/Exchange/UploadBook'; // Upload Book Page
import AudioBooks from './pages/AudioBooks/AudioBooks';
import AudioBookDetails from './pages/AudioBooks/AudioBookDetails';
import CartPage from './pages/Cart/Cart';
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
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/books" element={<Books />} />


        {/* Book Exchange Routes */}
        <Route path="/book-exchange" element={<BookExchange />} /> {/* Displays all available books */}
        <Route path="/my-exchange" element={<MyExchange />} /> {/* Displays user's uploaded books */}
        <Route path="/upload" element={<UploadBook />} /> {/* Page for uploading books */}

        {/* AudioBooks Routes */}
        <Route path="/audiobooks" element={<AudioBooks />} />
        <Route path="/audiobooks/:id" element={<AudioBookDetails />} />

        {/* Cart */}
        <Route path="/cart" element={<CartPage />} />

        {/* Admin Panel */}
        <Route path="/admin" element={<AdminPanel />} />
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
