import * as React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import SignUp from './view/signUp.jsx';
import SignIn from './view/signIn.jsx';
import Dashboard from './view/dashboardMain.jsx';
import Print from './view/components/pages/impression.jsx';
import Client from './view/components/pages/clients.jsx';
import Vente from './view/components/pages/vente.jsx';

const App = () => {
    return (
        <RecoilRoot>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<SignIn />}></Route>
                    <Route path="/menu" element={<Dashboard />}></Route>
                    <Route path="/signUp" element={<SignUp />}></Route>
                    <Route path="/print" element={<Print />}></Route>
                    <Route path="/client" element={<Client />}></Route>
                    <Route path="/vente" element={<Vente />}></Route>
                </Routes>
            </HashRouter>
        </RecoilRoot>
    );
};

export default App;