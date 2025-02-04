import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Navbar for unauthenticated users
import AuthenticatedNavbar from './components/AuthenticatedNavbar'; // Navbar for authenticated users
import Home from './pages/Home/Home';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Books from './pages/Books/Books';
import BookDetails from './pages/Books/BookDetails';
import BookExchange from './pages/Exchange/BookExchange';
import MyExchange from './pages/Exchange/MyExchange';
import UploadBook from './pages/Exchange/UploadBook';
import AudioBooks from './pages/AudioBooks/AudioBooks';
import AudioBookDetails from './pages/AudioBooks/AudioBookDetails';
import CartPage from './pages/Cart/Cart';
import Checkout from './pages/Checkout';
import AdminPanel from './pages/AdminPanel/AdminPanel';
import PaymentSuccess from "./pages/PaymentSuccess";  // ✅ eSewa Payment Success Page
import PaymentFailed from "./pages/PaymentFailed";    // ✅ eSewa Payment Failed Page
import { ToastContainer } from 'react-toastify'; // Notifications
import { AuthProvider, useAuth } from './context/AuthContext'; // Authentication context
import { CartProvider } from './context/CartContext'; // Cart context
import 'react-toastify/dist/ReactToastify.css'; 
import ESewaButton from "./components/ESewaButton"; // ✅ Check if this file exists!

// Fallback Page for Unmatched Routes
const NotFound = () => (
  <div style={{ textAlign: "center", marginTop: "50px" }}>
    <h2>❌ Page Not Found</h2>
    <p>The page you're looking for does not exist.</p>
    <a href="/">Go to Home</a>
  </div>
);

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
        <Route path="/books/:id" element={<BookDetails />} />

        {/* Book Exchange */}
        <Route path="/book-exchange" element={<BookExchange />} />
        <Route path="/my-exchange" element={<MyExchange />} />
        <Route path="/upload" element={<UploadBook />} />

        {/* AudioBooks */}
        <Route path="/audiobooks" element={<AudioBooks />} />
        <Route path="/audiobooks/:id" element={<AudioBookDetails />} />

        {/* Cart */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* ✅ eSewa Payment Integration */}
        <Route path="/esewa" element={<ESewaButton amount={1000} transactionId="TXN123456" />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminPanel />} />

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
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
