import React from 'react'
import { fetchIndvPost } from '../../api/PostApi';
import { NavLink, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

export default function FetchPage() {

    const { id } = useParams()

    const { data, isLoading, error } = useQuery({
        queryKey: ['post', id],
        queryFn: () => fetchIndvPost(id),
    });

    if (isLoading)
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-2xl text-gray-700 animate-pulse">Loading...</div>
            </div>
        );
    if (error)
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-2xl text-red-600">Error: {error.message}</div>
            </div>
        );

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 gap-5">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Fetch Page</h1>
            <ul className="max-w-4xl mx-auto space-y-4">
                <li
                    className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                    <p className="text-sm text-gray-500">ID: {data.id}</p>
                    <h2 className="text-xl font-semibold text-gray-800">{data.title}</h2>
                    <p className="text-gray-600 mt-2">{data.body}</p>
                </li>
            </ul>
            <NavLink to="/rq">
                <button className='bg-green-600 border-none outline-none px-8 py-4 rounded-md'>Go Posts</button>
            </NavLink>
        </div>
    )
}
