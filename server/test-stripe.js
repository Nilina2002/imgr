import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function testStripeConnection() {
    try {
        console.log('Testing Stripe connection...');
        
        // Test creating a payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 1000, // $10.00
            currency: 'usd',
            metadata: {
                test: 'true'
            }
        });
        
        console.log('✅ Stripe connection successful!');
        console.log('Payment Intent ID:', paymentIntent.id);
        console.log('Client Secret:', paymentIntent.client_secret.substring(0, 20) + '...');
        
    } catch (error) {
        console.error('❌ Stripe connection failed:', error.message);
        console.log('\nMake sure you have set up your STRIPE_SECRET_KEY in the .env file');
    }
}

testStripeConnection(); 