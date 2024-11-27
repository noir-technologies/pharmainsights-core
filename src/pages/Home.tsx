import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Home: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.auth);

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex justify-center items-center">
            <h1 className="text-3xl font-bold">Welcome, { user?.name || 'Guest' }</h1>
        </div>
    );
};

export default Home;
