import "./App.css";

import Events from "../src/UI/Events";
import Home from "./UI/Home";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import EventDetails from "./components/EventDetails";

import AppLayout from "./UI/AppLayout";

import NotFound from "./UI/NotFound";

import AdminPage from "./UI/AdminPage";
import CreateTicketForm from "./components/CreateTicketForm";
import CreateEventForm from "./components/CreateEventForm";
import CreateCountryForm from "./components/CreateCountryForm";
import CreateCityForm from "./components/CreateCityForm";
import CreateAddressForm from "./components/CreateAddressForm";
import ListEventSeatsForm from "./components/ListEventSeatsForm";
import CreatePlaceForm from "./components/CreatePlaceForm";
import CreateCustomerForm from "./components/CreateCustomerForm";
import CreateRatingForm from "./components/CreateRatingForm";
import CreateStageForm from "./components/CreateStageForm";
import CreateEventImageForm from "./components/CreateEventImageForm";
import CreateEventStageForm from "./components/CreateEventStageForm";
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
          path: "/home",
          element: <Home />,
        },
        {
          path: "/admin",
          element: <AdminPage />,
        },
        {
          path: "/event",
          element: <Events />,
        },
        {
          path: "/event/create",
          element: <CreateEventForm />,
        },
        {
          path: "/event/:id",
          element: <EventDetails />,
        },
        {
          path: "/country/create",
          element: <CreateCountryForm />,
        },
        {
          path: "/city/create",
          element: <CreateCityForm />,
        },
        {
          path: "/address/create",
          element: <CreateAddressForm />,
        },

        {
          path: "/ticket/create",
          element: <CreateTicketForm />,
        },
        {
          path: "/eventseat/list",
          element: <ListEventSeatsForm />,
        },
        {
          path: "/place/create",
          element: <CreatePlaceForm />,
        },
        {
          path: "/customer/create",
          element: <CreateCustomerForm />,
        },
        {
          path: "/rating/create",
          element: <CreateRatingForm />,
        },
        {
          path: "/stage/create",
          element: <CreateStageForm />,
        },
        {
          path: "/eventimage/create",
          element: <CreateEventImageForm />,
        },
        { path: "/eventstage/create", element: <CreateEventStageForm /> },
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
