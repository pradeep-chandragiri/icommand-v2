import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../../services/authService.js';
import useAuth from '../../../hooks/useAuth.js';

const LoginModal = ({ onClose }) => {

    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState({});
    const [loginLoading, setLoginLoading] = useState(false);
    const [serverError, setServerError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
        setServerError('');
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!loginData.username.trim())
        newErrors.username = 'Username is required';

        if (!loginData.password.trim())
            newErrors.password = 'Password is required';

        setErrors(newErrors);
        setServerError('');
        setSuccessMessage('');

        if (Object.keys(newErrors).length > 0) return;

        setLoginLoading(true);

        try {
            
            const response = await loginUser({
                username: loginData.username,
                password: loginData.password
            })

            if (response.success) {
                setSuccessMessage(response.message);
                setLoginData({
                    username: '',
                    password: ''
                });
                setUser(response.data.user);
                navigate('/app', { replace: true });
            }

        } catch (error) {
            setServerError(
                error.response?.data?.message ||
                'Something went wrong. Please try again.'
            );
        } finally {
            setLoginLoading(false);
        }
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="login-modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <div>
                        <h2>Welcome back</h2>
                        <p className="modal-info"> Enter your credentials to continue to your account.</p>
                    </div>
                    <button className="modal-close" onClick={onClose} aria-label="Close login modal">
                        &times;
                    </button>
                </div>

                <div className="modal-body">
                    <form onSubmit={handleLoginSubmit} noValidate>

                        {serverError && (
                            <p className="error-message" role="alert">
                                {serverError}
                            </p>
                        )}

                        {successMessage && (
                            <p className="success-message" role="status">
                                {successMessage}
                            </p>
                        )}

                        {/* username field */}
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                placeholder="Enter your username"
                                value={loginData.username}
                                onChange={handleInputChange}
                                className={errors.username ? 'input-error' : ''}
                            />
                            {errors.username && (
                                <span className="error-message">
                                    {errors.username}
                                </span>
                            )}
                        </div>
                        {/* password field */}
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                value={loginData.password}
                                onChange={handleInputChange}
                                className={errors.password ? 'input-error' : ''}
                            />
                            {errors.password && (
                                <span className="error-message">
                                    {errors.password}
                                </span>
                            )}
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="btn btn-solid" disabled={loginLoading}>
                                {loginLoading ? (
                                <>
                                    <span className="btn-spinner" />
                                    Logging in...
                                </>
                                ) : (
                                    'Login to continue'
                                )}
                            </button>

                            <button type="button" className="btn btn-glass cancel-btn" onClick={onClose}>
                                Cancel
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;