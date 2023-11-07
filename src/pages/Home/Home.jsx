import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import Banner from '../../components/Banner/Banner';
import axios from 'axios';
import HomeBooks from './HomeBooks';
import { Helmet } from 'react-helmet';

const Home = () => {


    const [CategoryData, setCategoryData] = useState([])
    
    axios.get('https://b8a11-server-side-csesopnil.vercel.app/book-category').then(res => setCategoryData(res.data))
    
    
    return (
        <div className='max-w-7xl mx-auto'>
            <Helmet>
                <title>Latest Books in the World | Library Home Page </title>
            </Helmet>
                  <Banner/>
        <div className='grid grid-cols-1 '>
            <div className='my-5'>
                <div className='relative'>
                <h2 className=' text-3xl font-semibold mt-4  dark:text-white text-center'>Book Category </h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 lg:grid-cols-4 my-4 items-center">
                {
                    CategoryData?.map(Category => <>
                    <div className='border dark:text-white hover:shadow-none hover:underline  shadow-md rounded-md px-2 py-2'>
                       <Link to={`/books/${Category.Category_Name}`}><img className='scale-90 w-full rounded-lg transition-all' src={Category.Category_Image} alt="" /></Link>
                       <Link to={`/books/${Category.Category_Name}`}><h2 className=' text-lg text-center capitalize'>{Category.Category_Name}</h2></Link>
                </div>
                
                    </>)
                }
                </div>

            </div>
        </div>
        <h2 className='text-2xl text-center font-semibold  dark:text-white'>All Books</h2>
        <HomeBooks/>
        </div>
    );
};

export default Home;