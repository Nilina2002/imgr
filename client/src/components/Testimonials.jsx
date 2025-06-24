import React from 'react'
import { assets, testimonialsData } from '../assets/assets'

const Testimonials = () => {
    return (
        <div className='flex flex-col items-center justify-center my-20 py-12'>
            <h1 className='text-3xl sm:text-4xl font-semibold'>Customer Testimonials</h1>
            <p className='text-gray-500 mb-12'>What Our Users Are Saying</p>

            <div className='flex flex-wrap gap-6 items-center '>
                {testimonialsData.map((testimonial, index) => (
                    <div key={index} className='max-w-sm p-6 bg-white/20 items-center rounded-lg shadow-md hover:scale-105 transition-transform duration-300 ease-in-out'>
                        <img className='w-16 h-16 rounded-full mb-4' src={testimonial.image} alt={testimonial.name} />
                        <h3 className='text-xl font-semibold mb-2'>{testimonial.name}</h3>
                        <p className='mb-2'>{testimonial.role}</p>
                        <div className='flex mb-4'>
                            {Array(testimonial.stars).fill().map((item, index) => (
                                <img key={index} className='w-5 h-5 mr-1' src={assets.rating_star} alt="Star" />
                            ))}
                        </div>
                        <p className='text-gray-600 text-sm text-center'>{testimonial.text}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Testimonials