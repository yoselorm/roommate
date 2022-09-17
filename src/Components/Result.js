import React from 'react';
import { useNavigate } from 'react-router-dom';

const Result = (props) => {
    const navigate = useNavigate()

    const handleChat = (e) => {
        navigate('/chatpage')
    }

    console.log(props)
    return (
        <section className='flex flex-row px-8 sm:mt-[100px]'>
            <section className='text-black text-xl font-semibold w-[350px]  min-h-fit border-2 p-4 my-4 alone  bg-[#fff] opacity-80  rounded-md'>
                <div className='flex justify-between'>
                    <img src={props.user.image} alt='' className='h-20 w-20 rounded-[50%]' />
                    <button onClick={handleChat} className='px-2 hidden w-20 h-10 rounded-lg hover:text-black hover:bg-white text-white bg-[#3282B8]'>Chat</button>
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
