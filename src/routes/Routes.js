import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ForgotPassword from '../pages/ForgotPassword';
import Homepage from '../pages/Homepage';
import RegistrationPage from '../pages/RegistrationPage';
import Tweets from '../pages/Tweets';
import Users from '../pages/Users';
import Welcome from '../pages/Welcome';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';


const RoutesComponent = () => {
    return (

        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage />} />

                <Route
                    path="/Welcome" element={<Welcome />} />

                <Route
                    path="/RegistrationPage" element={<RegistrationPage />} />

                <Route
                    path="/ForgotPassword" element={<ForgotPassword />} />

                <Route
                    path="/Users" element={<Users />} />

                <Route
                    path="/Tweets" element={<Tweets />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesComponent