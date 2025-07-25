import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets' // Adjust the path as necessary
import { AppContext } from '../context/AppContext'

const Navbar = () => {
    const { user, setShowLogin, logOut, credit } = useContext(AppContext);
    const navigate = useNavigate();
    return (
        <div className='flex items-center justify-between py-4'>
            <Link to={'/'}>
                <img src={assets.logo} alt="" className='w-28 sm:w-32 lg:w-40' />
            </Link>

            <div>
                {user ?
                    <div className='flex gap-2 sm:gap-5 items-center'>
                        <button onClick={() => navigate('/buy-credit')} className='flex items-center gap-2 bg-blue-100 px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-300'>
                            <img className='w-5' src={assets.credit_star} alt="" />
                            <p className='text-sm sm:text-xm font-medium text-gray-600'>Credits Left: {credit}</p>
                        </button>
                        <p className='text-gray-600 max-sm:hidden pl-4'>Hi, {user.name}!</p>
                        <div className='relative group'>
                            <img className='w-10 drop-shadow' src={assets.profile_icon} alt="" />
                            <div className='absolute hidden group-hover:block top-0 right-0 text-black rounded pt-12'>
                                <ul className='list-none m-0 p-2 bg-gray-50 rounded-lg text-sm'>
                                    <li onClick={logOut} className='py-1 px-2 cursor-pointer pr-10 hover:bg-gray-200 rounded-lg'>Logout</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    :
                    <div className='flex items-center gap-2 sm:gap-5'>
                        <p onClick={() => navigate('/buy-credit')} className='cursor-pointer'>Pricing</p>
                        <button className='cursor-pointer bg-zinc-800 text-white px-7 py-2 text-sm sm:px-10 rounded-full' onClick={() => setShowLogin(true)}>Login</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default Navbar