import { useLocation } from "react-router-dom";

export function Studio() {
    const location = useLocation();
    return <div>this is studio. {location.state.test}</div>;
}
