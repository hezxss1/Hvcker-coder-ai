#!/bin/bash

# HVCKER-CODER-AI Quick Start Script
echo "💳 Setting up HVCKER-CODER-AI (Financial/Carding AI Agent)..."

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Installing..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Check for npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm not found. Installing..."
    sudo apt-get install -y npm
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check for Ollama
if ! command -v ollama &> /dev/null; then
    echo "❌ Ollama not found. Installing..."
    curl -fsSL https://ollama.ai/install.sh | sh
fi

# Pull dolphin3-qwen2.5
echo "🤖 Pulling dolphin3-qwen2.5 model (uncensored)..."
ollama pull dolphin3-qwen2.5

# Check for E2B API key
if [ -z "$E2B_API_KEY" ]; then
    read -p "🔑 Enter your E2B API key (or press Enter to skip sandbox/web features): " e2b_key
    if [ -n "$e2b_key" ]; then
        echo "E2B_API_KEY=$e2b_key" >> .env
        echo "✅ E2B configured."
    else
        echo "⚠️  E2B not configured. Sandbox and web browsing disabled."
    fi
fi

# Create generated_tools directory
mkdir -p generated_tools

# Start the CLI
echo "✅ Setup complete! Starting HVCKER-CODER-AI..."
npm start
