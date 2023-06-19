import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import Authentification from "../pages/authentification";
import { apiClient } from "../utils/apiClient";

const router = createBrowserRouter([
  {
    path: "/",
    element: <p>home</p>,
    loader: async () => {
      const isAuthenticated = await verifyAuthentification();
      if (isAuthenticated) {
        return fetchStarWarsTable();
      } else return redirect("/login");
    },
  },
  {
    path: "login",
    element: <Authentification />,
    loader: async () => {
      const isLoggedIn = await isAuthenticated();
      if (isLoggedIn.status === 403) return null;
      if (isLoggedIn.cookie) return redirect("/");
    },
  },
]);

const Router: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default Router;

async function verifyAuthentification() {
  const response = await apiClient("/auth/verify");
  if (response.status === 403) {
    return false;
  } else return true;
}

async function fetchStarWarsTable() {
  const starWarsTableData = await apiClient("/starwars/data");
  return { starWarsTableData };
}

async function isAuthenticated() {
  const response = await apiClient("/auth/verify");
  return response;
}
