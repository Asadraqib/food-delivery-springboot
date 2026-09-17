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
    <div className="page">
      <h1>What are you in the mood for?</h1>
      <p>Browse kitchens near you and order in a few taps.</p>

      <input
        type="text"
        placeholder="Search restaurants or cuisines"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="restaurants__search"
      />

      {loading && <div className="state-block">Loading restaurants…</div>}
      {error && <div className="form-error">{error}</div>}

      {!loading && !error && filtered.length === 0 && (
        <div className="state-block">
          No restaurants match your search yet — try a different term, or add
          one through the Restaurant Service API.
        </div>
      )}

      <div className="restaurants__grid">
        {filtered.map((r) => (
          <RestaurantCard key={r.id} restaurant={r} />
        ))}
      </div>

      <style>{`
        .restaurants__search {
          width: 100%;
          max-width: 420px;
          background: var(--surface);
          border: 2px solid var(--hairline);
          border-radius: var(--radius-sm);
          padding: 0.9em 1.1em;
          color: var(--paper);
          margin-bottom: 2.5rem;
          font-size: 1rem;
          transition: all var(--transition-fast);
        }
        .restaurants__search::placeholder {
          color: rgba(185, 171, 150, 0.6);
        }
        .restaurants__search:hover {
          border-color: rgba(185, 171, 150, 0.3);
        }
        .restaurants__search:focus {
          outline: none;
          border-color: var(--turmeric);
          background-color: rgba(52, 44, 35, 0.8);
          box-shadow: 0 0 0 3px rgba(240, 169, 59, 0.1);
        }
        .restaurants__grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
          animation: slideUp var(--transition-slow);
        }
        @media (max-width: 768px) {
          .restaurants__grid {
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
            gap: 1rem;
          }
        }
        @media (max-width: 640px) {
          .restaurants__grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .restaurants__search {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
