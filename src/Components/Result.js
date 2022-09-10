import React from 'react';

const Result = (props) => {
    console.log(props)
    return (
        <section className='flex flex-row px-8 sm:mt-[100px]'>
            <section className='text-black text-xl font-semibold w-[350px] h-[40vh] border-2 p-4 my-4 alone border-slate-600 bg-[#fff] opacity-80  rounded-md'>
                <img src={props.user.image} alt='' className='h-20 w-20 rounded-[50%]' />
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
