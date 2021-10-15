import React from 'react';
import AboutUs from '../components/AboutUs';
import PictureCard from '../components/PictureCard';

const HomeBar = () => {
    return (
        <>
            <div className="bg-warning border border-warning rounded col-md-4">
                <ul className="list-group list-group-flush border rounded p-2 bg-info">
                    <li className="list-group-item bg-info text-decoration-none h2"><a className="text-decoration-none text-light" href="/products" target="_blank" rel="noopener noreferrer">products</a></li>
                    <li className="list-group-item bg-info text-decoration-none h2"><a className="text-decoration-none text-light" href="/services" target="_blank" rel="noopener noreferrer">services</a></li>
                    <li className="list-group-item bg-info text-decoration-none h2"><a className="text-decoration-none text-light" href="/community" target="_blank" rel="noopener noreferrer">community</a></li>
                    <li className="list-group-item bg-info text-decoration-none h2"><a className="text-decoration-none text-light" href="/giveback" target="_blank" rel="noopener noreferrer">give back</a></li>
                    <li className="list-group-item bg-info text-decoration-none h2"><a className="text-decoration-none text-light" href="/donate" target="_blank" rel="noopener noreferrer">donate</a></li>
                </ul>
            </div>
        </>
                )
}

                export default HomeBar;
