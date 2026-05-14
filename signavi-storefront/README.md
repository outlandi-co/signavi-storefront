# Signavi Storefront

Public storefront for `signavi.store`.

## Install

```bash
npm install
npm run dev
```

## Environment

Create `.env`:

```bash
VITE_API_BASE_URL=https://signavi-backend.onrender.com/api
```

## Routes

- `/` Home
- `/store` Store
- `/product/:id` Product detail
- `/checkout` Cart checkout
- `/client-checkout/:id` Payment handoff
- `/success/:id` Payment success
- `/customer-login`
- `/customer-register`
- `/dashboard`
- `/my-orders`
- `/order/:id`
- `/support`

This app intentionally excludes custom quotes, custom invoices, admin, production board, revenue, and admin email tools.
