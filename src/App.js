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
import CreateCustomer from "./UI/CreateCustomer";
import NotFound from "./UI/NotFound";
import CreateStage from "./UI/CreateStage";
import CreateEvent from "./UI/CreateEvent";
import CreateTicket from "./UI/CreateTicket";

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
          path: "/event/create",
          element: <CreateEvent />,
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
          path: "/ticket/create",
          element: <CreateTicket />,
        },
        {
          path: "/place/create",
          element: <CreatePlace />,
        },
        {
          path: "/customer/create",
          element: <CreateCustomer />,
        },
        {
          path: "/stage/create",
          element: <CreateStage />,
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
