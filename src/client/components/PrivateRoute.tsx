import React from 'react';
import { Redirect, Route } from 'react-router';
import Swal from 'sweetalert2';

const PrivateRoute = ({children, ...rest}: IPrivateRoute) => {

   const TOKEN = localStorage.getItem('token');

   if (!TOKEN) {
       Swal.fire({
           title: 'Invalid credentials',
           text: 'You need to login to do that',
           icon: 'error',
           iconColor: '#4b0492f6',
           showConfirmButton: false,
           timer: 2000,
           confirmButtonColor: '#4b0492f6'
       })
       return <Redirect to="/login" />
   } else {
       return <Route {...rest}>{children}</Route>
   }
}
interface IPrivateRoute {
    path: string,
    exact?: boolean,
    children: React.ReactNode
}
export default PrivateRoute;
