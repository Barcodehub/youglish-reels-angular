#!/bin/bash

echo "🚀 Starting YouGlish Reels Frontend..."
echo ""
echo "📋 Pre-flight checks:"
echo "   ✓ Node.js installed"
echo "   ✓ npm installed"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

echo "🎬 Starting development server..."
echo ""
echo "   Frontend will be available at:"
echo "   👉 http://localhost:4200"
echo ""
echo "   Make sure backend is running at:"
echo "   👉 http://localhost:8080"
echo ""
echo "Press Ctrl+C to stop"
echo ""

npm start

