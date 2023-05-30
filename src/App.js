import logo from "./logo.svg";
import "./App.css";
import Root from "./pages/Root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Expenses from "./pages/expense";
import Auth, { authAction } from "./pages/Auth";
import { tokenLoader } from "./store/fetchRequests";
import ForgotPassword from "./pages/forgotpPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    id: "token",
    loader: tokenLoader,
    children: [
      { index: true, element: <Home /> },
      {
        path: "expenses",
        element: <Expenses />,
      },
      {
        path:"forget-password",
        element:<ForgotPassword />,
      },
      {
        path: "/auth",
        element: <Auth />,
        action: authAction,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
