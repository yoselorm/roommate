import React from 'react';
import getstart from '../assets/getstart.png';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';



const Hero = () => {

    const Imagevariants = {
        hidden: {
            x: '100vw'
        },
        visible: {
            x: 0,
            transition: {
                delay: 1,
                type: 'spring',
                stiffness: 100
            }
        }
    }
    const herovariants = {
        hidden: {
            x: '-100vw'
        },
        visible: {
            x: 0,
            transition: {
                delay: 1,
                type: 'spring',
                stiffness: 100
            }
        }
    }

    const navigate = useNavigate();

    const handlePage = (e) => {
        e.preventDefault();
        navigate('/firstpage');
    }
    return (
        <div className='w-full sm:mt-[7rem] mt-10 max-w-[1240px] mx-auto px-6 text-black grid md:grid-cols-2 '>
            <div className='px-6 text-4xl '>
                <p className='text-black font-bold md:pt-5  md:text-5xl md:ml-2'>Finding a <span className='text-[#3282B8]'>Roommate</span>, <br />Made easy</p>
                <p className=' hidden md:flex text-lg mt-8 md:ml-3'>Tell us what you're looking for and we'll help<br /> find and connect you with your perfect<br /> roommate. Just that simple</p>
                <p className=' md:hidden text-lg mt-8 md:ml-3'>Tell us what you're looking for and we'll help find and connect you with your perfect roommate. Just that simple</p>
                <button onClick={handlePage} className='bg-[#3282B8] p-4 mt-10 px-10 max-w-[200px] rounded-[10px] text-xl font-semibold hidden shadow-xl md:flex text-black hover:bg-blue-200 mb-4'>Get Started</button>
            </div>
            <div className=''>
                <img src={getstart} alt='/' className='h-[30vh] w-[75vw] object-cover max-w-[550px] max-h-[450px]  mt-3 md:h-[50vh] md:w-[85%] mx-auto ' />
            </div>
            <div className='md:ml-6  mb-8 mx-auto md:mt-0 md:hidden '>
                <motion.button onClick={handlePage} variants={herovariants} initial='hidden' animate='visible' className='bg-[#3282B8] p-2 px-8 w-[200px] shadow-xl rounded-[10px] text-xl font-semibold  text-black'>Get Started</motion.button>
            </div>
        </div>
    );
}

export default Hero;
