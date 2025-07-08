import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

export const PostApi = async () => {
  try {
    const res = await api.get('/posts');
    return res.status === 200 ? res.data : [];
  } catch (error) {
    console.error('API Error:', error.message);
    throw new Error('Failed to fetch posts');
  }
};