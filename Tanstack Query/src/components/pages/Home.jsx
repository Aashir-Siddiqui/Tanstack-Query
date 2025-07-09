import React from 'react';

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Tanstack Practice</h1>
            <p className="text-lg text-gray-600 max-w-2xl text-center">
                Explore posts and data fetched using React Query. Navigate to FetchRQ to see the latest posts!
            </p>
        </div>
    );
}