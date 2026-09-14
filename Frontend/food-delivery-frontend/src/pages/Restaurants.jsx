import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Star, MapPin, Clock, ChefHat } from "lucide-react";
import api from "../api/axios";

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/restaurants")
      .then((res) => {
        setRestaurants(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-4">
          Hungry? We've got you covered.
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Order from your favorite restaurants and get it delivered right to your door.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {restaurants.map((restaurant) => (
          <Link 
            to={`/restaurants/${restaurant.id}`} 
            key={restaurant.id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
          >
            <div className="h-48 bg-gray-200 relative overflow-hidden">
              {/* Fallback image if we don't have one from backend */}
              <img 
                src={`https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80`} 
                alt={restaurant.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {!restaurant.open && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="bg-red-500 text-white px-4 py-1.5 rounded-full font-bold uppercase tracking-wider text-sm">
                    Closed
                  </span>
                </div>
              )}
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{restaurant.name}</h3>
                  <div className="flex items-center text-gray-500 text-sm">
                    <ChefHat className="w-4 h-4 mr-1" />
                    <span>{restaurant.cuisine}</span>
                  </div>
                </div>
                <div className="flex items-center bg-green-50 px-2 py-1 rounded-lg">
                  <span className="text-green-700 font-bold text-sm mr-1">{restaurant.rating || "New"}</span>
                  <Star className="w-4 h-4 text-green-500 fill-green-500" />
                </div>
              </div>
              
              <div className="flex items-center text-gray-500 text-sm mb-2">
                <MapPin className="w-4 h-4 mr-1.5 flex-shrink-0" />
                <span className="truncate">{restaurant.address}</span>
              </div>
            </div>
          </Link>
        ))}
        {restaurants.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500">
            No restaurants found. Please check back later.
          </div>
        )}
      </div>
    </div>
  );
}