import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { toast } from 'react-toastify';

// Load Stripe outside of component to avoid recreating on every render
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ plan, onSuccess, onCancel }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        // Create payment intent when component mounts
        createPaymentIntent();
    }, []);

    const createPaymentIntent = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:4000/api/payment/create-payment-intent',
                {
                    amount: plan.price,
                    planId: plan.id,
                    credits: plan.credits
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            setClientSecret(response.data.clientSecret);
        } catch (error) {
            console.error('Error creating payment intent:', error);
            toast.error('Failed to initialize payment');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (!stripe || !elements || !clientSecret) {
            setLoading(false);
            return;
        }

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            }
        });

        if (error) {
            console.error('Payment error:', error);
            toast.error(error.message || 'Payment failed');
            setLoading(false);
        } else if (paymentIntent.status === 'succeeded') {
            // Confirm payment with backend
            try {
                const token = localStorage.getItem('token');
                const response = await axios.post(
                    'http://localhost:4000/api/payment/confirm-payment',
                    {
                        paymentIntentId: paymentIntent.id
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );

                if (response.data.success) {
                    toast.success(response.data.message);
                    onSuccess(response.data.newCreditBalance);
                }
            } catch (error) {
                console.error('Error confirming payment:', error);
                toast.error('Payment confirmed but failed to update credits');
            }
            setLoading(false);
        }
    };

    const cardElementOptions = {
        style: {
            base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                    color: '#aab7c4',
                },
            },
            invalid: {
                color: '#9e2146',
            },
        },
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Payment Details</h3>
                <p className="text-sm text-gray-600 mb-4">
                    You will be charged ${plan.price} for {plan.credits} credits
                </p>
                <div className="border border-gray-300 rounded-lg p-4">
                    <CardElement options={cardElementOptions} />
                </div>
            </div>
            
            <div className="flex gap-3">
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    disabled={loading}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={!stripe || loading}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {loading ? 'Processing...' : `Pay $${plan.price}`}
                </button>
            </div>
        </form>
    );
};

const StripePayment = ({ plan, onSuccess, onCancel }) => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm plan={plan} onSuccess={onSuccess} onCancel={onCancel} />
        </Elements>
    );
};

export default StripePayment; 