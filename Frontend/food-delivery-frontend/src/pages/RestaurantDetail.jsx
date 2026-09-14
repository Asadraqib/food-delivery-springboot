import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, MapPin, ChefHat, Plus, ShoppingCart } from "lucide-react";
import api from "../api/axios";

// Mock menu items since backend doesn't have a menu table
const getMockMenu = (restaurantId) => {
  return [
    { id: `m1_${restaurantId}`, name: "Signature Burger", description: "Juicy beef patty with special sauce, lettuce, and cheese.", price: 299 },
    { id: `m2_${restaurantId}`, name: "Truffle Fries", description: "Crispy fries tossed in truffle oil and parmesan.", price: 149 },
    { id: `m3_${restaurantId}`, name: "Margherita Pizza", description: "Classic wood-fired pizza with fresh basil and mozzarella.", price: 399 },
    { id: `m4_${restaurantId}`, name: "Caesar Salad", description: "Fresh romaine lettuce, croutons, and creamy caesar dressing.", price: 249 },
    { id: `m5_${restaurantId}`, name: "Chocolate Lava Cake", description: "Warm chocolate cake with a gooey center.", price: 199 },
  ];
};

export default function RestaurantDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/restaurants/${id}`)
      .then((res) => {
        setRestaurant(res.data);
        setMenu(getMockMenu(id));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const addToCart = (item) => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    
    // Check if cart has items from another restaurant
    if (existingCart.length > 0 && existingCart[0].restaurantId !== id) {
      if (window.confirm("Your cart has items from another restaurant. Do you want to clear it and add this item?")) {
        const newItem = { ...item, quantity: 1, restaurantId: id, restaurantName: restaurant.name };
        localStorage.setItem("cart", JSON.stringify([newItem]));
        alert("Item added to cart!");
      }
      return;
    }

    const existingItemIndex = existingCart.findIndex(i => i.id === item.id);
    if (existingItemIndex >= 0) {
      existingCart[existingItemIndex].quantity += 1;
    } else {
      existingCart.push({ ...item, quantity: 1, restaurantId: id, restaurantName: restaurant.name });
    }
    
    localStorage.setItem("cart", JSON.stringify(existingCart));
    alert("Item added to cart!");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!restaurant) {
    return <div className="text-center py-12 text-xl text-gray-500">Restaurant not found.</div>;
  }

  return (
    <div>
      <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8 shadow-sm">
        <img 
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80" 
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="flex justify-between items-end">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-sm">
                  {restaurant.cuisine}
                </span>
                {!restaurant.open && (
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-sm">
                    Closed Right Now
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">{restaurant.name}</h1>
              <div className="flex flex-wrap items-center text-gray-200 gap-4 text-sm md:text-base">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mr-1" />
                  <span className="font-bold text-white">{restaurant.rating || "New"}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{restaurant.address}</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => navigate("/cart")}
              className="bg-white text-gray-900 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-100 transition-colors shadow-lg"
            >
              <ShoppingCart className="w-5 h-5" />
              View Cart
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Menu Highlights</h2>
        
        <div className="space-y-4">
          {menu.map(item => (
            <div key={item.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center hover:border-orange-200 transition-colors">
              <div className="pr-4">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{item.name}</h3>
                <p className="text-gray-500 text-sm mb-3 line-clamp-2">{item.description}</p>
                <span className="text-gray-900 font-bold bg-gray-100 px-3 py-1 rounded-lg">
                  ₹{item.price}
                </span>
              </div>
              <div className="flex-shrink-0">
                <button 
                  onClick={() => addToCart(item)}
                  disabled={!restaurant.open}
                  className="bg-orange-50 hover:bg-orange-100 text-orange-600 p-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title={!restaurant.open ? "Restaurant is closed" : "Add to cart"}
                >
                  <Plus className="w-6 h-6" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
