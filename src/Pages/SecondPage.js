import React from 'react';
import AnimateComp from '../Components/AnimateComp';
import SecondQuestion from '../Components/SecondQuestion';
import Navbar from '../Components/Navbar';

const SecondPage = () => {
    return (
        <div>
            <Navbar />
            <AnimateComp>
                <SecondQuestion />
            </AnimateComp>
        </div>
    );
}

export default SecondPage;
