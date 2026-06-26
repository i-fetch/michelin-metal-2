# Mechelin Metals — Product Management System

## Stack
- Next.js 16 App Router + TypeScript
- MongoDB Atlas + Mongoose
- Auth.js (NextAuth) v5 — Credentials + JWT
- Cloudinary — image uploads
- Tailwind CSS (existing design system)

---

## Folder Structure

```
app/
  admin/
    login/page.tsx          ← admin login
    layout.tsx              ← protected admin shell + sidebar
    dashboard/page.tsx      ← stats overview
    products/
      page.tsx              ← product table
      create/page.tsx       ← create form
      edit/[id]/page.tsx    ← edit form
  products/
    page.tsx                ← public catalogue (DB-powered)
    [slug]/page.tsx         ← dynamic product detail page
actions/
  products.ts               ← all server actions (CRUD + auth)
components/
  admin/
    Sidebar.tsx
    ProductForm.tsx
    DeleteButton.tsx
lib/
  db.ts                     ← MongoDB connection (cached)
  cloudinary.ts             ← upload helper
models/
  Admin.ts
  Product.ts
middleware.ts               ← route protection
auth.ts                     ← NextAuth config
types/index.ts
scripts/
  seed-admin.ts
```

---

## Setup

### 1. Install dependencies

```bash
npm install next-auth@beta bcryptjs mongoose cloudinary
npm install -D @types/bcryptjs tsx dotenv
```

### 2. Configure environment variables

```bash
cp .env.example .env.local
# Fill in all values in .env.local
```

### 3. Seed the admin user

```bash
npx tsx scripts/seed-admin.ts
```

### 4. Run development server

```bash
npm run dev
```

---

## Routes

| URL | Description |
|-----|-------------|
| `/products` | Public product catalogue (DB) |
| `/products/[slug]` | Dynamic product detail page |
| `/admin/login` | Admin sign-in |
| `/admin/dashboard` | Stats overview |
| `/admin/products` | Product table (CRUD) |
| `/admin/products/create` | Add new product |
| `/admin/products/edit/[id]` | Edit existing product |

---

## How It Works

### Creating a product (admin)
1. Go to `/admin/products/create`
2. Fill in title, description, specs (one per line), image
3. Submit → image uploads to Cloudinary, product saved to MongoDB
4. `/products` and `/products/[slug]` revalidate automatically

### Public products page
- Server Component — fetches from MongoDB on each request (`force-dynamic`)
- Product cards are now `<Link>` to `/products/[slug]`

### Auth
- `middleware.ts` protects all `/admin/*` routes (except `/admin/login`)
- JWT session strategy — no DB session table needed
- `requireAdmin()` in server actions provides double-check at the action level

---

## Deployment

### Vercel (recommended)
```bash
vercel deploy
```
Set all env vars in the Vercel dashboard under Project → Settings → Environment Variables.

### Self-hosted
```bash
npm run build
npm start
```
Products MODERN FILTER UI
      {/* ================= MODERN FILTER UI ================= */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="mx-auto max-w-7xl px-4 py-10 space-y-8">

          {/* Header */}
          <div className="flex justify-between border-b pb-4">
            <div>
              <h2 className="text-3xl font-bold tracking-wide">Product Explorer</h2>
              <p className="text-sm text-gray-500">Search and filter materials</p>
            </div>

            <div className="text-sm text-gray-500">
              Showing {filtered.length} / {products.length}
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

            {/* Sidebar */}
            <div className="space-y-4">

              {/* Search */}
              <div className="p-4 border rounded-xl bg-white">
                <div className="flex items-center gap-2 mb-2">
                  <Search size={14} />
                  <span className="text-xs font-semibold">Search</span>
                </div>

                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border px-3 py-2 text-xs rounded-lg"
                  placeholder="Search products..."
                />
              </div>

              {/* Category */}
              <div className="p-4 border rounded-xl bg-white">
                <div className="flex items-center gap-2 mb-2">
                  <Filter size={14} />
                  <span className="text-xs font-semibold">Categories</span>
                </div>

                <button
                  key="all"
                  onClick={() => setSelectedCategorySlug(null)}
                  className="text-xs w-full text-left py-1"
                >
                  All
                </button>

                {CATEGORIES.map((c) => (
                  <button
                    key={c.slug}
                    onClick={() => setSelectedCategorySlug(c.slug)}
                    className="text-xs w-full text-left py-1"
                  >
                    {c.name}
                  </button>
                ))}
              </div>

              {/* Reset */}
              {(searchQuery || selectedCategorySlug) && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategorySlug(null);
                  }}
                  className="w-full py-2 text-xs bg-black text-white rounded-lg flex items-center justify-center gap-2"
                >
                  <RotateCcw size={12} />
                  Reset
                </button>
              )}
            </div>

            {/* Results */}
            <div className="lg:col-span-3 grid md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.length === 0 ? (
                <div className="col-span-full text-center p-10 border rounded-xl">
                  <AlertTriangle className="mx-auto mb-2" />
                  No products found
                </div>
              ) : (
                filtered.map((p) => (
                  <ProductCard
                    key={p._id}
                    product={p}
                    onNavigate={navigate}
                  />
                ))
              )}
            </div>

          </div>
        </div>
      </section>