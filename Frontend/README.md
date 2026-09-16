# Tiffin — frontend

The complete React + Vite frontend for the food delivery microservices
project, wired to the API Gateway from Module 7.

## Pages included

- **Login / Register** — calls `auth-service` through the gateway
- **Restaurants** — lists all restaurants from `restaurant-service`, with search
- **Restaurant menu** — shows dishes and lets you build a cart
- **Cart / Checkout** — creates a Razorpay order via `payment-service`, opens
  the Razorpay popup, verifies the payment, then saves the order in
  `order-service`
- **Order history** — all past orders for the logged-in user
- **Order tracking** — live status for one order, polling every 8 seconds

A shared cart (React Context + localStorage) and a route guard
(`ProtectedRoute`) that redirects to `/login` if there's no token tie
everything together, matching the JWT flow from Module 9 and the Bonus
JWT-verification module.

## One important limitation

The backend never got a **Menu Service** (Module 4 only built
`restaurant-service`, which has no dishes attached to a restaurant). So
`src/api/menuData.js` provides a small set of **placeholder dishes** per
cuisine, purely so the full cart → payment → order flow can be exercised
end to end. Replace `getMenuFor()` in that file with a real API call once
you build a Menu Service — every other page is already wired to your real
backend.

## Setup

```bash
npm install
cp .env.example .env
```

Edit `.env`:
- `VITE_API_BASE_URL` — your gateway address (`http://localhost:8888` locally,
  or your Render URL after Module 10)
- `VITE_RAZORPAY_KEY_ID` — your Razorpay **test** Key ID from Module 6

```bash
npm run dev
```

## Before it'll fully work

1. All 5 backend services + gateway must be running (or deployed)
2. `api-gateway`'s `CorsConfig.java` must allow your frontend's origin
   (`http://localhost:5173` for local dev — already covered in Module 9)
3. Register a test user, then log in
