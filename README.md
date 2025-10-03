# Clothing Store Frontend

## 🛍️ Next.js 14 E-commerce Frontend cho ứng dụng bán quần áo

### 📋 Tính năng
- ✅ Responsive design với Tailwind CSS
- ✅ Product listing với pagination
- ✅ Product detail pages
- ✅ Create/Edit/Delete products
- ✅ Search và filter
- ✅ Loading states
- ✅ Error handling
- ✅ TypeScript support

### 🛠️ Tech Stack
- **Next.js 14** - React framework với App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Axios** - HTTP client
- **React 18** - UI library

### 🚀 Quick Start

#### Development
```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Update API URL in .env.local
NEXT_PUBLIC_API_URL=http://localhost:7000/api

# Run development server
npm run dev
```

#### Production Build
```bash
# Build for production
npm run build

# Start production server
npm start
```

### 🌐 Deployment

#### Vercel (Khuyến nghị)
```bash
# Deploy to Vercel
npx vercel

# Or install CLI
npm i -g vercel
vercel
```

#### Netlify
```bash
# Build project
npm run build

# Drag 'out' folder to Netlify
# Or connect GitHub repository
```

#### GitHub Pages
```bash
# Deploy to GitHub Pages
npm run deploy
```

### 🔧 Configuration

#### Environment Variables
```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:7000/api
NEXT_PUBLIC_APP_NAME=Clothing Store
NEXT_PUBLIC_APP_VERSION=1.0.0
```

#### API Integration
```typescript
// services/productService.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7000/api'
```

### 📱 Pages & Components

#### Pages
- `/` - Homepage với product listing
- `/products/new` - Create new product
- `/products/[id]` - Product detail
- `/products/[id]/edit` - Edit product

#### Components
- `ProductCard` - Product display card
- `ProductForm` - Create/Edit form
- `SearchBar` - Search functionality
- `Pagination` - Page navigation
- `LoadingSpinner` - Loading indicator
- `Navigation` - Main navigation

### 🎨 Styling

#### Tailwind CSS
```css
/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### Custom Components
```typescript
// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {products.map(product => (
    <ProductCard key={product.id} product={product} />
  ))}
</div>
```

### 🔒 Security Features
- Security headers
- XSS protection
- Content type validation
- CORS configuration

### 📊 Performance
- Image optimization
- Code splitting
- Lazy loading
- Bundle optimization

### 🧪 Development

#### Available Scripts
```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint
npm run export       # Static export
npm run deploy       # Deploy to GitHub Pages
npm run analyze      # Bundle analysis
```

#### TypeScript
```typescript
// types/Product.ts
export interface Product {
  id: number
  name: string
  description: string
  price: number
  imageUrl?: string
  createdAt: string
  updatedAt: string
}
```

### 🚀 Deployment URLs

#### Development
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:7000`

#### Production
- Frontend: `https://your-frontend-domain.com`
- Backend: `https://your-backend-api.com`

### 🤝 Contributing
1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

### 📄 License
MIT License
