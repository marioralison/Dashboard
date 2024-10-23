import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './index.css'
import Login from './view/login.jsx';

const App = () => {
    return (
        <div>
            <Login/>
        </div>
    );
};

const root = createRoot(document.body);
root.render(<App/>);