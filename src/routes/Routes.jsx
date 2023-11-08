import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Header from '../components/Header/Header';
import Mainlayout from '../components/layout/Mainlayout';
import Addbook from '../components/Books/Addbook';
import AllBooks from '../components/Books/AllBooks';
import SingleBooks from '../components/Books/SingleBooks';
import BookDetails from '../components/Books/BookDetails';
import UpdateBook from '../components/Books/UpdateBook';
import Login from '../pages/Login/Login';
import Borrowedbook from '../components/Books/Borrowedbook';
import Home from '../pages/Home/Home';
import ReadBook from '../pages/ReadBook/ReadBook';
import PrivateRoutes from './PrivateRoutes';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import Register from '../pages/Register/Register';

const Routes = createBrowserRouter([
    {
      path: "/",
      element: <Mainlayout/>,
      errorElement:<ErrorPage/>,
      children: [
        {
          path: '/',
          element:<Home/>,
          errorElement:<ErrorPage/>
        },
        {
            path: '/add-book',
            element:<PrivateRoutes><Addbook/></PrivateRoutes>,
            errorElement:<ErrorPage/>
        },
        {
            path: '/all-books/',
            element:<PrivateRoutes><AllBooks/></PrivateRoutes>,
            errorElement:<ErrorPage/>,
        },
        {
            path: '/books/:cname',
            element:<SingleBooks/>,
            errorElement:<ErrorPage/>,
            loader:({params})=> fetch(`https://b8a11-server-side-csesopnil.vercel.app/books/${params?.cname}`)
        },
        {
            path: '/book-details/:id',
            element:<PrivateRoutes><BookDetails/></PrivateRoutes>,
            errorElement:<ErrorPage/>,
            loader:({params})=> fetch(`https://b8a11-server-side-csesopnil.vercel.app/book-details/${params?.id}`)
        },
        {
            path: '/books-update/:id',
            element:<UpdateBook/>,
            errorElement:<ErrorPage/>,
            loader:({params})=> fetch(`https://b8a11-server-side-csesopnil.vercel.app/book-details/${params?.id}`)
        },
        {
            path: '/borrow-books/',
            element:<PrivateRoutes><Borrowedbook/></PrivateRoutes>,
            errorElement:<ErrorPage/>,
            loader:()=> fetch(`https://b8a11-server-side-csesopnil.vercel.app/borrow-books/`)
        },
        {
          path: '/login',
            element:<Login/>,
            errorElement:<ErrorPage/>,
        },
        {
          path: '/register',
            element:<Register/>,
            errorElement:<ErrorPage/>,
        }
      ]
    },
    {
      path:"/read-book/:id",
      element:<ReadBook/>,
      loader:({params})=> fetch(`https://b8a11-server-side-csesopnil.vercel.app/book-details/${params.id}`)
    }
  ]);

export default Routes;