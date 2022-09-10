import React from 'react';
import AnimateComp from '../Components/AnimateComp';
import CreateProfile from '../Components/CreateProfile';
import Navbar from '../Components/Navbar';

const ProfilePage = () => {
    return (
        <div className=' sm:pt-4 sm:px-6 sm:mx-4'>
            <h1 className='text-[#3282B8] font-extrabold md:text-3xl  text-2xl cursor-pointer hover:text-white p-4'>RooMBuddy</h1>
            <AnimateComp>
                <CreateProfile />
            </AnimateComp>

        </div>
    );
}

export default ProfilePage;
