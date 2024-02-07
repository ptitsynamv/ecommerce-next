import { FC } from "react"

const Layout: FC<{ children?: JSX.Element | JSX.Element[]; }> = ({ children }) => {
    return (
        <div className="layout">
            {children}
        </div>
    )
}

export default Layout
