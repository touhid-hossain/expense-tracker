import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";

import Dashboard from "@/pages/AdminDashboard/Dashboard";
import Login from "@/pages/Login/Login";
import Settings from "@/pages/Settings/Settings";
import SignUp from "@/pages/Signup/SignUp";
import Transaction from "@/pages/Transaction/Transaction";

const Routes = () => {
  // Route configurations go here

  const routesForPublic = [
    {
      path: "/service",
      element: <div>Service Page</div>,
    },
    {
      path: "/about-us",
      element: <div>About Us</div>,
    },
  ];

  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: "/transaction",
          element: <Transaction />,
        },
        {
          path: "/settings",
          element: <Settings />,
        },
      ],
    },
  ];

  const routesForNotAuthenticatedOnly = [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
  ];

  const router = createBrowserRouter([
    ...routesForPublic,
    ...routesForNotAuthenticatedOnly,
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
