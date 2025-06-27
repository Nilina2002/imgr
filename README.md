# Text2Image MERN Application with Stripe Payment Gateway

A full-stack MERN application that generates images from text descriptions using AI, with integrated Stripe payment gateway for credit purchases.

## Features

- **AI Image Generation**: Convert text descriptions into high-quality images
- **User Authentication**: Secure login/registration system
- **Credit System**: Purchase credits to generate images
- **Stripe Payment Gateway**: Secure payment processing for credit purchases
- **Responsive Design**: Modern UI with Tailwind CSS
- **Real-time Updates**: Instant credit balance updates after payments

## Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- React Router
- Axios
- Stripe.js
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Stripe API
- bcrypt

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB database
- Stripe account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd text2image-MERN
   ```

2. **Install dependencies**
   ```bash
   # Install server dependencies
   cd server
   npm install
   
   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Environment Setup**

   Create `.env` file in `server` directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   PORT=4000
   ```

   Create `.env` file in `client` directory:
   ```env
   VITE_BACKEND_URL=http://localhost:4000
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
   ```

4. **Start the application**
   ```bash
   # Start server (from server directory)
   npm run server
   
   # Start client (from client directory)
   npm run dev
   ```

## Stripe Integration

### Setup
1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the Stripe Dashboard
3. Set up webhooks for payment confirmation

### Features
- Secure payment processing with Stripe Elements
- Automatic credit addition after successful payment
- Webhook handling for payment confirmations
- Comprehensive error handling

### Testing
Use Stripe's test card numbers:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`

## API Endpoints

### Authentication
- `POST /api/user/register` - User registration
- `POST /api/user/login` - User login
- `GET /api/user/credits` - Get user credits

### Image Generation
- `POST /api/image/generate-image` - Generate image from text

### Payments
- `POST /api/payment/create-payment-intent` - Create Stripe payment intent
- `POST /api/payment/confirm-payment` - Confirm successful payment
- `POST /api/payment/webhook` - Stripe webhook handler

## Project Structure

```
text2image-MERN/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context
│   │   └── assets/        # Static assets
│   └── package.json
├── server/                # Node.js backend
│   ├── controllers/       # Route controllers
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middlewares/      # Custom middlewares
│   └── package.json
└── README.md
```

## Usage

1. **Register/Login**: Create an account or login to existing account
2. **Buy Credits**: Navigate to the pricing page to purchase credits
3. **Generate Images**: Use your credits to generate images from text descriptions
4. **Download**: Save and share your generated images

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Stripe webhook signature verification
- Secure payment processing
- Input validation and sanitization

## Deployment

### Frontend (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder

### Backend (Heroku/Railway)
1. Set environment variables
2. Deploy the server directory
3. Update webhook endpoints in Stripe Dashboard

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please refer to the [Stripe Setup Guide](STRIPE_SETUP.md) for detailed configuration instructions. 