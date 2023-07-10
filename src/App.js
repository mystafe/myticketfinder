import React from "react";
import "./App.css";

import Home from "./UI/Home";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import EventDetails from "./components/EventDetails";
import AppLayout from "./UI/AppLayout";

import NotFound from "./UI/NotFound";

import AdminPage from "./UI/AdminPage";

import TestDiv from "./UI/TestDiv";
import AdminPageNew from "./UI/AdminPageNew";
import LoginPage from "./UI/LoginPage";

import EventDetail from "./UI/EventDetail";
import AllEvents from "./UI/MainPageEvents/AllEvents";

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/test",
          element: <TestDiv />,
        },
        {
          path: "/",
          element: <Home />,
        },
        // {
        //   path: "/",
        //   element: <Home />,
        // },
        {
          path: "/login/",
          element: <LoginPage />,
        },
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/admin",
          element: <AdminPage />,
        },
        {
          path: "/event/:id",
          element: <EventDetail />,
        },

        {
          path: "/admin2",
          element: <AdminPageNew />,
        },
        {
          path: "/event/",
          element: <AllEvents />,
        },
        {
          path: "/event/popularevents",
          element: <EventDetails />,
        },
        {
          path: "/event/upcomingevents",
          element: <EventDetails />,
        },
        {
          path: "/event/pastevents",
          element: <EventDetails />,
        },

        {
          path: "/event/freeevents",
          element: <EventDetails />,
        },
        {
          path: "/event/todaysevents",
          element: <EventDetails />,
        },
        {
          path: "/event/thisweeksevents",
          element: <EventDetails />,
        },
        {
          path: "/event/concertevents",
          element: <EventDetails />,
        },
        {
          path: "/event/sportsevents",
          element: <EventDetails />,
        },
        {
          path: "/event/comedyevents",
          element: <EventDetails />,
        },
        {
          path: "/event/movies",
          element: <EventDetails />,
        },
        {
          path: "/event/art",
          element: <EventDetails />,
        },

        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);

  // return (
  //   <div className="App">
  //     <Header />
  //     <Main />
  //     {/* <TicketEvent /> */}
  //     <Footer />
  //   </div>
  // );
  return <RouterProvider router={router} />;
}

export default App;
