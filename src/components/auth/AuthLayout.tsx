import React from 'react';

interface Props {
    children: React.ReactNode;
}

const AuthLayout: React.FC<Props> = ({ children }) => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex justify-center items-center">
            <div className="p-6 bg-blue-100 rounded-lg shadow-md w-full max-w-md">
                { children }
            </div>
        </div>
    );
};

export default AuthLayout;
