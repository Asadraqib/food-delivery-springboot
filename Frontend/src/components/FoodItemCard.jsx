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
          padding: 1rem 0;
          border-bottom: 1px solid var(--hairline);
        }
        .fcard__info {
          display: flex;
          align-items: flex-start;
          gap: 0.7rem;
        }
        .fcard__dot {
          width: 10px;
          height: 10px;
          margin-top: 0.4em;
          border: 1.5px solid;
          flex-shrink: 0;
        }
        .fcard__dot--veg {
          border-color: var(--cardamom);
        }
        .fcard__dot--nonveg {
          border-color: var(--chili);
        }
        .fcard__name {
          margin: 0;
          font-weight: 500;
        }
        .fcard__price {
          margin: 0.2em 0 0;
          color: var(--paper-muted);
          font-size: 0.9rem;
        }
        .fcard__stepper {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          border: 1px solid var(--turmeric-dim);
          border-radius: var(--radius);
          padding: 0.3em 0.6em;
        }
        .fcard__stepper button {
          background: none;
          border: none;
          color: var(--turmeric);
          font-size: 1.1rem;
          cursor: pointer;
          line-height: 1;
        }
      `}</style>
    </div>
  );
}
