import { Fragment, useState } from 'react';
import { UserProvider } from './UserContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

/* Main Navigation: Start */
import AppNavbar from './components/AppNavbar';
import AppFooter from './components/AppFooter';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
/* Main Navigation: End */

/* Student Navigation: Start */
import StdntHome from './pages/student/StdntHome';
/* Student Navigation: End */

/* Teacher Navigation: Start */
import TchrHome from './pages/teacher/TchrHome';
/* Teacher Navigation: End */

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fas, far, fab);

export default function App() {
    return (
        <Fragment>
            <Router>
                <AppNavbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />

                    <Route path="/teacher/*" element={<TeacherRoutes />} />
                    <Route path="/student/*" element={<StudentRoutes />} />
                </Routes>
                <AppFooter />
            </Router>
        </Fragment>
    );
};

function TeacherRoutes() {
    const [user, setUser] = useState({
        id: null,
        role: null,
    });

    const unsetUser = () => {
        localStorage.clear();
    }

    return (
        <UserProvider value={{ user, setUser, unsetUser }}>
            <Routes>
                <Route index element={<TchrHome />} />
            </Routes>
        </UserProvider>
    );
};

function StudentRoutes() {
    const [user, setUser] = useState({
        id: null,
        role: null,
    });

    const unsetUser = () => {
        localStorage.clear();
    }

    return (
        <UserProvider value={{ user, setUser, unsetUser }}>
            <Routes>
                <Route index element={<StdntHome />} />
            </Routes>
        </UserProvider>
    );
};