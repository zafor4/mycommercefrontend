import { useState, useEffect } from 'react';
import Layout from '../Layout';
import { showError, showLoading } from '../../utils/messages';
import { login } from '../api/ApiAuth';
import { useNavigate } from 'react-router-dom';
import { authenticate,isAuthenticated, userInfo } from '../../utils/auth';
import LoginButton from './LoginButton';


const Login = () => {
    
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: false,
        loading: false,
        disabled: false,
        redirect: false,
        success: false
    });

    const { email, password, loading, error, redirect, disabled, success } = values;

    const handleChange = e => {
        setValues({
            ...values,
            error: false,
            [e.target.name]: e.target.value
        });
    };

    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        setValues({
            ...values,
            error: false,
            loading: true,
            disabled: true
        });
        login({ email, password })
            .then(response => {
                authenticate(response.data.token, () => {
                    setValues({
                        email: '',
                        password: '',
                        success: true,
                        disabled: false,
                        loading: false,
                        redirect: true
                    });
                });
            })
            .catch(err => {
                let errMsg = "Something went wrong";
                if (err.response) {
                    errMsg = err.response.data;
                }
                setValues({
                    ...values,
                    error: errMsg,
                    disabled: false,
                    loading: false
                });
            });
    };

    useEffect(() => {
        if (isAuthenticated()) {
            navigate('/', { replace: true });
        }
    }, [navigate]);

    useEffect(() => {
        if (redirect) {
            const role = userInfo().role;
            const redirectTo = `/${role}/dashboard`;
            navigate(redirectTo, { replace: true });
        }
    }, [redirect, navigate]);
    

    const signInForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="text-muted">Email:</label>
                <input
                    name='email'
                    type="email"
                    className="form-control"
                    value={email}
                    required
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Password:</label>
                <input
                    name="password"
                    type="password"
                    className="form-control"
                    value={password}
                    required
                    onChange={handleChange}
                />
            </div>
            <button
                type="submit"
                className="btn btn-outline-primary"
                disabled={disabled}
            >
                Login
            </button>
        </form>
    );



    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('user');
  

        if (token) {
   
          // Store the token in localStorage or a context for later use
          localStorage.setItem('token', token);
    
          // Redirect to the profile page or another protected route
          navigate('/dashboard');
        }
      }, [navigate]);

    

    return (
        <Layout title="Login" className="container col-md-8 offset-md-2">
            {success && <div className='alert alert-success'>Login Successful!</div>}
            {showLoading(loading)}
            {showError(error, error)}
            <h3>Login Here,</h3>
            <hr />
            {signInForm()}
            <hr />
        </Layout>
    );
}

export default Login;
