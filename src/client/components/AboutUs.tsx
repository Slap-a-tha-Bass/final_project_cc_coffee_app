import React from 'react'
import { Link } from 'react-router-dom'

const AboutUs = () => {
    return (
        <>
            <div className="d-flex justify-content-center position-relative">
                <div className="card bg-info text-light mt-2">
                    <h3 className="card-title text-center display-4">about us</h3>
                    <div className="card-body">
                        <ul className="list-group list-group-flush border rounded">
                            <li className="list-group-item text-light h4 bg-info">Brand new to coffee</li>
                            <li className="list-group-item text-light h4 bg-info">Looking for local location</li>
                            <li className="list-group-item text-light h4 bg-info">Willing to do it better</li>
                            <li className="list-group-item text-light h4 bg-info">Non religiously welcome to all</li>
                            <li className="list-group-item text-light h4 bg-info">Disturbed but not broken</li>
                        </ul>
                        <div className="d-flex justify-content-md-around">
                            <Link target="_blank" className="btn btn-outline-light bg-info border border-info btn-lg rounded mx-2" to="/facebook">
                                <i className="bi bi-facebook"></i>
                            </Link>
                            <Link target="_blank" className="btn btn-outline-light bg-info border border-info btn-lg rounded mx-2" to="/instagram">
                                <i className="bi bi-instagram"></i>
                            </Link>
                            <Link target="_blank" className="btn btn-outline-light bg-info border border-info btn-lg rounded mx-2" to="/twitter">
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
