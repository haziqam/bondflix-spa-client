import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import { Button } from "primereact/button";
import { logout } from "../../services/auth.service";
import { Outlet, useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/useToast";
import { Toast } from "primereact/toast";
import { useAuthorize } from "../../hooks/useAuthorize";
import { Loading } from "../../shared-components/Loading";

export function Something() {
    const navigate = useNavigate();
    const handleLogout = async () => {
        // TODO: use react query to handle loading state
        const response = await logout();
        if (response.success) {
            navigate("/login");
        }
    };

    const { toastRef, showSuccess } = useToast();
    return (
        <div>
            <Toast ref={toastRef} />
            <h1>Welcome to the dashboard</h1>
            <Button
                onClick={() => {
                    showSuccess("Berhasil melakukan sesuatu");
                }}
            >
                Test toast
            </Button>
            <Button onClick={handleLogout}>Logout</Button>
        </div>
    );
}

export function DashboardBaseComponent() {
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

function DashboardNavbar() {
    return (
        <nav>
            <h2>This is navbar</h2>
        </nav>
    );
}
