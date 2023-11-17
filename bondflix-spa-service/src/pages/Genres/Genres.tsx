import { GenresTable } from "./Genres.components";

export function Genres() {
    return (
        <div>
            <h1 style={{ textAlign: "center" }}>Genres</h1>
            <div style={{ height: "70vh" }}>
                <GenresTable />
            </div>
        </div>
    );
}
