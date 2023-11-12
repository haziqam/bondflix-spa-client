import { useState } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { login } from "../../services/auth.service";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/useToast";
import { Toast } from "primereact/toast";
import { ZodIssue } from "zod";
import { LoginSchema } from "../../lib/zod/auth.schema";
//TODO:
/**
 * 1. Validasi field
 * 2. Styling
 */

export function LoginForm() {
    const navigate = useNavigate();
    const [loginFormData, setLoginFormData] = useState<LoginFormData>({
        identifier: "",
        password: "",
    });
    const { toastRef, showError } = useToast();
    const [inputError, setInputError] = useState<ZodIssue[]>([]);

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
        setInputError([]);
        const parseResult = LoginSchema.safeParse(loginFormData);
        if (parseResult.success) {
            const response = await login(loginFormData);
            if (response.success) {
                navigate("/dashboard");
            } else {
                showError(`Failed to login: ${response.message}`);
            }
        } else {
            setInputError(parseResult.error.issues);
        }
    };

    const footer = (
        <>
            <Button label="Login" onClick={handleLogin} />
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
                title="Login"
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
                            <label style={{ display: "block" }}>
                                Username or email
                            </label>
                            <InputText
                                id="identifier"
                                name="identifier"
                                value={loginFormData.identifier}
                                onChange={handleFormChange}
                            />
                            {getErrorMessages("identifier")}
                        </div>
                        <div>
                            <label style={{ display: "block" }}>Password</label>
                            <Password
                                id="password"
                                name="password"
                                value={loginFormData.password}
                                onChange={handleFormChange}
                                feedback={false}
                            />
                            {getErrorMessages("password")}
                        </div>
                        <div>
                            Don't have an account yet?{" "}
                            <Link to={"/register"}>Register</Link>
                        </div>
                    </div>
                </form>
            </Card>
        </>
    );
}
