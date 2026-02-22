# Backend Setup Instructions

## 1. Install Dependencies
```bash
npm install
# or
pnpm install
```

## 2. Setup Database
```bash
# Generate Prisma client
npm run db:generate

# Push database schema
npm run db:push

# Seed database with initial data
npm run db:seed
```

## 3. Start Development Server
```bash
npm run dev
```

## 4. Test Login Credentials
- Email: admin@example.com
- Password: admin123

## API Endpoints

### Authentication
- POST `/api/auth/login` - User login
- POST `/api/auth/register` - User registration

### Products
- GET `/api/products` - Get all products
- POST `/api/products` - Create product
- GET `/api/products/[id]` - Get single product
- PUT `/api/products/[id]` - Update product
- DELETE `/api/products/[id]` - Delete product

### Categories
- GET `/api/categories` - Get all categories
- POST `/api/categories` - Create category

## Database
- SQLite database file: `prisma/dev.db`
- Database schema: `prisma/schema.prisma`