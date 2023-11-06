import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div
        data-aos="zoom-in"
        data-aos-duration="500"
         className=" mx-2 md:min-h-16 hover:shadow-none outline-none shadow-md rounded-md bg-base-200">
  <div className="hero-content mx-10 flex-col lg:flex-row-reverse">
    <img src="https://imgdb.net/storage/uploads/05ff6d0facf9606e780902835839b646ab13650d504b9f9e75b20015ef3cb0c2.png" className="md:max-w-xl rounded-lg " />
    <div>
      <h1 className="text-5xl font-bold">Find Exclusive Range of Books!</h1>
      <div >
      <Link to="/all-books"><button className=" mt-5 py-3 rounded-md text-white px-4 text-sm bg-violet-700 outline-none">All Book</button></Link>
      </div>
    </div>
  </div>
</div>
    );
};

export default Banner;