import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import { deleteGenre, getAllGenres } from "../../services/genre.service";
import { Button } from "primereact/button";
import { useToast } from "../../hooks/useToast";
import { Toast } from "primereact/toast";

export function GenresTable() {
    const [genres, setGenres] = useState<Genre[]>([]);

    useEffect(() => {
        getAllGenres().then((response) => {
            if (response.success) {
                setGenres(response.data as Genre[]);
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
                value={genres}
                dataKey="id"
                emptyMessage="No Genres."
                showGridlines
                scrollable
                scrollHeight="70vh"
                style={{ width: "700px" }}
            >
                <Column header="ID" field="id" />
                <Column header="Name" field="name" />
                <Column header="Actions" body={GenreActionsTemplate} />
            </DataTable>
        </div>
    );
}

function GenreActionsTemplate(genre: Genre) {
    const { toastRef, showSuccess, showError } = useToast();
    const handleDelete = () => {
        deleteGenre(genre.id).then((response) => {
            if (response.success) {
                showSuccess("Successfully deleted genre");
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            } else {
                showError(`Failed to delete genre: ${response.message}`);
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
