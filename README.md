# ContractExtract.org

AI-powered contract data extraction SaaS. Users upload PDF or TXT contracts and instantly get structured key data extracted by GPT-4o.

## Revenue Model
- **Free**: 5 extractions/month — converts visitors to users
- **Pro ($29/mo)**: 100 extractions/month — target: freelancers, small law firms
- **Enterprise ($99/mo)**: 1,000 extractions/month — target: legal teams, procurement

## Tech Stack
- **Framework**: Next.js 14 App Router + TypeScript
- **Database**: PostgreSQL via Prisma 7
- **Auth**: NextAuth.js (credentials + Google OAuth)
- **AI**: OpenAI GPT-4o-mini
- **Payments**: Stripe Subscriptions + Webhooks
- **Styling**: Tailwind CSS

## Quick Start

### 1. Fill in `.env`
```
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=<random 32+ chars>
NEXTAUTH_URL=http://localhost:3000
OPENAI_API_KEY=sk-...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRO_MONTHLY_PRICE_ID=price_...
STRIPE_ENTERPRISE_MONTHLY_PRICE_ID=price_...
# Optional Google OAuth:
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
```

### 2. Set up DB & run
```bash
npx prisma migrate dev --name init
npm run dev
```

### 3. Set up Stripe
1. Create two recurring products in Stripe dashboard: Pro ($29/mo) and Enterprise ($99/mo)
2. Copy their Price IDs into `.env`
3. Run `stripe listen --forward-to localhost:3000/api/stripe/webhook` in dev

## Deployment (Vercel + Supabase)
1. Push to GitHub
2. Connect to Vercel — add all env vars
3. Use Supabase or Railway for PostgreSQL
4. Point your Stripe webhook to `https://contractextract.org/api/stripe/webhook`
5. Point DNS for `contractextract.org` to Vercel

## File Structure
```
src/
  app/
    (auth)/login          - Sign in page
    (auth)/register       - Sign up page
    (dashboard)/
      dashboard           - Overview + stats
      extract             - Upload + extraction UI
      history             - Past extractions table
      billing             - Pricing + Stripe portal
    api/
      auth/[...nextauth]  - NextAuth handler
      register            - Email/password signup
      extract             - PDF/TXT parsing + OpenAI
      stripe/checkout     - Create Stripe session
      stripe/portal       - Open billing portal
      stripe/webhook      - Handle Stripe events
  lib/
    prisma.ts             - DB client
    auth.ts               - NextAuth config
    openai.ts             - GPT-4o extraction
    stripe.ts             - Stripe client + plan config
    utils.ts              - Helpers
```
