# MO Marketplace Web

Frontend application for the MO Marketplace built using React, Vite, and TypeScript. Provides UI for product browsing, variant selection, and a simulated purchase flow.

---

## 🚀 Features

### 🔐 Authentication
- Login UI
- JWT-based session handling
- Protected routes

### 📦 Product Features
- Product listing page
- Product detail page
- Create product page

### 🎨 Variant Selection
- Dynamic attribute-based selection (color, size, etc.)
- Only valid combinations selectable
- Out-of-stock options disabled
- Real-time variant matching

### 🛒 Quick Buy Flow
- Select variant
- Click "Buy Now"
- Simulated purchase confirmation

### ⚠️ Edge Case Handling
- Disable invalid variant combinations
- Disable out-of-stock options
- Basic form validation

---

## 📁 Project Structure

```
src/
├── pages/         # Login, ProductList, ProductDetail, CreateProduct, AddVariants
├── components/    # VariantSelector, Navbar, Layout
├── api/           # Axios client & API functions
├── store/         # Auth state (JWT handling)
└── types/         # Shared TypeScript interfaces
```

---

## ⚙️ Setup Instructions

### 🔧 Prerequisites
- Node.js v20+
- npm v9+

### 🖥️ Installation

```bash
git clone <repo-url>
cd mo-marketplace-web
npm install
```

### ▶️ Run App

```bash
npm run dev
```

App runs at: `http://localhost:5173`

### 🔗 Backend Connection

Ensure the backend is running at:
```
http://localhost:3000
```

---

## 🧠 Key Features Explained

### 1. Variant Selection Logic
- Users select attributes (e.g. color, size)
- System finds matching variant dynamically
- Invalid combinations are disabled

### 2. Out-of-Stock Handling
- Variants with `stock = 0` are disabled
- UI reflects unavailable options clearly

### 3. Quick Buy Flow
- Simulates purchase without payment integration
- Displays success message upon purchase

### 4. Protected Routes
- Users must log in to access product pages
- JWT stored and used for API calls

---

## 🌐 Live API
**Base URL:** https://mo-marketplace-mzk52up4b-udara43socialnet-8858s-projects.vercel.app

## 🔐 Sample Login Credentials

| Field    | Value            |
|----------|------------------|
| Email    | udara1@gmail.com |
| Password | udara@1          |

## 👨‍💻 Author

**Udara Jayawardena**