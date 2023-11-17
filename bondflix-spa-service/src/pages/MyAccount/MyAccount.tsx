import { AccountInfo, AccountSettingsForm } from "./MyAccount.components";

export function MyAccount() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <h2>My Account</h2>
            <div
                style={{
                    display: "grid",
                    gap: "32px",
                    gridTemplateColumns: "1.5fr 1fr",
                    marginBottom: "2rem",
                }}
            >
                <AccountInfo />
                <AccountSettingsForm />
            </div>
        </div>
    );
}
