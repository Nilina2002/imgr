import express from 'express';
import { createPaymentIntent, confirmPayment, handleWebhook } from '../controllers/paymentController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

// Webhook endpoint (no auth required)
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

// Protected routes
router.post('/create-payment-intent', protect, createPaymentIntent);
router.post('/confirm-payment', protect, confirmPayment);

export default router; 