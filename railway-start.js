#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

// Set production environment
process.env.NODE_ENV = 'production';
process.env.PORT = process.env.PORT || '5000';

console.log('🚀 Starting Primorpho on Railway...');
console.log(`Port: ${process.env.PORT}`);
console.log(`Environment: ${process.env.NODE_ENV}`);

// Start the application
const app = spawn('node', ['dist/index.js'], {
  stdio: 'inherit',
  env: process.env
});

app.on('close', (code) => {
  console.log(`Application exited with code ${code}`);
  process.exit(code);
});

app.on('error', (error) => {
  console.error('Failed to start application:', error);
  process.exit(1);
});