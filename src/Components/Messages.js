import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../Firebase/Config';
import React, { useContext, useState, useEffect } from 'react';
import { ChatContext } from '../context/ChatContext';
import sample from "../assets/sample.jpg"
import TextMessage from './TextMessage';
import { AuthContext } from '../context/AuthContext';

const Messages = (props) => {
    const [messages, setMessages] = useState([])
    const { data } = useContext(ChatContext)
    const { currentUser } = useContext(AuthContext)

    console.log(data)

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages)
        })

        return () => {
            unsub()
        }
    }, [data.chatId]);
    console.log(messages)
    return (

        <div>
            {messages.map((item) => {
                return (
                    <div key={item.id}>
                        <TextMessage message={item} />
                    </div>
                )
            })}
        </div>


    );
}

export default Messages;
