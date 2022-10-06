import React, { useContext, useEffect, useRef } from 'react';
import sample from '../assets/sample.jpg'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const TextMessage = ({ message }) => {

    console.log(message)


    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)
    console.log(data.user)
    console.log(currentUser)


    return (
        <div className={`flex gap-4 ${message.senderId === currentUser.uid && " flex-row-reverse "}`}>
            <div>
                <img src={
                    message.senderId === currentUser.uid
                        ? currentUser.photoURL
                        : data.user.image
                } className='h-[4vh] w-[2vw] rounded-[50%]' />

                <span className='text-slate-500 text-[10px]'>Just now</span>
            </div>
            <div>
                <p className='p-2 bg-slate-300 rounded-r-lg rounded-bl-lg max-w-max'>{message.text}</p>
            </div>



        </div >

    );
}

export default TextMessage;
