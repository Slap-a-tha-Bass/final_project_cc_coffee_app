import React from 'react';
import { Redirect, useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useForm } from '../hooks/useForm';
import { apiService } from '../utils/api-service';

const Login = () => {
    const history = useHistory();
    const { values, handleChanges } = useForm();
    const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        apiService('/auth/login', 'POST', { email: values.email, password: values.password })
            .then(token => {
                localStorage.setItem('token', token);
                history.push('/profile');
            })
    }
    const TOKEN = localStorage.getItem('token');
    if (TOKEN) {
        Swal.fire({
            position: 'top',
            title: 'Already logged in!',
            icon: 'error',
            iconColor: '#4b0492f6',
            timer: 1000,
            showConfirmButton: false
        })
        return <Redirect to="/orders" />;
    }
    let disabledBtn = false;
    if (!values.email || !values.password) {
        disabledBtn = true;
    }
    return (
        <>
            <h1 className="text-light mt-3 text-center display-4"><i className="bi bi-cup-fill"></i> login </h1>
            <form className="form-group bg-info border rounded p-2">
                <label htmlFor="email" className="text-light">email</label>
                <input
                    name="email"
                    value={values.email || ''}
                    onChange={handleChanges}
                    type="email"
                    className="form-control" />
                <label htmlFor="password" className="text-light">password</label>
                <input
                    name="password"
                    value={values.password || ''}
                    onChange={handleChanges}
                    type="password"
                    className="form-control" />
                <div className="d-flex justify-content-center">
                    <button onClick={handleLogin} disabled={disabledBtn} className="btn btn-info btn-lg mt-2"><i className="bi bi-arrow-right-circle-fill"></i></button>
                </div>
            </form>
            <h3 className="text-light mt-3">Not a member?</h3>
            <Link to="/register" className="btn btn-info btn-lg text-light mt-2">Register here</Link>
        </>
    )
}

export default Login;
