import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, ShoppingBag, CreditCard, ArrowRight } from "lucide-react";
import api from "../api/axios";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
  }, []);

  const updateQuantity = (index, delta) => {
    const newCart = [...cart];
    newCart[index].quantity += delta;
    if (newCart[index].quantity <= 0) {
      newCart.splice(index, 1);
    }
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const removeItem = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const placeOrder = async () => {
    const email = localStorage.getItem("email");
    if (!email) {
      alert("Please login to place an order");
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      const orderPayload = {
        customerEmail: email,
        totalAmount: total,
        items: cart.map(item => ({
          foodName: item.name,
          quantity: item.quantity,
          price: item.price
        }))
      };

      await api.post("/orders", orderPayload);
      localStorage.removeItem("cart");
      setCart([]);
      alert("Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      console.error(err);
      alert("Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="bg-gray-100 p-6 rounded-full mb-6">
          <ShoppingBag className="h-16 w-16 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <button 
          onClick={() => navigate("/restaurants")}
          className="bg-orange-500 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition-colors"
        >
          Browse Restaurants
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Your Order</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-4">
              Ordering from: <span className="text-orange-500">{cart[0].restaurantName}</span>
            </h2>
            
            <div className="space-y-6">
              {cart.map((item, index) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{item.name}</h3>
                    <p className="text-gray-500 text-sm">₹{item.price}</p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-gray-100 rounded-lg border border-gray-200">
                      <button 
                        onClick={() => updateQuantity(index, -1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-l-lg transition-colors font-bold"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-medium text-gray-900 text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(index, 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-r-lg transition-colors font-bold"
                      >
                        +
                      </button>
                    </div>
                    <div className="w-16 text-right font-bold text-gray-900">
                      ₹{item.price * item.quantity}
                    </div>
                    <button 
                      onClick={() => removeItem(index)}
                      className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-4">Bill Details</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Item Total</span>
                <span>₹{total}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span>₹40</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Taxes & Charges</span>
                <span>₹{(total * 0.05).toFixed(2)}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center border-t pt-4 mb-6">
              <span className="font-bold text-gray-900 text-lg">To Pay</span>
              <span className="font-extrabold text-xl text-gray-900">₹{(total + 40 + total * 0.05).toFixed(2)}</span>
            </div>
            
            <button 
              onClick={placeOrder}
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold transition-colors shadow-sm disabled:opacity-70 flex justify-center items-center gap-2"
            >
              {loading ? (
                "Processing..."
              ) : (
                <>
                  Place Order <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
