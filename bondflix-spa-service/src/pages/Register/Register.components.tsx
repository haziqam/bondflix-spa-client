import { useState } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { register } from "../../services/auth.service";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/useToast";
import { Toast } from "primereact/toast";
import { RegisterSchema } from "../../lib/zod/auth.schema";
import { ZodIssue } from "zod";
//TODO:
/**
 * 1. Validasi field
 * 2. Styling
 */

export function RegisterForm() {
    const navigate = useNavigate();
    const [registerFormData, setRegisterFormData] = useState<RegisterFormData>({
        username: "",
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const { toastRef, showSuccess, showError } = useToast();
    const [inputError, setInputError] = useState<ZodIssue[]>([]);

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegisterFormData({
            ...registerFormData,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegister = async () => {
        setInputError([]);
        const parseResult = RegisterSchema.safeParse(registerFormData);
        if (parseResult.success) {
            const response = await register(registerFormData);
            if (response.success) {
                showSuccess("Registered successfully!");
                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            } else {
                showError(`Failed to register: ${response.message}`);
            }
        } else {
            setInputError(parseResult.error.issues);
        }
    };

    const footer = (
        <>
            <Button label="Register" onClick={handleRegister} />
        </>
    );

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

    return (
        <>
            <Toast ref={toastRef} position="bottom-right" />
            <Card
                title="Register"
                footer={footer}
                style={{
                    width: "400px",
                }}
            >
                <form>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "20px",
                        }}
                    >
                        <div>
                            <label style={{ display: "block" }}>Username</label>
                            <InputText
                                id="username"
                                name="username"
                                value={registerFormData.username}
                                onChange={handleFormChange}
                            />
                            {getErrorMessages("username")}
                        </div>
                        <div>
                            <label style={{ display: "block" }}>Name</label>
                            <InputText
                                id="name"
                                name="name"
                                value={registerFormData.name}
                                onChange={handleFormChange}
                            />
                            {getErrorMessages("name")}
                        </div>
                        <div>
                            <label style={{ display: "block" }}>Email</label>
                            <InputText
                                id="email"
                                name="email"
                                inputMode="email"
                                value={registerFormData.email}
                                onChange={handleFormChange}
                            />
                            {getErrorMessages("email")}
                        </div>
                        <div>
                            <label style={{ display: "block" }}>Password</label>
                            <Password
                                id="password"
                                name="password"
                                value={registerFormData.password}
                                onChange={handleFormChange}
                                feedback={false}
                            />
                            {getErrorMessages("password")}
                        </div>
                        <div>
                            <label style={{ display: "block" }}>
                                Confirm Password
                            </label>
                            <Password
                                id="confirmPassword"
                                name="confirmPassword"
                                value={registerFormData.confirmPassword}
                                onChange={handleFormChange}
                                feedback={false}
                            />
                            {getErrorMessages("confirmPassword")}
                        </div>
                        <div>
                            Already have an account?{" "}
                            <Link to={"/login"}>Login</Link>
                        </div>
                    </div>
                </form>
            </Card>
        </>
    );
}

/**
 *
 *
 */
