import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import LoginForm from '../components/auth/LoginForm';

const Login: React.FC = () => {
    const navigate = useNavigate();

    const handleLoginSuccess = () => {
        navigate('/');
    };

    return (
        <AuthLayout>
            <LoginForm onSuccess={ handleLoginSuccess } />
        </AuthLayout>
    );
};

export default Login;
