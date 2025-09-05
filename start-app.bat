@echo off
echo Starting PhishGuard AI Application...
echo.

echo Starting Backend Server on port 5001...
start "Backend Server" cmd /k "cd /d %~dp0 && set PORT=5001 && node server.js"

timeout /t 3 /nobreak > nul

echo Starting Frontend Server on port 3001...
start "Frontend Server" cmd /k "cd /d %~dp0frontend && set PORT=3001 && npm start"

echo.
echo ✅ Both servers are starting...
echo 📱 Frontend will be available at: http://localhost:3001
echo 🔗 Backend API available at: http://localhost:5001/api
echo.
pause