import "primeicons/primeicons.css";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Toast } from "primereact/toast";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../../services/auth.service";
import { useAuthorize } from "../../hooks/useAuthorize";
import { useToast } from "../../hooks/useToast";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import {
    LogoutIcon,
    HamburgerButtonIcon,
} from "../../shared-components/Icons";
import { BondflixLogo } from "../../shared-components/Logo";
import Cookies from "js-cookie";

export function AdminDashboardBaseComponent() {
    const { isAuthorized } = useAuthorize();
    const [userId, setUserId] = useState<number>();
    const navigate = useNavigate();

    if (isAuthorized === false) {
        navigate("/login");
    }

    const [sidebarVisible, setSidebarVisible] = useState(false);
    useEffect(() => {
        const intervalId = setInterval(() => {
          if (!Cookies.get("userId")) {
            logout().then(() => {
              navigate("/login");
            });
          }
        }, 2000);
    
        return () => {
          clearInterval(intervalId);
        };
      }, []);
    

    useEffect(() => {
        const userIdFromCookie = Cookies.get("userId");
        if (!!userIdFromCookie) {
            setUserId(parseInt(userIdFromCookie, 10));
        }
    }, []);

    return (
        <>
            <Masthead setSidebarVisible={setSidebarVisible} userId={userId!} />
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

    const items: MenuItem[] = [
        // Sponsor
        {
            label: "Sponsors",
            command: () => {
                navigate("/admin/sponsors");
                setSidebarVisible(false);
            },
        },
        // Genre
        {
            label: "Genres",
            command: () => {
                navigate("/admin/genres");
                setSidebarVisible(false);
            },
        },
        // Category
        {
            label: "Categories",
            command: () => {
                navigate("/admin/categories");
                setSidebarVisible(false);
            },
        },
        // Logout
        { label: "Logout", icon: <LogoutIcon />, command: handleLogout },
    ];

    return (
        <>
            <Toast ref={toastRef} position="bottom-right" />
            <Sidebar
                visible={sidebarVisible}
                position="left"
                onHide={() => setSidebarVisible(false)}
                header={<BondflixLogo />}
                closeIcon={<HamburgerButtonIcon />}
                style={{
                    width: "250px",
                    zIndex: "100",
                }}
                pt={{
                    header: {
                        style: {
                            paddingTop: "10px",
                        },
                    },
                }}
            >
                <Menu model={items} />
            </Sidebar>
        </>
    );
}

function Masthead(props: {
    setSidebarVisible: Dispatch<SetStateAction<boolean>>;
    userId: number;
}) {
    const { setSidebarVisible, userId } = props;
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                gap: "120px",
                position: "sticky",
                top: "0",
                left: "0",
                backgroundColor: "white",
                padding: "10px",
                zIndex: "99",
            }}
        >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                <button
                    className="SidebarMenuButton"
                    style={{
                        backgroundColor: "transparent",
                        color: "#6c757d",
                        border: "0",
                        borderRadius: "50%",
                        width: "32px",
                        height: "32px",
                        padding: "0",
                        transition:
                            "background-color 0.2s, color 0.2s, box-shadow 0.2s",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                    }}
                    onClick={() => {
                        setSidebarVisible(true);
                    }}
                >
                    <HamburgerButtonIcon />
                </button>
                <BondflixLogo />
            </div>
            <Link to={"/myaccount"}>
                <img
                    src={`http://localhost:3000/static/pictures?id=${userId}`}
                    alt="User profile picture"
                    style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                    }}
                />
            </Link>
        </div>
    );
}