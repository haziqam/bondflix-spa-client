import { UsersTable } from "./Users.components";

export function Users() {
    return (
        <div>
            <h1 style={{ textAlign: "center" }}>Users</h1>
            <div style={{ height: "70vh" }}>
                <UsersTable />
            </div>
        </div>
    );
}
