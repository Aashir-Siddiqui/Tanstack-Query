import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="w-full bg-black text-white flex items-center justify-center gap-5 p-4">
            <NavLink
                to="/"
                className={({ isActive }) =>
                    `px-4 py-2 rounded hover:bg-gray-800 transition-colors ${isActive ? 'bg-gray-700' : ''}`
                }
            >
                Home
            </NavLink>
            <NavLink
                to="/rq"
                className={({ isActive }) =>
                    `px-4 py-2 rounded hover:bg-gray-800 transition-colors ${isActive ? 'bg-gray-700' : ''}`
                }
            >
                FetchRQ
            </NavLink>
        </nav>
    );
}