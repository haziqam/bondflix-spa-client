import { useAutoLogin } from "../../hooks/useAutoLogin";
import { LoginForm } from "./Login.components";

export function Login() {
    useAutoLogin(true);
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <LoginForm />
        </div>
    );
}
