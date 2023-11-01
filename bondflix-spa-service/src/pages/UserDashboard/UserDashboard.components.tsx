import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import { Button } from "primereact/button";
import { logout } from "../../services/auth.service";
import { usePageNavigation } from "../../contexts/PageNavigation";
import { Login } from "../Login/Login";
import { useEffect, useState } from "react";

export function Something() {
    const { navigateTo } = usePageNavigation();
    const [logoutSuccess, setLogoutSuccess] = useState(false);

    const handleLogout = async () => {
        // TODO: use react query to handle loading state
        const response = await logout();
        if (response.success) {
            // No navigation here; set a flag or state
            setLogoutSuccess(true);
        } else {
            console.log("Wrong!");
        }
    };

    useEffect(() => {
        // Use a flag or state to trigger navigation outside of rendering
        // For example, you can use a "logoutSuccess" state
        if (logoutSuccess) {
            navigateTo(<Login />);
        }
    }, [logoutSuccess]);

    return (
        <div>
            <h1>Welcome to the dashboard</h1>
            <Button onClick={handleLogout}>Logout</Button>
        </div>
    );
}
