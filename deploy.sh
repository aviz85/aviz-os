#!/bin/bash

# Build the project
echo "Building project..."
npm run build

# Check if netlify-cli is installed
if ! command -v netlify &> /dev/null
then
    echo "netlify-cli not found. Installing..."
    npm install -g netlify-cli
fi

# Deploy to Netlify
echo "Deploying to Netlify..."
netlify deploy --prod

echo "Deployment complete!" 