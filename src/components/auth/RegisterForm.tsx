import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../store/slices/authSlice';
import { RootState, AppDispatch } from '../../store/store';
import { showErrorAlert, showSuccessAlert } from '../../utils/alertUtils';

interface Props {
    onSuccess: () => void;
}

const RegisterForm: React.FC<Props> = ({ onSuccess }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pharmacyId, setPharmacyId] = useState<number | undefined>(undefined);
    const dispatch: AppDispatch = useDispatch();
    const { loading, error } = useSelector((state: RootState) => state.auth);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await dispatch(register({ name, email, password, pharmacyId }));
        if (result.meta.requestStatus !== 'rejected') {
            showSuccessAlert('Account created successfully!');
            onSuccess();
        } else {
            showErrorAlert('Failed to create account.');
            console.error('Registration failed:', result.payload);
        }
    };

    return (
        <form
            onSubmit={ handleSubmit }
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
        >
            <h2 className="text-3xl font-bold mb-4 text-center">Register</h2>
            { error && (
                <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-center">
                    { error }
                </div>
            ) }
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Name
                </label>
                <input
                    id="name"
                    type="text"
                    value={ name }
                    onChange={ (e) => setName(e.target.value) }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    value={ email }
                    onChange={ (e) => setEmail(e.target.value) }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    value={ password }
                    onChange={ (e) => setPassword(e.target.value) }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pharmacyId">
                    Pharmacy ID (Optional)
                </label>
                <input
                    id="pharmacyId"
                    type="number"
                    value={ pharmacyId || '' }
                    onChange={ (e) => setPharmacyId(Number(e.target.value)) }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="flex items-center justify-between">
                <button
                    type="submit"
                    disabled={ loading }
                    className="btn btn-primary normal-case text-sm text-white"
                >
                    { loading ? 'Registering...' : 'Register' }
                </button>
            </div>
            <p className="text-center text-gray-600 text-sm mt-4">
                Already have an account?{ ' ' }
                <a href="/login" className="text-blue-500 hover:underline">
                    Login here
                </a>
            </p>
        </form>
    );
};

export default RegisterForm;
