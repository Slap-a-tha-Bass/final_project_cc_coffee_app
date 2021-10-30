import React from 'react'
import { Link } from 'react-router-dom'

const AboutUs = () => {
    return (
        <>
            <div className="d-flex justify-content-center">
                <div className="card bg-light my-4 border border-3 border-dark shadow-lg">
                    <h3 className="card-title text-center display-4">about us</h3>
                    <div className="card-body">
                        <ul className="list-group list-group-flush border rounded">
                            <li className="list-group-item h4 bg-light bg-gradient">Brand new to coffee</li>
                            <li className="list-group-item h4 bg-light bg-gradient">Looking for local location</li>
                            <li className="list-group-item h4 bg-light bg-gradient">Willing to do it better</li>
                            <li className="list-group-item h4 bg-light bg-gradient">Non religiously welcome to all</li>
                            <li className="list-group-item h4 bg-light bg-gradient">Disturbed but not broken</li>
                        </ul>
                        <div className="d-flex justify-content-md-around mt-2">
                            <a href="https://www.github.com/Slap-a-tha-Bass" target="_blank" className="btn btn-light bg-light border border-light btn-lg rounded mx-2">
                                <i className="bi bi-github"></i>
                            </a>
                            <a href="https://www.linkedin.com/in/corey-deloach-061180124/" target="_blank" className="btn btn-light bg-light border border-light btn-lg rounded mx-2">
                                <i className="bi bi-linkedin"></i>
                            </a>
                            <Link target="_blank" className="btn btn-light bg-light border border-light btn-lg rounded mx-2" to="/facebook">
                                <i className="bi bi-facebook"></i>
                            </Link>
                            <Link target="_blank" className="btn btn-light bg-light border border-light btn-lg rounded mx-2" to="/instagram">
                                <i className="bi bi-instagram"></i>
                            </Link>
                            <Link target="_blank" className="btn btn-light bg-light border border-light btn-lg rounded mx-2" to="/twitter">
                                <i className="bi bi-twitter"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutUs
