import React, { useState } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';

const NavBar = () => {
    const history = useHistory();

    return (
        <>
            <div className="d-flex justify-content-between pt-2">
                <div>
                    <NavLink
                        className="btn btn-light bg-light btn-lg rounded mx-2"
                        exact to="/">
                        <i className="bi bi-house-fill"></i>
                    </NavLink>
                    <NavLink
                        className="btn btn-light bg-light btn-lg rounded mx-2"
                        exact to="/orders">
                        <i className="bi bi-binoculars-fill"></i>
                    </NavLink>
                </div>
                <div>
                    <NavLink className="btn btn-light bg-light rounded mx-2" exact to="/login"><i className="bi bi-person-fill"></i></NavLink>
                    {<NavLink className="btn btn-light bg-light btn-lg rounded mx-2" exact to="/placeorder"><i className="bi bi-cart-fill"></i></NavLink>}
                </div>
            </div>
        </>
    )
}

export default NavBar;
