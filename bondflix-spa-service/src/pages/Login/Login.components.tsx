import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import { useState } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { login } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
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

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
        // TODO: use react query to handle loading state
        const response = await login(loginFormData);
        if (response.success) {
            navigate("/dashboard");
        } else {
            console.log("Wrong!");
        }
    };

    const footer = (
        <>
            <Button label="Login" onClick={handleLogin} />
        </>
    );

    return (
        <Card title="Login" footer={footer}>
            <form>
                <label htmlFor="identifier">Username or email</label>
                <InputText
                    id="identifier"
                    name="identifier"
                    value={loginFormData.identifier}
                    onChange={handleFormChange}
                />
                <label htmlFor="password">Password</label>
                <Password
                    id="password"
                    name="password"
                    value={loginFormData.password}
                    onChange={handleFormChange}
                    feedback={false}
                />
            </form>
        </Card>
    );
}
