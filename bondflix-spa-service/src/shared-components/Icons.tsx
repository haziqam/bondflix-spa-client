export function HamburgerButtonIcon() {
    return <i className="pi pi-bars"></i>;
}

export function UploadIcon() {
    return (
        <i
            className="pi pi-video"
            style={{
                fontSize: "1.4rem",
                marginRight: "8px",
                color: "#6c757d",
            }}
        ></i>
    );
}

export function MyChannelIcon() {
    return (
        <i
            className="pi pi-user"
            style={{
                fontSize: "1.4rem",
                marginRight: "8px",
                color: "#6c757d",
            }}
        ></i>
    );
}

export function LogoutIcon() {
    return (
        <i
            className="pi pi-sign-out"
            style={{
                fontSize: "1.4rem",
                marginRight: "8px",
                color: "#6c757d",
            }}
        ></i>
    );
}

export function SubscriptionsIcon() {
    return (
        <>
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
            />
            <span
                className="material-symbols-outlined"
                style={{
                    fontWeight: "lighter",
                    color: "#6c757d",
                    marginRight: "8px",
                }}
            >
                Subscriptions
            </span>
        </>
    );
}
