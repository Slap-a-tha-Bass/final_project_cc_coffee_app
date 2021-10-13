import React from 'react';
import { useHistory } from 'react-router';
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
    return (
        <form className="form-group bg-info border rounded p-2">
            <label htmlFor="email" className="text-light">Email</label>
            <input
                name="email"
                value={values.email}
                onChange={handleChanges}
                type="email"
                className="form-control" />
            <label htmlFor="password" className="text-light">Password</label>
            <input
                name="password"
                value={values.password}
                onChange={handleChanges}
                type="password"
                className="form-control" />
            <div className="d-flex justify-content-center">
                <button onClick={handleLogin} className="btn btn-info">Login</button>
            </div>
        </form>
    )
}

export default Login;
