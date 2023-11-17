import { Button } from "primereact/button";
import { SponsorsTable } from "./Sponsors.components";
import { SponsorStatus, addSponsor } from "../../services/sponsor.service";
import { Dialog } from "primereact/dialog";
import { FormEvent, useState } from "react";
import { InputText } from "primereact/inputtext";
import { useToast } from "../../hooks/useToast";
import { Toast } from "primereact/toast";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";

export function Sponsors() {
    const [addDialogVisible, setAddDialogVisible] = useState(false);
    const [newSponsorName, setNewSponsorName] = useState("");
    const [newSponsorStatus, setNewSponsorStatus] =
        useState<SponsorStatus | null>(null);
    const [newSponsorLink, setNewSponsorLink] = useState("");
    const { toastRef, showSuccess, showError } = useToast();
    const handleAddSponsor = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addSponsor(newSponsorName, newSponsorStatus!, newSponsorLink).then(
            (response) => {
                if (response.success) {
                    showSuccess("Successfully add sponsor");
                    setTimeout(() => {
                        window.location.reload();
                    }, 500);
                } else {
                    showError(`Failed to add sponsor: ${response.message}`);
                }
            }
        );
    };

    const sponsorStatusOptions: SponsorStatus[] = [
        "COMPANY",
        "GOVERNMENT",
        "INDIVIDUAL",
        "ORGANIZATION",
    ];

    return (
        <div>
            <Toast ref={toastRef} position="bottom-right" />
            <h1 style={{ textAlign: "center" }}>Sponsors</h1>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "16px",
                }}
            >
                <Button
                    onClick={() => {
                        setAddDialogVisible(true);
                    }}
                >
                    Add sponsor
                </Button>
            </div>

            <div style={{ height: "70vh" }}>
                <SponsorsTable />
            </div>
            <Dialog
                visible={addDialogVisible}
                header={"Add Sponsor"}
                onHide={() => setAddDialogVisible(false)}
            >
                <form onSubmit={handleAddSponsor}>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "20px",
                        }}
                    >
                        <div>
                            <label style={{ display: "block" }}>Name</label>
                            <InputText
                                id="name"
                                name="name"
                                value={newSponsorName}
                                onChange={(e) => {
                                    setNewSponsorName(e.target.value);
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: "block" }}>Status</label>
                            <Dropdown
                                value={newSponsorStatus}
                                onChange={(e: DropdownChangeEvent) =>
                                    setNewSponsorStatus(e.value)
                                }
                                options={sponsorStatusOptions}
                                placeholder="Select a sponsor status"
                            />
                        </div>
                        <div>
                            <label style={{ display: "block" }}>Link</label>
                            <InputText
                                id="link"
                                name="link"
                                value={newSponsorLink}
                                onChange={(e) => {
                                    setNewSponsorLink(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <Button
                        disabled={
                            newSponsorName == "" ||
                            newSponsorStatus == null ||
                            newSponsorLink == ""
                        }
                        style={{ marginTop: "16px" }}
                    >
                        Save
                    </Button>
                </form>
            </Dialog>
        </div>
    );
}
