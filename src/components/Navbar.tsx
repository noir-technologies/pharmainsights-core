import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar bg-base-100 shadow-md mb-4">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost normal-case text-xl">PharmaInsights</Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal p-0">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/products">Products</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
