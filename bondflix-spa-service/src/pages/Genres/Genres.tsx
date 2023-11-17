import { Button } from "primereact/button";
import { GenresTable } from "./Genres.components";
import { addGenre } from "../../services/genre.service";
import { Dialog } from "primereact/dialog";
import { FormEvent, useState } from "react";
import { InputText } from "primereact/inputtext";
import { useToast } from "../../hooks/useToast";
import { Toast } from "primereact/toast";

export function Genres() {
    const [addDialogVisible, setAddDialogVisible] = useState(false);
    const [newGenreName, setNewGenreName] = useState("");
    const { toastRef, showSuccess, showError } = useToast();
    const handleAddGenre = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addGenre(newGenreName).then((response) => {
            if (response.success) {
                showSuccess("Successfully add genre");
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            } else {
                showError(`Failed to add genre: ${response.message}`);
            }
        });
    };
    return (
        <div>
            <Toast ref={toastRef} position="bottom-right" />
            <h1 style={{ textAlign: "center" }}>Genres</h1>
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
                    Add genre
                </Button>
            </div>

            <div style={{ height: "70vh" }}>
                <GenresTable />
            </div>
            <Dialog
                visible={addDialogVisible}
                header={"Add Genre"}
                onHide={() => setAddDialogVisible(false)}
            >
                <form onSubmit={handleAddGenre}>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "20px",
                        }}
                    >
                        <div>
                            <label style={{ display: "block" }}>Title</label>
                            <InputText
                                id="name"
                                name="name"
                                value={newGenreName}
                                onChange={(e) => {
                                    setNewGenreName(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <Button
                        disabled={newGenreName == ""}
                        style={{ marginTop: "16px" }}
                    >
                        Save
                    </Button>
                </form>
            </Dialog>
        </div>
    );
}
