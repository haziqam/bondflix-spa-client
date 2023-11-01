import "./App.css";
import { usePageNavigation } from "./contexts/PageNavigation";

function App() {
    const { currentPage } = usePageNavigation();
    return <>{currentPage}</>;
}

export default App;
