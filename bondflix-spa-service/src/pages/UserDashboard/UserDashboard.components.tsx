import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import { Button } from "primereact/button";
import { logout } from "../../services/auth.service";
import { usePageNavigation } from "../../contexts/PageNavigation";
import { Login } from "../Login/Login";

export function Something() {
    const { navigateTo } = usePageNavigation();
    const handleLogout = async () => {
        // TODO: use react query to handle loading state
        const response = await logout();
        if (response.success) {
            navigateTo(<Login />);
        } else {
            console.log("Wrong!");
        }
    };
    return (
        <div>
            <h1>Welcome to the dashboard</h1>
            <Button onClick={handleLogout}>Logout</Button>
        </div>
    );
}
