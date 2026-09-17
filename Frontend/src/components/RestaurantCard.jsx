import { Link } from "react-router-dom";

export default function RestaurantCard({ restaurant }) {
  return (
    <Link to={`/restaurants/${restaurant.id}`} className="rcard">
      <div className="rcard__header">
        <div className="rcard__image">🍽️</div>
        <span className={`tag ${restaurant.open === false ? "tag--closed" : "tag--open"}`}>
          {restaurant.open === false ? "Closed" : "Open"}
        </span>
      </div>
      <div className="rcard__content">
        <h3>{restaurant.name}</h3>
        <p className="rcard__meta">
          {restaurant.cuisine} · {restaurant.address}
        </p>
        <div className="rcard__footer">
          <span className="rcard__rating">⭐ {restaurant.rating ?? "—"}</span>
          <span className="rcard__delivery">📍 3-5 mins</span>
        </div>
      </div>

      <style>{`
        .rcard {
          display: block;
          border: none;
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          text-decoration: none;
          color: var(--text-dark);
          transition: all var(--transition-base);
          background: var(--white);
          cursor: pointer;
          position: relative;
          overflow: hidden;
          box-shadow: var(--shadow-sm);
        }

        .rcard::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255, 140, 66, 0), rgba(255, 140, 66, 0.05));
          opacity: 0;
          transition: opacity var(--transition-base);
          pointer-events: none;
        }

        .rcard:hover {
          box-shadow: var(--shadow-lg);
          transform: translateY(-4px);
          border-color: var(--primary);
        }

        .rcard:hover::before {
          opacity: 1;
        }

        .rcard__header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .rcard__image {
          font-size: 2.5rem;
          line-height: 1;
        }

        .rcard__content {
          position: relative;
          z-index: 1;
        }

        .rcard__content h3 {
          margin: 0 0 0.5rem 0;
          font-size: 1.25rem;
          color: var(--text-dark);
        }

        .rcard__meta {
          margin: 0;
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.4;
        }

        .rcard__footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-light);
        }

        .rcard__rating {
          font-weight: 600;
          color: var(--primary);
          font-size: 0.95rem;
        }

        .rcard__delivery {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .tag--open {
          background: rgba(76, 175, 80, 0.1);
          color: var(--success);
          border: 1px solid var(--success);
        }

        .tag--closed {
          background: rgba(255, 68, 68, 0.1);
          color: #ff4444;
          border: 1px solid #ff4444;
        }

        @media (max-width: 768px) {
          .rcard {
            padding: 1.25rem;
          }

          .rcard__image {
            font-size: 2rem;
          }

          .rcard__content h3 {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </Link>
  );
}
