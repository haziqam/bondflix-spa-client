import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import { deleteSponsor, getAllSponsors } from "../../services/sponsor.service";
import { Button } from "primereact/button";
import { useToast } from "../../hooks/useToast";
import { Toast } from "primereact/toast";

export function SponsorsTable() {
    const [sponsors, setSponsors] = useState<Sponsor[]>([]);

    useEffect(() => {
        getAllSponsors().then((response) => {
            if (response.success) {
                setSponsors(response.data as Sponsor[]);
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
                value={sponsors}
                dataKey="id"
                emptyMessage="No Sponsors."
                showGridlines
                scrollable
                scrollHeight="70vh"
                style={{ width: "700px" }}
            >
                <Column header="ID" field="id" />
                <Column header="Name" field="name" />
                <Column header="Status" field="sponsor_status" />
                <Column header="URL" field="link" />
                <Column header="Actions" body={SponsorActionsTemplate} />
            </DataTable>
        </div>
    );
}

function SponsorActionsTemplate(sponsor: Sponsor) {
    const { toastRef, showSuccess, showError } = useToast();
    const handleDelete = () => {
        deleteSponsor(sponsor.id).then((response) => {
            if (response.success) {
                showSuccess("Successfully deleted sponsor");
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            } else {
                showError(`Failed to delete sponsor: ${response.message}`);
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
