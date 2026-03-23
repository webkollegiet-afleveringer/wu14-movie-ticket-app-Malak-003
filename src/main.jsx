import ReactDOM from "react-dom/client"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router"

import App from './App.jsx'
import "./style/main.sass"  

// Pages
import Home from './pages/home.jsx'
import Explore from "./pages/explore.jsx"
import Details from "./pages/details.jsx"
import Seats from "./pages/seats.jsx"
import Checkout from "./pages/checkout.jsx"
import Eticket from "./pages/eticket.jsx"



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      { path: "/", element: <Home /> },
      { path: "/explore", element: <Explore /> },
      { path: "/movie/:id", element: <Details /> },
      { path: "/movie/:id/seats", element: <Seats /> },
      { path: "/movie/:id/checkout", element: <Checkout /> },
      { path: "/movie/:id/eticket", element: <Eticket /> }

    ]
  },
]);


const root = document.getElementById("root")

ReactDOM.createRoot(root).render(
  <RouterProvider router={router} />,
)


