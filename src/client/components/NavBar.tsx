import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';


const NavBar = () => {
    // const history = useHistory();
    // const handleMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    //     e.preventDefault();
    //     Swal.fire({
    //         title: 'welcome to the next gen coffee shop',
    //         showConfirmButton: true,
    //         confirmButtonText: 'products',
    //         confirmButtonColor: '#4b0492f6',
    //         showCancelButton: true,
    //         cancelButtonText: 'services',
    //         cancelButtonColor: '#4b0492f6',
    //         showDenyButton: true,
    //         denyButtonText: 'donate',
    //         denyButtonColor: '#4b0492f6'
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             history.push('/products');
    //         } else if (result.isDismissed){
    //             history.push('/services');
    //         } else if (result.isDenied){
    //             history.push('/donate');
    //         }
    //     })
    // }

    return (
        <>
            <div className="d-flex justify-content-between">
                <div>
                    <NavLink
                        className="btn btn-info bg-dark btn-lg rounded mx-2"
                        exact to="/">
                        <i className="bi bi-house-fill"></i>
                    </NavLink>
                    <NavLink
                        className="btn btn-info bg-dark btn-lg rounded mx-2"
                        exact to="/orders">
                        <i className="bi bi-binoculars-fill"></i>
                    </NavLink>
                </div>
                <div>
                    <NavLink className="btn btn-dark btn-lg rounded mx-2" exact to="/login"><i className="bi bi-person-fill"></i></NavLink>
                    <NavLink className="btn btn-info bg-dark btn-lg rounded mx-2" exact to="/placeorder"><i className="bi bi-cart-fill"></i></NavLink>
                </div>
            </div>
        </>
    )
}

export default NavBar;
