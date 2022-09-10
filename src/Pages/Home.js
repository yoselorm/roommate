import React from 'react';
import AnimateComp from '../Components/AnimateComp';
import Hero from '../Components/Hero';
import Navbar from '../Components/Navbar';

const Home = () => {
    return (
        <div>
            <Navbar />
            <AnimateComp>
                <Hero />
            </AnimateComp>
        </div>
    );
}

export default Home;
