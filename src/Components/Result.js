import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { collection, query, where, getDocs, getDoc, setDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../Firebase/Config';
import { ChatContext } from '../context/ChatContext';

const Result = (props) => {
    const navigate = useNavigate()
    const { dispatch } = useContext(ChatContext)
    const { currentUser } = useContext(AuthContext)
    const handleChat = (e) => {

    }

    const handleSelect = async (u) => {
        //dispatch({ type: "CHANGE_USER", payload: u })
        const combinedId = currentUser.uid > props.user.id ? currentUser.uid + props.user.id : props.user.id + currentUser.uid
        console.log(props.user.id)

        try {
            const res = await getDoc(doc(db, "chats", combinedId));
            if (!res.exists()) {
                //create a chat collection if theres none
                await setDoc(doc(db, "chats", combinedId), { messages: [] });
                //creating of userchat

                await updateDoc(doc(db, "Userchat", currentUser.uid), {
                    [combinedId + ".userInformation"]: {
                        uid: props.user.id,
                        fullname: props.user.fullname,
                        image: props.user.image
                    },
                    [combinedId + ".date"]: serverTimestamp()
                });

                await updateDoc(doc(db, "Userchat", props.user.id), {
                    [combinedId + ".userInformation"]: {
                        uid: currentUser.uid,
                        fullname: currentUser.displayName,
                        image: currentUser.photoURL
                    },
                    [combinedId + ".date"]: serverTimestamp()
                });

            }

        } catch (err) {
            //setErr(true)
        }
        navigate('/chatpage')

    }

    console.log(props)
    return (
        <section className='flex flex-row px-8 sm:mt-[100px]'>
            <section className='text-black text-xl font-semibold w-[350px]  min-h-fit border-2 p-4 my-4 alone  bg-[#fff] opacity-80  rounded-md'>
                <div className='flex justify-between'>
                    <img src={props.user.image} alt='' className='h-20 w-20 rounded-[50%]' />
                    <button onClick={handleSelect} className='px-2 w-20 h-10 rounded-lg hover:text-black hover:bg-white text-white bg-[#3282B8]'>Add</button>
                </div>
                <h1>{props.user.fullname}</h1>
                <h1>{props.user.email}</h1>
                <h1>{props.user.location}</h1>
                <h1>{props.user.occupation}</h1>
                <h1>{props.user.age}</h1>
                <h1>{props.user.gender}</h1>
                <h1>{props.user.info}</h1>
            </section>

        </section>

    );
}

export default Result;
