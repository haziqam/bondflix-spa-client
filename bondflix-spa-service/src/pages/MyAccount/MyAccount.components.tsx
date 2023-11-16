import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ZodIssue } from "zod";
import { AccountUpdateSchema } from "../../lib/zod/account.schema";
import { useToast } from "../../hooks/useToast";
import { Toast } from "primereact/toast";
import "./MyAccount.styles.css";
import { getFileExtension } from "../../lib/utils/fileHandling";
import { useNavigate } from "react-router";
import { getAccountInfo, updateAccount } from "../../services/account.service";
import Cookies from "js-cookie";

const IMAGE_TYPES = [".jpeg", ".png", ".gif", ".jpg"];

export function AccountSettingsForm() {
    const [accountFormData, setAccountFormData] = useState<AccountFormData>({
        name: "",
        password: "",
        confirmPassword: "",
    });
    const [profilePicture, setProfilePicture] = useState<File | null>(null);
    const { toastRef, showSuccess, showError } = useToast();
    const [inputError, setInputError] = useState<ZodIssue[]>([]);
    const navigate = useNavigate();

    const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAccountFormData({
            ...accountFormData,
            [e.target.name]: e.target.value,
        });
    };

    const getErrorMessages = (fieldName: string) => {
        const errors = inputError.filter((issue) =>
            issue.path.includes(fieldName)
        );
        return (
            errors.length > 0 && (
                <div>
                    {errors.map((error, index) => (
                        <small
                            key={index}
                            style={{ display: "block", color: "red" }}
                        >
                            {error.message}
                        </small>
                    ))}
                </div>
            )
        );
    };

    const handleProfilePicChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        if (selectedFile) {
            const fileExtension = getFileExtension(selectedFile);
            if (fileExtension && IMAGE_TYPES.includes(`.${fileExtension}`)) {
                setProfilePicture(selectedFile);
            } else {
                showError(
                    `Invalid file extension. Allowed extensions are jpeg, png, gif, or jpg. Extension: ${fileExtension}`
                );
                setProfilePicture(null);
            }
        } else {
            setProfilePicture(null);
        }
    };

    const submitButtonDisabled =
        accountFormData.name === "" &&
        accountFormData.password === "" &&
        accountFormData.confirmPassword === "" &&
        profilePicture === null;

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setInputError([]);
        const parseResult = AccountUpdateSchema.safeParse(accountFormData);
        if (parseResult.success) {
            const formData = new FormData();
            if (accountFormData.name !== "") {
                formData.append("name", accountFormData.name);
            }
            if (accountFormData.password !== "") {
                formData.append("password", accountFormData.password);
            }
            if (profilePicture) {
                formData.append("picture_file", profilePicture);
            }

            const userId = Cookies.get("userId");

            updateAccount(parseInt(userId!, 10), formData).then((response) => {
                if (response.success) {
                    showSuccess("Account updated successfully!");
                    setTimeout(() => {
                        // navigate("/dashboard");
                        window.location.reload();
                    }, 1000);
                } else {
                    showError(`Failed to update account: ${response.message}`);
                }
            });
        } else {
            setInputError(parseResult.error.issues);
        }
    };
    return (
        <Card
            pt={{
                content: {
                    style: {
                        paddingTop: "0",
                    },
                },
            }}
        >
            <Toast ref={toastRef} position="bottom-right" />
            <h2 style={{ marginTop: "0" }}>Edit My Account</h2>
            <form
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                }}
                onSubmit={handleSubmit}
            >
                <div>
                    <label style={{ display: "block" }}>Name</label>
                    <InputText
                        id="name"
                        name="name"
                        value={accountFormData.name}
                        onChange={handleFormChange}
                    />
                    {getErrorMessages("name")}
                </div>
                <div>
                    <label style={{ display: "block" }}>Password</label>
                    <Password
                        id="password"
                        name="password"
                        value={accountFormData.password}
                        onChange={handleFormChange}
                        feedback={false}
                    />
                    {getErrorMessages("password")}
                </div>
                <div>
                    <label style={{ display: "block" }}>ConfirmPassword</label>
                    <Password
                        id="confirmPassword"
                        name="confirmPassword"
                        value={accountFormData.confirmPassword}
                        onChange={handleFormChange}
                        feedback={false}
                    />
                    {getErrorMessages("confirmPassword")}
                </div>
                <div>
                    <label style={{ display: "block" }}>Profile Pic</label>
                    <input
                        type="file"
                        name="profilePic"
                        id="profilePic"
                        className="inputFile"
                        onChange={handleProfilePicChange}
                        accept={IMAGE_TYPES.join(",")}
                    />
                </div>
                <Button severity="danger" disabled={submitButtonDisabled}>
                    <p
                        style={{
                            textAlign: "center",
                            width: "100%",
                            margin: "0",
                        }}
                    >
                        Save Changes
                    </p>
                </Button>
            </form>
        </Card>
    );
}

export function AccountInfo() {
    const navigate = useNavigate();
    const [accountInfo, setAccountInfo] = useState<User | null>(null);
    const userId = Cookies.get("userId");
    useEffect(() => {
        getAccountInfo(parseInt(userId!, 10)).then((response) => {
            setAccountInfo(response.data as User);
        });
    }, []);

    return (
        <Card style={{ width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                    src={`http://localhost:3000/static/pictures?id=${userId}`}
                    alt="User's profile picture"
                    style={{
                        width: "200px",
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "50%",
                    }}
                />
            </div>
            <Card
                pt={{
                    content: {
                        style: {
                            padding: "0",
                        },
                    },
                }}
                style={{
                    marginTop: "32px",
                    backgroundColor: "rgb(236, 236, 236)",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        flexWrap: "wrap",
                        maxWidth: "400px",
                        gap: "16px",
                    }}
                >
                    <div>ID: {accountInfo?.id}</div>
                    <div>Username: {accountInfo?.username}</div>
                    <div>Name: {accountInfo?.name}</div>
                    <div>Email: {accountInfo?.email}</div>
                </div>
            </Card>
        </Card>
    );
}
