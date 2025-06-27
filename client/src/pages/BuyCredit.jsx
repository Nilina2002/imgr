import React, { useState } from 'react'
import { assets, plans } from '../assets/assets';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import StripePayment from '../components/StripePayment';
import { toast } from 'react-toastify';

const BuyCredit = () => {
    const { user, setCredit } = useContext(AppContext);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const handlePlanSelect = (plan) => {
        if (!user) {
            toast.error('Please login to purchase credits');
            return;
        }
        setSelectedPlan(plan);
        setShowPaymentModal(true);
    };

    const handlePaymentSuccess = (newCreditBalance) => {
        setCredit(newCreditBalance);
        setShowPaymentModal(false);
        setSelectedPlan(null);
    };

    const handlePaymentCancel = () => {
        setShowPaymentModal(false);
        setSelectedPlan(null);
    };

    return (
        <div className='min-h-[80vh] text-center pt-14 mb-10'>
            <button className='border border-r-gray-400 px-10 py-2 rounded-full mb-6'>Our Plans</button>
            <h1 className='text-center text-3xl font-medium mb-6'>Choose the Plan</h1>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-42'>
                {plans.map((item, index) => (
                    <div key={index} className='bg-white/20 shadow-lg rounded-lg p-6 flex flex-col items-center justify-center hover:shadow-xl transition-shadow hover:scale-105 hover:duration-500'>
                        <img src={assets.logo_icon} alt="" />
                        <p className='mt-3 mb-1 font-semibold'>{item.id}</p>
                        <p className='text-sm'>{item.desc}</p>
                        <p className='mt-6'>
                            <span className='text-3xl font-medium'>${item.price} </span>/ {item.credits} credits</p>
                        <button 
                            onClick={() => handlePlanSelect(item)}
                            className='w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52 hover:bg-gray-700 transition-colors'
                        >
                            {user ? 'Purchase' : 'Get Started'}
                        </button>
                    </div>
                ))}
            </div>

            {/* Payment Modal */}
            {showPaymentModal && selectedPlan && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Complete Purchase</h2>
                            <button
                                onClick={handlePaymentCancel}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>
                        
                        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                            <h3 className="font-semibold">{selectedPlan.id} Plan</h3>
                            <p className="text-sm text-gray-600">{selectedPlan.desc}</p>
                            <p className="text-lg font-medium mt-2">
                                ${selectedPlan.price} for {selectedPlan.credits} credits
                            </p>
                        </div>

                        <StripePayment
                            plan={selectedPlan}
                            onSuccess={handlePaymentSuccess}
                            onCancel={handlePaymentCancel}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default BuyCredit