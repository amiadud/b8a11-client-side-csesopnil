import { Rating } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const HomeBooks = () => {
    
    const [allbooks, setAllbooks] = useState([])
    console.log(allbooks);

    useEffect( ()=> {
        fetch('https://b8a11-server-side-csesopnil.vercel.app/books')
        .then(res => res.json())
        .then(data => setAllbooks(data))
    },[])

    const availableData = allbooks.filter(data => data.qBooks >= 0 )
    const fantacyBook = allbooks.filter(data => data.bookCategory == "Fantasy" )

    return (
        <>
        <div className='grid grid-cols-2 md:grid-cols-3 mx-2 lg:grid-cols-4 gap-2 my-4 '>
        
                        {
                            availableData.map(books => 
                                <div className='border hover:shadow-none  shadow-md rounded-md mt-4  '>
                                <div className='hover:underline'>
                                <Link to={`/book-details/${books?._id}`}> <img className='scale-90 h-72 w-full transition-all mt-4' src={books?.photoUrl} alt="" title="" /></Link>
                                <Link to={`/book-details/${books?._id}`}><h2 className='text-center scale-90 text-xl font-semibold  dark:font-semibold  dark:text-white'>{books?.bookName}</h2></Link>
                                </div>
                                <div className=' my-2 '>
                                <div>
                                <h2 className='text-center dark:text-white '> <span className='font-semibold'>Category:</span> {books?.bookCategory}  </h2>
                                <h2 className='text-center -mt-3  dark:text-white'><br /><span className='font-semibold'>Author Name</span> : {books?.author_name}</h2>
                                </div>
                                </div>
                                <div className='flex justify-center'>
                                <Rating className='rating' name="rating " defaultValue={books?.ratings} precision={0.5} readOnly />
                                </div>
                                 <div className='flex flex-col md:flex-row gap-4  mb-5 mt-2 items-center justify-center'>
                                 <Link to={`/book-details/${books?._id}`}> <button className='border hover:shadow capitalize rounded-md md:px-3 btn-sm md:btn-sm bg-violet-600 hover:bg-violet-800 dark:bg-slate-200 dark:text-black text-white'>Details</button></Link>
                                 </div>
                                </div>   
                                
                            )
                        }
                   
        </div>
        <h2 className='text-center text-2xl pt-3 font-semibold  dark:text-white'>Fantasy Books List</h2>
        <p className='text-center mt-2  dark:text-white'>Best of Fantasy Books.</p>
        <div className='grid grid-cols-2 md:grid-cols-3 mx-2 lg:grid-cols-4 gap-2 my-4 '>
                        {
                            fantacyBook.map(books => 
                                <div className='border hover:shadow-none shadow-md rounded-md mt-4  '>
                                <div className='hover:underline'>
                                <Link to={`/book-details/${books?._id}`}> <img className='scale-90 h-72 w-full transition-all mt-4' src={books?.photoUrl} alt="" title="" /></Link>
                                <Link to={`/book-details/${books?._id}`}><h2 className='  dark:text-white text-center scale-90 text-xl font-semibold'>{books?.bookName}</h2></Link>
                                </div>
                                <div className=' my-2 '>
                                <div>
                                <h2 className='text-center  dark:text-white'> <span className='font-semibold'>Category:</span> {books?.bookCategory}  </h2>
                                <h2 className='text-center -mt-3  dark:text-white'><br /><span className='font-semibold'>Author Name</span> : {books?.author_name}</h2>
                                </div>
                                </div>
                                <div className='flex justify-center'>
                                <Rating className='rating' name="rating " defaultValue={books?.ratings} precision={0.5} readOnly />
                                </div>
                                 <div className='flex flex-col md:flex-row gap-4  mb-5 mt-2 items-center justify-center'>
                                 <Link to={`/book-details/${books?._id}`}> <button className='border hover:shadow capitalize rounded-md md:px-3 btn-sm md:btn-sm bg-violet-600 hover:bg-violet-800 dark:bg-slate-200 dark:text-black text-white'>Details</button></Link>
                                 </div>
                                </div>   
                                
                            )
                        }
                   
        </div>


        </>


    );
};


export default HomeBooks;