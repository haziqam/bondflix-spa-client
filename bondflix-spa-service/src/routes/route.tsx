import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { UserDashboard } from "../pages/UserDashboard/UserDashboard.tsx";
import { Login } from "../pages/Login/Login.tsx";
import { Home } from "../pages/Home/Home.tsx";
import { DashboardBaseComponent } from "../pages/UserDashboard/UserDashboard.components.tsx";
import { Error } from "../pages/Error/Error.tsx";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" errorElement={<Error />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<DashboardBaseComponent />}>
                <Route index element={<UserDashboard />} />
            </Route>
        </Route>
    )
);
