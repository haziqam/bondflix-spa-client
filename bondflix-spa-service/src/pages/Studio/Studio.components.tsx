import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { Dispatch, SetStateAction } from "react";

export function ContentUploadForm(props: {
    contentUploadData: ContentUploadData;
    setContentUploadData: Dispatch<SetStateAction<ContentUploadData>>;
}) {
    const { contentUploadData, setContentUploadData } = props;
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContentUploadData({
            ...contentUploadData,
            [e.target.name]: e.target.value,
        });
    };
    const handleCheckboxChange = (e: CheckboxChangeEvent) => {
        setContentUploadData((prev) => {
            return {
                ...prev,
                ["visibility"]: e.checked ? "public" : "private",
            };
        });
    };
    return (
        <form>
            <div>
                <label style={{ display: "block" }}>Title</label>
                <InputText
                    name="title"
                    value={contentUploadData.title}
                    onChange={handleFormChange}
                />
            </div>
            <div>
                <label style={{ display: "block" }}>Description</label>
                <InputText
                    name="description"
                    value={contentUploadData.description}
                    onChange={handleFormChange}
                />
            </div>
            <div>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Checkbox
                        name="visibility"
                        value="visibility"
                        onChange={handleCheckboxChange}
                        checked={contentUploadData.visibility === "public"}
                    />
                    <label htmlFor="ingredient1">Public?</label>
                </div>
            </div>
        </form>
    );
}
