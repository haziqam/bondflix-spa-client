import { LoginForm } from "./Login.components";
import { useAutoLogin } from "./Login.hook";

export function Login() {
    const { isLoading } = useAutoLogin();
    return <>{isLoading ? null : <LoginForm />}</>;
}
