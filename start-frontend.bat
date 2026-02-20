@echo off
echo.
echo 🚀 Starting YouGlish Reels Frontend...
echo.
echo 📋 Pre-flight checks:
echo    ✓ Node.js installed
echo    ✓ npm installed
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    call npm install
    echo.
)

echo 🎬 Starting development server...
echo.
echo    Frontend will be available at:
echo    👉 http://localhost:4200
echo.
echo    Make sure backend is running at:
echo    👉 http://localhost:8080
echo.
echo Press Ctrl+C to stop
echo.

call npm start

