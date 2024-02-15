import { ReactNode, createContext, useContext, useMemo } from "react";
import { APIConfig, ApiProviderContext } from "./types/api";
import { ApiHooks } from "./types/hooks";

interface ApiProviderProps {
    children: ReactNode | ReactNode[];
    config: APIConfig;
    hooks: ApiHooks;
}

export const ApiContext = createContext<Partial<ApiProviderContext>>({});

export const ApiProvider = ({ children, config, hooks }: ApiProviderProps) => {
    const coreConfig = useMemo(() => {
        return { fetcher: config.fetch, hooks }
    }, [config.fetch]);

    return (
        <ApiContext.Provider value={coreConfig}>
            {children}
        </ApiContext.Provider>
    )
}

export const useApiProvider = () => {
    return useContext(ApiContext) as ApiProviderContext;
}
