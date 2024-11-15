import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './index.css'
import Login from './view/login.jsx';
import Dashboard from './view/dashboardMain.jsx';
import Test from './view/components/test/test.jsx';

const App = () => {
    return (
        <div style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Test></Test>
        </div>
    );
};

const root = createRoot(document.body);
root.render(<App/>);