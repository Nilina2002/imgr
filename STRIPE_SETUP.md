# Stripe Payment Gateway Setup

This guide will help you set up Stripe payment gateway for your text2image MERN application.

## Prerequisites

1. Create a Stripe account at [https://stripe.com](https://stripe.com)
2. Get your API keys from the Stripe Dashboard

## Environment Variables Setup

### Server (.env file in server directory)

Create a `.env` file in the `server` directory with the following variables:

```env
# MongoDB Configuration
MONGODB_URI=your_mongodb_connection_string

# JWT Secret
JWT_SECRET=your_jwt_secret_key

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Server Configuration
PORT=4000
```

### Client (.env file in client directory)

Create a `.env` file in the `client` directory with the following variables:

```env
# Backend URL
VITE_BACKEND_URL=http://localhost:4000

# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

## Stripe Dashboard Setup

1. **Get API Keys:**
   - Go to Stripe Dashboard → Developers → API Keys
   - Copy your Publishable Key and Secret Key
   - Use test keys for development

2. **Set up Webhooks:**
   - Go to Stripe Dashboard → Developers → Webhooks
   - Add endpoint: `http://localhost:4000/api/payment/webhook`
   - Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`
   - Copy the webhook signing secret

3. **Test Cards:**
   - Use Stripe's test card numbers for testing:
     - Success: `4242 4242 4242 4242`
     - Decline: `4000 0000 0000 0002`
   - Any future expiry date and any 3-digit CVC

## Features Implemented

1. **Payment Intent Creation:** Creates Stripe payment intents for secure payments
2. **Credit System:** Automatically adds credits to user accounts after successful payment
3. **Webhook Handling:** Processes payment confirmations via Stripe webhooks
4. **Error Handling:** Comprehensive error handling for payment failures
5. **UI Integration:** Seamless integration with existing BuyCredit page

## API Endpoints

- `POST /api/payment/create-payment-intent` - Create payment intent
- `POST /api/payment/confirm-payment` - Confirm successful payment
- `POST /api/payment/webhook` - Stripe webhook handler

## Security Features

- JWT authentication for payment endpoints
- Stripe webhook signature verification
- Secure client-side payment processing
- Server-side payment confirmation

## Testing

1. Start both server and client
2. Login to your account
3. Go to Buy Credit page
4. Select a plan and complete payment with test card
5. Verify credits are added to your account

## Production Deployment

For production:
1. Use live Stripe keys instead of test keys
2. Update webhook endpoint to your production URL
3. Ensure HTTPS is enabled
4. Set up proper error monitoring
5. Configure webhook retry settings in Stripe Dashboard 