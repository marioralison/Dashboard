import * as React from 'react';
import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './index.css'

import SignUp from './view/signUp.jsx';
import SignIn from './view/signIn.jsx';
import Dashboard from './view/dashboardMain.jsx';
import Test from './view/components/test/test.jsx';

const App = () => {

    return (
        <Router>
            <SignIn></SignIn>
            <Routes>
                <Route path="/view/signIn" element={<SignIn/>}></Route>
                <Route path="/view/dashboard" element={<Dashboard/>}></Route>
            </Routes>
        </Router>
    );
};

export default App;