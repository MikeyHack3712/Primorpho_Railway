# Gmail SMTP Troubleshooting Guide

## Current Issue
Error: "Username and Password not accepted" (535-5.7.8)

## Step-by-Step Fix

### 1. Verify 2-Factor Authentication
- Go to https://myaccount.google.com/security
- Ensure "2-Step Verification" is ON
- If not enabled, turn it on first

### 2. Generate New App Password
- Visit: https://myaccount.google.com/apppasswords
- Select "Mail" or "Other (custom name)"
- Copy the 16-character password EXACTLY (no spaces)
- Example format: abcdkqmpqrstuvwx

### 3. Common Issues
- **Wrong password**: Use App Password, not regular Gmail password
- **Spaces in password**: Remove all spaces from 16-character code
- **Account type**: Some Google Workspace accounts need different settings
- **Less secure apps**: Modern Gmail requires App Passwords only

### 4. Alternative Gmail Settings
If standard Gmail service fails, try explicit SMTP settings:
```
Host: smtp.gmail.com
Port: 587 (TLS) or 465 (SSL)
Security: STARTTLS or SSL
```

### 5. Test Commands
After updating credentials, test with:
```bash
node test-gmail.js
```