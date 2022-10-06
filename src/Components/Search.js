import React, { useContext } from 'react';
import { useState } from 'react';
import sample from '../assets/sample.jpg';
import { collection, query, where, getDocs, getDoc, setDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../Firebase/Config';
import { AuthContext } from '../context/AuthContext';
import finalPropsSelectorFactory from 'react-redux/es/connect/selectorFactory';
import UserChats from './UserChats';
import { ChatContext } from '../context/ChatContext';




const Search = () => {

    const [username, setUsername] = useState('')
    const [user, setUser] = useState(null)
    const [err, setErr] = useState(false)
    const { currentUser } = useContext(AuthContext)
    const { dispatch } = useContext(ChatContext)

    const handleSearch = async () => {
        const q = query(
            collection(db, "profile"), where("email", "==", username)
        );
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data())
            });
        } catch (err) {
            setErr(true)
        }

    }
    console.log(currentUser)
    console.log(user)

    const handleSelect = async (u) => {
        //dispatch({ type: "CHANGE_USER", payload: u })
        const combinedId = currentUser.uid > user.id ? currentUser.uid + user.id : user.id + currentUser.uid
        console.log(user.id)

        try {
            const res = await getDoc(doc(db, "chats", combinedId));
            if (!res.exists()) {
                //create a chat collection if theres none
                await setDoc(doc(db, "chats", combinedId), { messages: [] });
                //creating of userchat

                await updateDoc(doc(db, "Userchat", currentUser.uid), {
                    [combinedId + ".userInformation"]: {
                        uid: user.id,
                        fullname: user.fullname,
                        image: user.image
                    },
                    [combinedId + ".date"]: serverTimestamp()
                });

                await updateDoc(doc(db, "Userchat", user.id), {
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
        setUser(null)
        setUsername('')
        console.log(currentUser);
    }
    const handleKey = (e) => {
        e.code === "Enter" && handleSearch()
    }
    return (
        <div>
            <div>
                <input type='text' className='border-b-black p-2 text-black border-b-[1px] bg-slate-100 mb-3' placeholder='find user with email' onChange={(e) => { setUsername(e.target.value) }} onKeyDown={handleKey} value={username} /><br />
                {err && <span className='text-black'>User not found</span>}

            </div>
            {user && <div className='p-2 flex items-center gap-3 hover:bg-slate-100 border-b-[1px]' onClick={handleSelect}>
                <img src={user.image} className='w-[5vw] h-[5vh] rounded-[50%] object-cover' />
                <div>
                    <span>{user.fullname}</span>
                </div>
            </div>}
        </div>
    );
}

export default Search;
