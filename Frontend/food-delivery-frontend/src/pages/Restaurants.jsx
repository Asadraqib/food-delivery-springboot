import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    api.get("/restaurants").then((res) => setRestaurants(res.data));
  }, []);

  return (
    <div>
      {restaurants.map((r) => (
        <div key={r.id}>
          <h3>{r.name}</h3>
          <p>{r.cuisine} — ⭐ {r.rating}</p>
        </div>
      ))}
    </div>
  );
}