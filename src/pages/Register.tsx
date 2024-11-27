import React from 'react';
import AuthLayout from '../components/auth/AuthLayout';
import RegisterForm from '../components/auth/RegisterForm';


const Register: React.FC = () => {
    const handleSuccess = () => {
        window.location.href = '/login';
    };

    return (
        <AuthLayout>
            <RegisterForm onSuccess={ handleSuccess } />
        </AuthLayout>
    );
};

export default Register;
