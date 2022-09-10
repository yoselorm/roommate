import React, { useEffect } from 'react';
import { addProfile } from '../Redux/Action';
import { connect, useSelector, useDispatch } from 'react-redux';
import { collection, query, where, onSnapshot, getFirestore } from "firebase/firestore";
import app from '../Firebase/Config';
import Navbar from './Navbar';

const Profile = () => {

    const dispatch = useDispatch();
    const db = getFirestore(app);
    const storedloc = useSelector((state) => state.question);
    console.log(storedloc)
    //let result = storedloc.map(item => item.location);
    let loc = storedloc.find(item => item.email);


    useEffect(() => {
        const getData = async () => {

            try {
                const q = query(collection(db, "UserInfo"), where("email", "==", loc.email));
                onSnapshot(q, (querySnapshot) => {
                    const profile = [];
                    querySnapshot.forEach((doc) => {
                        profile.push(doc.data());
                    });
                    console.log(profile)
                    //console.log("Current cities in CA: ", cities.join(", "));
                    dispatch(addProfile(profile));
                    console.log(profile)
                });

            } catch (error) {

            }
        }
        getData();
    }, [])

    const profile = useSelector((state) => state.profile)
    console.log(profile);

    return (


        <div className=''>
            <Navbar />
            {profile.map((item) => {
                return (
                    <div key={item.id} className='flex flex-col justify-center  mt-[150px]'>
                        <div className='text-black text-md font-semibold w-[300px] h-[40vh] sm:w-[350px] sm:h-[60vh] border-2 p-4 sm:my-4 alone border-slate-600 bg-[#fff] opacity-80  rounded-md mx-auto flex flex-col'>
                            <img src={item.image} alt='' className=' sm:h-[15vh] sm:w-[8vw] h-28 w-28 rounded-[50%] relative bottom-16 mx-auto' />
                            <h1 className='sm:mb-2  '><span className='text-slate-600'>Name:</span>  {item.fullname}</h1>
                            <h1 className='sm:mb-2  '><span className='text-slate-600'>Email:</span>  {item.email}</h1>
                            <h1 className='sm:mb-2  '><span className='text-slate-600'>location:</span>  {item.location}</h1>
                            <h1 className='sm:mb-2  '><span className='text-slate-600'>Occupation: </span> {item.occupation}</h1>
                            <h1 className='sm:mb-2  '><span className='text-slate-600'>Age:</span>  {item.age}</h1>
                            <h1 className='sm:mb-2  '><span className='text-slate-600'>Gender:</span>  {item.gender}</h1>
                            <h1 className='sm:mb-2  '><span className='text-slate-600'>Brief info:</span>  {item.info}</h1>
                        </div>
                        <div className='flex flex-col justify-center mx-auto mt-2 mb-8'>
                            <button className='w-[200px] my-3 bg-[#3282B8] text-white rounded-md text-center py-4 px-8'>Edit</button>
                            <button className='w-[200px] my-3 bg-black text-white rounded-md text-center px-8 py-4'>Delete account</button>
                        </div>

                    </div>

                )
            })}
        </div>
    );
}

export default Profile;
