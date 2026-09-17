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
        🍔 Tiffin
      </Link>

      {isLoggedIn && (
        <nav className="navbar__links">
          <Link to="/restaurants">Restaurants</Link>
          <Link to="/orders">Your Orders</Link>
          <Link to="/cart" className="navbar__cart">
            🛒 Cart
            {totalCount > 0 && <span className="navbar__cart-count">{totalCount}</span>}
          </Link>
          <button className="btn btn-secondary navbar__logout" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      )}

      <style>{`
        .navbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.2rem 2rem;
          background: var(--white);
          box-shadow: var(--shadow-md);
          max-width: var(--max-width);
          width: 100%;
          margin: 0 auto;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .navbar__brand {
          font-family: var(--font-display);
          font-size: 1.6rem;
          font-weight: 700;
          text-decoration: none;
          color: var(--primary);
          transition: all var(--transition-fast);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .navbar__brand:hover {
          transform: scale(1.05);
        }

        .navbar__links {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .navbar__links a {
          text-decoration: none;
          color: var(--text-dark);
          font-size: 1rem;
          font-weight: 500;
          transition: all var(--transition-fast);
          position: relative;
        }

        .navbar__links a::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--primary);
          transition: width var(--transition-fast);
        }

        .navbar__links a:hover {
          color: var(--primary);
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
          background: var(--primary);
          color: var(--white);
          font-size: 0.65rem;
          font-weight: 700;
          border-radius: 999px;
          padding: 0.25em 0.65em;
          min-width: 1.6em;
          text-align: center;
          animation: slideDown var(--transition-base);
          box-shadow: var(--shadow-sm);
        }

        .navbar__logout {
          padding: 0.6em 1.2em;
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .navbar {
            padding: 1rem 1.5rem;
          }

          .navbar__links {
            gap: 1rem;
          }

          .navbar__brand {
            font-size: 1.3rem;
          }

          .navbar__links a {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </header>
  );
}
