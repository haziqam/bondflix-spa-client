import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import { Button } from "primereact/button";
import { logout } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/useToast";
import { Toast } from "primereact/toast";

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
