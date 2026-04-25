// Payment API Knowledge Presets
// This file contains **knowledge presets** for payment APIs.
// The AI uses this to **generate tools dynamically** when needed.

export const PAYMENT_API_KNOWLEDGE = {
  stripe: {
    vulnerabilities: [
      "IDOR (Insecure Direct Object Reference) - Change customer_id in API calls to access other users' data",
      "Webhook Spoofing - Send fake webhook events to trigger unintended actions (refunds, credits)",
      "Coupon Abuse - Reuse or stack coupons for unauthorized discounts",
      "Currency Manipulation - Exploit exchange rate discrepancies by changing currency parameter",
      "Metadata Injection - Inject malicious data in metadata fields for XSS or RCE",
      "API Key Leak - Search for exposed Stripe API keys in client-side code",
      "Rate Limit Bypass - Exploit weak rate limiting on payment endpoints",
    ],
    endpoints: [
      "/v1/charges",
      "/v1/customers",
      "/v1/payment_intents",
      "/v1/webhooks",
      "/v1/invoices",
      "/v1/subscriptions",
    ],
    exploitExamples: [
      "Change customer ID in /v1/charges to access other users' payment data",
      "Send fake webhook with type=invoice.payment_succeeded to credit arbitrary accounts",
      "Use coupon=FREESHIP multiple times in the same transaction",
    ],
  },
  
  paypal: {
    vulnerabilities: [
      "IPN Spoofing - Send fake Instant Payment Notifications to credit accounts",
      "Refund Abuse - Automate refund requests to drain merchant accounts",
      "Express Checkout Bypass - Manipulate amount or currency in checkout flows",
      "Token Theft - Steal PayPal tokens via XSS or MITM attacks",
      "Webhook Replay - Replay legitimate webhook messages to duplicate transactions",
      "Account Takeover - Exploit weak authentication in PayPal API",
    ],
    endpoints: [
      "/v2/payments/payouts",
      "/v2/payments/captures",
      "/v1/notifications/webhooks",
      "/v1/payments/refund",
      "/v1/identity/openidconnect/userinfo",
    ],
    exploitExamples: [
      "Send POST to /v1/notifications/webhooks with fake IPN data",
      "Modify amount value in Express Checkout to pay less than intended",
      "Replay captured webhook messages to process duplicate refunds",
    ],
  },
  
  square: {
    vulnerabilities: [
      "Card Nonce Reuse - Reuse card nonces to process unauthorized payments",
      "Location Spoofing - Change location_id to process payments in different regions",
      "Catalog Manipulation - Exploit weak validation in product catalogs",
      "Webhook Tampering - Modify webhook payloads to change transaction details",
      "OAuth Bypass - Exploit weak OAuth implementation to access other merchants' data",
    ],
    endpoints: [
      "/v2/payments",
      "/v2/cards",
      "/v2/locations",
      "/v2/catalog",
      "/v2/webhooks",
    ],
    exploitExamples: [
      "Reuse a card nonce in /v2/payments to charge the same card multiple times",
      "Change location_id parameter to process payments in a different country",
      "Modify catalog object prices via API to pay less for items",
    ],
  },
  
  // Generic gift card knowledge (for Vanilla Visa and others)
  gift_cards: {
    vulnerabilities: [
      "Weak Validation - Some systems only check the first 6 digits (BIN)",
      "No CVV Required - Many online merchants don't require CVV for gift cards",
      "Reusable Codes - Some gift card systems allow code reuse",
      "Balance API Abuse - Unprotected balance check endpoints can be enumerated",
      "Brute Force - Sequential or pattern-based card numbers can be guessed",
      "BIN Attacks - Generate valid card numbers using known BIN ranges",
    ],
    knownBins: {
      vanilla_visa: [
        '402682', '440067', '453201', '453202', '455607', '455664',
        '465945', '478564', '480164', '484451', '491748', '491754',
        '504705', '510008', '511464', '513551', '518616', '520049',
        '520082', '528806', '530139', '530929', '533574', '537978',
        '541325', '544110', '545183', '545961', '550095', '550668',
        '552853', '553406', '554172', '554443', '555507', '555555'
      ],
      visa: ['4'],
      mastercard: ['51', '52', '53', '54', '55'],
      amex: ['34', '37'],
      discover: ['6011', '65'],
    },
    exploitExamples: [
      "Generate valid card numbers using Luhn algorithm with Vanilla Visa BINs",
      "Brute force balance check API with generated card numbers",
      "Exploit weak validation to reuse gift card codes",
      "Bypass activation requirements by manipulating API parameters",
    ],
  },
};
