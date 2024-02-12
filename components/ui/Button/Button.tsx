import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import classNames from "classnames";
import s from './Button.module.css'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode | ReactNode[];
}

const Button: FC<Props> = ({ children, className, ...rest }) => {
    return (
        <button type="button" className={classNames(s.root, className)} {...rest}>
            {children}
        </button>
    )
}

export default Button;
