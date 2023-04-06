import React from 'react';
import Chat from '../Components/Chat';
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar';

const ChatPage = (props) => {

    return (
        <div>
            <Navbar />
            <div className='md:flex hidden h-[90vh] m-[5rem] alone mx-auto  w-[80vw] rounded-2xl '>
                <div className='w-[30vw] bg-slate-100 border-r-[1px] border-r-black p-4'>
                    <Sidebar />
                </div>
                <div className='w-[60vw] '>
                    <Chat />
                </div>
            </div>
            <div className='flex md:hidden'>
                <h1 className='mx-auto mt-[5rem]'>ACCESS CHAT ON LARGER SCREENS ONLY</h1>
            </div>
        </div>
    );
}

export default ChatPage;
