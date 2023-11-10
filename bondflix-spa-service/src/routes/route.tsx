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
import { Register } from "../pages/Register/Register.tsx";
import { Watch } from "../pages/Watch/Watch.tsx";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" errorElement={<Error />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<DashboardBaseComponent />}>
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route path="/watch" element={<Watch />} />
            </Route>
        </Route>
    )
);
