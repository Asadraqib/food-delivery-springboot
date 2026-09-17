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
          margin: 2rem 0;
          background: var(--surface);
          border: 1px solid var(--hairline);
          border-radius: var(--radius);
          padding: 2rem 1.5rem;
        }
        .tracker__step {
          display: flex;
          align-items: flex-start;
          gap: 1.25rem;
          padding: 1rem 0;
          color: var(--paper-muted);
          position: relative;
          transition: color var(--transition-base);
        }
        .tracker__step:not(:last-child)::after {
          content: '';
          position: absolute;
          left: 19px;
          top: 40px;
          width: 2px;
          height: 32px;
          background: var(--hairline);
        }
        .tracker__step--done:not(:last-child)::after {
          background: var(--cardamom);
        }
        .tracker__step--done {
          color: var(--paper);
        }
        .tracker__dot {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 3px solid var(--hairline);
          flex-shrink: 0;
          margin-top: 0.1em;
          transition: all var(--transition-base);
          background: var(--surface);
        }
        .tracker__step--done .tracker__dot {
          background: var(--cardamom);
          border-color: var(--cardamom);
          box-shadow: 0 0 0 3px rgba(127, 160, 111, 0.2);
        }
        .order-items {
          margin: 2rem 0 0;
          background: var(--surface);
          border: 1px solid var(--hairline);
          border-radius: var(--radius);
          overflow: hidden;
        }
        .order-items__row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          border-bottom: 1px solid var(--hairline);
          font-size: 0.95rem;
          transition: background var(--transition-fast);
        }
        .order-items__row:last-child {
          border-bottom: none;
        }
        .order-items__row:hover {
          background: rgba(52, 44, 35, 0.5);
        }
        .order-items__row span:last-child {
          color: var(--turmeric);
          font-weight: 600;
        }
        .order-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 600;
          padding: 1.5rem 1.5rem;
          background: var(--surface);
          border: 1px solid var(--hairline);
          border-radius: var(--radius);
          margin-top: 1.5rem;
        }
        .order-total span:first-child {
          color: var(--paper-muted);
          font-size: 0.95rem;
          font-weight: 500;
        }
        .order-total span:last-child {
          color: var(--turmeric);
        }
        @media (max-width: 640px) {
          .tracker {
            padding: 1.5rem 1rem;
          }
          .tracker__step {
            gap: 1rem;
          }
          .order-items__row {
            padding: 1rem;
            font-size: 0.9rem;
          }
          .order-total {
            padding: 1.25rem 1rem;
          }
        }
      `}</style>
    </div>
  );
}
