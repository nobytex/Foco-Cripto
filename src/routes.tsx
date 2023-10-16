import { createBrowserRouter } from "react-router-dom";

import { Home } from "./pages/home";
import { Detail } from "./pages/detail";
import { Error404 } from "./pages/error404";

import { Layout } from './components/layout'

const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/detail/:cripto',
                element: <Detail/>
            },
            {
                path: '*',
                element: <Error404/>
            }
        ]
    }
])

export { router }