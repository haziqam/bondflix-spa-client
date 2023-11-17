export function HamburgerButtonIcon() {
    return <i className="pi pi-bars"></i>;
}

const sharedIconStyle = {
    fontSize: "1.4rem",
    marginRight: "8px",
    color: "#6c757d",
};

export function UploadIcon() {
    return <i className="pi pi-video" style={sharedIconStyle}></i>;
}

export function MyChannelIcon() {
    return <i className="pi pi-user" style={sharedIconStyle}></i>;
}

export function LogoutIcon() {
    return <i className="pi pi-sign-out" style={sharedIconStyle}></i>;
}

export function SubscriptionsIcon() {
    //TODO: move link to html head
    return (
        <>
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
            />
            <span className="material-symbols-outlined" style={sharedIconStyle}>
                Subscriptions
            </span>
        </>
    );
}