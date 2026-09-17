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
        <button className="btn btn-outline" onClick={onAdd}>
          Add
        </button>
      )}

      <style>{`
        .fcard {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 1.25rem 0;
          border-bottom: 1px solid var(--hairline);
          transition: background var(--transition-fast);
          margin: 0 -1rem;
          padding: 1.25rem 1rem;
          border-radius: var(--radius-sm);
        }
        .fcard:hover {
          background: rgba(52, 44, 35, 0.5);
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
          border-color: var(--cardamom);
          background: rgba(127, 160, 111, 0.2);
        }
        .fcard__dot--nonveg {
          border-color: var(--chili);
          background: rgba(214, 72, 47, 0.2);
        }
        .fcard__name {
          margin: 0;
          font-weight: 500;
          font-size: 1rem;
        }
        .fcard__price {
          margin: 0.3em 0 0;
          color: var(--paper-muted);
          font-size: 0.85rem;
        }
        .fcard__stepper {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          border: 2px solid var(--turmeric-dim);
          border-radius: var(--radius-sm);
          padding: 0.35em 0.5em;
          background: rgba(240, 169, 59, 0.05);
          transition: all var(--transition-fast);
        }
        .fcard__stepper:hover {
          background: rgba(240, 169, 59, 0.1);
          box-shadow: var(--shadow-xs);
        }
        .fcard__stepper button {
          background: none;
          border: none;
          color: var(--turmeric);
          font-size: 1.1rem;
          cursor: pointer;
          line-height: 1;
          padding: 0.2em 0.3em;
          transition: all var(--transition-fast);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .fcard__stepper button:hover {
          transform: scale(1.2);
          color: #ffb94f;
        }
        .fcard__stepper button:active {
          transform: scale(0.95);
        }
        .fcard__stepper span {
          min-width: 1.5em;
          text-align: center;
          font-weight: 600;
          font-size: 0.95rem;
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
