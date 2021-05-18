import { useEffect, useState } from "react";
import type { RefObject } from "react";

/**
 * Tracks the hover state of the DOM element via `mouseenter` and `mouseleave`.
 *
 * @param {number} [delay] The response delay time in `milliseconds`. Defaults to `100`.
 */
export function useHover<T extends HTMLElement>(ref: RefObject<T>, delay = 100)
{
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() =>
    {
        let timer: number | undefined;

        const _updateIsHovered = (isEnter: boolean) =>
        {
            _clearTimer(timer);
            if (delay == null || delay <= 0)
            {
                setIsHovered(isEnter);
            }
            else
            {
                timer = window.setTimeout(() =>
                {
                    setIsHovered(isEnter);
                }, delay);
            }
        };

        const _handleMouseEnter = () =>
        {
            _updateIsHovered(true);
        };

        const _handleMouseLeave = () =>
        {
            _updateIsHovered(false);
        };

        const element = ref.current;
        if (element != null)
        {
            element.addEventListener("mouseenter", _handleMouseEnter, { passive: true });
            element.addEventListener("mouseleave", _handleMouseLeave, { passive: true });
        }

        return () =>
        {
            _clearTimer(timer);
            if (element)
            {
                element.removeEventListener("mouseenter", _handleMouseEnter);
                element.removeEventListener("mouseleave", _handleMouseLeave);
            }
        };
    }, [delay, ref]);

    return isHovered;
}

function _clearTimer(timer: number | undefined)
{
    if (timer != null)
    {
        window.clearTimeout(timer);
    }
}
