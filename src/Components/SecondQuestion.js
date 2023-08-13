import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ratingImage from '../assets/ratings.png';
import { addQuestion } from '../Redux/Action';
import { connect, useSelector, useDispatch } from "react-redux";
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../Firebase/Config';
import { AuthContext } from '../context/AuthContext';



const SecondQuestion = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentUser } = useContext(AuthContext)

    const storedResults = useSelector((state) => state.question);
    console.log(storedResults)


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



    let avgspecs = ''

    const handlePrev = (e) => {
        e.preventDefault();
        navigate('/firstpage');
    }
    const handleNext = async (e) => {
        e.preventDefault();
        const result = (cleanliness + noisyness + timeliness + organized) / 5;
        if (result < 2.5) {
            avgspecs = 'Good'
        }
        else {
            avgspecs = 'Better'
        }
        try {

            await updateDoc(doc(db, "UserInfo", currentUser.email), { Personal_specs: avgspecs });


        } catch (error) {
            console.log(error)
        }
        console.log(avgspecs)
        dispatch(addQuestion({ Personal_specs: avgspecs }))
        navigate('/thirdpage');
    }


    return (
        <div className=' grid  md:grid-cols-2 m-10 '>
            <div className='sm:ml-16 sm:mt-10  p-6 w-[80%] rounded-xl'>
                <p className=' font-bold  md:pt-5 md:text-4xl '>How would you rate yourself on the following?</p>
                <p className='mb-5 md:ml-5'>On a scale of 1- 5, with 1 being the lowest and 5 being the highest</p>
                <div className='ml-6 sm:ml-10 '>
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
                        }} className={cleantoggle.oneStar ? 'bg-[#1C3879] border-solid border-2 p-4 pr-6 w-4 text-center' : 'border-solid border-black border-2 p-4 pr-6 w-4 text-center cursor-pointer hover:bg-[#3282B8] '} >1</button>
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
                        }} className={organizetoggle.threeStar ? 'bg-[#1C3879] border-solid border-2 p-4 pr-6 w-4 text-center' : 'border-solid  border-black border-2 p-4 pr-6 w-4 text-center cursor-pointer hover:bg-[#3282B8] '}>3</button>
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
                    <button className='bg-[#3282B8] shadow-xl p-4 rounded-md text-black font-bold w-40 hover:bg-blue-200 mr-4' onClick={handlePrev}>Previous</button>
                    <button className='bg-[#3282B8] shadow-xl p-4 rounded-md text-black font-bold w-40 hover:bg-blue-200' onClick={handleNext} >Next</button>
                </div>

            </div>
            <div className='sm:mt-20 md:mt-10 flex justify-items-center'>
                <img src={ratingImage} alt='/' className='max-h-[80vh] object-cover max-w-[148vw] h-[50vh] w-[65vw] rounded-[75px] m-auto ' />
            </div>
            <div className='flex justify-between mt-10  md:hidden'>
                <button className='bg-[#3282B8] shadow-xl p-4 rounded-md text-black font-bold w-[100px]' onClick={handlePrev}>Previous</button>
                <button className='bg-[#3282B8] shadow-xl  p-4 rounded-md text-black font-bold w-[100px]' onClick={handleNext}>Next</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(SecondQuestion);
