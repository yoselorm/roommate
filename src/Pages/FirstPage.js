import React, { useEffect } from 'react';
import AnimateComp from '../Components/AnimateComp';
import FirstQuestion from '../Components/FirstQuestion';
import Navbar from '../Components/Navbar';
const FirstPage = () => {

    useEffect(() => {

        const country_loc = () => {
            fetch("https://universities-in-ghana.herokuapp.com/universities")
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
        }
        country_loc();
    }, [])



    return (
        <div>
            <Navbar />
            <AnimateComp>
                <FirstQuestion />
            </AnimateComp>

        </div>
    );
}

export default FirstPage;
