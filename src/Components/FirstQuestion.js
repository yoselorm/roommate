import React, { useContext, useEffect, useState } from 'react';
import locationImage from '../assets/location.gif';
import { useNavigate } from 'react-router-dom';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { addQuestion } from '../Redux/Action';
import { connect, useSelector, useDispatch } from "react-redux";
import { collection, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { AuthContext } from '../context/AuthContext';
import { db } from '../Firebase/Config';


const FirstQuestion = (props) => {
    const [location, setLocation] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext)



    const handleToSecondPage = async (e) => {
        e.preventDefault();
        //const firstAns = location;
        navigate('/secondpage');
        try {
            await updateDoc(doc(db, "profile", currentUser.email), { location: location });
            await updateDoc(doc(db, "UserInfo", currentUser.email), { location: location });


        } catch (error) {
            console.log(error)
        }
        dispatch(addQuestion({ location: location }));
    }

    const handlePrev = (e) => {
        e.preventDefault();
        navigate('/home')
    }



    return (
        <div className=' grid md:grid-cols-2 p-6'>

            <div className='mt-10'>
                <p className='text-black font-bold md:mt-[6rem]  md:text-4xl md:ml-2'>What part of Ghana are you looking for a roomate?</p>
                <input type='text' className='mt-24 bg-transparent border-slate-900 border-b-[1px] md:w-[80%] w-[100%] md:mb-20 focus:outline-none' value={location} onChange={(e) => { setLocation(e.target.value) }} placeholder='Type here' />
                <div className=' justify-between mt-10 mb-10 hidden md:flex'>
                    <button className='bg-[#3282B8]  p-4 rounded-md text-black font-bold w-40 hover:bg-blue-200' onClick={handlePrev}>Previous</button>
                    <button className='bg-[#3282B8]  p-4 rounded-md text-black font-bold w-40 hover:bg-blue-200' onClick={handleToSecondPage}>Next</button>
                </div>

            </div>
            <div className='mt-12 md:mt-8'>
                <img src={locationImage} alt='/' className='h-[35vh] w-[78vw] logo md:mt-1 mt-3 md:h-[60vh] md:w-[85%] mx-auto ' />
            </div>
            <div className='flex md:hidden justify-between mt-10 mb-10 md:mb-3 ]'>
                <button className='bg-[#3282B8]  p-4 rounded-md text-black font-bold max-w-[100px] hover:bg-blue-200' onClick={handlePrev}>Previous</button>
                <button className='bg-[#3282B8] md:hidden p-4 rounded-md text-black font-bold w-[100px] hover:bg-blue-200' onClick={handleToSecondPage}>Next</button>
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
