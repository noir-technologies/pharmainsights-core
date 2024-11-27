import React from 'react';
import AuthLayout from '../components/auth/AuthLayout';
import RegisterForm from '../components/auth/RegisterForm';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../store/store';


const Register: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.auth);

    if (user) {
        return <Navigate to="/" replace />;
    }

    return (
        <AuthLayout>
            <RegisterForm onSuccess={ () => <Navigate to="/" replace /> } />
        </AuthLayout>
    );
};

export default Register;
