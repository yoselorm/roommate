import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion'
import { getAuth, signOut } from "firebase/auth";
import { FaUserCog } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { authUser } from '../Redux/Action';


const Navbar = () => {
    const [nav, setNav] = useState(false);
    const navigate = useNavigate();
    const auth = getAuth();
    const dispatch = useDispatch();
    const location = useLocation();


    const handleNav = () => {
        setNav(!nav)

    }
    const logovariants = {
        hidden: {
            x: '-100vw'
        },
        visible: {
            x: 0,
            transition: {
                delay: 0.5,
                duration: 0.5,
                type: 'spring',
                stiffness: 100
            }
        }
    }
    const sidevariants = {
        hidden: {
            x: '-100vw'
        },
        visible: {
            x: 0,
            transition: {
                delay: 0.5,
                duration: 0.5,
                type: 'spring',
                stiffness: 100
            }
        }
    }

    const handlePage = (e) => {
        e.preventDefault();
        console.log('click');
        navigate('/firstpage')
    }

    const handleHome = (e) => {
        e.preventDefault();
        navigate('/home')
    }
    const handleChat = (e) => {
        navigate('/chatpage')
    }
    const toProfileDetails = (e) => {
        e.preventDefault();
        navigate('/userdetails')
    }
    const toProfile = (e) => {
        e.preventDefault();
        navigate('/profile')
    }
    const handleLogout = (e) => {
        e.preventDefault();
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate('/', { replace: true })
            dispatch(authUser(true))
            window.history.replaceState(null, '', '/');


        }).catch((error) => {
            // An error happened.
        });
    }
    return (
        <div className=' flex justify-between px-4 items-center max-w-[1240px] h-24 mx-auto text-black'>
            <h1 variants={logovariants} initial='hidden' animate='visible' className='text-[#3282B8] font-extrabold md:text-4xl  text-2xl cursor-pointer hover:text-black' onClick={handleHome}>RooMBuddy</h1>
            <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} className='md:flex mr-[10rem] hidden mt-2'>
                <li onClick={handleHome} className='mx-4 text-xl  font-semibold hover:text-[#3282B8] cursor-pointer ' >Home</li>
                <li onClick={handleChat} className='mx-4 text-xl  font-semibold hover:text-[#3282B8] cursor-pointer ' >Chat</li>
                <li onClick={toProfileDetails} className='mx-4 text-xl font-semibold hover:text-[#3282B8] cursor-pointer'>Matches</li>
                <li onClick={toProfile} className='mx-4 text-xl font-semibold ml-3 hover:text-[#3282B8] cursor-pointer' ><FaUserCog size={35} /></li>

            </motion.ul>
            <button className='text-black p-2 bg-slate-200 rounded-xl mx-2 font-semibold shadow-xl hover:shadow-2xl hover:text-[#cc3131] cursor-pointer hidden sm:flex' onClick={handleLogout}>Logout</button>
            <div onClick={handleNav} className='md:hidden block'>
                {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
            </div>

            <motion.div variants={sidevariants} initial='hidden' animate='visible' className={nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-gray-800 bg-[#413F42] text-white z-10 ease-in-out duration-500' : 'fixed left-[-100%] '}>
                <h1 className='text-[#3282B8] font-bold text-3xl w-full m-4'>RooMBuddy</h1>
                <ul className=''>
                    <li onClick={handleHome} className='p-4 border-b font-semibold border-gray-500 w-[40%] ml-2 '>Home</li>
                    <li onClick={handleChat} className='p-4 border-b font-semibold border-gray-500 w-[40%] ml-2 '>Chat</li>
                    <li onClick={toProfileDetails} className='p-4 border-b font-semibold border-gray-500 w-[40%] ml-2'>Matches</li>
                    <li onClick={toProfile} className='p-4 ml-4 '><FaUserCog size={30} /></li>
                </ul>
                <button className='p-4 font-bold text-[#3282B8] uppercase text-xl' onClick={handleLogout}>⛔Log out</button>
            </motion.div>
        </div >
    );
}

export default Navbar;
