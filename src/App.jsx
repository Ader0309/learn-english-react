import "normalize.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import List from "./pages/List";
import Important from "./pages/Important";
import Test from "./pages/Test";
import Layout from "./pages/Layout";
import ErrorPage from "./pages/ErrorPage";

export default function App() {
    const router = createBrowserRouter([
        {
            path: "",
            element: <Layout />,
            children: [
                { path: "", element: <List /> },
                { path: "important", element: <Important /> },
                { path: "test", element: <Test /> },
            ],
            errorElement: <ErrorPage />,
        },
    ]);
    return (
        <>
            <RouterProvider router={router}></RouterProvider>
        </>
    );
}
