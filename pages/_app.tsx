import "@assets/main.css";
import 'keen-slider/keen-slider.min.css';
import { UIProvider } from "@components/ui/context";
import { AppProps } from "next/app";
import { FC, ReactNode } from "react";

interface Props {
    children: ReactNode;
}

const Noop: FC<Props> = ({ children }) => <>{children}</>

function MyApp({ Component, pageProps }: AppProps & { Component: { Layout: FC<Props> } }) {
    const Layout = Component.Layout ?? Noop;

    return (
        <UIProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </UIProvider>
    )
}

export default MyApp;
