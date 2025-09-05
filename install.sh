#!/bin/bash

echo "========================================"
echo "   PhishGuard AI Installation Script"
echo "========================================"
echo

echo "Installing backend dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "Failed to install backend dependencies"
    exit 1
fi

echo
echo "Installing frontend dependencies..."
cd frontend
npm install
if [ $? -ne 0 ]; then
    echo "Failed to install frontend dependencies"
    exit 1
fi

echo
echo "Building frontend..."
npm run build
if [ $? -ne 0 ]; then
    echo "Failed to build frontend"
    exit 1
fi

cd ..

echo
echo "========================================"
echo "   Installation Complete!"
echo "========================================"
echo
echo "To start the application:"
echo "  1. npm start (to start the server)"
echo "  2. Open http://localhost:5000 in your browser"
echo
echo "To install the browser extension:"
echo "  1. Open Chrome and go to chrome://extensions/"
echo "  2. Enable Developer mode"
echo "  3. Click 'Load unpacked' and select the browser-extension folder"
echo