import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    api
      .get(`/orders/user/${email}`)
      .then((res) => setOrders(res.data.reverse()))
      .catch(() => setError("Couldn't load your orders."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page">
      <h1>Your orders</h1>

      {loading && <div className="state-block">Loading your orders…</div>}
      {error && <div className="form-error">{error}</div>}

      {!loading && !error && orders.length === 0 && (
        <div className="state-block">
          No orders yet. <Link to="/restaurants">Find something to eat</Link>.
        </div>
      )}

      <div className="history__list">
        {orders.map((order) => (
          <Link to={`/orders/${order.id}`} key={order.id} className="history__row">
            <div>
              <p className="history__id">Order #{order.id}</p>
              <p className="history__items">
                {order.items?.length ?? 0} item{order.items?.length === 1 ? "" : "s"} · ₹{order.totalAmount}
              </p>
            </div>
            <span className={`tag tag--status-${order.status?.toLowerCase()}`}>
              {order.status}
            </span>
          </Link>
        ))}
      </div>

      <style>{`
        .history__list {
          margin-top: 2rem;
          max-width: 600px;
        }
        .history__row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 1.5rem;
          border: 1px solid var(--hairline);
          border-radius: var(--radius);
          text-decoration: none;
          color: var(--paper);
          transition: all var(--transition-base);
          background: var(--surface);
          margin-bottom: 1rem;
          cursor: pointer;
        }
        .history__row:hover {
          border-color: var(--turmeric);
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }
        .history__id {
          margin: 0;
          font-weight: 600;
          font-size: 1rem;
        }
        .history__items {
          margin: 0.35em 0 0;
          font-size: 0.85rem;
          color: var(--paper-muted);
        }
        @media (max-width: 640px) {
          .history__row {
            padding: 1rem 1.25rem;
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
          }
          .history__id {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </div>
  );
}
