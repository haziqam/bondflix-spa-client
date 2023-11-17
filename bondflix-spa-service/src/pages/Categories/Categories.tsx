import { CategoriesTable } from "./Categories.components";

export function Categories() {
    return (
        <div>
            <h1 style={{ textAlign: "center" }}>Categories</h1>
            <div style={{ height: "70vh" }}>
                <CategoriesTable />
            </div>
        </div>
    );
}
