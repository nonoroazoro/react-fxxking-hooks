import { isString } from "./lang";
import { raf } from "./caniuse";
import type { ScrollOptions } from "../types";

/**
 * Scrolls to bottom.
 *
 * @param {HTMLElement} scrollable The scrollable DOM element.
 * @param {boolean} [isSmooth=true] Specifies whether the smooth scrolling is enabled. Defaults to `true`.
 * @returns {() => void} Returns a function which can be called to cancel the scrolling.
 */
export function scrollToBottom(scrollable: HTMLElement, isSmooth = true)
{
    return scrollToPosition(scrollable, scrollable.scrollHeight, { isSmooth });
}

/**
 * Scrolls to the DOM element.
 *
 * @param {HTMLElement | string} scrollable The scrollable element or its DOM id.
 * @param {HTMLElement | string} target The element that will be scrolled to.
 * @param {ScrollOptions} [options] The scroll options.
 * @returns {() => void} Returns a function which can be called to cancel the scrolling.
 */
export function scrollToElement(scrollable: HTMLElement | string, target: HTMLElement | string, options?: ScrollOptions)
{
    let isCancelled = false;
    const scrollableElement = isString(scrollable) ? document.getElementById(scrollable) : scrollable;
    if (scrollableElement != null)
    {
        const targetElement = isString(target) ? scrollableElement.querySelector(`#${target}`) : target;
        if (targetElement != null)
        {
            const config: Required<ScrollOptions> = {
                isSmooth: true,
                duration: 300,
                direction: "vertical",
                ...options
            };
            if (raf())
            {
                const scrollPropertyName = config.direction === "vertical" ? "scrollTop" : "scrollLeft";
                const offsetPropertyName = config.direction === "vertical" ? "offsetTop" : "offsetLeft";
                const from = scrollableElement[scrollPropertyName];
                const to = targetElement[offsetPropertyName];
                const frames = !config.isSmooth || config.duration === 0 ? 1 : Math.round(config.duration / 16);
                const delta = (to - from) / frames;
                _scroll(0, delta, frames, scrollableElement, scrollPropertyName);
            }
            else
            {
                targetElement.scrollIntoView({
                    block: "start",
                    inline: "start",
                    behavior: config.isSmooth ? "smooth" : "auto"
                });
            }
        }
    }

    function _scroll(
        step: number,
        delta: number,
        frames: number,
        scrollableContainer: HTMLElement,
        scrollPropertyName: string
    )
    {
        const prevScroll = scrollableContainer[scrollPropertyName];
        scrollableContainer[scrollPropertyName] += delta;
        if (
            step + 1 < frames
            && scrollableContainer[scrollPropertyName] !== prevScroll
        )
        {
            window.requestAnimationFrame(() =>
            {
                if (!isCancelled)
                {
                    _scroll(step + 1, delta, frames, scrollableContainer, scrollPropertyName);
                }
            });
        }
    }

    return () => { isCancelled = true; };
}

/**
 * Scrolls to position.
 *
 * @param {HTMLElement | string} scrollable The scrollable element or its DOM id.
 * @param {number} position The position will scroll to.
 * @param {ScrollOptions} [options] The scroll options.
 * @returns {() => void} Returns a function which can be called to cancel the scrolling.
 */
export function scrollToPosition(scrollable: HTMLElement | string, position: number, options?: ScrollOptions)
{
    let isCancelled = false;
    const scrollableElement = isString(scrollable) ? document.getElementById(scrollable) : scrollable;
    if (scrollableElement != null)
    {
        const config: Required<ScrollOptions> = {
            isSmooth: true,
            duration: 300,
            direction: "vertical",
            ...options
        };
        const scrollPropertyName = config.direction === "vertical" ? "scrollTop" : "scrollLeft";
        if (raf())
        {
            const from = scrollableElement[scrollPropertyName];
            const frames = !config.isSmooth || config.duration === 0 ? 1 : Math.round(config.duration / 16);
            const delta = (position - from) / frames;
            _scroll(0, delta, frames, scrollableElement, scrollPropertyName);
        }
        else
        {
            scrollableElement[scrollPropertyName] = position;
        }
    }

    function _scroll(
        step: number,
        delta: number,
        frames: number,
        scrollableContainer: HTMLElement,
        scrollPropertyName: string
    )
    {
        const prevScroll = scrollableContainer[scrollPropertyName];
        scrollableContainer[scrollPropertyName] += delta;
        if (
            scrollableContainer[scrollPropertyName] !== prevScroll
            && step + 1 < frames
        )
        {
            window.requestAnimationFrame(() =>
            {
                if (!isCancelled)
                {
                    _scroll(step + 1, delta, frames, scrollableContainer, scrollPropertyName);
                }
            });
        }
    }

    return () => { isCancelled = true; };
}
