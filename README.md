# AvizOS Portal

Modern web portal for Aviz OS clients, built with React, Vite, and Supabase.

## Features

- Client personal area with project tracking
- Real-time project updates
- Task management
- Client notes and communication history
- Responsive design for all devices

## Local Development

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

## Database Setup

The application uses Supabase as its database. To set up the database:

1. Log into your Supabase project dashboard
2. Open the SQL Editor
3. Copy the SQL from `src/utils/database-setup.sql`
4. Run the SQL script to create all required tables and demo data

## Deployment to Netlify

### Method 1: Using the provided script

The easiest way to deploy is using the included deployment script:

```bash
./deploy.sh
```

This will:
1. Build the project
2. Install netlify-cli if needed
3. Deploy to Netlify

### Method 2: Manual deployment

1. Build the project:
   ```
   npm run build
   ```

2. Deploy using the Netlify CLI:
   ```
   netlify deploy --prod
   ```

### Method 3: GitHub Integration

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Set build command to `npm run build`
4. Set publish directory to `dist`
5. Add the following environment variables:
   - `VITE_SUPABASE_URL` = your Supabase URL
   - `VITE_SUPABASE_ANON_KEY` = your Supabase anonymous key

## Environment Variables

In production, make sure these environment variables are set in Netlify:

- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key
