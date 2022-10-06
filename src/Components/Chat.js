import React, { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';
import Input from './Input';
import Messages from './Messages';
import { VscAccount } from "react-icons/vsc";

const Chat = () => {
    const { data } = useContext(ChatContext)
    console.log(data.user)

    return (
        <div >
            <div className='bg-[#3282B8] w-full h-[50px] p-4 flex gap-2 '>
                <span ><img src={data.user?.image} className='h-12 w-12 rounded-[50%] border-[1px] border-[#000]' alt='' /></span>
                <span >{data.user?.fullname}</span>
            </div>
            <div className='text-black overflow-y-scroll p-4'>
                <Messages />
                <Input />
            </div>
        </div>
    );
}

export default Chat;
