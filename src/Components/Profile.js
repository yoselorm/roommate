import React, { useContext, useEffect, useState } from 'react';
import { addProfile } from '../Redux/Action';
import { connect, useSelector, useDispatch } from 'react-redux';
import { collection, query, where, onSnapshot, getFirestore, doc, updateDoc } from "firebase/firestore";
import app from '../Firebase/Config';
import Navbar from './Navbar';
import { AuthContext } from '../context/AuthContext';
import EditModal from './EditModal';
import { deleteUser, getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Profile = (props) => {


    const dispatch = useDispatch();
    const db = getFirestore(app);
    const storedloc = useSelector((state) => state.question);
    console.log(storedloc)
    //let result = storedloc.map(item => item.location);
    //let loc = storedloc.find(item => item.email);
    const usermail = useSelector((state) => state.details);
    const { currentUser } = useContext(AuthContext)
    const [editmodal, setEditModal] = useState(false)
    const [deletemodal, setDeleteModal] = useState(false)

    const navigate = useNavigate()





    useEffect(() => {
        const getData = async () => {

            try {
                const q = query(collection(db, "profile"), where("email", "==", currentUser.email));
                onSnapshot(q, (querySnapshot) => {
                    const profile = [];
                    querySnapshot.forEach((doc) => {
                        profile.push(doc.data());
                    });
                    //console.log("Current cities in CA: ", cities.join(", "));
                    dispatch(addProfile(profile));
                    console.log(profile)
                });

            } catch (error) {

            }
        }
        getData();
    }, [])




    const auth = getAuth();
    const user = auth.currentUser;



    const profile = useSelector((state) => state.profile)
    console.log(profile);

    const handleEditModal = (e) => {
        e.preventDefault()
        setEditModal(!editmodal)
    }

    const handleDeleteModal = (e) => {
        e.preventDefault()
        setDeleteModal(!deletemodal)
    }

    const handleClose = (e) => {
        setEditModal(false)
    }

    const handleDelete = (e) => {
        e.preventDefault();
        deleteUser(user).then(() => {
            // User deleted.
            navigate('/', { replace: true })
        }).catch((error) => {
            // An error ocurred
            // ...
        });
    }
    return (
        <div className=''>
            <Navbar />
            {profile.map((item) => {
                return (
                    <div key={item.id} className={'flex flex-col justify-center  mt-[100px]'}>
                        <div className={deletemodal || editmodal ? 'hidden' : 'text-black text-md font-semibold w-[300px] h-[50vh] max-h-fit sm:w-[350px] sm:h-[60vh] border-2 p-4 sm:my-4 alone border-slate-600 bg-[#fff] opacity-80  rounded-md mx-auto flex flex-col'}>
                            <img src={item.image} alt='' className=' sm:h-[15vh] sm:w-[8vw] h-28 w-28 rounded-[50%] relative bottom-16 mx-auto' />
                            <h1 className='sm:mb-2  '><span className='text-slate-600'>Name:</span>  {item.fullname}</h1>
                            <h1 className='sm:mb-2  '><span className='text-slate-600'>Email:</span>  {item.email}</h1>
                            <h1 className='sm:mb-2  '><span className='text-slate-600'>location:</span>  {item.location}</h1>
                            <h1 className='sm:mb-2  '><span className='text-slate-600'>Occupation: </span> {item.occupation}</h1>
                            <h1 className='sm:mb-2  '><span className='text-slate-600'>Age:</span>  {item.age}</h1>
                            <h1 className='sm:mb-2  '><span className='text-slate-600'>Gender:</span>  {item.gender}</h1>
                            <h1 className='sm:mb-2  '><span className='text-slate-600'>Brief info:</span>  {item.info}</h1>
                        </div>
                        <div className={deletemodal || editmodal ? 'hidden' : 'flex flex-col justify-center mx-auto mt-2 mb-8'}>
                            <button onClick={handleEditModal} className='w-[200px] my-3 bg-[#3282B8] text-white rounded-md text-center py-4 px-8'>Edit</button>
                            <button onClick={handleDeleteModal} className='w-[200px] my-3 bg-black text-white rounded-md text-center px-8 py-4'>Delete account</button>
                        </div>

                        <div className={editmodal ? 'text-black text-md font-semibold w-[300px] max-h-fit sm:w-[550px] sm:max-h-fit border-2 p-4 sm:my-4 alone border-slate-600 bg-[#fff] opacity-80  rounded-md mx-auto flex flex-col' : ' hidden'}>
                            <EditModal item={item} close={handleClose} />
                            <button className='hover:bg-black text-[#000] bg-[#3282B8] hover:text-white md:w-[20%] p-2 rounded-md font-bold' onClick={handleClose}>Cancel</button>
                        </div>
                        <div className={deletemodal ? 'text-black text-md font-semibold w-[300px] h-[20vh] sm:w-[350px] sm:h-[20vh] border-2 p-4 sm:my-4 alone border-slate-600 bg-[#fff] opacity-80  rounded-md mx-auto flex flex-col ' : ' hidden'}>
                            <h1 className='text-center '>Are you sure you want to delete account</h1>
                            <div className='flex gap-6 justify-center items-center'>
                                <button className='hover:bg-black text-[#000] bg-[#3282B8] hover:text-white md:w-[20%] p-2 rounded-md font-bold' onClick={(e) => { setDeleteModal(false) }}>Cancel</button>
                                <button className='bg-black text-[#3282B8] hover:bg-[#3282B8] hover:text-white md:w-[20%] p-2 rounded-md font-bold' onClick={handleDelete}>YES</button>

                            </div>


                        </div>

                    </div>

                )
            })}

        </div>
    );
}


export default Profile;
