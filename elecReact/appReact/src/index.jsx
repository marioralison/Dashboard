import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './index.css'
import Login from './view/login.jsx';
import Dashboard from './view/dashboardMain.jsx';

const App = () => {
    return (
        <div>
            <Dashboard></Dashboard>
        </div>
    );
};

const root = createRoot(document.body);
root.render(<App/>);