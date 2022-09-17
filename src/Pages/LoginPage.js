import React, { useState } from 'react';
import Login from '../Components/Login';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { authUser } from '../Redux/Action';

const LoginPage = () => {
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    // const navigate = useNavigate();
    // const auth = getAuth();

    // const handleLogin = async (e) => {
    //     e.preventDefault();
    //     signInWithEmailAndPassword(auth, email, password)
    //         .then((userCredential) => {
    //             console.log('signed in')
    //             // Signed in 
    //             const user = userCredential.user;
    //             // ...
    //             navigate('/home', { replace: true })

    //         })
    //         .catch((error) => {
    //             const errorCode = error.code;
    //             const errorMessage = error.message;
    //         });
    //     // dispatch(authUser(true))
    // }
    return (
        <div>
            <Login />
        </div>
    );
}

export default LoginPage;
