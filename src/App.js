import { Fragment, useEffect, useState } from 'react';
import { UserProvider } from './UserContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

// Main Navigation: Start
import AppNavbar from './components/AppNavbar';
import AppFooter from './components/AppFooter';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
// Main Navigation: End

// Utility Navigation: Start
import Generator from './pages/Generator';
// Utility Navigation: End

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fas, far, fab);

export default function App() {
    const [user, setUser] = useState({
        id: null
    });

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/user/details`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (typeof data._id !== "undefined") {
                setUser({
                    id: data._id
                });
            }
            else {
                setUser({
                    id: null
                })
            }
        })
    }, []);

    return (
        <Fragment>
            <UserProvider value={{ user, setUser }}>
            <Router>
                <AppNavbar />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/contact' element={<Contact />} />

                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<SignUp />} />

                    <Route path='/utility/*' element={<UtilityRoutes />} />
                </Routes>
                <AppFooter />
            </Router>
            </UserProvider>
        </Fragment>
    );
};

function UtilityRoutes() {
    return (
        <Routes>
            <Route path='/generator' element={<Generator />} />
        </Routes>
    );
}