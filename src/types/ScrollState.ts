/**
 * Represents the scroll state.
 */
export interface ScrollState
{
    /**
     * The `horizontal` position of the scrollbar.
     *
     * If the `horizontal` scrollbar is hidden, this value is `0`。
     */
    x: number;

    /**
     * The `vertical` position of the scrollbar.
     *
     * If the `vertical` scrollbar is hidden, this value is `0`。
     */
    y: number;

    /**
     * Indicates whether the `horizontal` scrollbar exists.
     */
    hasXScrollbar: boolean;

    /**
     * Indicates whether the `vertical` scrollbar exists.
     */
    hasYScrollbar: boolean;

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
