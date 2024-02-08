import { FC, ReactNode } from "react"
import style from './Grid.module.css'
import classNames from "classnames";

interface Props {
    children: ReactNode;
    layout?: 'A' | 'B';
}

const Grid: FC<Props> = ({ children, layout = 'A' }) => {
    const rootClassName = classNames(style.root, {
        [style.layoutA]: layout === 'A',
        [style.layoutB]: layout === 'B',
    })
    return (
        <div className={rootClassName}>
            {children}
        </div>
    )
}

export default Grid
