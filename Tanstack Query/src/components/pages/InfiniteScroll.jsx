import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { fetchUsers } from '../../api/PostApi';
import { useInView } from "react-intersection-observer";

export default function InfiniteScroll() {
    const {
        data,
        hasNextPage,
        fetchNextPage,
        isLoading,
        isFetchingNextPage,
        error,
    } = useInfiniteQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
        getNextPageParam: (lastPage) => {
            console.log('Last page:', lastPage);
            return lastPage.users.length > 0 ? lastPage.nextPage : undefined;
        },
    });

    console.log('Data:', data);
    console.log('Has Next Page:', hasNextPage);

    // const handleScroll = () => {
    //     const bottom =
    //         window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100; // Relaxed threshold
    //     if (bottom && hasNextPage && !isFetchingNextPage) {
    //         console.log('Fetching next page...');
    //         fetchNextPage();
    //     }
    // };

    const { ref, inView } = useInView({
        threshold: 1,
    });

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    // useEffect(() => {
    //     window.addEventListener('scroll', handleScroll);
    //     return () => window.removeEventListener('scroll', handleScroll);
    // }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

    if (isLoading)
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-2xl text-gray-300 animate-pulse">Loading...</div>
            </div>
        );

    if (error)
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-2xl text-red-400">Error: {error.message}</div>
            </div>
        );

    return (
        <div className="min-h-screen bg-gray-900 p-4">
            <h1 className="text-4xl font-bold text-white text-center mb-8">GitHub Users</h1>
            <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.pages.map((page, pageIndex) =>
                    page.users.map((user) => (
                        <div
                            key={`${user.id}-${pageIndex}`}
                            className="bg-gray-800 rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300"
                        >
                            <img
                                src={user.avatar_url}
                                alt={user.login}
                                className="w-24 h-24 rounded-full mx-auto mb-4"
                            />
                            <h2 className="text-xl font-semibold text-white text-center">{user.login}</h2>
                            <p className="text-gray-400 text-center mt-2">
                                {user.type === 'User' ? 'Individual' : 'Organization'}
                            </p>
                            <a
                                href={user.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block mt-4 text-center text-blue-400 hover:text-blue-300 transition-colors"
                            >
                                View Profile
                            </a>
                        </div>
                    ))
                )}
            </div>
            {hasNextPage && (
                <div className="mt-8 text-center">
                    <button
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition-colors disabled:opacity-50"
                    >
                        {isFetchingNextPage ? 'Loading More...' : 'Load More'}
                    </button>
                </div>
            )}
            <div ref={ref}></div>
        </div>
    );
}