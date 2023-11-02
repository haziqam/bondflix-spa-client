import React, { createContext, useContext, useState, ReactNode } from "react";

type Page = ReactNode;

type PageNavigationContextData = {
    nextPage: Page | null;
    setNextPage: (page: Page) => void;
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
    const [nextPage, setNextPage] = useState<Page | null>(null);

    return (
        <PageNavigationContext.Provider value={{ nextPage, setNextPage }}>
            {children}
        </PageNavigationContext.Provider>
    );
};
