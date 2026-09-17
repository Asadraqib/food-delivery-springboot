import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { getMenuFor } from "../api/menuData";
import { useCart } from "../context/CartContext";
import FoodItemCard from "../components/FoodItemCard";

export default function RestaurantMenu() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [error, setError] = useState("");
  const { items, addItem, updateQuantity, totalCount } = useCart();

  useEffect(() => {
    api
      .get(`/restaurants/${id}`)
      .then((res) => setRestaurant(res.data))
      .catch(() => setError("Couldn't load this restaurant."));
  }, [id]);

  if (error) return <div className="page state-block">{error}</div>;
  if (!restaurant) return <div className="page state-block">Loading menu…</div>;

  const menu = getMenuFor(restaurant.cuisine);

  function quantityOf(dishId) {
    return items.find((i) => i.id === dishId)?.quantity ?? 0;
  }

  return (
    <div className="page">
      <Link to="/restaurants" className="menu__back">
        ← All restaurants
      </Link>
      <h1>{restaurant.name}</h1>
      <p>
        {restaurant.cuisine} · {restaurant.address} · ★ {restaurant.rating ?? "—"}
      </p>

      <div className="menu__list">
        {menu.map((dish) => (
          <FoodItemCard
            key={dish.id}
            dish={dish}
            quantityInCart={quantityOf(dish.id)}
            onAdd={() => addItem(dish, restaurant.id, restaurant.name)}
            onChangeQuantity={(q) => updateQuantity(dish.id, q)}
          />
        ))}
      </div>

      {totalCount > 0 && (
        <button className="btn btn-primary menu__cart-bar" onClick={() => navigate("/cart")}>
          View cart · {totalCount} item{totalCount > 1 ? "s" : ""}
        </button>
      )}

      <style>{`
        .menu__back {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
          color: var(--paper-muted);
          text-decoration: none;
          transition: all var(--transition-fast);
          font-weight: 500;
        }
        .menu__back:hover {
          color: var(--turmeric);
          margin-left: -0.25rem;
        }
        .menu__list {
          margin-top: 2rem;
          max-width: 600px;
          padding: 1.5rem;
          background: var(--surface);
          border-radius: var(--radius);
          border: 1px solid var(--hairline);
        }
        .menu__cart-bar {
          position: fixed;
          bottom: 1.5rem;
          left: 50%;
          transform: translateX(-50%);
          box-shadow: var(--shadow-lg);
          animation: slideUp var(--transition-base);
          z-index: 50;
          padding: 1em 2em;
        }
        .menu__cart-bar:hover {
          transform: translateX(-50%) translateY(-2px);
          box-shadow: var(--shadow-xl);
        }
        @media (max-width: 640px) {
          .menu__list {
            padding: 1rem;
          }
          .menu__cart-bar {
            left: 1.5rem;
            right: 1.5rem;
            transform: none;
          }
          .menu__cart-bar:hover {
            transform: translateY(-2px);
          }
        }
      `}</style>
    </div>
  );
}
