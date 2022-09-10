import React, { useState } from 'react';
import locationImage from '../assets/location.gif';
import { useNavigate } from 'react-router-dom';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { addQuestion } from '../Redux/Action';
import { connect, useSelector, useDispatch } from "react-redux";


const FirstQuestion = (props) => {
    const [location, setLocation] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleToSecondPage = (e) => {
        e.preventDefault();
        //const firstAns = location;
        navigate('/secondpage');

        dispatch(addQuestion({ location: location }));
    }

    const handlePrev = (e) => {
        e.preventDefault();
        navigate('/home')
    }


    return (
        <div className='text-white grid md:grid-cols-2 p-6'>

            <div className='mt-10'>
                <p className='text-white font-bold md:mt-5  md:text-4xl md:ml-2'>What part of Ghana are you looking for a roomate?</p>
                <input type='text' className='mt-20 bg-transparent border-b-[1px] md:w-[80%] w-[100%] md:mb-20 focus:outline-none' value={location} onChange={(e) => { setLocation(e.target.value) }} placeholder='Type here' />
                <div className=' justify-between mt-10 mb-10 hidden md:flex'>
                    <button className='bg-[#3282B8]  p-4 rounded-md text-black font-bold w-40 hover:bg-white' onClick={handlePrev}>Previous</button>
                    <button className='bg-[#3282B8]  p-4 rounded-md text-black font-bold w-40 hover:bg-white' onClick={handleToSecondPage}>Next</button>
                </div>

            </div>
            <div className='mt-12 md:mt-8'>
                <img src={locationImage} alt='/' className='h-[35vh] w-[78vw] logo md:mt-1 mt-3 md:h-[60vh] md:w-[85%] mx-auto ' />
            </div>
            <div className='flex md:hidden justify-between mt-10 mb-10 md:mb-3 ]'>
                <button className='bg-[#3282B8]  p-4 rounded-md text-black font-bold w-40 hover:bg-white' onClick={handlePrev}>Previous</button>
                <button className='bg-[#3282B8] md:hidden p-4 rounded-md text-black font-bold w-40 hover:bg-white' onClick={handleToSecondPage}>Next</button>
            </div>




        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        state: state.question,
    };
};

const mapDispatchToProps = {
    addQuestion
}

export default connect(mapStateToProps, mapDispatchToProps)(FirstQuestion);
