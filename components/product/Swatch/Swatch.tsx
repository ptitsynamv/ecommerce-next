import { FC } from "react";
import s from './Swatch.module.css';
import { Check } from "@components/icons";
import classNames from "classnames";
import { isDark } from "@lib/color";

interface Props {
    color?: string;
    label?: string;
    variant?: 'size' | 'color' | string;
    isActive?: boolean;
    onClick: () => void;
}

const Swatch: FC<Props> = ({ color, label, variant, isActive, ...rest }) => {
    const labelToShow = label?.toLowerCase();
    const variantToShow = variant?.toLowerCase();

    const rootClassName = classNames(s.root, {
        [s.active]: isActive,
        [s.color]: color,
        [s.size]: variantToShow === 'size',
        [s.dark]: color && isDark(color),
    });

    return (
        <button
            className={rootClassName}
            style={color ? { backgroundColor: color } : {}}
            {...rest}
        >
            {
                variantToShow === 'color' && isActive && (
                    <span><Check /></span>
                )
            }
            {variantToShow === 'size' ? labelToShow : null}
        </button>
    )
}

export default Swatch;
