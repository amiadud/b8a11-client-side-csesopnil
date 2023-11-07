import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLoaderData } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Borrowedbook = () => {
    const borrowedData = useLoaderData()

    const [Data, setData] = useState(borrowedData);

    const handleBorrowDelete = (book)=> {

      
      try{
             
        fetch(`https://b8a11-server-side-csesopnil.vercel.app/book-detail/${book.BookId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            qBooks: book.qBooks + 1
          }),
        })
        .then((res) => res.json())
        .then(data => console.log(data))  


      fetch(`https://b8a11-server-side-csesopnil.vercel.app/borrow-books/${book._id}`, {
            method: 'DELETE',
        })
      .then((res) => res.json())
      .then(data => {

        if( data.deletedCount > 0 ) {
          toast.success('Borrow Book Returned successfully')
          const remaining = Data.filter(rems => rems._id !== book._id)
          setData(remaining);  
        }
        })

      }
      catch(err) {
        console.log(err);
      }
    }

    return (
        <>
             <Helmet>
      <title>Borrowed Books List  | Library</title>
    </Helmet>
        <div className="max-w-7xl mx-auto">
        <table width="100%" className="  md:text-white ">
  <thead className=" bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
    <tr className="text-white ">
      <th className=" py-2"> Image</th>
      <th>Name</th>
      <th>Category</th>
      <th>Borrow Date</th>
      <th>Return Date</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {
      Data.length > 0 ?  Data.map( borrowed => 
      <tr className="border-b text-black dark:text-white transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
            <td ><Link to={`/book-details/${borrowed?.BookId}`}><img className="w-[50px] py-2" src={borrowed.BookPhoto} alt="" /></Link></td>
            <td className="capitalize "><Link className="hover:text-emerald-600 " to={`/book-details/${borrowed?.BookId}`}>{borrowed?.bookName}</Link></td>
            <td className="capitalize "><Link className="hover:text-emerald-600" to={`/books/${borrowed?.bookCategory}`}>{borrowed?.bookCategory}</Link></td>
            <td className="capitalize ">{borrowed?.borrowDate}</td>
            <td className="capitalize ">{borrowed?.returnDate}</td>
            <td><button onClick={()=> handleBorrowDelete(borrowed)} className="btn outline-none hover:bg-gray-700 bg-red-600 text-white">Return</button></td>
          </tr> 

    )
    : <><h2 className="text-xl  text-black my-2">Not Available</h2></>
    }
  </tbody>
</table>
        </div>
        <ToastContainer/>
        </>
    );
};

export default Borrowedbook;