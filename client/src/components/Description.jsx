import React from 'react'
import { assets } from '../assets/assets'

const Description = () => {
    return (
        <div className='flex flex-col items-center justify-center my-24 p-6 md:px-28'>
            <h1 className='text-3xl sm:text-4xl font-semibold'>Create AI images</h1>
            <p className='text-gray-500 mb-8'>Turn your imagination into visuals</p>

            <div>
                <img className='w-80 xl:w-96 rounded-lg ' src={assets.sample_img_1} alt="" />
                <div>
                    <h2>Introducing the AI-Powered Text to Image Generator</h2>
                </div>
            </div>
        </div>
    )
}

export default Description