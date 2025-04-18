# Thanx App

A rewards and redemptions platform built with Ruby on Rails (API/backend) and Next.js (UI/frontend).

---

## Table of Contents
- [Model](#model)
- [API](#api)
- [UI](#ui)
- [Technologies Used](#technologies-used)
- [How to Run](#how-to-run)
- [Next Steps](#next-steps)

---

## Model
The core models of the application are:
- **User**: Can sign up, log in, and redeem rewards. Has a role (admin/user) and a balance of points.
- **Reward**: Represents a redeemable item. Has a title, description, value per unit, and available quantity.
- **Redemption**: Tracks when a user redeems a reward, including the quantity and date.

```
Two users are provided in the database:

- Admin: admin@example.com / password
- User: client@example.com / password
```

---

## API
The backend is a RESTful API built with Ruby on Rails:
- **Authentication**: JWT-based, with endpoints for login, sign up, refresh, and password change.
- **Users**: Admins can manage users. Users can view their own profile.
- **Rewards**: Admins can create rewards. Users can view and redeem rewards.
- **Redemptions**: Users can view their redemption history.

API documentation is auto-generated using Rswag and OpenAPI/Swagger, and available in the repo (`swagger.yaml`).

---

## UI
The frontend is a Next.js app (React):
- **Login/Sign Up**: Users can register and log in. Auth state is managed client-side with JWT.
- **Redemptions Page**: Users can see their redemptions (reward name, date, quantity).
- **Rewards Admin Page**: Admins can create new rewards via a form.
- **Navigation Bar**: Context-aware links (login, sign up, logout, admin links).

API client code is auto-generated from the OpenAPI spec using Orval.

Next was used to provide server side rendering for the UI. This is not required for the application to work, but it is recommended for better performance and SEO.

---

## Technologies Used
- **Backend**: Ruby on Rails, Rswag (Swagger), JWT
- **Frontend**: Next.js (React), TypeScript, Orval, TailwindCSS, Shadcn UI
- **Database**: MySQL
- **Testing**: RSpec, Swagger/OpenAPI

---

## How to Run

### Prerequisites
- Ruby (3.3+ recommended)
- Node.js (18+ recommended)
- npm or yarn

### Setup
1. **Database Setup**
   ```bash
   docker-compose up -d
   ```
2. **Backend (API):**
   ```bash
   cd api
   bundle install
   bin/rails db:setup
   bin/rails s
   ```
3. **API Client Generation:**
   ```bash
   cd ui
   npm install
   npm run orval
   ```
4. **Frontend (UI):**
   ```bash
   cd ui
   npm run dev
   ```
- The API will run on [http://localhost:3000](http://localhost:3000) (default Rails port)
- The API DOCS available at [http://localhost:3000/api/docs](http://localhost:3000/api/docs)
- The UI will run on [http://localhost:3001](http://localhost:3001)

---

## Next Steps
- Add pagination to redemptions and rewards lists
- Improve api documentation witch will improve typing for the UI
- Add reward editing and deletion for admins
- Improve error handling and form validation in the UI
- Add user profile and balance management
- Add tests for UI components
- Add telemetry
---
