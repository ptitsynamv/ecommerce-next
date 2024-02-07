import { FC, ReactNode } from "react"
import style from './Grid.module.css'

interface Props {
    children: ReactNode;
}

const Grid: FC<Props> = ({ children }) => {
    return (
        <div className={style.root}>
            {children}
        </div>
    )
}

export default Grid
