import { Dispatch, SetStateAction, useRef } from "react";
import { Toast } from "primereact/toast";
import {
    FileUpload,
    FileUploadHeaderTemplateOptions,
    FileUploadSelectEvent,
} from "primereact/fileupload";
import { getFileExtension } from "../../lib/utils/fileHandling";
import { useToast } from "../../hooks/useToast";

//taro di d.ts
const IMAGE_TYPES = [".jpeg", ".png", ".gif", ".jpg"];
const VIDEO_TYPES = [".mpeg", ".mp4", ".quicktime", ".x-msvideo"];

export function VideoUploader(props: {
    setVideo: Dispatch<SetStateAction<File | null>>;
}) {
    const { setVideo } = props;
    const fileUploadRef = useRef<FileUpload | null>(null);
    const { toastRef, showError, showSuccess } = useToast();

    const handleSelect = (e: FileUploadSelectEvent) => {
        const fileExtension = getFileExtension(e.files[0]);
        if (
            fileExtension === null ||
            !VIDEO_TYPES.includes(`.${fileExtension}`)
        ) {
            fileUploadRef.current?.clear();
            showError(
                `Invalid file extension. Allowed extensions are mpeg, mp4, quicktime, or x-msvideo.`
            );
            return;
        }
        setVideo(e.files[0]);
        showSuccess(`Uploaded video successfully.`);
    };

    const handleClear = () => {
        setVideo(null);
    };

    return (
        <div className="card" style={{ width: "600px" }}>
            <Toast ref={toastRef} position="bottom-right" />
            <FileUpload
                name="thumbnail"
                accept={VIDEO_TYPES.join(",")}
                headerTemplate={headerUploaderTemplate}
                emptyTemplate={() => emptyUploaderTemplate("video")}
                chooseOptions={chooseButton}
                cancelOptions={cancelButton}
                ref={fileUploadRef}
                onSelect={handleSelect}
                onClear={handleClear}
            />
        </div>
    );
}

export function ThumbnailUploader(props: {
    setThumbnail: Dispatch<SetStateAction<File | null>>;
}) {
    const { setThumbnail } = props;

    const fileUploadRef = useRef<FileUpload | null>(null);
    const { toastRef, showError, showSuccess } = useToast();

    const handleSelect = (e: FileUploadSelectEvent) => {
        const fileExtension = getFileExtension(e.files[0]);
        if (
            fileExtension === null ||
            !IMAGE_TYPES.includes(`.${fileExtension}`)
        ) {
            fileUploadRef.current?.clear();
            showError(
                `Invalid file extension. Allowed extensions are jpeg, png, gif, or jpg.`
            );
            return;
        }
        setThumbnail(e.files[0]);
        showSuccess(`Uploaded thumbnail successfully.`);
    };

    const handleClear = () => {
        setThumbnail(null);
    };

    return (
        <div className="card" style={{ width: "600px" }}>
            <Toast ref={toastRef} position="bottom-right" />
            <FileUpload
                name="thumbnail"
                accept={IMAGE_TYPES.join(",")}
                headerTemplate={headerUploaderTemplate}
                emptyTemplate={() => emptyUploaderTemplate("image")}
                chooseOptions={chooseButton}
                cancelOptions={cancelButton}
                ref={fileUploadRef}
                onSelect={handleSelect}
                onClear={handleClear}
            />
        </div>
    );
}

const headerUploaderTemplate = (options: FileUploadHeaderTemplateOptions) => {
    const { className, chooseButton, cancelButton } = options;

    return (
        <div
            className={className}
            style={{
                backgroundColor: "#f3f3f3",
                display: "flex",
                alignItems: "center",
            }}
        >
            {chooseButton}
            {cancelButton}
        </div>
    );
};

const emptyUploaderTemplate = (type: "image" | "video") => {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <i
                className={`pi pi-${type}`}
                style={{
                    fontSize: "5em",
                    color: "var(--surface-d)",
                }}
            ></i>
            <span
                style={{
                    fontSize: "1.2em",
                    color: "var(--text-color-secondary)",
                    marginTop: "16px",
                }}
            >
                {`Drag and drop ${type} here`}
            </span>
        </div>
    );
};

const chooseButton = {
    icon: "pi pi-fw pi-cloud-upload",
    iconOnly: true,
    className: "custom-choose-btn p-button-rounded p-button-outlined",
};
const cancelButton = {
    icon: "pi pi-fw pi-times",
    iconOnly: true,
    className:
        "custom-cancel-btn p-button-danger p-button-rounded p-button-outlined",
};
