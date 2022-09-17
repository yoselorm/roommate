import Hero from "./Components/Hero";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import FirstPage from "./Pages/FirstPage";
import SecondPage from "./Pages/SecondPage";
import ThirdPage from './Pages/ThirdPage';
import ProfilePage from "./Pages/ProfilePage";
import { AnimatePresence } from 'framer-motion';
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';
import ProfileDetailsPage from "./Pages/ProfileDetailsPage";
import LoginPage from "./Pages/LoginPage";
import UserDetails from "./Pages/UserDetails";
import Result from "./Components/Result";
import Profile from "./Components/Profile";
import ChatPage from "./Pages/ChatPage";


function App() {
  const location = useLocation();
  return (
    <div className=" font-semibold">


      <AnimatePresence exitBeforeEnter>
        <Routes key={location.pathname} location={location}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profilepage" element={<ProfilePage />} />
          <Route path="/firstpage" element={<FirstPage />} />
          <Route path="/secondpage" element={<SecondPage />} />
          <Route path="/thirdpage" element={<ThirdPage />} />
          <Route path="/userdetails" element={<UserDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chatpage" element={<ChatPage />} />
        </Routes>
      </AnimatePresence>


    </div>
  );
}

export default App;
