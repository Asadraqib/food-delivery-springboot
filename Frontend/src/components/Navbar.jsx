import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { totalCount } = useCart();
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    navigate("/login");
  }

  return (
    <header className="navbar">
      <Link to="/restaurants" className="navbar__brand">
        Tiffin
      </Link>

      {isLoggedIn && (
        <nav className="navbar__links">
          <Link to="/restaurants">Restaurants</Link>
          <Link to="/orders">Your orders</Link>
          <Link to="/cart" className="navbar__cart">
            Cart
            {totalCount > 0 && <span className="navbar__cart-count">{totalCount}</span>}
          </Link>
          <button className="btn btn-outline navbar__logout" onClick={handleLogout}>
            Log out
          </button>
        </nav>
      )}

      <style>{`
        .navbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.1rem 1.5rem;
          border-bottom: 1px solid var(--hairline);
          max-width: var(--max-width);
          width: 100%;
          margin: 0 auto;
        }
        .navbar__brand {
          font-family: var(--font-display);
          font-size: 1.4rem;
          font-weight: 700;
          text-decoration: none;
          color: var(--paper);
        }
        .navbar__links {
          display: flex;
          align-items: center;
          gap: 1.4rem;
        }
        .navbar__links a {
          text-decoration: none;
          color: var(--paper-muted);
          font-size: 0.95rem;
        }
        .navbar__links a:hover {
          color: var(--paper);
        }
        .navbar__cart {
          position: relative;
        }
        .navbar__cart-count {
          background: var(--chili);
          color: var(--paper);
          font-size: 0.7rem;
          font-weight: 700;
          border-radius: 999px;
          padding: 0.05em 0.45em;
          margin-left: 0.4em;
        }
        .navbar__logout {
          padding: 0.4em 0.9em;
          font-size: 0.85rem;
        }
      `}</style>
    </header>
  );
}
