import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <div className="d-flex justify-content-between">
            <div>
                <NavLink className="btn btn-outline-info btn-sm border border-info rounded mx-1" exact to="/">Order Here</NavLink>
                <NavLink className="btn btn-outline-info btn-sm border border-info rounded mx-1" exact to="/orders">View Orders</NavLink>
            </div>
            <div>
                <NavLink className="btn btn-outline-info btn-sm border border-info rounded mx-1" exact to="/login">Login</NavLink>
                <NavLink className="btn btn-outline-info btn-sm border border-info rounded mx-1" exact to="/register">Register</NavLink>
            </div>
        </div>
    )
}

export default NavBar;
