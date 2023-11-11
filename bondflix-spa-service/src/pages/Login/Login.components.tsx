import { useState } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { login } from "../../services/auth.service";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/useToast";
import { Toast } from "primereact/toast";
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

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
        const response = await login(loginFormData);
        if (response.success) {
            navigate("/dashboard");
        } else {
            showError("Wrong credentials mas!");
        }
    };

    const footer = (
        <>
            <Button label="Login" onClick={handleLogin} />
        </>
    );

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
