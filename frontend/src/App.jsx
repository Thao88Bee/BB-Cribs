import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Spots from "./components/Spots/Spots";
import SingleSpot from "./components/SingleSpot/SingleSpot";
import CreateSpot from "./components/CreateSpot/CreateSpot";
import UserSpot from "./components/UserSpots/UserSpots";
import UpdateSpot from "./components/UpdateSpot/UpdateSpot";
import * as sessionActions from "./store/session";

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Spots />,
      },
      {
        path: "/spots/:id",
        element: <SingleSpot />,
      },
      {
        path: "/spots/create",
        element: <CreateSpot />,
      },
      {
        path: "/users/:id/spots",
        element: <UserSpot />,
      },
      {
        path: "/spots/:id/update",
        element: <UpdateSpot />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
