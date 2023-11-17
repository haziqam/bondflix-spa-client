import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import {
    deleteCategory,
    getAllCategories,
} from "../../services/category.service";
import { Button } from "primereact/button";
import { useToast } from "../../hooks/useToast";
import { Toast } from "primereact/toast";

export function CategoriesTable() {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        getAllCategories().then((response) => {
            if (response.success) {
                setCategories(response.data as Category[]);
            }
        });
    }, []);

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
            }}
        >
            <DataTable
                value={categories}
                dataKey="id"
                emptyMessage="No Categories."
                showGridlines
                scrollable
                scrollHeight="70vh"
                style={{ width: "700px" }}
            >
                <Column header="ID" field="id" />
                <Column header="Name" field="name" />
                <Column header="Actions" body={CategoryActionsTemplate} />
            </DataTable>
        </div>
    );
}

function CategoryActionsTemplate(category: Category) {
    const { toastRef, showSuccess, showError } = useToast();
    const handleDelete = () => {
        deleteCategory(category.id).then((response) => {
            if (response.success) {
                showSuccess("Successfully deleted category");
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            } else {
                showError(`Failed to delete category: ${response.message}`);
            }
        });
    };
    return (
        <div>
            <Toast ref={toastRef} position="bottom-right" />
            <Button severity="danger" onClick={handleDelete}>
                Delete
            </Button>
        </div>
    );
}
