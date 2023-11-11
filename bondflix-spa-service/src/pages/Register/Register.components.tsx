import { useState } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { register } from "../../services/auth.service";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/useToast";
import { Toast } from "primereact/toast";
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
    });
    const { toastRef, showSuccess, showError } = useToast();

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegisterFormData({
            ...registerFormData,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegister = async () => {
        const response = await register(registerFormData);
        if (response.success) {
            showSuccess("Registered successfully!");
            setTimeout(() => {
                navigate("/dashboard");
            }, 1000);
        } else {
            showError("Wrong credentials mas!");
        }
    };

    const footer = (
        <>
            <Button label="Register" onClick={handleRegister} />
        </>
    );

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
                        </div>
                        <div>
                            <label style={{ display: "block" }}>Name</label>
                            <InputText
                                id="name"
                                name="name"
                                value={registerFormData.name}
                                onChange={handleFormChange}
                            />
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
