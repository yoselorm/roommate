import React from 'react';
import AnimateComp from '../Components/AnimateComp';
import ThirdQuestion from '../Components/ThirdQuestion';
import Navbar from '../Components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
const ThirdPage = () => {

    // const storedResults = useSelector((state) => state.question);
    // console.log(storedResults)
    // let result = storedResults.find(item => item.location);

    const storedloc = useSelector((state) => state.question);
    let final = Object.assign({}, storedloc);


    return (
        <div>
            <Navbar />

            {/* {storedResults.map((item) => {
                return (
                    <div key={item.id}>

                    </div>
                )
            })} */}

            <AnimateComp>
                <ThirdQuestion />
            </AnimateComp>

        </div>
    );
}

export default ThirdPage;
