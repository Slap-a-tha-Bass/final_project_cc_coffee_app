import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const FootBar = () => {
    const history = useHistory();
    const [hasLoaded, setHasLoaded] = useState(false);

    const handleSignOut = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        localStorage.clear();
        history.push('/login');
    }
    return (
        <>
            {hasLoaded && <div className="d-flex justify-content-between">
                <p className="text-muted pt-3">Copyright Slap-a-tha-Bass 2021</p>
                <div className="d-flex justify-content-end">
                    <Link to="/receipts" className="btn btn-light text-muted d-flex align-items-center">receipts</Link>
                    <Link to="/profile" className="btn btn-light text-muted d-flex align-items-center">profile</Link>
                    <button onClick={handleSignOut} className="btn btn-light text-muted d-flex align-items-center">sign out</button>
                </div>
            </div>}
        </>
    )
}

export default FootBar;
