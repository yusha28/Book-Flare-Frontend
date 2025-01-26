import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // For unauthenticated users
import AuthenticatedNavbar from './components/AuthenticatedNavbar'; // For authenticated users
import Home from './pages/Home/Home';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Books from './pages/Books/Books';
import BookExchange from './pages/Exchange/BookExchange'; // Book Exchange page
import MyExchange from './pages/Exchange/MyExchange'; // User's uploaded books
import UploadBook from './pages/Exchange/UploadBook'; // Upload book for exchange
import AudioBooks from './pages/AudioBooks/AudioBooks'; // Audio books list
import AudioBookDetails from './pages/AudioBooks/AudioBookDetails'; // Audio book details
import CartPage from './pages/Cart/Cart'; // Shopping cart page
import AdminPanel from './pages/AdminPanel/AdminPanel'; // Admin panel for admins
import { ToastContainer } from 'react-toastify'; // Notifications
import { AuthProvider, useAuth } from './context/AuthContext'; // Auth context
import { CartProvider } from './context/CartContext'; // Cart context
import 'react-toastify/dist/ReactToastify.css'; // Toastify styles

function MainApp() {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      {/* Conditionally render Navbar based on authentication */}
      {isAuthenticated ? <AuthenticatedNavbar /> : <Navbar />}
      
      {/* Toast notifications */}
      <ToastContainer />
      
      {/* Application Routes */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Login />} />

        {/* Books */}
        <Route path="/books" element={<Books />} />

        {/* Book Exchange */}
        <Route path="/book-exchange" element={<BookExchange />} /> {/* Displays all available books */}
        <Route path="/my-exchange" element={<MyExchange />} /> {/* User's uploaded books */}
        <Route path="/upload" element={<UploadBook />} /> {/* Upload book form */}

        {/* AudioBooks */}
        <Route path="/audiobooks" element={<AudioBooks />} />
        <Route path="/audiobooks/:id" element={<AudioBookDetails />} />

        {/* Cart */}
        <Route path="/cart" element={<CartPage />} />

        {/* Admin */}
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
