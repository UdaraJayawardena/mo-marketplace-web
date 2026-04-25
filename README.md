# MO Marketplace

A full-stack marketplace application built with NestJS and React.

---

## 🚀 Features

### Backend
- JWT Authentication (Register/Login)
- Product management
- Variant system with combination key logic
- Duplicate variant prevention
- DTO validation (class-validator)
- Swagger API documentation

### Frontend
- Product listing page
- Product detail page
- Variant selector system
- Out-of-stock handling
- Quick Buy flow

---

## 🧠 Key Design Decisions

- Variants use `combination_key` to ensure uniqueness
- Attributes stored as JSON for flexibility
- Backend validates all inputs using DTOs
- Frontend handles UX-level validation (disabled options)
- Separation of concerns between products and variants modules

---

## 🛠️ Tech Stack

- NestJS
- TypeORM
- PostgreSQL
- React (Vite)
- Axios
- React Router

---

## ⚙️ Setup Instructions

### Backend
```bash
cd mo-marketplace-api
npm install
npm run start:dev