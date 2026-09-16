import { createContext, useContext, useMemo, useState, useEffect } from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "tiffin_cart";

export function CartProvider({ children }) {
  const [restaurantId, setRestaurantId] = useState(null);
  const [restaurantName, setRestaurantName] = useState(null);
  const [items, setItems] = useState([]);

  // Restore cart on reload so a refresh doesn't wipe someone's order mid-checkout.
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setRestaurantId(parsed.restaurantId ?? null);
        setRestaurantName(parsed.restaurantName ?? null);
        setItems(parsed.items ?? []);
      } catch {
        // ignore a corrupted cart in storage
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ restaurantId, restaurantName, items })
    );
  }, [restaurantId, restaurantName, items]);

  function addItem(dish, fromRestaurantId, fromRestaurantName) {
    // Ordering from a new restaurant clears the old cart — mixing dishes
    // from two different kitchens in one order isn't something the
    // backend (or any real food delivery app) supports.
    if (restaurantId && restaurantId !== fromRestaurantId) {
      const confirmSwitch = window.confirm(
        `Your cart has items from ${restaurantName}. Start a new cart for ${fromRestaurantName} instead?`
      );
      if (!confirmSwitch) return;
      setItems([]);
    }

    setRestaurantId(fromRestaurantId);
    setRestaurantName(fromRestaurantName);

    setItems((prev) => {
      const existing = prev.find((i) => i.id === dish.id);
      if (existing) {
        return prev.map((i) =>
          i.id === dish.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...dish, quantity: 1 }];
    });
  }

  function updateQuantity(dishId, quantity) {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.id !== dishId));
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === dishId ? { ...i, quantity } : i))
    );
  }

  function clearCart() {
    setItems([]);
    setRestaurantId(null);
    setRestaurantName(null);
  }

  const totalAmount = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items]
  );

  const totalCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const value = {
    restaurantId,
    restaurantName,
    items,
    addItem,
    updateQuantity,
    clearCart,
    totalAmount,
    totalCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside a CartProvider");
  return ctx;
}
