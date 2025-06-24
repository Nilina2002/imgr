import React, { useState } from 'react'
import { assets } from '../assets/assets'

const Login = () => {

    const [state, setState] = useState('Login')

    return (
        <div className='absolute left-0 top-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
            <form className='relative bg-white p-10 rounded-xl text-slate-500' action="">
                <h1 className='text-center text-2xl text-neutral-700'>{state}</h1>
                <p className='text-sm'>Welcome back! Please sign in to continue</p>

                {state !== 'Login' && <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5'>
                    <img src={assets.profile_icon} alt="" width="28" />
                    <input className='outline-none text-sm' type="text" placeholder='Full Name' required />
                </div>}
                <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5'>
                    <img src={assets.email_icon} alt="" width="20" />
                    <input className='outline-none text-sm' type="email" placeholder='   Email' required />
                </div>
                <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5'>
                    <img src={assets.lock_icon} alt="" width="16" />
                    <input className='outline-none text-sm' type="password" placeholder='    Password' required />
                </div>

                <p className='text-xs mt-3 text-blue-500 cursor-pointer'>
                    Forgot Password?
                </p>

                <button className='bg-blue-600 w-full text-white py-2 rounded-full mt-5'>{state == 'Login' ? 'login' : 'create account'}</button>

                {state === 'Login' ? <p className='mt-5 text-center'>Don't have an account? <span className='text-blue-600 cursor-pointer ' onClick={() => setState('Sign Up')}>Sign Up</span></p>
                    :
                    <p className='mt-5 text-center'>Already have an account? <span className='text-blue-600 cursor-pointer'>Login</span></p>}

                <img src={assets.cross_icon} className='absolute top-5 right-5 cursor-pointer' alt="" />
            </form>
        </div>
    )
}

export default Login