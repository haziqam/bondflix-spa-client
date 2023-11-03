import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primeicons/primeicons.css";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Outlet, useNavigate } from "react-router-dom";
import { logout } from "../../services/auth.service";
import { useAuthorize } from "../../hooks/useAuthorize";
import { useToast } from "../../hooks/useToast";
import logo from "../../assets/logo.png";

export function DashboardContent() {
    return <div>testt</div>;
}

export function DashboardBaseComponent() {
    const { isAuthorized } = useAuthorize();
    const navigate = useNavigate();

    if (isAuthorized === false) {
        navigate("/login");
    }

    const [sidebarVisible, setSidebarVisible] = useState(false);

    return (
        <>
            <Masthead setSidebarVisible={setSidebarVisible} />
            <DashboardSidebar
                sidebarVisible={sidebarVisible}
                setSidebarVisible={setSidebarVisible}
            />
            <Outlet />
        </>
    );
}

function DashboardSidebar(props: {
    sidebarVisible: boolean;
    setSidebarVisible: Dispatch<SetStateAction<boolean>>;
}) {
    const { sidebarVisible, setSidebarVisible } = props;
    const navigate = useNavigate();
    const { toastRef, showSuccess, showError } = useToast();

    const handleLogout = async () => {
        const response = await logout();
        if (response.success) {
            showSuccess("Logged out successfully");
            setTimeout(() => {
                navigate("/login");
            }, 1000);
        } else {
            showError(`Failed to log out: ${response.message}`);
        }
    };

    return (
        <>
            <Toast ref={toastRef} position="bottom-right" />
            <Sidebar
                visible={sidebarVisible}
                position="left"
                onHide={() => setSidebarVisible(false)}
                // pt={{ closeIcon: }}
            >
                <h2>Left Sidebar</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <Button onClick={handleLogout}>Logout</Button>
            </Sidebar>
        </>
    );
}

function Masthead(props: {
    setSidebarVisible: Dispatch<SetStateAction<boolean>>;
}) {
    const { setSidebarVisible } = props;
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                gap: "120px",
            }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <Button
                    icon="pi pi-bars"
                    onClick={() => {
                        setSidebarVisible(true);
                    }}
                />
                <img
                    src={logo}
                    alt="Bondflix logo"
                    style={{ width: "150px" }}
                />
            </div>
            <SearchBar />
        </div>
    );
}

function SearchBar() {
    return (
        <div className="p-inputgroup" style={{ width: "400px" }}>
            <InputText placeholder="Search" />
            <Button icon="pi pi-search" />
        </div>
    );
}
