import { ButtonHTMLAttributes, ComponentType, FC, HTMLAttributes, ReactNode } from "react";
import classNames from "classnames";
import s from './Button.module.css'
import { LoadingDots } from "@components/ui";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode | ReactNode[];
    isLoading?: boolean;
    Component?: string | ComponentType<HTMLAttributes<HTMLElement>>;
    href?: string;
}

const Button: FC<Props> = ({ children, className, isLoading = false, Component = "button", ...rest }) => {
    const rootClassName = classNames(s.root, className, {
        [s.loading]: isLoading
    });

    return (
        <Component type="button" className={rootClassName} {...rest}>
            {children}
            {isLoading && <i className="pl-2 m-0 flex"><LoadingDots /></i>}
        </Component>
    )
}

export default Button;
