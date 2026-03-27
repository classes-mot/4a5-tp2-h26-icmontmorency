import { useState } from 'react';
import GameList from "./components/GameList/GameList";
import GameForm from "./components/GameForm/GameForm";
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./navigation/RootLayout"
import LoginForm from "./components/LoginForm/LoginForm"
import { AuthContext } from "./context/AuthContext/AuthContext"
import { games } from "./data/games"
import ErrorPage from './navigation/ErrorPage';

function App() {
  if (localStorage.getItem("games") === null) {
    localStorage.setItem("games", JSON.stringify(games));
  }

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = () => {
    setIsLoggedIn(true);
  }

  const logoutHandler = () => {
    setIsLoggedIn(false);
  }

  const router = createBrowserRouter([
    {
      path: "/", element: <RootLayout />, errorElement: <ErrorPage />,
      children: [
        { path: "/", element: <GameList /> },
        { path: "/login", element: <div className='addRoot'><LoginForm /></div> },
        { path: "*", element: <ErrorPage /> },
      ]
    }
  ])

  const routerLoggedIn = createBrowserRouter([
    {
      path: "/", element: <RootLayout />, errorElement: <ErrorPage />,
      children: [

        { path: "/", element: <GameList /> },


        { path: "/login", element: <div className='addRoot'><LoginForm /></div> },
        { path: "/add", element: <div className='addRoot'><GameForm mode="add" /></div> },
        { path: "/edit/:id", element: <div className='addRoot'><GameForm mode="mod" /></div> },
        { path: "*", element: <ErrorPage /> },
      ]
    }
  ])

  return (
    <AuthContext.Provider value={{
      isLoggedIn: isLoggedIn,
      login: loginHandler,
      logout: logoutHandler
    }}>
      <RouterProvider router={isLoggedIn ? routerLoggedIn : router} />
    </AuthContext.Provider>
  )
}

export default App
