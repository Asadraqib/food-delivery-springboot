import { useEffect, useState } from "react";
import api from "../api/axios";

export default function RestaurantDashboard() {
  const [restaurant, setRestaurant] = useState(null);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({ name: "", cuisine: "", address: "" });
  const email = localStorage.getItem("userEmail");

  useEffect(() => {
    api.get(`/restaurants/owner/${email}`).then((res) => setRestaurant(res.data));
  }, [email]);

  useEffect(() => {
    if (restaurant) {
      api.get(`/orders/restaurant/${restaurant.id}`).then((res) => setOrders(res.data.reverse()));
    }
  }, [restaurant]);

  async function createRestaurant(e) {
    e.preventDefault();
    const res = await api.post("/restaurants", { ...form, ownerEmail: email, rating: 0, open: true });
    setRestaurant(res.data);
  }

  async function advanceStatus(orderId, nextStatus) {
    await api.put(`/orders/${orderId}/status?status=${nextStatus}`);
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: nextStatus } : o)));
  }

  if (!restaurant) {
    return (
      <div className="page page--narrow">
        <h1>Set up your restaurant</h1>
        <form onSubmit={createRestaurant}>
          <div className="field">
            <label>Name</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div className="field">
            <label>Cuisine</label>
            <input value={form.cuisine} onChange={(e) => setForm({ ...form, cuisine: e.target.value })} required />
          </div>
          <div className="field">
            <label>Address</label>
            <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} required />
          </div>
          <button className="btn btn-primary btn-block" type="submit">Create restaurant</button>
        </form>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>{restaurant.name} — incoming orders</h1>
      {orders.length === 0 && <div className="state-block">No orders yet.</div>}
      {orders.map((order) => (
        <div key={order.id} className="cart__row">
          <div>
            <p className="cart__name">Order #{order.id} — ₹{order.totalAmount}</p>
            <p className="cart__price">{order.customerEmail} · {order.status}</p>
          </div>
          {order.status === "PLACED" && (
            <button className="btn btn-outline" onClick={() => advanceStatus(order.id, "PREPARING")}>Start preparing</button>
          )}
          {order.status === "PREPARING" && (
            <button className="btn btn-outline" onClick={() => advanceStatus(order.id, "READY_FOR_DELIVERY")}>Ready for pickup</button>
          )}
        </div>
      ))}
    </div>
  );
}
