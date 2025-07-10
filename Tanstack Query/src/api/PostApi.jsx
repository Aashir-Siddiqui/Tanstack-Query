import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

export const PostApi = async (pageNumber) => {
  try {
    const res = await api.get(`/posts?_start=${pageNumber}&_limit=3`);
    return res.status === 200 ? res.data : [];
  } catch (error) {
    console.error('API Error:', error.message);
    throw new Error('Failed to fetch posts');
  }
};

export const delPost = (id) => {
  return api.delete(`/posts/${id}`)
}

export const updatePost = (id) => {
  return api.patch(`/posts/${id}`, { title: 'I have updated' })
}

export const fetchIndvPost = async (id) => {
  try {
    const res = await api.get(`/posts/${id}`);
    return res.status === 200 ? res.data : [];
  } catch (error) {
    console.error('API Error:', error.message);
    throw new Error('Failed to fetch posts');
  }
}

const userApi = axios.create({
  baseURL: 'https://api.github.com',
});

export const fetchUsers = async ({ pageParam = 1 }) => {
  try {
    const res = await userApi.get(`/users?per_page=10&page=${pageParam}`);
    return {
      users: res.data,
      nextPage: res.data.length > 0 ? pageParam + 1 : undefined, // Stop if no more users
    };
  } catch (error) {
    console.error('API Error:', error.message);
    throw new Error('Failed to fetch users'); // Fixed error message
  }
};