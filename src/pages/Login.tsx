import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import LoginForm from '../components/auth/LoginForm';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Login: React.FC = () => {

    const { user } = useSelector((state: RootState) => state.auth);

    if (user) {
        return <Navigate to="/" replace />;
    }

    return (
        <AuthLayout>
            <LoginForm onSuccess={ () => <Navigate to="/" replace /> } />
        </AuthLayout>
    );
};

export default Login;
