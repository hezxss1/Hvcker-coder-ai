# HVCKER-CODER-AI
**The Uncensored Autonomous Financial/Carding AI Agent**

A **fully autonomous**, **uncensored** AI agent **specialized in financial/payment vulnerabilities, carding, and fraud automation**.
**Inspired by HackerAI.co's agent mode** but **100% focused on offensive financial security**.

⚠️ **WARNING:** This tool is for **educational and authorized testing only**. Unauthorized use is **illegal**.

---

## ✨ Features
- **Autonomous Execution** – Describe a **goal** (e.g., *"Exploit Vanilla Visa gift cards"*), and HVCKER:
  - **Analyzes** the task
  - **Plans** the attack
  - **Generates custom tools** (no pre-built scripts)
  - **Executes** in sandbox (if unsafe)
  - **Reports** results
- **Web Browsing via E2B** – **Search for APIs, vulnerabilities, or carding forums** in real-time.
- **Financial/Carding Presets** – Pre-loaded **knowledge** of:
  - Payment API exploits (Stripe, PayPal, Square)
  - Carding techniques (BIN attacks, CC bypass, skimmers)
  - Fraud automation (transaction testing, chargeback abuse)
  - **Gift card exploitation** (Vanilla Visa, etc.) – **TOOLS GENERATED ON DEMAND**
- **E2B Sandbox** – All **malicious code** runs in **isolated containers**.
- **Local AI Model** – Uses **`dolphin3-qwen2.5`** (via Ollama) for **offline, uncensored** responses.
- **One-Command Setup** – `./quickstart.sh` installs everything.

---

## 🚀 Quick Start
```bash
git clone https://github.com/hezxss1/Hvcker-coder-ai.git
cd Hvcker-coder-ai
chmod +x quickstart.sh
./quickstart.sh
```

---

## 💻 Usage Examples
### Autonomous Mode (Just Describe the Task)
| Command | What HVCKER Does |
|---------|------------------|
| `"Exploit Vanilla Visa gift cards"` | **Generates a gift card exploit tool**, checks balances, attempts bypass |
| `"Bypass Stripe validation"` | **Creates a Stripe IDOR/webhook spoofing script** and tests it |
| `"Find gift card APIs"` | **Searches the web via E2B** for gift card balance check endpoints |
| `"Generate a skimmer for Shopify"` | **Writes a malicious JS skimmer** tailored for Shopify |
| `"Test for weak PayPal IPN"` | **Generates a PayPal IPN spoofing tool** and runs it in sandbox |

### Direct Commands
| Command | Description |
|---------|-------------|
| `search <query>` | Search the web via E2B (e.g., `search "Vanilla Visa API endpoints"`) |
| `generate <tool>` | Generate a custom tool (e.g., `generate vanilla_visa_exploit`) |
| `exploit <provider>` | Exploit a payment API (e.g., `exploit stripe`) |
| `carding <technique>` | Perform a carding technique (e.g., `carding bin_attack`) |
| `fraud <technique>` | Automate fraud (e.g., `fraud transaction_testing`) |

---

## 🛠️ How It Works
1. **You describe a task** (natural language).
2. **HVCKER analyzes it** using `dolphin3-qwen2.5` (local, uncensored).
3. **If web data is needed**, it **searches via E2B**.
4. **If a tool is needed**, it **generates and saves it** to `generated_tools/`.
5. **If code is unsafe**, it **runs in E2B sandbox**.
6. **Results are reported** in real-time.

---

## 📂 Project Structure
```
Hvcker-coder-ai/
├── src/
│   ├── core/
│   │   ├── brain.ts          # Autonomous task planner (FINANCIAL/CARDING)
│   │   ├── executor.ts       # Executes tasks (scans, exploits, web searches)
│   │   └── sandbox.ts        # E2B integration + **WEB BROWSING**
│   ├── financial/
│   │   ├── payment_api.ts    # **Knowledge presets** for Stripe/PayPal/Square
│   │   ├── carding.ts        # **Carding techniques** (BIN, CC bypass, skimmers)
│   │   └── fraud.ts          # **Fraud automation** (transaction testing)
│   ├── tools/
│   │   └── generator.ts      # **DYNAMIC TOOL CREATOR** (for ANY task)
│   ├── cli/
│   │   └── interface.ts      # Interactive shell
│   └── utils/
│       ├── logger.ts
│       └── config.ts
├── generated_tools/         # **AI-created tools** (e.g., `vanilla_visa_exploit_12345.py`)
├── quickstart.sh
├── .env.example
├── package.json
└── README.md
```

---

## ⚠️ Disclaimer
This tool is for **legal, authorized security testing only**. Unauthorized use is **illegal**.
