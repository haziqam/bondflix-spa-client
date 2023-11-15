import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { UserDashboard } from "../pages/UserDashboard/UserDashboard.tsx";
import { Login } from "../pages/Login/Login.tsx";
import { Home } from "../pages/Home/Home.tsx";
import { DashboardBaseComponent } from "../pages/UserDashboard/UserDashboard.components.tsx";
import Error from "../pages/Error/Error.tsx";
import { Register } from "../pages/Register/Register.tsx";
import { Watch } from "../pages/Watch/Watch.tsx";
import { Subscription } from "../pages/Subscription/Subscription.tsx";
import { Results } from "../pages/Results/Results.tsx";
import { MyChannel } from "../pages/MyChannel/MyChannel.tsx";
import { Upload } from "../pages/Upload/Upload.tsx";
import { Studio } from "../pages/Studio/Studio.tsx";
import { AdminDashboard } from "../pages/AdminDashboard/AdminDashboard.tsx";



export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" errorElement={<Error />}>
            <Route index element={<Home />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<DashboardBaseComponent />}>
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route path="/watch" element={<Watch />} />
                <Route path="/subscriptions" element={<Subscription />} />
                <Route path="/results" element={<Results />} />
                <Route path="/mychannel" element={<MyChannel />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/studio" element={<Studio />} />
            </Route>
        </Route>
    )
);
