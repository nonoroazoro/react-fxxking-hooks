import { useRef, useEffect, useState } from "react";
import type { RefObject } from "react";

import type { ScrollState, UseScrollOptions } from "./types";

/**
 * Tracks the scroll state of the DOM element.
 *
 * @param {RefObject<HTMLElement>} ref The DOM element.
 * @param {UseScrollOptions} [options] The options.
 */
export function useScroll(ref: RefObject<HTMLElement>, options?: UseScrollOptions)
{
    const optionsRef = useRef({ delay: 300, ...options });
    useEffect(() =>
    {
        optionsRef.current = { delay: 300, ...options };
    }, [options]);

    const [scrollState, setScrollState] = useState<ScrollState>({
        scrollLeft: 0,
        scrollRight: 0,
        scrollTop: 0,
        scrollBottom: 0,
        hasHScrollbar: false,
        hasVScrollbar: false,
        isScrolling: false,
        topReached: false,
        bottomReached: false,
        leftReached: false,
        rightReached: false
    });

    const isScrollingUpdatedRef = useRef(false);
    useEffect(() =>
    {
        const scrollable = ref.current;
        if (!scrollable) { return; }

        let timer: number | undefined;

        const _handleScroll = () =>
        {
            if (!isScrollingUpdatedRef.current)
            {
                isScrollingUpdatedRef.current = true;
                setScrollState(prev => ({ ...prev, isScrolling: true }));
            }

            _clearTimer(timer);
            timer = window.setTimeout(() =>
            {
                isScrollingUpdatedRef.current = false;
                const newScrollState: ScrollState = {
                    scrollLeft: scrollable.scrollLeft,
                    scrollRight: scrollable.scrollWidth - scrollable.scrollLeft - scrollable.clientWidth,
                    scrollTop: scrollable.scrollTop,
                    scrollBottom: scrollable.scrollHeight - scrollable.scrollTop - scrollable.clientHeight,
                    hasHScrollbar: scrollable.scrollWidth > scrollable.clientWidth,
                    hasVScrollbar: scrollable.scrollHeight > scrollable.clientHeight,
                    isScrolling: false,
                    topReached: scrollable.scrollTop === 0,
                    bottomReached: scrollable.scrollTop + scrollable.clientHeight >= scrollable.scrollHeight,
                    leftReached: scrollable.scrollLeft === 0,
                    rightReached: scrollable.scrollLeft + scrollable.clientWidth >= scrollable.scrollWidth
                };
                setScrollState((prev) =>
                {
                    if (
                        newScrollState.topReached !== prev.topReached
                        && newScrollState.topReached
                        && optionsRef.current.onTopReached
                    )
                    {
                        optionsRef.current.onTopReached();
                    }
                    if (
                        newScrollState.bottomReached !== prev.bottomReached
                        && newScrollState.bottomReached
                        && optionsRef.current.onBottomReached
                    )
                    {
                        optionsRef.current.onBottomReached();
                    }
                    if (
                        newScrollState.leftReached !== prev.leftReached
                        && newScrollState.leftReached
                        && optionsRef.current.onLeftReached
                    )
                    {
                        optionsRef.current.onLeftReached();
                    }
                    if (
                        newScrollState.rightReached !== prev.rightReached
                        && newScrollState.rightReached
                        && optionsRef.current.onRightReached
                    )
                    {
                        optionsRef.current.onRightReached();
                    }
                    return newScrollState;
                });
            }, optionsRef.current.delay);
        };

        scrollable.addEventListener("scroll", _handleScroll, { passive: true });
        return () =>
        {
            _clearTimer(timer);
            scrollable.removeEventListener("scroll", _handleScroll);
        };
    }, [ref]);

    return scrollState;
}

function _clearTimer(timer: number | undefined)
{
    if (timer != null)
    {
        window.clearTimeout(timer);
    }
}
