import express from 'express';
import { createPaymentIntent, confirmPayment, handleWebhook } from '../controllers/paymentController.js';
import userAuth from '../middlewares/auth.js';

const router = express.Router();

// Webhook endpoint (no auth required)
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

// Protected routes
router.post('/create-payment-intent', userAuth, createPaymentIntent);
router.post('/confirm-payment', userAuth, confirmPayment);

export default router; 