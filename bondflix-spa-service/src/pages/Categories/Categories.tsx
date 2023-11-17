import { Button } from "primereact/button";
import { CategoriesTable } from "./Categories.components";
import { addCategory } from "../../services/category.service";
import { Dialog } from "primereact/dialog";
import { FormEvent, useState } from "react";
import { InputText } from "primereact/inputtext";
import { useToast } from "../../hooks/useToast";
import { Toast } from "primereact/toast";

export function Categories() {
    const [addDialogVisible, setAddDialogVisible] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");
    const { toastRef, showSuccess, showError } = useToast();
    const handleAddCategory = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addCategory(newCategoryName).then((response) => {
            if (response.success) {
                showSuccess("Successfully add category");
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            } else {
                showError(`Failed to add category: ${response.message}`);
            }
        });
    };
    return (
        <div>
            <Toast ref={toastRef} position="bottom-right" />
            <h1 style={{ textAlign: "center" }}>Categories</h1>
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
                    Add category
                </Button>
            </div>

            <div style={{ height: "70vh" }}>
                <CategoriesTable />
            </div>
            <Dialog
                visible={addDialogVisible}
                header={"Add Category"}
                onHide={() => setAddDialogVisible(false)}
            >
                <form onSubmit={handleAddCategory}>
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
                                value={newCategoryName}
                                onChange={(e) => {
                                    setNewCategoryName(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <Button
                        disabled={newCategoryName == ""}
                        style={{ marginTop: "16px" }}
                    >
                        Save
                    </Button>
                </form>
            </Dialog>
        </div>
    );
}
