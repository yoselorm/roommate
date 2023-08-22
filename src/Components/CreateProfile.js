import React, { useState, useContext } from 'react';
import reprofile from '../assets/reprofile.png';
import roomiehero from '../assets/roomie-hero.jpg';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../Redux/Action';
import { connect, useSelector, useDispatch } from "react-redux";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
import { v4 as uuidv4 } from 'uuid';
import { getFirestore, doc, setDoc } from "firebase/firestore";
import app from '../Firebase/Config';
import { addQuestion } from '../Redux/Action';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { AuthContext } from '../context/AuthContext';




const CreateProfile = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [age, setAge] = useState('');
    const [occupation, setOccupation] = useState('');
    const [info, setInfo] = useState('');

    const [gender, setGender] = useState('')
    const [gendertoggle, setGendertoggle] = useState({
        male: false,
        female: false
    });
    const [img, setImg] = useState()
    const [file, setFile] = useState([])

    const auth = getAuth();

    const navigate = useNavigate();
    const db = getFirestore(app);
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const [loader, setLoader] = useState(false);

    const { currentUser } = useContext(AuthContext)
    //console.log(currentUser)




    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true)
        const storage = getStorage();

        // Create the file metadata
        /** @type {any} */
        const metadata = {
            contentType: 'image/png'
        };
        let image;

        // Upload file and metadata to the object 'images/mountains.jpg'
        const storageRef = ref(storage, 'images/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                console.log(progress)
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
                if (progress != 100 && !isNaN(progress)) {
                    setLoader(true)
                }
                else if (progress === 100 || isNaN(progress)) {
                    setLoader(false)
                    setModal(!modal)
                }
            },
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    // ...

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

                    console.log('File available at', downloadURL);




                    createUserWithEmailAndPassword(auth, email, password)
                        .then(async (userCredential) => {
                            // Signed in 
                            const user = userCredential.user;


                            console.log(user)
                            const newUser = {
                                fullname: fullname,
                                email: email,
                                age: age,
                                occupation: occupation,
                                gender: gender,
                                info: info,
                                image: downloadURL,
                                id: user.uid
                            }
                            // ...
                            dispatch(addQuestion(newUser))
                            try {
                                await updateProfile(user, {
                                    displayName: fullname,
                                    photoURL: downloadURL,
                                });

                                await setDoc(doc(db, "profile", newUser.email), newUser);
                                await setDoc(doc(db, "UserInfo", newUser.email), newUser);
                                await setDoc(doc(db, "Userchat", user.uid), {});
                            } catch (error) {
                                console.log(error)
                            }
                        })

                        .catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            // ..
                        });


                });
            }
        );
        // setModal(!modal)

    }


    const handleCancel = (e) => {
        e.preventDefault();
        navigate('/')
    }
    const handleLogout = (e) => {
        e.preventDefault();
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate('/', { replace: true })
            window.history.replaceState(null, '', '/');

        }).catch((error) => {
            // An error happened.
        });
    }

    const handleConfirm = e => {
        e.preventDefault();
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate('/', { replace: true })
            window.history.replaceState(null, '', '/');
            setModal(false)
        }).catch((error) => {
            // An error happened.
        });

    }







    return (
        <div >
            <div className={modal || loader ? ' hidden' : 'flex-col'}>
                <div className='md:flex md:flex-row block m-10 mt-100 md:mx-20 h-full sm:h-[70vh]  '>
                    <div className=' rounded-t-lg md:rounded-l-lg md:rounded-t-0'>
                        <img src={reprofile} className=' w-[100%] md:h-[80%]  md:rounded-l-md rounded-t-lg md:rounded-t-none' />
                    </div>

                    <div className=' text-black  sm:h-[100%] h-[50%] overflow-y-scroll sm:overflow-y-scroll md:w-[70%] p-6   md:rounded-r-lg rounded-b-lg'>
                        <h1 className='font-bold text-3xl mb-8 last: '>Create Profile</h1>
                        <form className='md:grid flex flex-col '>
                            <label className='font-bold'>Full name: </label>
                            <input type='text' placeholder='Enter Full name' className='bg-transparent border-b-2 border-black focus:outline-none  mb-5 md:mb-5' value={fullname} onChange={(e) => { setFullname(e.target.value) }} />
                            <label className='font-bold'>Email: </label>
                            <input type='email' placeholder='Enter a valid email' className='bg-transparent border-b-2 border-black focus:outline-none  sm:w-[300px]' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                            <label className='font-bold mt-2'>Password: </label>
                            <input type='password' placeholder='Enter a password' className='bg-transparent border-b-2 border-black focus:outline-none  sm:w-[200px]' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                            <div className='md:flex md:flex-row mt-7 flex flex-col'>
                                <label className='font-bold'>Age: </label>
                                <input type='number' placeholder='age' className=' w-20 bg-transparent border-b-2 border-black mr-10 focus:outline-none px-2 mb-5 md:mb-0' value={age} onChange={(e) => { setAge(e.target.value) }} />

                                <label className='font-bold'>Occupation: </label>
                                <input type='text' placeholder='Enter occupation' className='bg-transparent border-b-2 border-black focus:outline-none  px-2' value={occupation} onChange={(e) => { setOccupation(e.target.value) }} />
                            </div>
                            <div className=' mt-5 pr-2 mb-5'>
                                <h3 className='font-bold'>Gender</h3>
                                <label>Male</label>
                                <span onClick={() => { setGendertoggle({ male: true, female: false }); setGender("male") }} className={gendertoggle.male ? 'bg-[#3282B8] border-solid border-2 pt-0 px-2 mx-2  rounded-[75%] ' : 'border-solid border-2 pt-0 px-2 mx-2 cursor-pointer hover:bg-[#3282B8]  rounded-[75%]'}  ></span>
                                <label>Female</label>
                                <span onClick={() => { setGendertoggle({ male: false, female: true }); setGender('female') }} className={gendertoggle.female ? 'bg-[#3282B8] border-solid border-2 pt-0 px-2 mx-2 rounded-[75%]' : 'border-solid border-2 pt-0 px-2 mx-2 cursor-pointer hover:bg-[#3282B8] rounded-[75%] '} ></span>
                            </div>

                            <div className='md:flex'>
                                <p className='pr-5 font-bold '>Add Profile Picture:</p>
                                <input type='file' className='mb-5' onChange={(e) => setFile(e.target.files[0])} />
                            </div>
                            <p className='font-bold'>Give a lil info about yourself:</p>
                            <textarea className='border-black border-2 border-solid mb-4 p-2 text-black' rows={4} value={info} onChange={(e) => { setInfo(e.target.value) }}></textarea>
                            <button className='bg-black text-[#3282B8] hover:bg-[#3282B8] hover:text-black md:w-[20%] p-2 rounded-md font-bold' onClick={handleSubmit}>Submit</button>

                        </form>

                    </div>

                </div >

                <div className='md:ml-20 ml-10 mb-2'>
                    <button className='bg-[#3282B8]  p-4 rounded-md text-black font-bold w-40 hover:bg-white' onClick={handleCancel}>Cancel</button>
                </div>
            </div>
            <div className={modal ? 'flex mt-[15rem] sm:mt-24' : 'hidden'}>
                <div className=' text-black text-md font-semibold w-[300px] h-[20vh] sm:w-[350px] sm:h-[20vh] border-2 p-4 sm:my-4 alone border-slate-600 bg-[#fff] opacity-80  rounded-md mx-auto flex flex-col'>
                    <h1 className='text-center '>Registration Successful</h1>
                    <div className='flex gap-6 justify-center items-center mt-4'>
                        <button className='bg-black text-[#3282B8] hover:bg-[#3282B8] hover:text-white md:w-[20%] p-2 rounded-md font-bold' onClick={handleConfirm}>OK</button>

                    </div>
                </div>
            </div>
            <div className={loader ? 'flex mt-[15rem] sm:mt-24' : 'hidden'}>
                <div className=' text-black text-md font-semibold w-[250px] h-[10vh] sm:w-[300px] sm:h-[10vh] border-2 p-4 sm:my-4 alone border-slate-600 bg-[#fff] opacity-80  rounded-md mx-auto flex flex-col'>
                    <h1 className='text-center font-extrabold '>loading....</h1>
                </div>
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


export default connect(mapStateToProps, mapDispatchToProps)(CreateProfile);
