import * as React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import './index.css'

import SignUp from './view/signUp.jsx';
import SignIn from './view/signIn.jsx';
import Dashboard from './view/dashboardMain.jsx';
import Print from './view/components/pages/impression.jsx';

const App = () => {
    return (
        <RecoilRoot>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<SignIn />}></Route>
                    <Route path="/menu" element={<Dashboard />}></Route>
                    <Route path="/signUp" element={<SignUp />}></Route>
                    <Route path="/print" element={<Print />}></Route>
                </Routes>
            </HashRouter>
        </RecoilRoot>
    );
};

export default App;