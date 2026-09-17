export default function FoodItemCard({ dish, quantityInCart, onAdd, onChangeQuantity }) {
  return (
    <div className="fcard">
      <div className="fcard__info">
        <span className={`fcard__dot ${dish.veg ? "fcard__dot--veg" : "fcard__dot--nonveg"}`} />
        <div>
          <p className="fcard__name">{dish.name}</p>
          <p className="fcard__price">₹{dish.price}</p>
        </div>
      </div>

      {quantityInCart > 0 ? (
        <div className="fcard__stepper">
          <button onClick={() => onChangeQuantity(quantityInCart - 1)} aria-label="Remove one">
            −
          </button>
          <span>{quantityInCart}</span>
          <button onClick={() => onChangeQuantity(quantityInCart + 1)} aria-label="Add one more">
            +
          </button>
        </div>
      ) : (
        <button className="btn btn-primary btn-small" onClick={onAdd}>
          Add
        </button>
      )}

      <style>{`
        .fcard {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 1.25rem;
          border: 1px solid var(--border-light);
          border-radius: var(--radius);
          background: var(--white);
          transition: all var(--transition-fast);
          margin-bottom: 0.75rem;
        }

        .fcard:hover {
          background: rgba(255, 140, 66, 0.02);
          border-color: var(--primary-light);
          box-shadow: var(--shadow-sm);
        }

        .fcard__info {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          flex: 1;
        }

        .fcard__dot {
          width: 12px;
          height: 12px;
          margin-top: 0.35em;
          border: 2px solid;
          flex-shrink: 0;
          border-radius: 50%;
          transition: transform var(--transition-fast);
        }

        .fcard__dot--veg {
          border-color: var(--success);
          background: rgba(76, 175, 80, 0.2);
        }

        .fcard__dot--nonveg {
          border-color: #ff4444;
          background: rgba(255, 68, 68, 0.2);
        }

        .fcard__name {
          margin: 0;
          font-weight: 600;
          font-size: 1rem;
          color: var(--text-dark);
        }

        .fcard__price {
          margin: 0.3em 0 0;
          color: var(--text-muted);
          font-size: 0.85rem;
        }

        .fcard__stepper {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          border: 2px solid var(--primary);
          border-radius: var(--radius-full);
          padding: 0.35em 0.6em;
          background: rgba(255, 140, 66, 0.05);
          transition: all var(--transition-fast);
        }

        .fcard__stepper:hover {
          background: rgba(255, 140, 66, 0.1);
          box-shadow: var(--shadow-xs);
        }

        .fcard__stepper button {
          background: none;
          border: none;
          color: var(--primary);
          font-size: 1.1rem;
          cursor: pointer;
          line-height: 1;
          padding: 0.2em 0.3em;
          transition: all var(--transition-fast);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
        }

        .fcard__stepper button:hover {
          transform: scale(1.2);
          color: var(--primary-dark);
        }

        .fcard__stepper button:active {
          transform: scale(0.95);
        }

        .fcard__stepper span {
          min-width: 1.5em;
          text-align: center;
          font-weight: 600;
          font-size: 0.95rem;
          color: var(--primary);
        }

        @media (max-width: 640px) {
          .fcard {
            flex-wrap: wrap;
          }

          .fcard__info {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
