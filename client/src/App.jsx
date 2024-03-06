import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/AdminDashboard/Dashboard";
import Login from "./pages/Login/Login";
import Settings from "./pages/Settings/Settings";
import SignUp from "./pages/Signup/SignUp";
import Transaction from "./pages/Transaction/Transaction";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/",
      element: <Layout />,
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
  ]);

  return <RouterProvider router={router} />;
}

export default App;
