import React from 'react';
import Chat from '../Components/Chat';
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar';

const ChatPage = (props) => {
    console.log(props);
    return (
        <div>
            <Navbar />
            <div className='sm:flex h-[100vh] m-[5rem] mx-auto  w-[80vw] rounded-2xl '>
                <div className='w-[30vw] bg-slate-100 border-r-[1px] border-r-black p-4'>
                    <Sidebar />
                </div>
                <div className='w-[65vw] '>
                    <Chat />
                </div>


            </div>
        </div>
    );
}

export default ChatPage;
