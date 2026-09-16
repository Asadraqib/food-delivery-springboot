import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, restaurantName, updateQuantity, totalAmount, clearCart } = useCart();
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleCheckout() {
    setError("");

    if (!window.Razorpay) {
      setError("Payment couldn't load. Check your internet connection and try again.");
      return;
    }

    setPlacing(true);
    try {
      // Step 1: ask payment-service to open a Razorpay order for this amount.
      const paymentRes = await api.post("/payments/create", { amount: totalAmount });
      const razorpayOrder =
        typeof paymentRes.data === "string" ? JSON.parse(paymentRes.data) : paymentRes.data;

      // Step 2: open Razorpay's checkout popup with that order.
      const rzp = new window.Razorpay({
        key: "rzp_test_TaJ10Mji0CcND0",
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "Tiffin",
        description: restaurantName ? `Order from ${restaurantName}` : "Food order",
        order_id: razorpayOrder.id,
        handler: async (response) => {
          await finalizeOrder(response);
        },
        modal: {
          ondismiss: () => setPlacing(false),
        },
        theme: { color: "#f0a93b" },
      });

      rzp.on("payment.failed", () => {
        setError("Payment failed or was cancelled. Nothing was charged.");
        setPlacing(false);
      });

      rzp.open();
    } catch (err) {
      setError("Couldn't start checkout. Is payment-service running?");
      setPlacing(false);
    }
  }

  async function finalizeOrder(razorpayResponse) {
    try {
      // Step 3: verify the payment signature with payment-service.
      const verifyRes = await api.post("/payments/verify", {
        orderId: razorpayResponse.razorpay_order_id,
        paymentId: razorpayResponse.razorpay_payment_id,
        signature: razorpayResponse.razorpay_signature,
      });

      if (!verifyRes.data.includes("verified")) {
        setError("Payment could not be verified. Please contact support before retrying.");
        setPlacing(false);
        return;
      }

      // Step 4: only now record the order in order-service.
      const orderPayload = {
        customerEmail: localStorage.getItem("userEmail"),
        totalAmount,
        items: items.map((i) => ({
          foodName: i.name,
          quantity: i.quantity,
          price: i.price,
        })),
      };
      const orderRes = await api.post("/orders", orderPayload);

      clearCart();
      navigate(`/orders/${orderRes.data.id}`);
    } catch (err) {
      setError("Payment succeeded, but saving your order failed. Please contact support.");
    } finally {
      setPlacing(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="page">
        <h1>Your cart</h1>
        <div className="state-block">
          Your cart is empty. <Link to="/restaurants">Browse restaurants</Link> to get started.
        </div>
      </div>
    );
  }

  return (
    <div className="page page--narrow">
      <h1>Your cart</h1>
      <p>From {restaurantName}</p>

      {error && <div className="form-error">{error}</div>}

      <div className="cart__list">
        {items.map((item) => (
          <div className="cart__row" key={item.id}>
            <div>
              <p className="cart__name">{item.name}</p>
              <p className="cart__price">₹{item.price} each</p>
            </div>
            <div className="cart__stepper">
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart__total">
        <span>Total</span>
        <span>₹{totalAmount}</span>
      </div>

      <button
        className="btn btn-primary btn-block"
        onClick={handleCheckout}
        disabled={placing}
      >
        {placing ? "Processing…" : `Pay ₹${totalAmount} with Razorpay`}
      </button>

      <style>{`
        .cart__list {
          margin: 1.5rem 0;
        }
        .cart__row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.9rem 0;
          border-bottom: 1px solid var(--hairline);
        }
        .cart__name {
          margin: 0;
          font-weight: 500;
        }
        .cart__price {
          margin: 0.2em 0 0;
          font-size: 0.85rem;
          color: var(--paper-muted);
        }
        .cart__stepper {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          border: 1px solid var(--turmeric-dim);
          border-radius: var(--radius);
          padding: 0.3em 0.6em;
        }
        .cart__stepper button {
          background: none;
          border: none;
          color: var(--turmeric);
          font-size: 1.1rem;
          cursor: pointer;
        }
        .cart__total {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-display);
          font-size: 1.3rem;
          font-weight: 600;
          padding: 1rem 0;
          border-top: 1px solid var(--hairline);
          margin-bottom: 1.5rem;
        }
      `}</style>
    </div>
  );
}
