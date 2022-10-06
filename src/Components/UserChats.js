import React, { useState, useEffect, useContext } from 'react';
import sample from '../assets/sample.jpg';
import { onSnapshot, doc } from "firebase/firestore";
import { db } from '../Firebase/Config';

import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const UserChats = () => {
    const [chats, setChats] = useState([])
    const { currentUser } = useContext(AuthContext)
    const { dispatch } = useContext(ChatContext)
    console.log(currentUser)

    useEffect(() => {

        const getChats = () => {
            const unsub = onSnapshot(doc(db, "Userchat", currentUser.uid), (doc) => {
                setChats(doc.data());
            });
            return () => {
                unsub();
            };
        }
        currentUser.uid && getChats()
    }, [currentUser.uid]);

    console.log(chats)

    const handleSelect = (u) => {
        dispatch({ type: "CHANGE_USER", payload: u })
    }

    return (
        <div>
            <h1>Select user to chat</h1>
            {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
                <div className='p-2 flex items-center gap-3 hover:bg-[#AEBDCA] border-b-[1px] cursor-pointer' key={chat[0]} onClick={() => handleSelect(chat[1].userInformation)}>

                    <img src={chat[1].userInformation.image} className='w-[4vw] h-[7vh] rounded-[50%] object-cover' />
                    <div>
                        <span>{chat[1].userInformation.fullname}</span>
                        <p className='text-sm '>{chat[1].lastMessage?.text}</p>
                    </div>
                </div>
            ))}

        </div>
        // <div>
        //     <div className='p-2 flex items-center gap-3 hover:bg-slate-100 border-b-[1px]' >
        //         <img src={sample} className='w-[5vw] h-[5vh] rounded-[50%] object-cover' />
        //         <div>
        //             <span>name</span>
        //             <p className='text-sm '>hello</p>
        //         </div>
        //     </div>
        // </div>
    );
}

export default UserChats;
