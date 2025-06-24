#!/bin/bash

echo "🚀 Preparing Primorpho for Railway deployment..."

# Make build script executable
chmod +x build.js

# Run the build
echo "📦 Building application..."
node build.js

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📁 Files ready for Railway deployment in dist/ directory"
    echo ""
    echo "🔧 Railway Configuration:"
    echo "Build Command: node build.js"
    echo "Start Command: node railway-start.js"
    echo ""
    echo "📋 Next steps:"
    echo "1. Upload this entire project to Railway"
    echo "2. Add PostgreSQL service"
    echo "3. Set environment variables from railway-secrets.txt"
    echo "4. Deploy!"
else
    echo "❌ Build failed!"
    exit 1
fi