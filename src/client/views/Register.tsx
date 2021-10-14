import React from 'react';
import { useHistory } from 'react-router';
import { useForm } from '../hooks/useForm';
import { apiService } from '../utils/api-service';
const Register = () => {
    const history = useHistory();
    const { values, handleChanges } = useForm();
    const handleRegister = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        apiService('/auth/register', 'POST', { full_name: values.full_name, email: values.email, password: values.password })
            .then(token => {
                localStorage.setItem('token', token.token);
                history.push('/profile');
            })
    }
    return (
        <form className="form-group bg-info border rounded p-2">
            <label htmlFor="full_name" className="text-light">full name</label>
            <input
                name="full_name"
                value={values.full_name}
                onChange={handleChanges}
                type="text"
                className="form-control" />
            <label htmlFor="email" className="text-light">email</label>
            <input
                name="email"
                value={values.email}
                onChange={handleChanges}
                type="email"
                className="form-control" />
            <label htmlFor="password" className="text-light">password</label>
            <input
                name="password"
                value={values.password}
                onChange={handleChanges}
                type="password"
                className="form-control" />
            <div className="d-flex justify-content-center">
                <button onClick={handleRegister} className="btn btn-info">login</button>
            </div>
        </form>
    )
}

export default Register;
