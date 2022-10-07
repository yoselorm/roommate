import { getAuth, updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { auth, db } from '../Firebase/Config';

const EditModal = (props) => {
    const { currentUser } = useContext(AuthContext)
    const auth = getAuth();
    console.log(props)


    const [editmodal, setEditModal] = useState(false)
    const [deletemodal, setDeleteModal] = useState(false)
    const [confirm, setConfirm] = useState(false)
    const [email, setEmail] = useState(props.item.email);
    const [fullname, setFullname] = useState(props.item.fullname);
    const [age, setAge] = useState(props.item.age);
    const [occupation, setOccupation] = useState(props.item.occupation);
    const [info, setInfo] = useState(props.item.info);
    const [location, setLocation] = useState(props.item.location)

    const navigate = useNavigate()




    const handleUpdate = async (e) => {
        e.preventDefault();
        //const userRef = doc(db, "profile", currentUser.email);

        try {
            await updateProfile(auth.currentUser, {
                displayName: fullname,
                email: email,
            })
            await updateProfile(currentUser, {
                displayName: fullname,
                email: email,
            })
            await updateDoc(doc(db, "profile", currentUser.email), {
                fullname: fullname,
                email: email,
                occupation: occupation,
                age: age,
                info: info,
                location: location

            });
            await updateDoc(doc(db, "UserInfo", currentUser.email), {
                fullname: fullname,
                email: email,
                occupation: occupation,
                age: age,
                location: location,
                info: info,

            });

            setConfirm(!confirm)
        } catch (error) {

        }
    }
    const close = props.close
    const handleClose = (e) => {
        //navigate('/profile')
        setConfirm(!confirm) && close(true)
    }
    console.log(currentUser)
    return (
        <div >
            <div className={!confirm ? 'hidden' : 'flex'}>
                <form className='md:grid flex flex-col max-h-fit'>
                    <label className='font-bold'>Full name: </label>
                    <input type='text' placeholder='Enter Full name' className='bg-transparent border-b-2 border-black focus:outline-none  mb-5 md:mb-5' value={fullname} onChange={(e) => { setFullname(e.target.value) }} />
                    <label className='font-bold'>Email: </label>
                    <input type='email' placeholder='Enter a valid email' className='bg-transparent border-b-2 border-black focus:outline-none  sm:w-[300px]' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    <label className='font-bold mt-4'>Location: </label>
                    <input type='email' placeholder='location' className='bg-transparent border-b-2 border-black focus:outline-none  sm:w-[300px] ' value={location} onChange={(e) => { setLocation(e.target.value) }} />

                    <div className='md:flex md:flex-row mt-7 flex flex-col'>
                        <label className='font-bold'>Age: </label>
                        <input type='number' placeholder='age' className=' w-20 bg-transparent border-b-2 border-black mr-10 focus:outline-none px-2 mb-5 md:mb-0' value={age} onChange={(e) => { setAge(e.target.value) }} />

                        <label className='font-bold'>Occupation: </label>
                        <input type='text' placeholder='Enter occupation' className='bg-transparent border-b-2 border-black focus:outline-none  px-2' value={occupation} onChange={(e) => { setOccupation(e.target.value) }} />
                    </div>
                    <p className='font-bold'>Give a lil info about yourself:</p>
                    <textarea className='border-black border-2 border-solid mb-4 p-2 text-black' rows={4} value={info} onChange={(e) => { setInfo(e.target.value) }}></textarea>
                    <div className='sm:mt-4 mt-2 mb-4'>
                        <button className='bg-black text-[#3282B8] hover:bg-[#3282B8] hover:text-black md:w-[20%] p-2 rounded-md font-bold' onClick={handleUpdate} >Submit</button>

                    </div>
                </form>
            </div>

            <div className={!confirm ? 'flex' : 'hidden'}>
                <div className=' text-black text-md font-semibold w-[300px] h-[20vh] sm:w-[350px] sm:h-[20vh] p-4 sm:my-4 alone opacity-80  rounded-md mx-auto flex flex-col'>
                    <h1 className='text-center '>Update Done</h1>
                    <div className='flex gap-6 justify-center items-center mt-4'>
                        <button className='bg-black text-[#3282B8] hover:bg-[#3282B8] hover:text-white md:w-[20%] p-2 rounded-md font-bold' onClick={handleClose}>OK</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditModal;
