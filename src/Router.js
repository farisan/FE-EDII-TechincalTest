import { createBrowserRouter } from "react-router-dom";

// import pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/user/Dashboard";
import MainLayout from "./components/MainLayout";
import { PrivateRoute } from "./utils/privateRouter";
import { ProtectAuth } from "./utils/protectAuth";
import NotFound from "./pages/NotFound";
import Biodata from "./pages/user/Biodata";
import DataUser from "./pages/admin/DataUser";

// routernya
const router = createBrowserRouter([
  { path: "/*", element: <NotFound /> },
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/biodata",
            element: <Biodata />,
          },
          {
            path: "/management-user",
            element: <DataUser />,
          },
        ],
      },
    ],
  },
  {
    element: <ProtectAuth />,
    children: [
      { path: "/", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
]);

export default router;
