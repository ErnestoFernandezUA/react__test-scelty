import React, { useEffect } from 'react';
import { createHashRouter, Outlet, useLoaderData } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from './store/hooks';
import { getPostsAsync, selectPosts } from './features/Posts/postsSlice';
import './App.scss';
import { NotFound } from './pages/NotFound';
import { HomePage } from './pages/HomePage/HomePage';
import { PostPage } from './pages/PostPage/PostPage';
import { getAllUsers } from './api/users';
import { User } from './type/User';
import { PageForm1 } from './pages/PageForm1';
import { PageForm2 } from './pages/PageForm2';

export async function rootLoader() {
  const response = await getAllUsers();

  return response;
}

export const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    loader: rootLoader,
    id: "root",
    children: [
      {
        path: "/",
        element: <HomePage />,
        id: "homepage",
        errorElement: <>Error on Homepage</>,
      },
      {
        path: "/form1",
        element: <PageForm1 />,
        errorElement: <>Error on Form1Page</>,
      },
      {
        path: "/form2",
        element: <PageForm2 />,
        errorElement: <>Error on Form2Page</>,
      },
      // {
      //   path: "/post/:id",
      //   element: <PostPage />,
      //   errorElement: <>Error on PostPage</>,
      // },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <header className="App__Header">
        <h1>React Template</h1>
      </header>

      <main className="App__Container">
        <Outlet/>     
      </main>
    </div>
  );
}

export default App;
