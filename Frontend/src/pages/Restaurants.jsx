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
          border: 1px solid var(--hairline);
          border-radius: var(--radius);
          padding: 0.7em 0.9em;
          color: var(--paper);
          margin-bottom: 2rem;
        }
        .restaurants__grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 1rem;
        }
      `}</style>
    </div>
  );
}
