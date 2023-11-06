import { Rating } from '@mui/material';
import React, { useState } from 'react';
import { Link, useLoaderData, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    TERipple,
    TEModal,
    TEModalDialog,
    TEModalContent,
    TEModalHeader,
    TEModalBody,
    TEModalFooter,
  } from "tw-elements-react";
import useAuth from '../../hooks/useAuth';


const BookDetails = () => {

    const [showModal, setShowModal] = useState(false);
    const {user} = useAuth()
    const id = useParams()
    
    const bookdata = useLoaderData()
    console.log(bookdata);
    
    const qBooks = bookdata.qBooks
    console.log(qBooks);


    const AddToBorrow = (event)=>{
      event.preventDefault();
      const form = event.target
      const BookId = bookdata._id
      const userID = user.uid
      const qBooks = bookdata.qBooks - 1
      const UserName = user.displayName
      const UserEmail = user.email
      const bookName = bookdata.bookName
      const bookCategory = bookdata.bookCategory
      const BookPhoto = bookdata.photoUrl
      const borrowDate = form.borrowDate.value
      const returnDate = form.returnDate.value
      const borrowData = {UserName,BookId, userID, qBooks, UserEmail, bookName, bookCategory, BookPhoto, borrowDate, returnDate }
      console.log(borrowData);

          
    const updateQuantityPayload = {
      qBooks: qBooks,
    };

    try{


      fetch(`https://b8a11-server-side-csesopnil.vercel.app/book-detail/${bookdata._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateQuantityPayload),
      })
      .then((response) => response.json())
      .then(data => console.log(data))
      
      fetch('https://b8a11-server-side-csesopnil.vercel.app/borrow-books', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(borrowData)
        })
        .then(res => res.json())
        .then(data => {
          
            console.log(data);
            if(data.acknowledged == true ){
              toast.success('Borrowed Book added successfully!!')
            }
        })
        closeModal();
    }
    catch(e){
      console.log(e);
    }
  }

  const closeModal = () => {
    setShowModal(false);
  };

    return (
        <>
        <div className='grid md:grid-cols-4 '>
            <div className=' flex justify-center items-center mr-8    mb-6'>
                <div >
                    <div className='w-full mb-6 ml-0 md:ml-2 '>
                    <img src={bookdata?.photoUrl} alt="" />
                    </div>
                    <div className='flex justify-center gap-4'>
                   
                    <button onClick={() => setShowModal(true)} className='border hover:shadow capitalize rounded-md md:px-3 btn-sm md:btn-sm bg-violet-600 hover:bg-violet-800 text-white' disabled={bookdata?.qBooks === 0}>Borrow</button >
                    
                    <Link to={`/read-book/${bookdata._id}`}> <button className='border hover:shadow capitalize rounded-md md:px-3 btn-sm md:btn-sm bg-violet-600 hover:bg-violet-800 text-white'>Read</button></Link>
                    </div>
                </div>
            </div>
            <div className=' col-span-3 space-y-3 '>
                <h2 className='text-3xl'>{bookdata?.bookName}</h2>
                <div className='md:flex gap-3 items-center'>
                <p className='text-base '>Author Name: <span className='font-semibold'>{bookdata?.author_name}</span></p>
                </div>
                <hr />
               <div className='flex gap-3'>
               <Rating className='rating' name="rating " defaultValue={bookdata?.ratings} precision={0.5} readOnly />
               <h2>Category: <Link to={`/books/${bookdata?.bookCategory}`}><span className=' hover:link-primary'>{bookdata?.bookCategory}</span></Link></h2>
               </div>
               <hr />
               <h2 >Quantity: {bookdata?.qBooks}</h2>
            </div>

        </div>
        <div className='my-4'>
                <h2 className='my-4 text-2xl font-semibold'>Book Overview</h2>
                <p>{bookdata?.shortDes}</p>
            </div>
            <div>

      {/* <!-- Modal --> */}
      <TEModal show={showModal} setShow={setShowModal} staticBackdrop>
        <TEModalDialog>
          <TEModalContent>
            <TEModalHeader>
              {/* <!--Modal title--> */}
              <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                Modal title
              </h5>
              {/* <!--Close button--> */}
              <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </TEModalHeader>
            {/* <!--Modal body--> */}
            <TEModalBody>
            <h2>Name: {user?.displayName}</h2>
            <h2>Email: {user?.email}</h2>
            <form onSubmit={AddToBorrow } action="">
            <div className="form-control">
            <label className="label">
              <span className="label-text">Borrowed Date</span>
            </label>
            <input type="date" placeholder="Enter Name" name='borrowDate' className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Return Date</span>
            </label>
            <input type="date" placeholder="Enter Name" name='returnDate' className="input input-bordered" required />
          </div>
          <div className='flex justify-end'>
          <button
                  type="submit"
                  className=" mt-4 rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  Borrowed
                </button>
          </div>
            </form>
            </TEModalBody>
            <TEModalFooter>
              <TERipple rippleColor="light">
                <button
                  type="button"
                  className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </TERipple>
              
            </TEModalFooter>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>
    </div>
<ToastContainer/>
        </>
    );
};

export default BookDetails;