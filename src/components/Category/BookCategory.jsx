import axios from 'axios';
import React from 'react';

const BookCategory = () => {

    return (
        <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 '>
            <div className='my-5'>
                <div className='relative'>

                <h2 className='text-3xl font-semibold mt-4 text-center'>All Brand List</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 mx-2 gap-2 lg:grid-cols-4 my-4 items-center">
                <div className='border hover:shadow-none hover:underline shadow-md rounded-md px-2 py-2'>
                       <Link to={`/products/`}><img className='scale-90 transition-all' src="" alt="" /></Link>
                       <Link to={`/products/`}><h2 className=' text-lg text-center capitalize'></h2></Link>
                       </div>
                </div>

            </div>
        </div>
        </div>
    );
};

export default BookCategory;