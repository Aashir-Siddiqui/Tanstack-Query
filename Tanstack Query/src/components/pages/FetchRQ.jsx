// FetchRQ.jsx
import React, { useState } from 'react';
import { PostApi } from '../../api/PostApi';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { NavLink } from 'react-router-dom';

export default function FetchRQ() {

    const [pageNumber, setPageNumber] = useState(0)

    const { data, isLoading, error } = useQuery({
        queryKey: ['posts', pageNumber],
        queryFn: () => PostApi(pageNumber),
        placeholderData: keepPreviousData,
        // gcTime: 1000,
        // staleTime: 5000,
        // refetchInterval: 2000,
        // refetchIntervalInBackground: true,
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
        <div className="min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Posts</h1>
            <ul className="max-w-4xl mx-auto space-y-4">
                {data?.map((currElement) => {
                    const { id, title, body } = currElement;
                    return (
                        <li
                            key={id}
                            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                        >
                            <NavLink to={`/rq/${id}`}>
                                <p className="text-sm text-gray-500">ID: {id}</p>
                                <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                                <p className="text-gray-600 mt-2">{body}</p>
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
            <div className='absolute bottom-10 left-8 flex items-center justify-center gap-5'>
                <button className='bg-green-600 border-none outline-none px-4 py-2 rounded-md' disabled={pageNumber === 0 ? true : false} onClick={() => setPageNumber((prev) => prev - 3)}>Prev</button>
                <h1 className='text-slate-900 text-xl'>{pageNumber / 3 + 1}</h1>
                <button className='bg-green-600 border-none outline-none px-4 py-2 rounded-md' onClick={() => setPageNumber((prev) => prev + 3)}>Next</button>
            </div>
        </div>
    );
}