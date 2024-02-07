import { AppProps } from "next/app";
import { FC } from "react";

const Noop: FC<{ children?: JSX.Element | JSX.Element[]; }> = ({ children }) => <>{children}</>

function MyApp({ Component, pageProps }: AppProps & { Component: { Layout: FC<{ children?: JSX.Element | JSX.Element[]; }> } }) {
    const Layout = Component.Layout ?? Noop;

    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    )
}

export default MyApp;
