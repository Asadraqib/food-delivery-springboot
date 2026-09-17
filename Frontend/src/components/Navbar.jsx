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
          padding: 1rem 1.5rem;
          border-bottom: 2px solid var(--hairline);
          max-width: var(--max-width);
          width: 100%;
          margin: 0 auto;
          background: var(--surface);
          box-shadow: var(--shadow-sm);
          position: sticky;
          top: 0;
          z-index: 100;
          transition: box-shadow var(--transition-fast);
        }
        .navbar:hover {
          box-shadow: var(--shadow-md);
        }
        .navbar__brand {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
          text-decoration: none;
          color: var(--turmeric);
          transition: color var(--transition-fast);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .navbar__brand:hover {
          color: #ffb94f;
        }
        .navbar__links {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        .navbar__links a {
          text-decoration: none;
          color: var(--paper-muted);
          font-size: 0.95rem;
          font-weight: 500;
          transition: color var(--transition-fast);
          position: relative;
          padding-bottom: 0.25rem;
        }
        .navbar__links a:hover {
          color: var(--paper);
        }
        .navbar__links a::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--turmeric);
          transition: width var(--transition-fast);
        }
        .navbar__links a:hover::after {
          width: 100%;
        }
        .navbar__cart {
          position: relative;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .navbar__cart-count {
          background: var(--chili);
          color: var(--paper);
          font-size: 0.65rem;
          font-weight: 700;
          border-radius: 999px;
          padding: 0.2em 0.6em;
          min-width: 1.4em;
          text-align: center;
          animation: slideDown var(--transition-base);
          box-shadow: var(--shadow-sm);
        }
        .navbar__logout {
          padding: 0.5em 1em;
          font-size: 0.85rem;
        }
        @media (max-width: 640px) {
          .navbar {
            padding: 0.8rem 1rem;
          }
          .navbar__links {
            gap: 1rem;
          }
          .navbar__brand {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </header>
  );
}
