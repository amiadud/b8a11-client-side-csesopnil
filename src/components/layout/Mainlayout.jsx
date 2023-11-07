import React from 'react';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';

const Mainlayout = () => {
    return (
        <div className='max-w-7xl mx-auto text-black dark:bg-slate-800'>
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default Mainlayout;