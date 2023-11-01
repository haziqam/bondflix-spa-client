import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import { useState } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { login } from "../../services/auth.service";
import { usePageNavigation } from "../../contexts/PageNavigation";
import { UserDashboard } from "../UserDashboard/UserDashboard";

//TODO:
/**
 * 1. Validasi field
 * 2. Styling
 */

export function LoginForm() {
    const [loginFormData, setLoginFormData] = useState<LoginFormData>({
        identifier: "",
        password: "",
    });

    const { navigateTo } = usePageNavigation();

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
    };

    const footer = (
        <>
            <Button
                label="Login"
                onClick={async () => {
                    const response = await login(loginFormData);
                    if (response.success) {
                        navigateTo(<UserDashboard />);
                    } else {
                        console.log("Wrong!");
                    }
                }}
            />
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
