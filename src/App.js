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
import Jonas from "./UI/Jonas";
function App() {
  const menuLinks = [
    {
      name: "All Events",
      link: "/event/all",
    },
    {
      name: " Popular Events",
      link: "/event/popularevents",
    },
    {
      name: "Upcoming Events",
      link: "/event/upcomingevents",
    },
    {
      name: "Past Events",
      link: "/event/pastevents",
    },
    {
      name: "Free Events",
      link: "/event/freeevents",
    },
    {
      name: "Today's Events",
      link: "/event/todaysevents",
    },
    {
      name: "This Week's Events",
      link: "/event/thisweeksevents",
    },
    {
      name: "Free Events",
      link: "/event/freeevents",
    },
    {
      name: "Concert Events",
      link: "/event/concertevents",
    },
    {
      name: "Sports Events",
      link: "/event/sportsevents",
    },
    {
      name: "Comedy Events",
      link: "/event/comedyevents",
    },
    {
      name: "Movies",
      link: "/event/movies",
    },
    {
      name: "Art",
      link: "/event/art",
    },
  ];

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
          element: <Jonas />,
        },
        // {
        //   path: "/",
        //   element: <Home />,
        // },
        {
          path: "/login",
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
          element: <EventDetails />,
        },

        {
          path: "/admin2",
          element: <AdminPageNew />,
        },
        {
          path: "/event/all",
          element: <EventDetails />,
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
