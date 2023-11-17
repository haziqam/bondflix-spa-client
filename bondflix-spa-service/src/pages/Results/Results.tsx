import { useNavigate, useSearchParams } from "react-router-dom";
import { ResultsContent } from "./Results.components";
import { useEffect } from "react";
import { searchContent } from "../../services/content.service";


export function Results() {
    const navigate = useNavigate();
    const [URLSearchParams] = useSearchParams();
    const searchQuery = URLSearchParams.get("search_query");
    useEffect(() => {
        if (!searchQuery) {
            navigate("/dashboard");
        }
    }, [searchQuery, navigate]);
    return (
        <div>
            <ResultsContent query={searchQuery!}/>
        </div>
    );
}
