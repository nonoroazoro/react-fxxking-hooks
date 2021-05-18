/**
 * Detects the support for the basic `window.requestAnimationFrame` api.
 */
export function raf()
{
    return (
        window != null
        && typeof window.requestAnimationFrame === "function"
        && typeof window.cancelAnimationFrame === "function"
    );
}
