import { useState } from 'react';
import Home from './components/pages/Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/ui/Layout';
import FetchRQ from './components/pages/FetchRQ';
import FetchPage from './components/Pages/FetchPage';
import InfiniteScroll from './components/Pages/InfiniteScroll';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path='/rq' element={<FetchRQ />}></Route>
          <Route path='/rq/:id' element={<FetchPage />}></Route>
          <Route path='/infinite' element={<InfiniteScroll />}></Route>
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;