// NOTE: the backend (Module 4) only has a Restaurant Service — there is no
// Menu Service yet, so restaurants don't have real dishes attached to them.
// This file provides placeholder dishes per cuisine so the ordering flow
// (cart -> order-service -> payment-service) can be fully exercised end to end.
//
// When you build a real Menu Service, replace getMenuFor() with an axios
// call like: api.get(`/menu/restaurant/${restaurantId}`) and delete this file.

const MENUS_BY_CUISINE = {
  Indian: [
    { id: "in-1", name: "Paneer Tikka", price: 220, veg: true },
    { id: "in-2", name: "Butter Chicken", price: 320, veg: false },
    { id: "in-3", name: "Dal Makhani", price: 190, veg: true },
    { id: "in-4", name: "Garlic Naan", price: 60, veg: true },
    { id: "in-5", name: "Chicken Biryani", price: 280, veg: false },
  ],
  Chinese: [
    { id: "ch-1", name: "Veg Hakka Noodles", price: 180, veg: true },
    { id: "ch-2", name: "Chilli Chicken", price: 260, veg: false },
    { id: "ch-3", name: "Spring Rolls", price: 150, veg: true },
    { id: "ch-4", name: "Manchurian Gravy", price: 210, veg: true },
  ],
  Italian: [
    { id: "it-1", name: "Margherita Pizza", price: 300, veg: true },
    { id: "it-2", name: "Pasta Alfredo", price: 260, veg: true },
    { id: "it-3", name: "Chicken Lasagna", price: 340, veg: false },
  ],
  default: [
    { id: "df-1", name: "Chef's Special Combo", price: 250, veg: true },
    { id: "df-2", name: "House Salad", price: 140, veg: true },
    { id: "df-3", name: "Grilled Sandwich", price: 160, veg: true },
  ],
};

export function getMenuFor(cuisine) {
  return MENUS_BY_CUISINE[cuisine] || MENUS_BY_CUISINE.default;
}
