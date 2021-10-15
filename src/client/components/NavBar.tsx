import React from 'react';
import { NavLink } from 'react-router-dom';


const NavBar = () => {
    
    return (
            <div className="d-flex justify-content-between">
                <div>
                    <NavLink
                    className="btn btn-info bg-dark btn-lg rounded mx-2"
                        exact to="/homebar">
                            <i className="bi bi-list"></i></NavLink>
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
    )
}

export default NavBar;
