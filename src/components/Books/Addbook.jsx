import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Addbook = () => {

  const [CategoryData, setCategoryData] = useState([''])

  axios.get('https://b8a11-server-side-csesopnil.vercel.app/book-category')
  .then(res => setCategoryData(res.data))

  const handleAddBook = (event) => {
    event.preventDefault();
    const form = event.target
    const bookName = form.bookName.value
    const bookCategory = form.bookCategory.value
    const qBook = form.qBook.value
    const qBooks = parseInt(qBook)
    const author_name = form.author_name.value
    const rating = form.rating.value
    const ratings = parseFloat(rating)
    const photoUrl = form.photoUrl.value
    const shortDes = form.shortDes.value
    const bookData = {bookName, bookCategory, qBooks, author_name, ratings, photoUrl, shortDes}
    console.log(bookData);

try {
  axios.post("https://b8a11-server-side-csesopnil.vercel.app/books", bookData, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(data => {
    form.reset()
    console.log(data);
    if(data.acknowledged == true) {

      toast.success('Added Book successfully')
    }
  }
)
  ;
} catch (error) {
  console.log(error);
}

  }

  
  return (
        <div className="max-w-7xl mx-auto">
            <div className=" mt-5 border outline-none rounded-lg  ">
  <div className=" flex-col py-2 my-5 ">
    <div className="text-center my-4 ">
      <h1 className="text-5xl font-bold text-center my-4">Add New Product</h1>
    </div>
    <div className="card  w-full  bg-base-100">
      <form onSubmit={handleAddBook} className="card-body">
        <div className='grid md:grid-cols-2 lg:grid-cols-2 gap-4'>
        <div className="form-control">
          <label className="label">
            <span className="label-text"> Name</span>
          </label>
          <input type="text" placeholder="Enter Name" name='bookName' className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Book Category</span>
          </label>
            <select className='input input-bordered' name="bookCategory" id="">
            {
              CategoryData.map(BookCategory =>
              <option className="capitalize " value={BookCategory.Category_Name}>{BookCategory.Category_Name}</option>
              )
            }
            </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Quantity of the book</span>
          </label>
          <input type="number" placeholder="Enter Quantity.." name='qBook' className="input input-bordered outline-none" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Author Name</span>
          </label>
          <input type="text" placeholder="Author Name..." name='author_name' className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text"> Photo URL</span>
          </label>
          <input type="text" placeholder="Enter Photo URL" name='photoUrl' className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Rating</span>
          </label>
            <Rating className='rating' name="rating" defaultValue={1} precision={0.5} size="large" />
        </div>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Short Description</span>
          </label>
          <textarea className="textarea textarea-bordered" name='shortDes' placeholder="Enter Short Details..."></textarea>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-neutral capitalize text-lg">Add Book</button>
        </div>
      </form>
    </div>
  </div>
</div>
<ToastContainer/>
        </div>
    );
};

export default Addbook;