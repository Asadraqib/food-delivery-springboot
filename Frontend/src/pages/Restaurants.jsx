import { useEffect, useState } from "react";
import api from "../api/axios";
import RestaurantCard from "../components/RestaurantCard";

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/restaurants")
      .then((res) => setRestaurants(res.data))
      .catch(() => setError("Couldn't load restaurants. Is restaurant-service running?"))
      .finally(() => setLoading(false));
  }, []);

  const filtered = restaurants.filter((r) => {
    const q = search.toLowerCase();
    return (
      r.name?.toLowerCase().includes(q) || r.cuisine?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="restaurants-page">
      <div className="restaurants-hero">
        <h1>What are you in the mood for?</h1>
        <p>Browse kitchens near you and order in a few taps.</p>
      </div>

      <div className="restaurants-container">
        <div className="restaurants-search-wrapper">
          <input
            type="text"
            placeholder="🔍 Search restaurants or cuisines..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="restaurants__search"
          />
        </div>

        {loading && <div className="state-block">Loading restaurants…</div>}
        {error && <div className="form-error">{error}</div>}

        {!loading && !error && filtered.length === 0 && (
          <div className="state-block">
            No restaurants match your search yet — try a different term, or add
            one through the Restaurant Service API.
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="restaurants__grid">
            {filtered.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </div>
        )}
      </div>

      <style>{`
        .restaurants-page {
          flex: 1;
          width: 100%;
          background: linear-gradient(135deg, var(--bg-gradient-start) 0%, var(--bg-gradient-end) 100%);
          padding: 0;
          display: flex;
          flex-direction: column;
        }

        .restaurants-hero {
          text-align: center;
          padding: 3rem 2rem;
          color: var(--white);
        }

        .restaurants-hero h1 {
          font-size: 2.5rem;
          color: var(--white);
          margin-bottom: 0.5rem;
        }

        .restaurants-hero p {
          color: rgba(255, 255, 255, 0.9);
          font-size: 1.1rem;
          margin: 0;
        }

        .restaurants-container {
          flex: 1;
          max-width: var(--max-width);
          margin: 0 auto;
          width: 100%;
          padding: 2rem;
        }

        .restaurants-search-wrapper {
          display: flex;
          justify-content: center;
          margin-bottom: 2.5rem;
        }

        .restaurants__search {
          width: 100%;
          max-width: 500px;
          background: var(--white);
          border: 2px solid transparent;
          border-radius: var(--radius-full);
          padding: 1.1em 1.5em;
          color: var(--text-dark);
          font-size: 1rem;
          transition: all var(--transition-fast);
          box-shadow: var(--shadow-md);
        }

        .restaurants__search::placeholder {
          color: var(--text-muted);
        }

        .restaurants__search:hover {
          box-shadow: var(--shadow-lg);
        }

        .restaurants__search:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: var(--shadow-lg), 0 0 0 4px rgba(255, 140, 66, 0.1);
        }

        .restaurants__grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
          animation: slideUp var(--transition-slow);
        }

        .state-block {
          background: var(--white);
          border: 2px dashed var(--border-light);
          border-radius: var(--radius-lg);
          padding: 3rem 2rem;
          text-align: center;
          color: var(--text-muted);
          box-shadow: var(--shadow-sm);
        }

        .state-block a {
          color: var(--primary);
          font-weight: 600;
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .restaurants-hero {
            padding: 2rem 1.5rem;
          }

          .restaurants-hero h1 {
            font-size: 1.8rem;
          }

          .restaurants__grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .restaurants-container {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
