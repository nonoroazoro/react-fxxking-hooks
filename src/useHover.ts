import { cloneElement, useState } from "react";
import type { ReactElement } from "react";

/**
 * Tracks the hover state of the DOM element via `mouseenter` and `mouseleave`.
 */
export function useHover(createElement: ReactElement | ((isHovered: boolean) => ReactElement))
{
    const [isHovered, setIsHovered] = useState(false);
    const element = typeof createElement === "function"
        ? createElement(isHovered)
        : createElement;
    const onMouseEnter = (event: any) =>
    {
        if (element.props.onMouseEnter)
        {
            element.props.onMouseEnter(event);
        }
        setIsHovered(true);
    };
    const onMouseLeave = (event: any) =>
    {
        if (element.props.onMouseLeave)
        {
            element.props.onMouseLeave(event);
        }
        setIsHovered(false);
    };
    const clonedElement = cloneElement(element, { onMouseEnter, onMouseLeave });
    return [clonedElement, isHovered] as const;
}
