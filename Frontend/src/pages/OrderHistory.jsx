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
          margin-top: 1.5rem;
          max-width: 560px;
        }
        .history__row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 0;
          border-bottom: 1px solid var(--hairline);
          text-decoration: none;
          color: var(--paper);
        }
        .history__id {
          margin: 0;
          font-weight: 500;
        }
        .history__items {
          margin: 0.2em 0 0;
          font-size: 0.85rem;
          color: var(--paper-muted);
        }
      `}</style>
    </div>
  );
}
