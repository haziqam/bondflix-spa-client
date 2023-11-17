import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export function BondflixLogo() {
    return (
        <Link to="/dashboard">
            <img src={logo} alt="Bondflix logo" style={{ width: "150px" }} />
        </Link>
    );
}
