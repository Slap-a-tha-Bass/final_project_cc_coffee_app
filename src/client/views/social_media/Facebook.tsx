import React from 'react';
import { Link } from 'react-router-dom';

const Facebook = () => {
    return (
        <div className="bg-success border border-dark rounded p-2">
            <h1 className="text-light">Facebook</h1>
            <div className="d-flex justify-content-between">
                <h4 className="text-light">Drama</h4>
                <Link target="_blank" className="btn btn-light bg-light border border-info btn-lg rounded mx-2" to="/github">
                    <i className="bi bi-github"></i>
                </Link>
            </div>
            <div className="d-flex justify-content-between">
                <Link target="_blank" className="btn btn-light bg-light border border-info btn-lg rounded mx-2" to="/github">
                    <i className="bi bi-github"></i>
                </Link>
                <h4 className="text-light">Drama</h4>
            </div>
            <div className="d-flex justify-content-center">
            <h4 className="text-light">Drama</h4>
                <Link target="_blank" className="btn btn-light bg-light border border-info btn-lg rounded mx-2" to="/github">
                    <i className="bi bi-github"></i>
                </Link>
            </div>
            <h2 className="text-light text-center">More drama</h2>
            <div className="border border-light rounded">
                <h4 className="text-light">@Slap-a-tha-Bass</h4>
                <p className="text-light">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Officiis illo dolores accusantium, ratione, aut reprehenderit aperiam aspernatur,
                    laudantium repellat nostrum quasi culpa veritatis. Sequi dolorem nesciunt dolorum dolor?
                    Temporibus, suscipit.</p>
            </div>
            <div className="border border-light rounded">
                <h4 className="text-light">@Slap-a-tha-Bass</h4>
                <p className="text-light">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Officiis illo dolores accusantium, ratione, aut reprehenderit aperiam aspernatur,
                    laudantium repellat nostrum quasi culpa veritatis. Sequi dolorem nesciunt dolorum dolor?
                    Temporibus, suscipit.</p>
            </div>
            <div className="card bg-dark text-light">
                <h1 className="card-title text-light">ADVERTISEMENT</h1>
                <div className="card-body">
                    <h4 className="card-text text-light">This is how the world works now and the best way for us to make money...</h4>
                    <Link to='/github' className="btn btn-info text-light">Click here for viruses</Link>
                </div>
            </div>
            <div className="border border-light rounded">
                <h4 className="text-light">@Slap-a-tha-Bass</h4>
                <p className="text-light">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Officiis illo dolores accusantium, ratione, aut reprehenderit aperiam aspernatur,
                    laudantium repellat nostrum quasi culpa veritatis. Sequi dolorem nesciunt dolorum dolor?
                    Temporibus, suscipit.</p>
            </div>
            <div className="border border-light rounded">
                <h4 className="text-light">@Slap-a-tha-Bass</h4>
                <p className="text-light">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Officiis illo dolores accusantium, ratione, aut reprehenderit aperiam aspernatur,
                    laudantium repellat nostrum quasi culpa veritatis. Sequi dolorem nesciunt dolorum dolor?
                    Temporibus, suscipit.</p>
            </div>
            <div className="border border-light rounded">
                <h4 className="text-light">@Slap-a-tha-Bass</h4>
                <p className="text-light">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Officiis illo dolores accusantium, ratione, aut reprehenderit aperiam aspernatur,
                    laudantium repellat nostrum quasi culpa veritatis. Sequi dolorem nesciunt dolorum dolor?
                    Temporibus, suscipit.</p>
            </div>
            <div className="card bg-dark text-light">
                <h1 className="card-title text-light">ADVERTISEMENT</h1>
                <div className="card-body">
                    <h4 className="card-text text-light">This is how the world works now and the best way for us to make money...</h4>
                    <Link to="/github" className="btn btn-info text-light">Click here for viruses</Link>
                </div>
            </div>
            <div className="border border-light rounded">
                <h4 className="text-light">@Slap-a-tha-Bass</h4>
                <p className="text-light">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Officiis illo dolores accusantium, ratione, aut reprehenderit aperiam aspernatur,
                    laudantium repellat nostrum quasi culpa veritatis. Sequi dolorem nesciunt dolorum dolor?
                    Temporibus, suscipit.</p>
            </div>
        </div>
    )
}

export default Facebook;
