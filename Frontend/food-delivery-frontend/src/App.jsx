import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import { ShoppingBag, LogOut, Menu, User } from "lucide-react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Restaurants from "./pages/Restaurants";
import RestaurantDetail from "./pages/RestaurantDetail";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to={token ? "/restaurants" : "/"} className="flex-shrink-0 flex items-center gap-2">
              <ShoppingBag className="h-8 w-8 text-orange-500" />
              <span className="font-bold text-xl text-gray-900 tracking-tight">Foodie Express</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {token ? (
              <>
                <Link to="/restaurants" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md font-medium transition-colors">Restaurants</Link>
                <Link to="/orders" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md font-medium transition-colors">My Orders</Link>
                <Link to="/cart" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md font-medium transition-colors flex items-center gap-1">
                  Cart
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full font-medium transition-colors ml-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md font-medium">Login</Link>
                <Link to="/register" className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full font-medium transition-colors shadow-sm">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <footer className="bg-white border-t py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500">
          <p>&copy; 2026 Foodie Express. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/restaurants/:id" element={<RestaurantDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}