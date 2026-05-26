# SignaVi Storefront

Premade product storefront for SignaVi. This project keeps the SignaVi Studio dark UI style, customer accounts, admin dashboard, order history, fulfillment board, revenue tracking, shipping status, cart, and checkout flow.

## What this starter includes

- Public storefront for premade items
- Product detail pages
- Cart and checkout flow
- Customer order history
- Admin dashboard
- Product manager starter
- Order fulfillment board
- Revenue dashboard
- Shipping dashboard
- Same dark SignaVi UI direction
- No custom quote estimator or quote approval flow

## Run locally

```bash
npm install
npm run dev
```

## Push to GitHub

```bash
git init
git add .
git commit -m "Initial SignaVi Storefront"
git branch -M main
git remote add origin https://github.com/outlandi-co/signavi-storefront.git
git push -u origin main
```

## Backend connection later

Set this in `.env` when ready:

```bash
VITE_API_URL=https://signavi-backend.onrender.com/api
```

For now, the app uses local starter data so you can build the UI first.
