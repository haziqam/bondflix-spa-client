import { RegisterForm } from "./Register.components";

export function Register() {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
            }}
        >
            <RegisterForm />
        </div>
    );
}
