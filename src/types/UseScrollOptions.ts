/**
 * Represents the options of the `useScroll` hook.
 */
export interface UseScrollOptions
{
    /**
     * Specifies the response delay time in `milliseconds`.
     *
     * Defaults to `200`.
     */
    delay?: number;

    /**
     * Triggers when the scrollbar reached the `top`.
     */
    onTopReached?: () => void;

    /**
     * Triggers when the scrollbar reached the `bottom`.
     */
    onBottomReached?: () => void;

    /**
     * Triggers when the scrollbar reached the `left`.
     */
    onLeftReached?: () => void;

    /**
     * Triggers when the scrollbar reached the `right`.
     */
    onRightReached?: () => void;
}
