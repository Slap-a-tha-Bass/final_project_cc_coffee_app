import React from 'react';
import { Link } from 'react-router-dom';

const Instagram = () => {
    return (
        <div className="bg-info border border-dark rounded p-2">
            <h1 className="text-light text-center">Instagram</h1>
            <h4 className="text-light text-center my-3">Pics</h4>
            <Link to="/github" className="card bg-dark text-decoration-none text-info">
                <h1 className="card-title">DARK SELFIE</h1>
                <h1 className="card-text">Make it really good...take it several times please. </h1>
                <h1 className="card-text">Make it really good...take it several times please. </h1>
            </Link>
            <h4 className="text-light text-center my-3">Selfies</h4>
            <Link to="/github" className="card bg-dark text-decoration-none text-info">
                <h1 className="card-title">DARK SELFIE</h1>
                <h1 className="card-text">Make it really good...take it several times please. </h1>
                <h1 className="card-text">Make it really good...take it several times please. </h1>
            </Link>
            <h4 className="text-light text-center my-3">Pics</h4>
            <Link to="/github" className="card bg-dark text-decoration-none text-info">
                <h1 className="card-title">DARK SELFIE</h1>
                <h1 className="card-text">Make it really good...take it several times please. </h1>
                <h1 className="card-text">Make it really good...take it several times please. </h1>
            </Link>
            <h4 className="text-light text-center my-3">More selfies</h4>
            <Link to="/github" className="card bg-dark text-decoration-none text-info">
                <h1 className="card-title">DARK SELFIE</h1>
                <h1 className="card-text">Make it really good...take it several times please. </h1>
                <h1 className="card-text">Make it really good...take it several times please. </h1>
            </Link>
            <h4 className="text-light my-3">People are so obsessed with themselves...</h4>
        </div>
    )
}

export default Instagram;
