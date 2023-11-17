import { SponsorsTable } from "./Sponsors.components";

export function Sponsors() {
    return (
        <div>
            <h1 style={{ textAlign: "center" }}>Sponsors</h1>
            <div style={{ height: "70vh" }}>
                <SponsorsTable />
            </div>
        </div>
    );
}
