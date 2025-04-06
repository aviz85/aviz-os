# Setting Up GitHub Integration with Netlify

This guide walks you through connecting your GitHub repository to Netlify for continuous deployment.

## Prerequisites

1. Your project code pushed to a GitHub repository
2. A Netlify account (you can sign up for free at [netlify.com](https://netlify.com))
3. Supabase project setup and running

## Steps

### 1. Push Your Code to GitHub

Make sure your latest code is pushed to GitHub:

```bash
git add .
git commit -m "Prepare for Netlify deployment"
git push
```

### 2. Connect Netlify to GitHub

1. Log in to your Netlify account
2. Click "New site from Git"
3. Select "GitHub" as your Git provider
4. Authorize Netlify to access your GitHub account
5. Select your repository from the list

### 3. Configure Build Settings

In the Netlify deployment settings:

1. Set **Branch to deploy**: `main` (or your default branch)
2. Set **Build command**: `npm run build`
3. Set **Publish directory**: `dist`

### 4. Set Environment Variables

1. Go to **Site settings** > **Environment variables**
2. Add the following variables:
   - Key: `VITE_SUPABASE_URL` Value: `https://uhcdnhymjushmbksbupo.supabase.co`
   - Key: `VITE_SUPABASE_ANON_KEY` Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVoY2RuaHltanVzaG1ia3NidXBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5MDY3NTMsImV4cCI6MjA1OTQ4Mjc1M30.BU6RR-ZAa4rvb4ejxhROncsEfW000Vn7DBhqdVmyMMk`

### 5. Deploy Your Site

1. Click "Deploy site"
2. Wait for the build and deployment to complete
3. Your site will be live at a Netlify-generated URL (e.g., `your-site-name.netlify.app`)

### 6. Set Up Custom Domain (Optional)

1. Go to **Domain management** in your site settings
2. Click "Add custom domain"
3. Follow the instructions to configure your domain with Netlify

### 7. Enable Automatic Deployments

By default, Netlify will automatically deploy your site whenever you push changes to your GitHub repository. To ensure this is enabled:

1. Go to **Site settings** > **Build & deploy** > **Continuous deployment**
2. Make sure "Auto publish" is turned on

## Troubleshooting

### Database Issues

If you encounter database-related issues after deployment:

1. Check the browser console for any Supabase connection errors
2. Verify your environment variables are set correctly in Netlify
3. Ensure your Supabase database has the required tables set up
4. If needed, manually run the setup SQL script in the Supabase dashboard

### Build Failures

If your build fails:

1. Go to **Deploys** in Netlify
2. Click on the failed deploy
3. Click "View summary" to see the build logs
4. Look for errors in the build process
5. Make necessary adjustments to your code or build configuration

### Routing Issues

If pages aren't loading properly:

1. Ensure your `_redirects` file is in the `public` directory
2. Verify the redirects configuration in `netlify.toml`
3. Check that your React Router setup is correct for production 