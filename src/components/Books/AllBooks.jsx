import { Rating } from '@mui/material';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLoaderData } from 'react-router-dom';

const AllBooks = () => {

    const allbooks = useLoaderData()

    const [Data, setData] = useState(allbooks)

    const handleFilter = ()=> {
        const reamings = Data.filter(data => data.qBooks > 0 )
        setData(reamings);
    }

    return (
        <>
        <Helmet>
      <title>All Books and Available Book | Library</title>
    </Helmet>
        <div className='flex justify-center'>
        <button onClick={handleFilter} className='btn btn-sm '>Filter (Available books)</button>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 mx-2 lg:grid-cols-4 gap-2 my-4 '>
        
                        {
                            Data.map(books => 
                                <div className='border hover:shadow-none shadow-md rounded-md mt-4  '>
                                <div className='hover:underline'>
                                <Link to={`/book-details/${books?._id}`}> <img className='scale-90 h-72 w-full transition-all mt-4' src={books?.photoUrl} alt="" title="" /></Link>
                                <Link to={`/book-details/${books?._id}`}><h2 className='text-center scale-90 text-xl font-semibold'>{books?.bookName}</h2></Link>
                                </div>
                                <div className=' my-2 '>
                                <div>
                                <h2 className='text-center '> <span className='font-semibold'>Category:</span> {books?.bookCategory}  </h2>
                                <h2 className='text-center -mt-3 '><br /><span className='font-semibold'>Author Name</span> : {books?.author_name}</h2>
                                </div>
                                </div>
                                <div className='flex justify-center'>
                                <Rating className='rating' name="rating " defaultValue={books?.ratings} precision={0.5} readOnly />
                                </div>
                                 <div className='flex flex-col md:flex-row gap-4  mb-5 mt-2 items-center justify-center'>
                                 <Link to={`/books-update/${books?._id}`}><button className='border  w-full hover:shadow capitalize rounded-md md:px-3 py-2 mx-2 md:mx-2 bg-violet-600 hover:bg-violet-800 text-white'>Update</button></Link>
                                 </div>
                                </div>   
                                
                            )
                        }
                   
        </div>
        </>
    );
};

export default AllBooks;