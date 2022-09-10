import React, { useState } from 'react';
import profile from '../assets/profile.png';
import roomiehero from '../assets/roomie-hero.jpg';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../Redux/Action';
import { connect, useSelector, useDispatch } from "react-redux";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { v4 as uuidv4 } from 'uuid';
import { getFirestore, doc, setDoc } from "firebase/firestore";
import app from '../Firebase/Config';
import { addQuestion } from '../Redux/Action';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


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






    const handleSubmit = async (e) => {
        e.preventDefault();
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
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
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
                    const newUser = {
                        fullname: fullname,
                        email: email,
                        age: age,
                        occupation: occupation,
                        gender: gender,
                        info: info,
                        image: downloadURL,
                        id: uuidv4()
                    }
                    try {
                        setDoc(doc(db, "profile", newUser.email), newUser);
                    } catch (error) {
                        console.log(error)
                    }
                    dispatch(addQuestion(newUser))

                    createUserWithEmailAndPassword(auth, email, password)
                        .then((userCredential) => {
                            // Signed in 
                            const user = userCredential.user;
                            console.log('signed in')
                            // ...
                        })
                        .catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            // ..
                        });

                });
            }
        );
        navigate('/home', { replace: true });

        // try {
        //     await setDoc(doc(db, "profile", newUser.email), newUser);
        // } catch (error) {
        //     console.log(error)
        // }
    }


    const handleCancel = (e) => {
        e.preventDefault();
        navigate('/')
    }







    return (
        <div className='flex flex-col '>
            <div className='md:flex md:flex-row block m-10 mt-100 md:mx-20 h-full sm:h-[70vh]  '>
                <div className='bg-white rounded-t-lg md:rounded-l-lg md:rounded-t-0'>
                    <img src={roomiehero} className=' w-full md:h-[100%]  md:rounded-l-md rounded-t-lg md:rounded-t-none' />
                </div>

                <div className='bg-[#fff]  sm:h-[100%] h-[50%] overflow-y-scroll sm:overflow-y-scroll md:w-[60%] p-10 md:rounded-r-lg rounded-b-lg'>
                    <h1 className='font-bold text-3xl mb-8 last: '>Create Profile</h1>
                    <form className='md:grid flex flex-col '>
                        <label className='font-bold'>Full name: </label>
                        <input type='text' placeholder='Enter Full name' className='bg-transparent border-b-2 border-black focus:outline-none  text-black mb-5 md:mb-5' value={fullname} onChange={(e) => { setFullname(e.target.value) }} />
                        <label className='font-bold'>Email: </label>
                        <input type='email' placeholder='Enter a valid email' className='bg-transparent border-b-2 border-black focus:outline-none  text-black sm:w-[300px]' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                        <label className='font-bold mt-2'>Password: </label>
                        <input type='password' placeholder='Enter a password' className='bg-transparent border-b-2 border-black focus:outline-none  text-black sm:w-[200px]' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                        <div className='md:flex md:flex-row mt-7 flex flex-col'>
                            <label className='font-bold'>Age: </label>
                            <input type='number' placeholder='age' className=' w-20 bg-transparent border-b-2 border-black mr-10 focus:outline-none text-black px-2 mb-5 md:mb-0' value={age} onChange={(e) => { setAge(e.target.value) }} />

                            <label className='font-bold'>Occupation: </label>
                            <input type='text' placeholder='Enter occupation' className='bg-transparent border-b-2 border-black focus:outline-none  text-black px-2' value={occupation} onChange={(e) => { setOccupation(e.target.value) }} />
                        </div>
                        <div className=' mt-5 pr-2 mb-5'>
                            <h3 className='font-bold'>Gender</h3>
                            <label>Male</label>
                            <span onClick={() => { setGendertoggle({ male: true, female: false }); setGender("male") }} className={gendertoggle.male ? 'bg-[#1C3879] border-solid border-2 pt-0 px-2 mx-2  rounded-[75%] ' : 'border-solid border-2 pt-0 px-2 mx-2 cursor-pointer hover:bg-[#3282B8]  rounded-[75%]'}  ></span>
                            <label>Female</label>
                            <span onClick={() => { setGendertoggle({ male: false, female: true }); setGender('female') }} className={gendertoggle.female ? 'bg-[#1C3879] border-solid border-2 pt-0 px-2 mx-2 rounded-[75%]' : 'border-solid border-2 pt-0 px-2 mx-2 cursor-pointer hover:bg-[#3282B8] rounded-[75%] '} ></span>
                        </div>

                        <div className='md:flex'>
                            <p className='pr-5 font-bold '>Add Profile Picture:</p>
                            <input type='file' className='mb-5' onChange={(e) => setFile(e.target.files[0])} />
                        </div>
                        <p className='font-bold'>Give a lil info about yourself:</p>
                        <textarea className='border-black border-2 border-solid mb-4 p-2' rows={4} value={info} onChange={(e) => { setInfo(e.target.value) }}></textarea>
                        <button className='bg-black text-[#3282B8] hover:bg-[#3282B8] hover:text-black md:w-[20%] p-2 rounded-md font-bold' onClick={handleSubmit}>Submit</button>

                    </form>

                </div>

            </div >

            <div className='md:ml-20 ml-10 mb-2'>
                <button className='bg-[#3282B8]  p-4 rounded-md text-black font-bold w-40 hover:bg-white' onClick={handleCancel}>Cancel</button>
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
