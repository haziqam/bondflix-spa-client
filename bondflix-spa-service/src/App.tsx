import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePageNavigation } from "./contexts/PageNavigation";

const queryClient = new QueryClient();

function App() {
    const { currentPage } = usePageNavigation();

    return (
        <QueryClientProvider client={queryClient}>
            {currentPage}
        </QueryClientProvider>
    );
}

export default App;
