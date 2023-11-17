import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import contentThumbnail from "../../assets/thumbnail1.jpg";
import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { useToast } from "../../hooks/useToast";
import {
    deleteContent,
    getContentsByCreatorId,
} from "../../services/content.service";
import Cookies from "js-cookie";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { InputTextarea } from "primereact/inputtextarea";

// type Content = {
//     id: number;
//     title: string;
//     description: string;
//     thumbnailSrc: string;
//     uploadedAt: string;
//     genres: Genre[];
//     categories: Category[];
//     // sponsors: string[];
//     visibility: "public" | "private";
// };

export function MyContentsTable() {
    const [myContents, setMyContents] = useState<Content[]>([]);
    const { toastRef, showSuccess } = useToast();

    useEffect(() => {
        const userId = Cookies.get("userId");
        if (userId != undefined)
            getContentsByCreatorId(parseInt(userId, 10)).then((response) => {
                setMyContents(response.data as Content[]);
            });
    }, []);
    const removeContent = (id: number) => {
        const deletedContentTitle = myContents.find(
            (el) => el.id === id
        )?.title;
        setMyContents((prev) => prev.filter((el) => el.id !== id));
        showSuccess(`Deleted @${deletedContentTitle} successfully`);
    };

    return (
        <>
            <Toast ref={toastRef} position="bottom-right" />
            <DataTable
                value={myContents}
                dataKey="id"
                // loading={loading}
                emptyMessage="No Contents."
                showGridlines
                scrollable
                scrollHeight="70vh"
            >
                <Column
                    header="ID"
                    field="id"
                    // style={{ minWidth: "70px" }}
                    frozen
                />
                <Column
                    header="Content Thumbnail"
                    body={ContentThumbnailTemplate}
                    // style={{ minWidth: "170px" }}
                    frozen
                />
                <Column
                    header="Title"
                    field="title"
                    // style={{ minWidth: "150px" }}
                    frozen
                />
                <Column
                    header="Description"
                    field="description"
                    // style={{ minWidth: "200px" }}
                />
                <Column
                    header="Date Uploaded"
                    field="uploaded_at"
                    // style={{ minWidth: "100px" }}
                />
                <Column
                    header="Visibility"
                    field="visibility"
                    // style={{ minWidth: "70px" }}
                />
                <Column
                    header="Genres"
                    body={(content) =>
                        InfoLabelTemplate(content, "genres")
                    }
                    // style={{ minWidth: "200px" }}
                />
                <Column
                    header="Categories"
                    body={(content) =>
                        InfoLabelTemplate(content, "categories")
                    }
                    // style={{ minWidth: "200px" }}
                />
                <Column
                    header="Sponsores"
                    body={(content) =>
                        InfoLabelTemplate(content, "sponsors")
                    }
                    // style={{ minWidth: "200px" }}
                />
                <Column
                    header="Actions"
                    body={(content) => (
                        <ActionsTemplate
                            content={content}
                            onDeleteContent={removeContent}
                        />
                    )}
                    // style={{ minWidth: "200px" }}
                />
            </DataTable>
        </>
    );
}

function ContentThumbnailTemplate(content: Content) {
    return (
        <img
            src={`http://localhost:3000/static/thumbnails?id=${content.id}`}
            alt="Content Thumbnail"
            style={{
                width: "150px",
                height: "80px",
                objectFit: "cover",
                borderRadius: "8px",
            }}
        />
    );
}

function InfoLabelTemplate(
    content: Content,
    option: "genres" | "categories" | "sponsors"
) {
    let data: Genre[] | Category[] | Sponsor[] = []
    if (option === 'genres') {
        data = content.genres
    }
    else if (option === 'categories') {
        data = content.categories
    }
    else {
        data = content.sponsors
    }
    return (
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {data.map((val, i) => (
                <span
                    key={i}
                    style={{
                        backgroundColor: "lightgrey",
                        padding: "3px",
                        borderRadius: "3px",
                    }}
                >
                    {val.name}
                </span>
            ))}
        </div>
    );
}

function ActionsTemplate(props: {
    content: Content;
    onDeleteContent: (id: number) => void;
}) {
    const { content, onDeleteContent } = props;
    const navigate = useNavigate();
    const [editDialogVisible, setEditDialogVisible] = useState(false);
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);

    const handlePreview = () => {
        const contentUrl = `/watch?id=${content.id}`;
        navigate(encodeURI(contentUrl));
    };

    const handleEdit = () => {
        setEditDialogVisible(true);
    };
    const handleDelete = () => {
        setDeleteDialogVisible(true);
    };

    return (
        <div style={{ display: "flex", gap: "8px" }}>
            <DeleteContentConfirmDialog
                dialogVisible={deleteDialogVisible}
                setDialogVisible={setDeleteDialogVisible}
                content={content}
                onDeleteContent={onDeleteContent}
            />
            <EditContentDialog dialogVisible={editDialogVisible}
                setDialogVisible={setEditDialogVisible}
                content={content}
                onEditContent={()=>{window.location.reload()}}
            />
            <Button
                type="button"
                severity="secondary"
                icon="pi pi-eye"
                rounded
                onClick={handlePreview}
            />
            <Button
                type="button"
                severity="info"
                icon="pi pi-pencil"
                rounded
                onClick={handleEdit}
            />
            <Button
                type="button"
                severity="danger"
                icon="pi pi-trash"
                rounded
                onClick={handleDelete}
            />
        </div>
    );
}

function EditContentDialog(props: {
    dialogVisible: boolean;
    setDialogVisible: Dispatch<SetStateAction<boolean>>;
    content: Content;
    onEditContent: () => void;
}) {
    const { dialogVisible, setDialogVisible, content, onEditContent } = props;
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [visibility, setVisibility] = useState(false)

    const handleUpload = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //TODO: panggil api
    }

    return (
        <>
            <Dialog
                visible={dialogVisible}
                header={"Edit Content"}
                onHide={() => setDialogVisible(false)}
            >
                <form onSubmit={handleUpload}>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "20px",
                        }}
                    >
                        <div>
                            <label style={{ display: "block" }}>
                                Title
                            </label>
                            <InputText
                                id="title"
                                name="title"
                                value={title}
                                onChange={(e)=>{setTitle(e.target.value)}}
                            />
                        </div>
                        <div>
                            <label style={{ display: "block" }}>
                                Description
                            </label>
                            <InputTextarea
                                name="description"
                                value={description}
                                onChange={(e)=>{setDescription(e.target.value)}}
                                style={{
                                    width: "90%",
                                    resize: "none",
                                }}
                                rows={5}
                        />
                        </div>
                        <label>Visibility</label>
                        <div>
                            <Checkbox
                                inputId="visibility"
                                name="visibility"
                                checked={visibility}
                                onChange={(e)=>{setVisibility(e.checked!)}}
                                style={{ marginRight: "8px" }}
                            />
                            <span>Public?</span>
                        </div>
                    </div>
                    <Button style={{marginTop: "16px"}}>Save</Button>
                </form>
            </Dialog>
        </>
    );
}

function DeleteContentConfirmDialog(props: {
    dialogVisible: boolean;
    setDialogVisible: Dispatch<SetStateAction<boolean>>;
    content: Content;
    onDeleteContent: (id: number) => void;
}) {
    const { dialogVisible, setDialogVisible, content, onDeleteContent } = props;
    const { id, title } = content;
    const { toastRef, showError } = useToast();

    const handleDeleteContent = () => {
        deleteContent(content.id).then((response) => {
            if (response.success) {
                setDialogVisible(false);
                onDeleteContent(id);
            } else {
                showError("Failed to delete content");
            }
        });
    };

    const dialogFooter = () => {
        return (
            <div>
                <Button
                    severity="info"
                    text
                    onClick={() => {
                        setDialogVisible(false);
                    }}
                >
                    Cancel
                </Button>
                <Button severity="danger" onClick={handleDeleteContent}>
                    Delete
                </Button>
            </div>
        );
    };

    return (
        <>
            <Toast ref={toastRef} position="bottom-right" />
            <Dialog
                visible={dialogVisible}
                header={"Delete Content"}
                onHide={() => setDialogVisible(false)}
                footer={dialogFooter}
            >
                <p style={{ marginTop: 0, marginBottom: "8px" }}>
                    Are you sure you want to delete this content?
                </p>
                <p
                    style={{ marginTop: 0, marginBottom: "8px" }}
                >{`Title: ${title}`}</p>
                <p
                    style={{ marginTop: 0, marginBottom: "8px" }}
                >{`id: ${id}`}</p>
            </Dialog>
        </>
    );
}
