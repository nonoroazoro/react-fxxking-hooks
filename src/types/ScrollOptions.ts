/**
 * Represents the options of the scroll.
 */
export interface ScrollOptions
{
    /**
     * Specifies the duration of smooth scrolling in `milliseconds`.
     *
     * Only valid if `isSmooth` is set to `true`.
     *
     * Defaults to `300`.
     */
    duration?: number;

    /**
     * Specifies whether the smooth scrolling is enabled.
     *
     * Defaults to `true`.
     */
    isSmooth?: boolean;

    /**
     * Specifies the scroll directrion.
     *
     * Defaults to `vertical`.
     */
    direction?: "horizontal" | "vertical";
}
