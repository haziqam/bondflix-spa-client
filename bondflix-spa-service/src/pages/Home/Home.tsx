import { useAutoLogin } from "../../hooks/useAutoLogin";
import { Loading } from "../../shared-components/Loading";

/**
 * The page component for root route ("/")
 * This component is responsible to check if the user is authorized.
 * If the user is authorized, it will redirect to dashboard page ("/dashboard")
 * Otherwise, it will redirect to login page ("/login")
 * While waiting for the authorization process, it will render a loading page component
 */
export function Home() {
    useAutoLogin();
    return <Loading />;
}
