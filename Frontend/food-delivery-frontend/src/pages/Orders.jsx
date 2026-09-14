import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package, Clock, CheckCircle, XCircle } from "lucide-react";
import api from "../api/axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) {
      setError("Please login to view your orders.");
      setLoading(false);
      return;
    }

    api.get(`/orders/user/${email}`)
      .then((res) => {
        // Sort orders by ID descending (newest first)
        const sortedOrders = res.data.sort((a, b) => b.id - a.id);
        setOrders(sortedOrders);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch orders.");
        setLoading(false);
      });
  }, []);

  const getStatusIcon = (status) => {
    switch(status) {
      case "PLACED":
      case "PREPARING":
        return <Clock className="w-5 h-5 text-blue-500" />;
      case "DELIVERED":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "CANCELLED":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Package className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "PLACED": return "bg-blue-50 text-blue-700 border-blue-200";
      case "PREPARING": return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "DELIVERED": return "bg-green-50 text-green-700 border-green-200";
      case "CANCELLED": return "bg-red-50 text-red-700 border-red-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">{error}</p>
        <Link to="/login" className="text-orange-500 hover:underline font-medium">Go to Login</Link>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="bg-gray-100 p-6 rounded-full mb-6">
          <Package className="h-16 w-16 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h2>
        <p className="text-gray-500 mb-8">You haven't placed any orders with us yet.</p>
        <Link 
          to="/restaurants"
          className="bg-orange-500 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition-colors"
        >
          Explore Restaurants
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Your Orders</h1>
      
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="bg-gray-50 p-4 border-b flex justify-between items-center flex-wrap gap-4">
              <div>
                <p className="text-sm text-gray-500 font-medium">Order ID: #{order.id}</p>
              </div>
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-bold ${getStatusColor(order.status)}`}>
                {getStatusIcon(order.status)}
                {order.status}
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-6 space-y-3">
                {order.items?.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm md:text-base">
                    <div className="flex items-center gap-3">
                      <span className="bg-gray-100 text-gray-700 font-bold px-2 py-1 rounded text-xs">
                        {item.quantity}x
                      </span>
                      <span className="font-medium text-gray-900">{item.foodName}</span>
                    </div>
                    <span className="text-gray-600">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between items-center border-t pt-4">
                <span className="text-gray-500 font-medium">Total Amount</span>
                <span className="text-xl font-bold text-gray-900">₹{order.totalAmount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
