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
                localStorage.setItem('token', token);
                history.push('/profile');
            })
    }
    let disabledBtn = false;
    if(!values.full_name || !values.email || !values.password){
        disabledBtn = true;
    }
    return (
        <>
            <h1 className="text-light mt-3 text-center display-4"><i className="bi bi-cup-fill"></i> register </h1>
            <form className="form-group bg-info border rounded p-2">
                <label htmlFor="full_name" className="text-light">full name</label>
                <input
                    name="full_name"
                    value={values.full_name || ''}
                    onChange={handleChanges}
                    type="text"
                    className="form-control" />
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
                    <button onClick={handleRegister} disabled={disabledBtn} className="btn btn-info btn-lg mt-2"><i className="bi bi-arrow-right-circle-fill"></i></button>
                </div>
            </form>
        </>
    )
}

export default Register;
