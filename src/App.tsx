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
        path: "/post/:id",
        element: <PostPage />,
        errorElement: <>Error on Homepage</>,
      },
    ],
  },
]);

function App() {
  const users = useLoaderData() as User[];
  const posts = useAppSelector(selectPosts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(getPostsAsync());
    }

  }, [dispatch])

  return (
    <div className="App">
      <header className="App__Header">
        <h1>React Template</h1>
        {users.length && users.map((user: User) => (
          <p key={user.id}>{user.name}</p>
        ))}
      </header>

      <main className="App__Container">
        <Outlet/>     
      </main>
    </div>
  );
}

export default App;
