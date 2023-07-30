import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ratingImage from '../assets/ratings.png';
import roomie from '../assets/roomie.png';
import { connect, useSelector, useDispatch } from "react-redux";
import { addQuestion, addUser } from '../Redux/Action';
import { v4 as uuidv4 } from 'uuid';
import { getFirestore, doc, setDoc, updateDoc } from "firebase/firestore";
import app from '../Firebase/Config';
import { AuthContext } from '../context/AuthContext';

const ThirdQuestion = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const db = getFirestore(app);

    const storedResults = useSelector((state) => state.question);
    console.log(storedResults)

    //console.log(props)
    const { currentUser } = useContext(AuthContext)
    console.log(currentUser)

    const [cleanliness, setCleanliness] = useState();
    const [cleantoggle, setCleantoggle] = useState(
        {
            oneStar: false,
            twoStar: false,
            threeStar: false,
            fourStar: false,
            fiveStar: false,
        }
    );

    const [noisyness, setNoisyness] = useState();
    const [noisetoggle, setNoisetoggle] = useState(
        {
            oneStar: false,
            twoStar: false,
            threeStar: false,
            fourStar: false,
            fiveStar: false,
        }
    );
    const [timeliness, setTimeliness] = useState();
    const [timetoggle, setTimetoggle] = useState(
        {
            oneStar: false,
            twoStar: false,
            threeStar: false,
            fourStar: false,
            fiveStar: false,
        }
    );

    const [organized, setOrganized] = useState();
    const [organizetoggle, setOrganizetoggle] = useState(
        {
            oneStar: false,
            twoStar: false,
            threeStar: false,
            fourStar: false,
            fiveStar: false,
        }
    );

    const storedloc = useSelector((state) => state.question);





    let avgspecs = '';
    const handlePrev = (e) => {
        e.preventDefault();
        navigate('/secondpage');
    }
    const result = (cleanliness + noisyness + timeliness + organized) / 5;

    const handleDone = async (e) => {
        e.preventDefault();
        if (result < 2.5) {
            avgspecs = 'Good'
        }
        else {
            avgspecs = 'Better'
        }

        dispatch(addQuestion({ Preferred_specs: avgspecs }));

        // const newPerson = {
        //     fullname: storedloc[0].fullname,
        //     image: storedloc[0].image,
        //     email: currentUser.email,
        //     age: storedloc[0].age,
        //     occupation: storedloc[0].occupation,
        //     gender: storedloc[0].gender,
        //     info: storedloc[0].info,
        //     location: storedloc[1].location,
        //     Personal_specs: storedloc[2].Personal_specs,
        //     Preferred_specs: avgspecs,
        //     id: currentUser.uid

        // }

        // dispatch(addQuestion(newPerson))
        // try {
        //     await setDoc(doc(db, "UserInfo", newPerson.email), newPerson);
        // } catch (error) {
        //     console.log(error)
        // }
        try {

            await updateDoc(doc(db, "UserInfo", currentUser.email), { Preferred_specs: avgspecs, });


        } catch (error) {
            console.log(error)
        }

        navigate('/userdetails');

    }



    return (
        <div className=' grid  md:grid-cols-2 p-6'>
            <div className='sm:ml-16 sm:mt-10  p-6 w-[80%] rounded-xl '>
                <p className=' font-bold  md:pt-5 2xl md:text-4xl md:ml-2'>How important are the following in a roommate?</p>
                <p className='mb-5 md:ml-5'>On a scale of 1- 5, with 1 being the lowest and 5 being the highest</p>
                <div className='ml-10 '>
                    <p>Cleanliness</p>
                    <div className='flex'>
                        <button onClick={() => {
                            setCleantoggle({

                                oneStar: true,
                                twoStar: false,
                                threeStar: false,
                                fourStar: false,
                                fiveStar: false,

                            });
                            setCleanliness(1);
                        }} className={cleantoggle.oneStar ? 'bg-[#1C3879] border-solid border-2 p-4 pr-6 w-4 text-center' : 'border- border-black  border-2 p-4 pr-6 w-4 text-center cursor-pointer hover:bg-[#3282B8] '} >1</button>
                        <button onClick={() => {
                            setCleantoggle({

                                oneStar: false,
                                twoStar: true,
                                threeStar: false,
                                fourStar: false,
                                fiveStar: false,

                            })
                            setCleanliness(2);
                        }} className={cleantoggle.twoStar ? 'bg-[#1C3879] border-solid border-2 p-4 pr-6 w-4 text-center' : 'border-solid border-black border-2 p-4 pr-6 w-4 text-center cursor-pointer hover:bg-[#3282B8] '}>2</button>

                        <button onClick={() => {
                            setCleantoggle({

                                oneStar: false,
                                twoStar: false,
                                threeStar: true,
                                fourStar: false,
                                fiveStar: false,

                            })
                            setCleanliness(3);
                        }} className={cleantoggle.threeStar ? 'bg-[#1C3879] border-solid border-2 p-4 pr-6 w-4 text-center' : 'border-solid border-black border-2 p-4 pr-6 w-4 text-center cursor-pointer hover:bg-[#3282B8] '}>3</button>
                        <button onClick={() => {
                            setCleantoggle({

                                oneStar: false,
                                twoStar: false,
                                threeStar: false,
                                fourStar: true,
                                fiveStar: false,

                            })
                            setCleanliness(4);
                        }} className={cleantoggle.fourStar ? 'bg-[#1C3879] border-solid border-2 p-4 pr-6 w-4 text-center' : 'border-solid border-black border-2 p-4 pr-6 w-4 text-center cursor-pointer hover:bg-[#3282B8] '}>4</button>
                        <button onClick={() => {
                            setCleantoggle({

                                oneStar: false,
                                twoStar: false,
                                threeStar: false,
                                fourStar: false,
                                fiveStar: true,

                            })
                            setCleanliness(5);

                        }} className={cleantoggle.fiveStar ? 'bg-[#1C3879] border-solid border-2 p-4 pr-6 w-4 text-center' : 'border-solid border-black border-2 p-4 pr-6 w-4 text-center cursor-pointer hover:bg-[#3282B8] '}>5</button>
                    </div>

                    <p>Noisyness</p>
                    <div className='flex'>
                        <button onClick={() => {
                            setNoisetoggle({

                                oneStar: true,
                                twoStar: false,
                                threeStar: false,
                                fourStar: false,
                                fiveStar: false,

                            })
                            setNoisyness(1);
                        }} className={noisetoggle.oneStar ? 'bg-[#1C3879] border-solid border-2 p-4 pr-6 w-4 text-center' : 'border-solid border-black border-2 p-4 pr-6 w-4 text-center cursor-pointer hover:bg-[#3282B8] '} >1</button>
                        <button onClick={() => {
                            setNoisetoggle({

                                oneStar: false,
                                twoStar: true,
                                threeStar: false,
                                fourStar: false,
                                fiveStar: false,

                            })
                            setNoisyness(2);
                        }} className={noisetoggle.twoStar ? 'bg-[#1C3879] border-solid border-2 p-4 pr-6 w-4 text-center' : 'border-solid border-black border-2 p-4 pr-6 w-4 text-center cursor-pointer hover:bg-[#3282B8] '}>2</button>
                        <button onClick={() => {
                            setNoisetoggle({

                                oneStar: false,
                                twoStar: false,
                                threeStar: true,
                                fourStar: false,
                                fiveStar: false,

                            })
                            setNoisyness(3);
                        }} className={noisetoggle.threeStar ? 'bg-[#1C3879] border-solid border-2 p-4 pr-6 w-4 text-center' : 'border-solid border-black border-2 p-4 pr-6 w-4 text-center cursor-pointer hover:bg-[#3282B8] '}>3</button>
                        <button onClick={() => {
                            setNoisetoggle({

                                oneStar: false,
                                twoStar: false,
                                threeStar: false,
                                fourStar: true,
                                fiveStar: false,

                            })
                            setNoisyness(4);
                        }} className={noisetoggle.fourStar ? 'bg-[#1C3879] border-solid border-2 p-4 pr-6 w-4 text-center' : 'border-solid border-black border-2 p-4 pr-6 w-4 text-center cursor-pointer hover:bg-[#3282B8] '}>4</button>

                        <button onClick={() => {
                            setNoisetoggle({

                                oneStar: false,
                                twoStar: false,
                                threeStar: false,
                                fourStar: false,
                                fiveStar: true,

                            })
                            setNoisyness(5);
                        }} className={noisetoggle.fiveStar ? 'bg-[#1C3879] border-solid border-2 p-4 pr-6 w-4 text-center' : 'border-solid border-black border-2 p-4 pr-6 w-4 text-center cursor-pointer hover:bg-[#3282B8] '}>5</button>
                    </div>

                    <p>Timeliness</p>
                    <div className='flex'>
                        <button onClick={() => {
                            setTimetoggle({

                                oneStar: true,
                                twoStar: false,
                                threeStar: false,
                                fourStar: false,
                                fiveStar: false,

                            })
                            setTimeliness(1);
                        }} className={timetoggle.oneStar ? 'bg-[#1C3879] border-solid border-2 p-4 pr-6 w-4 text-center' : 'border-solid border-black border-2 p-4 pr-6 w-4 text-center cursor-pointer hover:bg-[#3282B8] '}>1</button>
                        <button onClick={() => {
                            setTimetoggle({

                                oneStar: false,
                                twoStar: true,
                                threeStar: false,
                                fourStar: false,
                                fiveStar: false,

                            })
                            setTimeliness(2);
                        }} className={timetoggle.twoStar ? 'bg-[#1C3879] border-solid border-2 p-4 pr-6 w-4 text-center' : 'border-solid border-black border-2 p-4 pr-6 w-4 text-center cursor-pointer hover:bg-[#3282B8] '}>2</button>
                        <button onClick={() => {
                            setTimetoggle({

                                oneStar: false,
                                twoStar: false,
                                threeStar: true,
                                fourStar: false,
                                fiveStar: false,

                            })
                            setTimeliness(3);
                        }} className={timetoggle.threeStar ? 'bg-[#1C3879] border-solid border-2 p-4 pr-6 w-4 text-center' : 'border-solid border-black border-2 p-4 pr-6 w-4 text-center cursor-pointer hover:bg-[#3282B8] '}>3</button>
                        <button onClick={() => {
                            setTimetoggle({

                                oneStar: false,
                                twoStar: false,
                                threeStar: false,
                                fourStar: true,
                                fiveStar: false,

                            })
                            setTimeliness(4);
                        }} className={timetoggle.fourStar ? 'bg-[#1C3879] border-solid border-2 p-4 pr-6 w-4 text-center' : 'border-solid border-black border-2 p-4 pr-6 w-4 text-center cursor-pointer hover:bg-[#3282B8] '}>4</button>
                        <button onClick={() => {
                            setTimetoggle({

                                oneStar: false,
                                twoStar: false,
                                threeStar: false,
                                fourStar: false,
                                fiveStar: true,

                            })
                            setTimeliness(5);
                        }} className={timetoggle.fiveStar ? 'bg-[#1C3879] border-solid border-2 p-4 pr-6 w-4 text-center' : 'border-solid border-black border-2 p-4 pr-6 w-4 text-center cursor-pointer hover:bg-[#3282B8] '}>5</button>
                    </div>
                    <p>Organized</p>
                    <div className='flex'>
                        <button onClick={() => {
                            setOrganizetoggle({

                                oneStar: true,
                                twoStar: false,
                                threeStar: false,
                                fourStar: false,
                                fiveStar: false,

                            })
                            setOrganized(1);
                        }} className={organizetoggle.oneStar ? 'bg-[#1C3879] border-solid border-2 p-4 pr-6 w-4 text-center' : 'border-solid border-black border-2 p-4 pr-6 w-4 text-center cursor-pointer hover:bg-[#3282B8] '}>1</button>
                        <button onClick={() => {
                            setOrganizetoggle({

                                oneStar: false,
                                twoStar: true,
                                threeStar: false,
                                fourStar: false,
                                fiveStar: false,

                            })
                            setOrganized(2);
                        }} className={organizetoggle.twoStar ? 'bg-[#1C3879] border-solid border-2 p-4 pr-6 w-4 text-center' : 'border-solid border-black border-2 p-4 pr-6 w-4 text-center cursor-pointer hover:bg-[#3282B8] '}>2</button>
                        <button onClick={() => {
                            setOrganizetoggle({

                                oneStar: false,
                                twoStar: false,
                                threeStar: true,
                                fourStar: false,
                                fiveStar: false,

                            })
                            setOrganized(3);
                        }} className={organizetoggle.threeStar ? 'bg-[#1C3879] border-solid border-2 p-4 pr-6 w-4 text-center' : 'border-solid border-black border-2 p-4 pr-6 w-4 text-center cursor-pointer hover:bg-[#3282B8] '}>3</button>
                        <button onClick={() => {
                            setOrganizetoggle({

                                oneStar: false,
                                twoStar: false,
                                threeStar: false,
                                fourStar: true,
                                fiveStar: false,

                            })
                            setOrganized(4);
                        }} className={organizetoggle.fourStar ? 'bg-[#1C3879] border-solid border-2 p-4 pr-6 w-4 text-center' : 'border-solid border-black border-2 p-4 pr-6 w-4 text-center cursor-pointer hover:bg-[#3282B8] '}>4</button>
                        <button onClick={() => {
                            setOrganizetoggle({

                                oneStar: false,
                                twoStar: false,
                                threeStar: false,
                                fourStar: false,
                                fiveStar: true,

                            })
                            setOrganized(5);
                        }} className={organizetoggle.fiveStar ? 'bg-[#1C3879] border-solid border-2 p-4 pr-6 w-4 text-center' : 'border-solid border-black border-2 p-4 pr-6 w-4 text-center cursor-pointer hover:bg-[#3282B8] '}>5</button>
                    </div>

                </div>

                <div className='md:flex hidden justify-between mt-10 mb-10 ]'>
                    <button className='bg-[#3282B8]  p-4 rounded-md text-black font-bold w-40 hover:bg-blue-200' onClick={handlePrev}>Previous</button>
                    <button className='bg-[#3282B8]  p-4 rounded-md text-black font-bold w-40 hover:bg-blue-200' onClick={handleDone}>Done</button>
                </div>

            </div>
            <div className='mt-10'>
                <img src={roomie} alt='/' className='h-[30vh] w-[78vw] rounded-[75px] mt-3 md:h-[60vh] md:w-[85%] mx-auto ' />
            </div>
            <div className='flex justify-between mt-10  md:hidden'>
                <button className='bg-[#3282B8]  p-4 rounded-md text-black font-bold w-[100px]' onClick={handlePrev}>Previous</button>
                <button className='bg-[#3282B8]  p-4 rounded-md text-black font-bold w-[100px]' onClick={handleDone} >Done</button>
            </div>



        </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(ThirdQuestion);
