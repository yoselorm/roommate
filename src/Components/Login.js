import React, { useState } from 'react';
import login from '../assets/login.png';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { addDetails, addProfile, authUser } from '../Redux/Action';
import { useDispatch } from 'react-redux';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import { MdOutlineVisibility } from 'react-icons/md';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../Firebase/Config';




const Login = (props) => {
    console.log()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [toggle, setToggle] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = getAuth();
    const [err, setErr] = useState(false)

    const handleVisibility = (e) => {
        e.preventDefault();
        setToggle(!toggle)
    }

    const handleSignUp = (e) => {
        e.preventDefault();
        navigate('/profilepage')
    }


    const handleLogin = async (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log('signed in')
                // ...
                navigate('/home', { replace: true })

            })

            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErr(true)
            });
    }
    // const user_email = email;
    // dispatch(addDetails(user_email))



    return (
        <div className='sm:flex sm:flex-row sm:m-10 m-6 sm:justify-between mt-20 sm:mt-[6%]'>
            <div className='text-white sm:w-[70%] sm:h-[50%] sm:ml-[120px] '>
                <h1 className='font-extrabold text-5xl mb-16 text-[#3282B8] '>RooMBuddy</h1>

                <form className='flex flex-col justify-center mt-10 sm:flex sm:max-w-[80%] sm:flex-col bg-[#413F42] p-6 sm:pl-16 rounded-2xl'>
                    <h1 className='font-bold text-3xl mb-8  '>Login</h1>
                    <p className='font-semibold text-xl text-gray-400'>Please sign in to continue</p>
                    {err && <span className='text-[#FF577F]'>Invalid email or password</span>}
                    <label>Email</label>
                    <input value={email} onChange={(e) => { setEmail(e.target.value) }} type='text' className='mt-2 bg-transparent border-b-[1px] sm:w-[80%] w-[100%]  focus:outline-none mb-16 sm:mb-10 p-2'></input>
                    <label>Password</label>
                    <div className='flex flex-row justify-between'>
                        {toggle ?
                            <div className='flex flex-row justify-between border-b-[1px] sm:w-[80%] w-[100%] mb-10 sm:mb-10 p-2'>
                                <input value={password} onChange={(e) => { setPassword(e.target.value) }} type='text' className='mt-2 bg-transparent  focus:outline-none sm:w-[80%] ' />
                                <MdOutlineVisibility onClick={handleVisibility} size={30} />
                            </div> :
                            <div className='flex flex-row justify-between border-b-[1px] sm:w-[80%] w-[100%] mb-10 sm:mb-10 p-2'>
                                <input value={password} onChange={(e) => { setPassword(e.target.value) }} type='password' className='mt-2 bg-transparent  focus:outline-none sm:w-[80%]' />
                                <AiOutlineEyeInvisible onClick={handleVisibility} size={30} />
                            </div>}
                    </div>
                    <div className='flex justify-end sm:flex sm:justify-start'>
                        <button className=' bg-[#3282B8] font-bold w-16 p-2 text-sm rounded-lg text-black sm:hover:bg-blue-200' onClick={handleLogin}>LOGIN</button>
                    </div>

                </form>


                <p className='mt-16 sm:mt-10 text- sm:text-left text-center text-black font-semibold'>Don't have an account? <button className='font-semibold text-[#3282B8] hover:text-black cursor-pointer' onClick={handleSignUp}>Sign up</button></p>
            </div>
            <div className=' hidden sm:flex sm:justify-center mt-16'>
                <img src={login} className='w-[80%] h-[80%] logo ' />
            </div>
        </div>
    );
}

export default Login;
