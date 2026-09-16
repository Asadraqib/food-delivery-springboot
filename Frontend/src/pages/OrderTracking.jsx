import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";

const STAGES = ["PLACED", "PREPARING", "OUT_FOR_DELIVERY", "DELIVERED"];

function stageLabel(stage) {
  return stage
    .toLowerCase()
    .split("_")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}

export default function OrderTracking() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let interval;

    function load() {
      api
        .get(`/orders/${id}`)
        .then((res) => {
          setOrder(res.data);
          if (res.data.status === "DELIVERED" || res.data.status === "CANCELLED") {
            clearInterval(interval);
          }
        })
        .catch(() => setError("Couldn't load this order."));
    }

    load();
    interval = setInterval(load, 8000); // poll for status changes
    return () => clearInterval(interval);
  }, [id]);

  if (error) return <div className="page state-block">{error}</div>;
  if (!order) return <div className="page state-block">Loading order…</div>;

  const currentIndex = STAGES.indexOf(order.status);
  const cancelled = order.status === "CANCELLED";

  return (
    <div className="page page--narrow">
      <h1>Order #{order.id}</h1>
      <p>Placed by {order.customerEmail}</p>

      {cancelled ? (
        <div className="form-error">This order was cancelled.</div>
      ) : (
        <ol className="tracker">
          {STAGES.map((stage, index) => (
            <li
              key={stage}
              className={`tracker__step ${index <= currentIndex ? "tracker__step--done" : ""}`}
            >
              <span className="tracker__dot" />
              {stageLabel(stage)}
            </li>
          ))}
        </ol>
      )}

      <div className="order-items">
        {order.items?.map((item) => (
          <div className="order-items__row" key={item.id}>
            <span>{item.foodName} × {item.quantity}</span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}
      </div>

      <div className="order-total">
        <span>Total</span>
        <span>₹{order.totalAmount}</span>
      </div>

      <Link to="/orders" className="form-footnote">← Back to your orders</Link>

      <style>{`
        .tracker {
          list-style: none;
          padding: 0;
          margin: 1.5rem 0;
        }
        .tracker__step {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          padding: 0.6rem 0;
          color: var(--paper-muted);
        }
        .tracker__step--done {
          color: var(--paper);
        }
        .tracker__dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 2px solid var(--hairline);
          flex-shrink: 0;
        }
        .tracker__step--done .tracker__dot {
          background: var(--cardamom);
          border-color: var(--cardamom);
        }
        .order-items {
          margin: 1.5rem 0 0.5rem;
        }
        .order-items__row {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          border-bottom: 1px solid var(--hairline);
          font-size: 0.95rem;
        }
        .order-total {
          display: flex;
          justify-content: space-between;
          font-weight: 600;
          padding: 0.8rem 0 1.5rem;
        }
      `}</style>
    </div>
  );
}
