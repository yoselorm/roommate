import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { db } from '../Firebase/Config';
import { v4 as uuid } from "uuid";
import { async, uuidv4 } from '@firebase/util';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';

const Input = () => {
    const [text, setText] = useState('');
    const [img, setImg] = useState(null);
    //const [err, setErr] = useState(false)

    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)
    console.log(data)

    const handleSend = async () => {
        if (img) {
            const storage = getStorage();
            const storageRef = ref(storage, 'images/' + img.name);
            const uploadTask = uploadBytesResumable(storageRef, img);

            uploadTask.on(
                (error) => {
                    //  setErr(true);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateDoc(doc(db, "chats", data.chatId), {
                            messages: arrayUnion({
                                id: uuidv4(),
                                text,
                                senderId: currentUser.uid,
                                date: Timestamp.now(),
                                img: downloadURL,
                            })
                        })
                    });
                }
            );


        } else {
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                    id: uuidv4(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                })
            })
        }


        await updateDoc(doc(db, "Userchat", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
                text
            },
            [data.chatId + ".date"]: serverTimestamp()
        });
        await updateDoc(doc(db, "Userchat", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
                text
            },
            [data.chatId + ".date"]: serverTimestamp()
        });
        setText('')
    }
    return (
        <div className='text-black h-10 absolute top-[755px]  flex items-center '>
            <input className='border-2 p-2 rounded-xl h-[8vh] border-slate-600 w-[40vw] mr-6' type='text' onChange={(e) => { setText(e.target.value) }} value={text} />

            {/* <input
                type="file"
                id="file"
                onChange={(e) => setImg(e.target.files[0])}
            /> */}
            <div>
                <button className='sm:p-2 bg-slate-500  text-md rounded-2xl w-[100px] hover:bg-[#ADDDD0]' onClick={handleSend}>Send</button>
            </div>
        </div>
    );
}

export default Input;
