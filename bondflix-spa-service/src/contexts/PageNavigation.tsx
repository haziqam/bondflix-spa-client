import React, { createContext, useContext, useState, ReactNode } from "react";
import { Login } from "../pages/Login/Login";

type Page = ReactNode;

type PageNavigationContextData = {
    currentPage: Page | null;
    navigateTo: (page: Page) => void;
};

const PageNavigationContext = createContext<PageNavigationContextData | null>(
    null
);

export const usePageNavigation = () => {
    const context = useContext(PageNavigationContext);
    if (!context) {
        throw new Error(
            "usePageNavigation must be used within PageNavigationContextProvider"
        );
    }
    return context;
};

type PageNavigationContextProviderProps = {
    children: ReactNode;
};

export const PageNavigationContextProvider: React.FC<
    PageNavigationContextProviderProps
> = ({ children }) => {
    const [currentPage, setCurrentPage] = useState<Page | null>(<Login />);

    const navigateTo = (page: Page) => {
        setCurrentPage(null);
        setTimeout(() => {
            setCurrentPage(page);
        }, 100);
    };

    return (
        <PageNavigationContext.Provider value={{ currentPage, navigateTo }}>
            {children}
        </PageNavigationContext.Provider>
    );
};
