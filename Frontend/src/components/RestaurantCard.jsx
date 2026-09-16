import { Link } from "react-router-dom";

export default function RestaurantCard({ restaurant }) {
  return (
    <Link to={`/restaurants/${restaurant.id}`} className="rcard">
      <div className="rcard__top">
        <h2>{restaurant.name}</h2>
        <span className={`tag ${restaurant.open === false ? "tag--closed" : ""}`}>
          {restaurant.open === false ? "Closed" : "Open"}
        </span>
      </div>
      <p className="rcard__meta">
        {restaurant.cuisine} · {restaurant.address}
      </p>
      <p className="rcard__rating">★ {restaurant.rating ?? "—"}</p>

      <style>{`
        .rcard {
          display: block;
          border: 1px solid var(--hairline);
          border-radius: var(--radius);
          padding: 1.25rem;
          text-decoration: none;
          color: var(--paper);
          transition: border-color 0.15s ease;
        }
        .rcard:hover {
          border-color: var(--turmeric-dim);
        }
        .rcard__top {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 0.75rem;
        }
        .rcard__top h2 {
          margin: 0;
          font-size: 1.15rem;
        }
        .rcard__meta {
          margin: 0.4em 0 0;
          font-size: 0.9rem;
        }
        .rcard__rating {
          margin: 0.6em 0 0;
          color: var(--turmeric);
          font-weight: 600;
        }
        .tag--closed {
          color: var(--chili);
          border-color: var(--chili);
        }
      `}</style>
    </Link>
  );
}
