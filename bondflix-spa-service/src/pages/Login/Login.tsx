import { useAutoLogin } from "../../hooks/useAutoLogin";
import { LoginForm } from "./Login.components";

export function Login() {
    useAutoLogin(true);
    return <LoginForm />;
}
