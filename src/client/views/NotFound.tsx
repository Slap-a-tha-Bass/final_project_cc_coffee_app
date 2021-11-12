import React from 'react';
import { useHistory } from 'react-router';

const NotFound = () => {
    const history = useHistory();
    const handleBackClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        history.goBack();
    }
    return (
        <div className="bg-light">
            <h1 className="display-1 text-danger">404 Not Found</h1>
            <h1 className="display-3 text-danger">Do not pass go, do not collect $200</h1>
            <button onClick={handleBackClick} className="btn btn-dark">go back</button>
        </div>
    )
}

export default NotFound;
