import "./App.css";

import Events from "../src/UI/Events";
import Home from "./UI/Home";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import EventDetails from "./components/EventDetails";
import CreateCountry from "./UI/CreateCountry";
import AppLayout from "./UI/AppLayout";
import CreateCity from "./UI/CreateCity";
import CreateAddress from "./UI/CreateAddress";
import CreatePlace from "./UI/CreatePlace";

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/event",
          element: <Events />,
        },
        {
          path: "/event/:id",
          element: <EventDetails />,
        },
        {
          path: "/country/create",
          element: <CreateCountry />,
        },
        {
          path: "/city/create",
          element: <CreateCity />,
        },
        {
          path: "/address/create",
          element: <CreateAddress />,
        },

        {
          path: "/place/create",
          element: <CreatePlace />,
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
