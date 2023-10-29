import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useState } from "react";

export function LoginForm() {
    const [loginFormData, setLoginFormData] = useState<LoginFormData>({
        identifier: "",
        password: "",
    });

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
    };

    const footer = (
        <>
            <Button
                label="Login"
                onClick={() => {
                    console.log(loginFormData);
                }}
            />
        </>
    );

    return (
        <Card title="Login" footer={footer}>
            <form>
                <InputText
                    value={loginFormData.identifier}
                    name="username"
                    onChange={handleFormChange}
                />
                <InputText
                    value={loginFormData.password}
                    name="password"
                    onChange={handleFormChange}
                />
            </form>
        </Card>
    );
}
