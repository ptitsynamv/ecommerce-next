import { ReactNode } from "react";
import { ApiProvider as CoreApiProvider, useApiProvider as useCoreApiProvider } from "@common";
import { getConfig } from "./api/config";
import { shopifyHooks } from "./hooks";

const config = getConfig();

interface ShopifyApiProviderProps {
    children: ReactNode | ReactNode[];
}

export const ApiProvider = ({ children }: ShopifyApiProviderProps) => {
    return (
        <CoreApiProvider config={config} hooks={shopifyHooks}>
            {children}
        </CoreApiProvider>
    )
}

export const useApiProvider = () => useCoreApiProvider()
