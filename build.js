#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Building Primorpho for Railway deployment...');

try {
  // Clean previous builds
  console.log('🧹 Cleaning previous builds...');
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
  }

  // Build frontend with Vite
  console.log('🎨 Building frontend...');
  execSync('npx vite build', { stdio: 'inherit' });

  // Build backend with esbuild
  console.log('⚙️ Building backend...');
  execSync('npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist --target=node18', { stdio: 'inherit' });

  // Copy package.json for production dependencies
  console.log('📦 Copying production files...');
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const prodPackageJson = {
    name: packageJson.name,
    version: packageJson.version,
    type: "module",
    scripts: {
      start: "node index.js"
    },
    dependencies: packageJson.dependencies
  };
  
  fs.writeFileSync('dist/package.json', JSON.stringify(prodPackageJson, null, 2));

  console.log('✅ Build completed successfully!');
  console.log('📁 Built files are in the dist/ directory');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}