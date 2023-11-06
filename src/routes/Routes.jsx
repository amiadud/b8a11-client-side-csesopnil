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
            element:<Addbook/>,
            errorElement:<ErrorPage/>
        },
        {
            path: '/all-books',
            element:<AllBooks/>,
            errorElement:<ErrorPage/>,
            loader:()=> fetch(`https://b8a11-server-side-csesopnil.vercel.app/books/`)
        },
        {
            path: '/books/:cname',
            element:<SingleBooks/>,
            errorElement:<ErrorPage/>,
            loader:({params})=> fetch(`https://b8a11-server-side-csesopnil.vercel.app/books/${params?.cname}`)
        },
        {
            path: '/books-details/:id',
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
            path: '/borrow-books/:id',
            element:<Borrowedbook/>,
            errorElement:<ErrorPage/>,
            loader:({params})=> fetch(`https://b8a11-server-side-csesopnil.vercel.app/borrow-books/${params.id}`)
        },
        {
          path: '/login',
            element:<Login/>,
            errorElement:<ErrorPage/>,
        }
      ]
    },
    {
      path:"/read-book/:id",
      element:<ReadBook/>
    }
  ]);

export default Routes;