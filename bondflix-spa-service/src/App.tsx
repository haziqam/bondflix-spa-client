import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
    Outlet,
    useNavigate,
} from "react-router-dom";
import { UserDashboard } from "./pages/UserDashboard/UserDashboard.tsx";
import { Login } from "./pages/Login/Login.tsx";
import { useAutoLogin } from "./hooks/useAutoLogin.ts";
import { useAuthorize } from "./hooks/useAuthorize.ts";

//TODO: move to a separate folder
const router = createBrowserRouter(
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

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
}

export default App;

//TODO: move to a separate folder

function Error() {
    return <h1>Page not found</h1>;
}
/**
 * The page component for root route ("/")
 * This component is responsible to check if the user is authorized.
 * If the user is authorized, it will redirect to dashboard page ("/dashboard")
 * Otherwise, it will redirect to login page ("/login")
 * While waiting for the authorization process, it will render a loading page component
 */
function Home() {
    useAutoLogin();
    return <Loading />;
}
function Loading() {
    return <h1>Welcome</h1>;
}

// TODO: Move to component folder
function DashboardNavbar() {
    return (
        <nav>
            <h2>This is navbar</h2>
        </nav>
    );
}

function DashboardBaseComponent() {
    const isAuthorized = useAuthorize();
    const navigate = useNavigate();
    if (isAuthorized === false) {
        setTimeout(() => {
            navigate("/login");
        }, 3000);
        return <Loading />;
    }
    return (
        <>
            <DashboardNavbar />
            <Outlet />
        </>
    );
}
