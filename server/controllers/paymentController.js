import Stripe from 'stripe';
import User from '../models/userModel.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create payment intent
export const createPaymentIntent = async (req, res) => {
    try {
        const { amount, planId, credits } = req.body;
        const userId = req.userId;

        if (!amount || !planId || !credits) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Create payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Convert to cents
            currency: 'usd',
            metadata: {
                userId: userId,
                planId: planId,
                credits: credits
            }
        });

        res.json({
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id
        });
    } catch (error) {
        console.error('Payment intent creation error:', error);
        res.status(500).json({ error: 'Failed to create payment intent' });
    }
};

// Handle successful payment
export const confirmPayment = async (req, res) => {
    try {
        const { paymentIntentId } = req.body;
        const userId = req.userId;

        // Retrieve payment intent from Stripe
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        if (paymentIntent.status === 'succeeded') {
            // Update user credits
            const creditsToAdd = parseInt(paymentIntent.metadata.credits);
            const user = await User.findByIdAndUpdate(
                userId,
                { $inc: { creditBalance: creditsToAdd } },
                { new: true }
            );

            res.json({
                success: true,
                message: 'Payment successful! Credits added to your account.',
                newCreditBalance: user.creditBalance
            });
        } else {
            res.status(400).json({ error: 'Payment not completed' });
        }
    } catch (error) {
        console.error('Payment confirmation error:', error);
        res.status(500).json({ error: 'Failed to confirm payment' });
    }
};

// Stripe webhook handler
export const handleWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            console.log('Payment succeeded:', paymentIntent.id);
            
            // Update user credits
            try {
                const userId = paymentIntent.metadata.userId;
                const creditsToAdd = parseInt(paymentIntent.metadata.credits);
                
                await User.findByIdAndUpdate(
                    userId,
                    { $inc: { creditBalance: creditsToAdd } }
                );
                
                console.log(`Added ${creditsToAdd} credits to user ${userId}`);
            } catch (error) {
                console.error('Error updating user credits:', error);
            }
            break;
            
        case 'payment_intent.payment_failed':
            const failedPayment = event.data.object;
            console.log('Payment failed:', failedPayment.id);
            break;
            
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
}; 