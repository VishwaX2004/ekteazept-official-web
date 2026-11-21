# Ektazept website

Next.js App Router marketing site migrated from the supplied static reference.

Styling is implemented with Tailwind CSS and shared component utility classes in `src/app/globals.css`.

## Run locally

1. Copy `.env.example` to `.env.local`.
2. Set `NEXT_PUBLIC_SITE_URL`.
3. Configure `MONGODB_URI` before using the enquiry form. The public pages do not require a live database.
4. Run `npm install`, then `npm run dev`.

The enquiry endpoint validates input and stores approved submissions in MongoDB. The database credentials and NextAuth secret remain in `.env` and must not be committed.

## Routes

Public routes include `/`, `/about`, `/team`, `/solutions`, `/products`, `/products/[slug]`, `/pricing`, `/resources`, `/faq`, and `/contact`.

## Admin

Create an administrator:

`npm run create-admin -- <email> <12-character-or-longer-password>`

Open `/admin/login`, then use `/admin` for the dashboard and `/admin/enquiries` for enquiry management.

The NextAuth session uses `AUTH_SECRET`, `NEXTAUTH_URL`, secure credentials, and an administrator-only JWT role.

## Seed

`npm run seed`

This command is idempotent and inserts only approved source records without overwriting existing edited content.

## Environment

Required:
- `MONGODB_URI`
- `MONGODB_DB_NAME`
- `NEXT_PUBLIC_SITE_URL`
- `AUTH_SECRET`
- `NEXTAUTH_URL`

## Launch checklist

- Configure MongoDB persistence and an administrator/authentication provider.
- Confirm official company contact details and legal copy.
- Review product availability and all public claims.
- Confirm the approved logo spelling and final team biographies.
"# ekteazept-official-web" 
