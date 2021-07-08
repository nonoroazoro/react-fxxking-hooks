/**
 * Represents the scroll state.
 */
export interface ScrollState
{
    /**
     * The `horizontal` position of the scrollbar, relative to the `left` edge.
     *
     * If the `horizontal` scrollbar is hidden, this value is `0`。
     */
    scrollLeft: number;

    /**
     * The `horizontal` position of the scrollbar, relative to the `right` edge.
     *
     * If the `horizontal` scrollbar is hidden, this value is `0`。
     */
    scrollRight: number;

    /**
     * The `vertical` position of the scrollbar, relative to the `top` edge.
     *
     * If the `vertical` scrollbar is hidden, this value is `0`。
     */
    scrollTop: number;

    /**
     * The `vertical` position of the scrollbar, relative to the `bottom` edge.
     *
     * If the `vertical` scrollbar is hidden, this value is `0`。
     */
    scrollBottom: number;

    /**
     * Indicates whether the `horizontal` scrollbar exists.
     */
    hasHScrollbar: boolean;

    /**
     * Indicates whether the `vertical` scrollbar exists.
     */
    hasVScrollbar: boolean;

    /**
     * Indicates whether the scrollbar is scrolling.
     */
    isScrolling: boolean;

    /**
     * Indicates whether the scrollbar has reached the `top`.
     */
    topReached: boolean;

    /**
     * Indicates whether the scrollbar has reached the `bottom`.
     */
    bottomReached: boolean;

    /**
     * Indicates whether the scrollbar has reached the `left`.
     */
    leftReached: boolean;

    /**
     * Indicates whether the scrollbar has reached the `right`.
     */
    rightReached: boolean;
}
