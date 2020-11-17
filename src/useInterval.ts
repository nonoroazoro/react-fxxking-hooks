import * as React from "react";

/**
 * setInterval hooks version.
 *
 * @param {() => void} onInterval Will be called on each interval.
 * @param {number} interval The interval time in `milliseconds`.
 * @param {boolean} [pause=false] Indicates whether the timer should be paused.
 */
export function useInterval(
    onInterval: () => void,
    interval: number,
    pause: boolean = false
)
{
    const ref = React.useRef(onInterval);

    // Updates when the callback is changed.
    React.useEffect(() =>
    {
        ref.current = onInterval;
    }, [onInterval]);

    React.useEffect(() =>
    {
        if (!pause)
        {
            // Starts a new timer when the interval or pause is changed.
            const timer = setInterval(() => { ref.current(); }, interval);
            return () => { clearInterval(timer); };
        }
        return;
    }, [interval, pause]);
}
