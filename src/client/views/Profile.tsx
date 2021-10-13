import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users } from '../../../types';
import { apiService } from '../utils/api-service';

const Profile = () => {
    const [user, setUser] = useState<Users['id']>();
    useEffect(() => {
        apiService('/api/users')
            .then(data => setUser(data));
    }, []);
    return (
        <div className="card bg-info rounded">
            <h1 className="card-title">{user}</h1>
            <div className="card-body d-flex justify-content-center">
                <button className="btn btn-info btn-lg">
                    <i className="bi bi-arrow-right-circle-fill"></i>
                </button>
            </div>
        </div>
    )
}

export default Profile;
