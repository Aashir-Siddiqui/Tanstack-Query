import React from 'react';
import { PostApi } from '../../api/PostApi';
import { useQuery } from '@tanstack/react-query';

export default function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: PostApi,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
      <ul>
        {data?.map((currElement) => {
          const { id, userId, title, body } = currElement;
          return (
            <li key={id}>
              <p>User ID: {userId}</p>
              <h1>{title}</h1>
              <p>{body}</p>
            </li>
          );
        })}
      </ul>
  );
}