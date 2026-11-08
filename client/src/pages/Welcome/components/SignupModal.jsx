import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../../services/authService.js';
import useAuth from '../../../hooks/useAuth.js';

const SignupModal = ({ onClose }) => {

    const [signupData, setSignupData] = useState({ fullname: '', username: '', password: '' });
    const [signupErrors, setSignupErrors] = useState({});
    const [signupLoading, setSignupLoading] = useState(false);
    const [serverError, setServerError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const handleSignupChange = (e) => {
        const { name, value } = e.target;
        setSignupData(prev => ({ ...prev, [name]: value }));
        setSignupErrors(prev => ({ ...prev, [name]: '' }));
        setServerError('');
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!signupData.fullname.trim())
            newErrors.fullname = 'Full name is required';
        if (!signupData.username.trim())
            newErrors.username = 'Username is required';
        if (!signupData.password.trim())
            newErrors.password = 'Password is required';

        setSignupErrors(newErrors);
        setServerError('');
        setSuccessMessage('');

        if (Object.keys(newErrors).length > 0) return;

        setSignupLoading(true);

        try {
            
            const response = await registerUser({
                name: signupData.fullname,
                username: signupData.username,
                password: signupData.password
            })

            if (response.success) {
                setSuccessMessage(response.message);
                setSignupData({
                    fullname: '',
                    username: '',
                    password: ''
                });
                setUser(response.data.user);
                navigate('/chat', { replace: true });
            }

        } catch (error) {
            setServerError(
                error.response?.data?.message ||
                'Something went wrong. Please try again.'
            );
        } finally {
            setSignupLoading(false);
        }
    };

    return (
        <div className="modal-backdrop" onClick={ onClose }>
            <div className="login-modal" onClick={ e => e.stopPropagation() }>
                <div className="modal-header">
                    <div>
                        <h2>Create your account</h2>
                        <p className="modal-info">Join iCommand and start exploring.</p>
                    </div>

                    <button className="modal-close" onClick={onClose} aria-label="Close signup modal">
                        &times;
                    </button>
                </div>

                <div className="modal-body">
                    <form onSubmit={ handleSignupSubmit } noValidate>
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
                        {/* Full name field */}
                        <div className="form-group">
                            <label htmlFor="fullname">Full name</label>
                            <input
                                id="fullname"
                                name="fullname"
                                type="text"
                                placeholder="Enter your full name"
                                value={signupData.fullname}
                                onChange={handleSignupChange}
                                className={signupErrors.fullname ? 'input-error' : ''}
                            />
                            {signupErrors.fullname && (
                                <span className="error-message">
                                    {signupErrors.fullname}
                                </span>
                            )}
                        </div>
                        {/* username field */}
                        <div className="form-group">
                            <label htmlFor="signup-username">Username</label>
                            <input
                                id="signup-username"
                                name="username"
                                type="text"
                                placeholder="Choose a username"
                                value={signupData.username}
                                onChange={handleSignupChange}
                                className={signupErrors.username ? 'input-error' : ''}
                            />
                            {signupErrors.username && (
                                <span className="error-message">
                                    {signupErrors.username}
                                </span>
                            )}
                        </div>
                        {/* password field */}
                        <div className="form-group">
                            <label htmlFor="signup-password">Password</label>
                            <input
                                id="signup-password"
                                name="password"
                                type="password"
                                placeholder="Create a password"
                                value={signupData.password}
                                onChange={handleSignupChange}
                                className={signupErrors.password ? 'input-error' : ''}
                            />
                            {signupErrors.password && (
                                <span className="error-message">
                                    {signupErrors.password}
                                </span>
                            )}
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="btn btn-solid" disabled={signupLoading}>
                                {signupLoading ? (
                                    <>
                                        <span className="btn-spinner" />
                                        Creating account...
                                    </>
                                ) : (
                                    'Create account'
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

export default SignupModal;