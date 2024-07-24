import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index';
import Login from './components/Login';
import Register from './components/Register';
import Tasks from './components/Task';

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/" element={<Tasks/>} />
                </Routes>
            </Router>
        </Provider>
    );
};

export default App;
