import React from "react";
import ReactDOM from "react-dom/client";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Vans, { loader as vansLoader } from "./pages/Vans/Vans";
import VanDetail, { loader as vanDetailLoader } from "./pages/Vans/VanDetail";
import Dashboard from "./pages/Host/Dashboard";
import Income from "./pages/Host/Income";
import Reviews from "./pages/Host/Reviews";
import HostVans, { loader as hostVansLoader } from "./pages/Host/HostVans";
import HostVanDetail, { loader as hostVanDetailLoader } from "./pages/Host/HostVanDetail";
import HostVanInfo from "./pages/Host/HostVanInfo";
import HostVanPricing from "./pages/Host/HostVanPricing";
import HostVanPhotos from "./pages/Host/HostVanPhotos";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import HostLayout from "./components/HostLayout";

import "./server";
import ErrorPage from "./pages/ErrorPage";
import Login, { loader as loginLoader, action as loginAction } from "./pages/Login";
import { requireAuth } from "./utils";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="login" element={<Login />} loader={loginLoader} action={loginAction} />
      <Route path="vans" loader={async ({ request }) => await requireAuth(request)}>
        <Route index element={<Vans />} loader={vansLoader} />
        <Route path=":id" element={<VanDetail />} loader={vanDetailLoader} />
      </Route>

      <Route path="host" element={<HostLayout />} loader={async ({ request }) => await requireAuth(request)}>
        <Route index element={<Dashboard />} loader={async ({ request }) => await requireAuth(request)} />
        <Route path="income" element={<Income />} loader={async ({ request }) => await requireAuth(request)} />
        <Route path="reviews" element={<Reviews />} loader={async ({ request }) => await requireAuth(request)} />
        <Route path="vans" element={<HostVans />} loader={hostVansLoader} />
        <Route path="vans/:id" element={<HostVanDetail />} loader={hostVanDetailLoader}>
          <Route index element={<HostVanInfo />} loader={async ({ request }) => await requireAuth(request)} />
          <Route path="pricing" element={<HostVanPricing />} loader={async ({ request }) => await requireAuth(request)} />
          <Route path="photos" element={<HostVanPhotos />} loader={async ({ request }) => await requireAuth(request)} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
