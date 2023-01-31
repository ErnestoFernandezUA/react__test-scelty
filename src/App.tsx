import React from 'react';
import { createHashRouter, Outlet } from 'react-router-dom'
import './App.scss';
import { NotFound } from './pages/NotFound';
import { HomePage } from './pages/HomePage/HomePage';
import { PageForm1 } from './pages/PageForm1';
import { PageForm2 } from './pages/PageForm2';
import { PageResult1 } from './pages/PageResult1';
import { PageResult2 } from './pages/PageResult2';

export const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
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
      {
        path: "/result1",
        element: <PageResult1 />,
        errorElement: <>Error on ResultPage1</>,
      },
      {
        path: "/result2",
        element: <PageResult2 />,
        errorElement: <>Error on ResultPage2</>,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <header className="App__Header">
        <h1>React Pet Project</h1>
      </header>

      <main className="App__Container">
        <Outlet/>     
      </main>
    </div>
  );
}

export default App;
