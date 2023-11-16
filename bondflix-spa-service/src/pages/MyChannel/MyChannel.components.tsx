import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
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

type Content = {
    id: number;
    title: string;
    description: string;
    thumbnailSrc: string;
    uploadedAt: string;
    genres: Genre[];
    categories: Category[];
    // sponsors: string[];
    visibility: "public" | "private";
};

// [
//     {
//         id: 1,
//         title: "Sample Title 1",
//         description: "Sample Description 1",
//         thumbnailSrc: contentThumbnail,
//         uploadedAt: "2023-10-27T12:00:00Z",
//         genres: ["Action", "Drama", "Humor"],
//         categories: ["Movies", "Cartoons", "Documentaries"],
//         sponsors: ["Sponsor A", "Sponsor B"],
//         visibility: "private",
//     },
//     {
//         id: 2,
//         title: "Sample Title 2",
//         description: "Sample Description 2",
//         thumbnailSrc: contentThumbnail,
//         uploadedAt: "2023-10-27T13:30:00Z",
//         genres: ["Comedy", "Romance"],
//         categories: ["TV Shows"],
//         sponsors: ["Sponsor C"],
//         visibility: "public",
//     },
//     {
//         id: 3,
//         title: "Sample Title 1",
//         description: "Sample Description 1",
//         thumbnailSrc: contentThumbnail,
//         uploadedAt: "2023-10-27T12:00:00Z",
//         genres: ["Action", "Drama", "Humor"],
//         categories: ["Movies", "Cartoons", "Documentaries"],
//         sponsors: ["Sponsor A", "Sponsor B"],
//         visibility: "private",
//     },
//     {
//         id: 4,
//         title: "Sample Title 2",
//         description: "Sample Description 2",
//         thumbnailSrc: contentThumbnail,
//         uploadedAt: "2023-10-27T13:30:00Z",
//         genres: ["Comedy", "Romance"],
//         categories: ["TV Shows"],
//         sponsors: ["Sponsor C"],
//         visibility: "public",
//     },
//     {
//         id: 5,
//         title: "Sample Title 1",
//         description: "Sample Description 1",
//         thumbnailSrc: contentThumbnail,
//         uploadedAt: "2023-10-27T12:00:00Z",
//         genres: ["Action", "Drama", "Humor"],
//         categories: ["Movies", "Cartoons", "Documentaries"],
//         sponsors: ["Sponsor A", "Sponsor B"],
//         visibility: "private",
//     },
// ]

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
                    field="uploadedAt"
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
                        GenresAndCategoriesTemplate(content, "genres")
                    }
                    // style={{ minWidth: "200px" }}
                />
                <Column
                    header="Categories"
                    body={(content) =>
                        GenresAndCategoriesTemplate(content, "categories")
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

function GenresAndCategoriesTemplate(
    content: Content,
    option: "genres" | "categories"
) {
    const data = option === "genres" ? content.genres : content.categories;
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

    const dialogFooter = () => {
        return <div></div>;
    };
    return (
        <>
            <Dialog
                visible={dialogVisible}
                header={"Edit Content"}
                onHide={() => setDialogVisible(false)}
                footer={dialogFooter}
            >
                Something
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
