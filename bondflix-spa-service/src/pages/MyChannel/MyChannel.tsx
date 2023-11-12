import { MyContentsTable } from "./MyChannel.components";

export function MyChannel() {
    return (
        <div>
            <h1 style={{ textAlign: "center" }}>My Contents</h1>
            <div style={{ height: "70vh" }}>
                <MyContentsTable />
            </div>
        </div>
    );
}
