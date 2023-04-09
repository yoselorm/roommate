import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { addQuestion, addUser } from '../Redux/Action';
import Result from '../Components/Result';
import { collection, query, where, onSnapshot, getFirestore, doc } from "firebase/firestore";
import app from '../Firebase/Config';
import AnimateComp from '../Components/AnimateComp';
import Navbar from '../Components/Navbar';
import { AuthContext } from '../context/AuthContext';

const UserDetails = (props) => {


    const dispatch = useDispatch();
    const db = getFirestore(app);

    const storedloc = useSelector((state) => state.question);
    //console.log(storedloc[0])
    //let result = storedloc.map(item => item.location);


    //let loc = storedloc.find(item => item.location);
    const [user, setUser] = useState();

    let userlocation = null;
    for (let i = 0; i < storedloc?.length; i++) {
        if (storedloc[i].location) {
            userlocation = storedloc[i];
        }
    }
    console.log(userlocation)






    useEffect(() => {
        const getData = async () => {

            try {
                const q = query(collection(db, "UserInfo"), where("location", "==", userlocation.location));
                onSnapshot(q, (querySnapshot) => {
                    const users = [];
                    querySnapshot.forEach((doc) => {
                        users.push(doc.data());
                    });
                    setUser(users)
                    console.log(users)
                    //console.log("Current cities in CA: ", cities.join(", "));
                    dispatch(addUser(users));
                    console.log(users)
                });

            } catch (error) {

            }
        }
        getData();
    }, [])
    console.log(user)



    const storedResults = useSelector((state) => state.users);
    console.log(storedResults)
    //console.log(props)


    return (
        <div >
            <Navbar />

            <div className={user !== undefined ? ' sm:grid sm:grid-cols-3' : 'hidden'}>
                {storedResults?.map((item) => {
                    return (
                        <div key={item.id} >
                            <AnimateComp>
                                <Result user={item} />
                            </AnimateComp>
                        </div>
                    )
                })}

            </div>
            <div className={user == undefined ? 'flex' : 'hidden'}>
                <h1 className='mx-auto mt-10 font-extrabold text-3xl'>No Matches Found,‼Get Started</h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
