import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <div className="d-flex justify-content-between">
            <div>
                <NavLink className="btn btn-outline-info btn-sm border border-info rounded mx-1" exact to="/">order here</NavLink>
                <NavLink className="btn btn-outline-info btn-sm border border-info rounded mx-1" exact to="/orders">view orders</NavLink>
            </div>
            <div>
                <NavLink className="btn btn-outline-info btn-sm border border-info rounded mx-1" exact to="/login">login</NavLink>
                <NavLink className="btn btn-outline-info btn-sm border border-info rounded mx-1" exact to="/register">register</NavLink>
            </div>
        </div>
    )
}

export default NavBar;
