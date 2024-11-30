import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Spots from "./components/Spots/Spots";
import SingleSpot from "./components/SingleSpot/SingleSpot";
import AddSpot from "./components/AddSpot/AddSpot";
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
        path: "/spots/add",
        element: <AddSpot />
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
