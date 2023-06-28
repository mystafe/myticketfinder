import "./App.css";
import Header from "../src/components/Header";
import Events from "../src/UI/Events";
import Home from "./UI/Home";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import EventDetails from "./components/EventDetails";
import CreateCountry from "./UI/CreateCountry";

function App() {
  const router = createBrowserRouter([
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
