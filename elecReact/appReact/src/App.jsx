import * as React from 'react';
import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './index.css'

import SignUp from './view/signUp.jsx';
import SignIn from './view/signIn.jsx';
import Dashboard from './view/dashboardMain.jsx';

const App = () => {

    return (
        <SignIn></SignIn>
    );
};

export default App;