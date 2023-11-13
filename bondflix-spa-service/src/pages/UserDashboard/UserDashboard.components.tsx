import "primeicons/primeicons.css";
import "./UserDashboard.styles.css";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Outlet, useNavigate } from "react-router-dom";
import { logout } from "../../services/auth.service";
import { useAuthorize } from "../../hooks/useAuthorize";
import { useToast } from "../../hooks/useToast";
import { Card } from "primereact/card";
import thumbnail1 from "../../assets/thumbnail1.jpg";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import {
    SubscriptionsIcon,
    UploadIcon,
    MyChannelIcon,
    LogoutIcon,
    HamburgerButtonIcon,
} from "../../shared-components/Icons";
import { BondflixLogo } from "../../shared-components/Logo";
import { flushSync } from "react-dom";

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

export function DashboardContent() {
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "20px 20px",
                padding: "10px 15px 15px 15px",
            }}
        >
            <ContentCard
                title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque error molestiae placeat accusantium tenetur sunt at aliquam fugit consequuntur. Exercitationem non beatae voluptatum est placeat distinctio, corporis ut quia quae."
                channelName="Mr Beast"
                thumbnailSrc={thumbnail1}
                id={10}
            />
        </div>
    );
}

function ContentCard(props: {
    title: string;
    channelName: string;
    thumbnailSrc: string;
    id: number;
}) {
    const { title, channelName, thumbnailSrc, id } = props;
    const navigate = useNavigate();
    const ContentHeader = (
        <img
            src={thumbnailSrc}
            alt="Video Thumbnail"
            style={{
                objectFit: "cover",
                borderTopLeftRadius: "6px",
                borderTopRightRadius: "6px",
            }}
        />
    );

    const ContentFooter = () => {
        return (
            <div>
                <div
                    style={{
                        display: "-webkit-box",
                        WebkitLineClamp: "2",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                    }}
                >
                    <h2 style={{ margin: "0", fontSize: "1rem" }}>{title}</h2>
                </div>

                <div
                    style={{
                        display: "-webkit-box",
                        WebkitLineClamp: "1",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        fontSize: "0.75rem",
                        paddingTop: "5px",
                        color: "#9b9b9b",
                    }}
                >
                    {channelName}
                </div>
            </div>
        );
    };

    const handleClick = () => {
        const uri = `/watch?id=${id}`;
        navigate(encodeURI(uri));
    };

    return (
        <Card
            header={ContentHeader}
            footer={ContentFooter}
            pt={{
                footer: {
                    style: {
                        paddingTop: "0",
                    },
                },
                body: {
                    style: {
                        padding: "0.5rem",
                    },
                },
            }}
            className="ContentCard"
            onClick={handleClick}
        ></Card>
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
        {
            label: "Subscriptions",
            icon: <SubscriptionsIcon />,
            command: () => {
                navigate("/subscriptions");
                setSidebarVisible(false);
            },
        },
        {
            label: "Upload",
            icon: <UploadIcon />,
            command: () => {
                navigate("/upload");
                setSidebarVisible(false);
            },
        },
        {
            label: "My Channel",
            icon: <MyChannelIcon />,
            command: () => {
                navigate("/mychannel");
                setSidebarVisible(false);
            },
        },
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
}) {
    const { setSidebarVisible } = props;
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
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
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
            <SearchBar />
        </div>
    );
}

function SearchBar() {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleSearchClick = () => {
        if (searchQuery !== "") {
            const uri = `/results?search_query=${searchQuery}`;
            navigate(encodeURI(uri));
        }
    };
    return (
        <div className="p-inputgroup" style={{ width: "600px" }}>
            <InputText
                value={searchQuery}
                placeholder="Search"
                onChange={(e) => {
                    setSearchQuery(e.target.value);
                }}
            />
            <Button icon="pi pi-search" onClick={handleSearchClick} />
        </div>
    );
}
