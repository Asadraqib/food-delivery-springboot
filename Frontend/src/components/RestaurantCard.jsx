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
          border: 2px solid var(--hairline);
          border-radius: var(--radius);
          padding: 1.5rem;
          text-decoration: none;
          color: var(--paper);
          transition: all var(--transition-base);
          background: var(--surface);
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .rcard::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(240, 169, 59, 0), rgba(240, 169, 59, 0.05));
          opacity: 0;
          transition: opacity var(--transition-base);
          pointer-events: none;
        }
        .rcard:hover {
          border-color: var(--turmeric);
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }
        .rcard:hover::before {
          opacity: 1;
        }
        .rcard__top {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }
        .rcard__top h2 {
          margin: 0;
          font-size: 1.25rem;
          flex: 1;
        }
        .rcard__meta {
          margin: 0;
          font-size: 0.9rem;
          color: var(--paper-muted);
          line-height: 1.4;
        }
        .rcard__rating {
          margin: 0.75rem 0 0;
          color: var(--turmeric);
          font-weight: 600;
          font-size: 0.95rem;
        }
        .tag--closed {
          color: #ff9884;
          border-color: var(--chili);
          background: rgba(214, 72, 47, 0.1);
        }
        @media (max-width: 640px) {
          .rcard {
            padding: 1.25rem;
          }
          .rcard__top h2 {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </Link>
  );
}
