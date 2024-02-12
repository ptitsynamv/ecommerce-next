import React, { FC, ReactNode, Children, isValidElement, useState } from "react";
import { useKeenSlider } from 'keen-slider/react';
import classNames from "classnames";
import s from './ProductSlider.module.css';

interface Props {
    children: ReactNode
}

const ProductSlider: FC<Props> = ({ children }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [sliderRef, instanceRef] = useKeenSlider({
        initial: 0,
        loop: true,
        slideChanged(s) {
            setCurrentSlide(s.track.details.rel)
        }
    })

    return (
        <div className={s.root}>
            <div ref={sliderRef} className="keen-slider h-full transition-opacity">
                <button
                    onClick={(e: any) =>
                        e.stopPropagation() || instanceRef.current?.prev()
                    }
                    className={classNames(s.leftControl, s.control)}
                />
                <button
                    onClick={(e: any) =>
                        e.stopPropagation() || instanceRef.current?.next()
                    }
                    className={classNames(s.rightControl, s.control)}
                />
                {Children.map(children, (child) => {
                    if (isValidElement(child)) {
                        // return { ...child, props: { ...child.props, className: 'keen-slider__slide' } }
                        return React.cloneElement(child, {
                            className: `${child.props.className ? `${child.props.className}` : ''} keen-slider__slide`
                        } as Partial<unknown>
                        );
                    }
                    return child;
                })}
            </div>
        </div>
    )
}

export default ProductSlider
