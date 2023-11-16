import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import {
    ChangeEvent,
    Dispatch,
    FormEvent,
    SetStateAction,
    useEffect,
    useState,
} from "react";
import { getAllGenres } from "../../services/genre.servie";
import { getAllCategories } from "../../services/category.service";
import { createContent } from "../../services/content.service";
import { useToast } from "../../hooks/useToast";
import { Toast } from "primereact/toast";
import { getAllSponsors } from "../../services/sponsor.service";
import { useNavigate } from "react-router";

export function ContentUploadForm(props: {
    contentUploadData: ContentUploadData;
    setContentUploadData: Dispatch<SetStateAction<ContentUploadData>>;
}) {
    const navigate = useNavigate();
    const [isUploading, setIsUploading] = useState(false);
    const { contentUploadData, setContentUploadData } = props;
    const [visibility, setVisibility] = useState(false);
    const [genreOptions, setGenreOptions] = useState<Genre[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<Genre[]>([]);
    const [categoryOptions, setCategoryOptions] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category[]>([]);
    const [sponsorOptions, setSponsorOptions] = useState<Sponsor[]>([]);
    const [selectedSponsors, setSelectedSponsors] = useState<Sponsor[]>([]);
    const { toastRef, showSuccess, showError } = useToast();

    const hanldeVisibilityChange = (e: CheckboxChangeEvent) => {
        setVisibility(e.checked!);
    };

    useEffect(() => {
        const fetchOptions = async () => {
            const genreResponse = await getAllGenres();
            const categoryResponse = await getAllCategories();
            const sponsorResponse = await getAllSponsors();
            if (
                genreResponse.success &&
                categoryResponse.success &&
                sponsorResponse.success
            ) {
                setGenreOptions(genreResponse.data as Genre[]);
                setCategoryOptions(categoryResponse.data as Category[]);
                // console.log(sponsorResponse)
                setSponsorOptions(sponsorResponse.data as Sponsor[]);
            }
        };
        fetchOptions();
    }, []);

    const handleFormChange = (
        e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
    ) => {
        setContentUploadData({
            ...contentUploadData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSelectedGenreChange = (e: CheckboxChangeEvent) => {
        if (e.checked) {
            setSelectedGenre([...selectedGenre, e.value]);
        } else {
            setSelectedGenre((prev) =>
                prev.filter((el) => el.id !== e.value.id)
            );
        }
    };

    useEffect(() => {
        setContentUploadData({
            ...contentUploadData,
            ["genres"]: selectedGenre.map((el) => el.id),
        });
    }, [selectedGenre]);

    const handleSelectedCategoryChange = (e: CheckboxChangeEvent) => {
        if (e.checked) {
            setSelectedCategory([...selectedCategory, e.value]);
        } else {
            setSelectedCategory((prev) =>
                prev.filter((el) => el.id !== e.value.id)
            );
        }
    };

    useEffect(() => {
        setContentUploadData({
            ...contentUploadData,
            ["categories"]: selectedCategory.map((el) => el.id),
        });
    }, [selectedCategory]);

    const handleSelectedSponsorChange = (e: CheckboxChangeEvent) => {
        if (e.checked) {
            setSelectedSponsors([...selectedSponsors, e.value]);
        } else {
            setSelectedSponsors((prev) =>
                prev.filter((el) => el.id !== e.value.id)
            );
        }
    };

    useEffect(() => {
        setContentUploadData({
            ...contentUploadData,
            ["sponsors"]: selectedSponsors.map((el) => el.id),
        });
    }, [selectedSponsors]);

    const handleUpload = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsUploading(true);
        // console.log(contentUploadData);
        const uploadFormData = new FormData();
        uploadFormData.append("title", contentUploadData.title);
        uploadFormData.append("description", contentUploadData.description);
        uploadFormData.append(
            "genres",
            JSON.stringify(contentUploadData.genres)
        );
        uploadFormData.append(
            "categories",
            JSON.stringify(contentUploadData.categories)
        );
        uploadFormData.append(
            "sponsors",
            JSON.stringify(contentUploadData.sponsors)
        );
        uploadFormData.append("content_file", contentUploadData.content_file);
        uploadFormData.append(
            "thumbnail_file",
            contentUploadData.thumbnail_file
        );
        uploadFormData.append("visibility", `${visibility}`);
        const response = await createContent(uploadFormData);
        setIsUploading(false);
        if (response.success) {
            showSuccess("Content successfully uploaded");
            setTimeout(() => {
                navigate("/dashboard");
            }, 500);
        } else {
            showError("Failed to upload content");
        }
    };

    return (
        <Card
            style={{
                width: "600px",
            }}
            pt={{
                content: {
                    style: {
                        padding: "0",
                    },
                },
            }}
        >
            <Toast ref={toastRef} position="bottom-right" />
            <form onSubmit={handleUpload}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                    }}
                >
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
                        <InputTextarea
                            name="description"
                            value={contentUploadData.description}
                            onChange={handleFormChange}
                            style={{
                                width: "90%",
                                resize: "none",
                            }}
                            rows={5}
                        />
                    </div>
                    <div>
                        <label>Visibility</label>
                        <div style={{ marginTop: "8px" }}>
                            <Checkbox
                                inputId="visibility"
                                name="visibility"
                                checked={visibility}
                                onChange={hanldeVisibilityChange}
                                style={{ marginRight: "8px" }}
                            />
                            <span>Public?</span>
                        </div>
                    </div>
                    <div>
                        <label style={{ display: "block" }}>Genre</label>
                        <Card
                            pt={{
                                content: {
                                    style: {
                                        padding: "0",
                                    },
                                },
                            }}
                            style={{
                                width: "90%",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "16px",
                                }}
                            >
                                {genreOptions.map((el) => (
                                    <div
                                        key={el.id}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "8px",
                                        }}
                                    >
                                        <Checkbox
                                            inputId={el.id.toString()}
                                            name={el.name}
                                            value={el}
                                            onChange={handleSelectedGenreChange}
                                            checked={
                                                selectedGenre.find(
                                                    (genre) =>
                                                        genre.id === el.id
                                                ) != undefined
                                            }
                                        />
                                        <label>{el.name}</label>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                    <div>
                        <label style={{ display: "block" }}>Category</label>
                        <Card
                            pt={{
                                content: {
                                    style: {
                                        padding: "0",
                                    },
                                },
                            }}
                            style={{
                                width: "90%",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "16px",
                                }}
                            >
                                {categoryOptions.map((el) => (
                                    <div
                                        key={el.id}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "8px",
                                        }}
                                    >
                                        <Checkbox
                                            inputId={el.id.toString()}
                                            name={el.name}
                                            value={el}
                                            onChange={
                                                handleSelectedCategoryChange
                                            }
                                            checked={
                                                selectedCategory.find(
                                                    (genre) =>
                                                        genre.id === el.id
                                                ) != undefined
                                            }
                                        />
                                        <label>{el.name}</label>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                    <div>
                        <label style={{ display: "block" }}>Sponsor</label>
                        <Card
                            pt={{
                                content: {
                                    style: {
                                        padding: "0",
                                    },
                                },
                            }}
                            style={{
                                width: "90%",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "16px",
                                }}
                            >
                                {sponsorOptions.map((el) => (
                                    <div
                                        key={el.id}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "8px",
                                        }}
                                    >
                                        <Checkbox
                                            inputId={el.id.toString()}
                                            name={el.name}
                                            value={el}
                                            onChange={
                                                handleSelectedSponsorChange
                                            }
                                            checked={
                                                selectedSponsors.find(
                                                    (sponsor) =>
                                                        sponsor.id === el.id
                                                ) != undefined
                                            }
                                        />
                                        <label>{el.name}</label>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                    <div>
                        <Button
                            disabled={
                                uploadButtonDisabled(contentUploadData) ||
                                isUploading
                            }
                            type="submit"
                        >
                            Upload
                        </Button>
                    </div>
                </div>
            </form>
        </Card>
    );
}

// udah mulai ga bisa mempertahankan clean code nih wkwk

function uploadButtonDisabled(contentUploadData: ContentUploadData) {
    return (
        contentUploadData.title === "" ||
        contentUploadData.description === "" ||
        !contentUploadData.content_file ||
        !contentUploadData.thumbnail_file
    );
}
