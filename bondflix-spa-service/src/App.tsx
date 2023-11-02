import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import { UserDashboard } from "./pages/UserDashboard/UserDashboard.tsx";
import { Login } from "./pages/Login/Login.tsx";
import { useAutoLogin } from "./pages/Login/Login.hook.tsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" errorElement={<ErrorPage />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<UserDashboard />} />
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

//TODO: move, improve
function ErrorPage() {
    return <h1>Page not found</h1>;
}
function Home() {
    useAutoLogin();
    return <h1>Welcome</h1>;
}
