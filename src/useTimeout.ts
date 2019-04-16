import * as React from "react";

/**
 * setTimeout hooks version.
 *
 * @param {() => void} onTimeout Will be called when the timeout is reached.
 * @param {number} timeout The timeout in `milliseconds`.
 * @param {boolean} [pause=false] Indicates whether the timer should be paused.
 */
export function useTimeout(
    onTimeout: () => void,
    timeout: number,
    pause: boolean = false
)
{
    const ref = React.useRef({ onTimeout, actualTimeout: timeout, startTime: Date.now() });

    // Updates when the timeout is changed.
    React.useEffect(() =>
    {
        ref.current.actualTimeout = timeout;
    }, [timeout]);

    // Updates when the callback is changed.
    React.useEffect(() =>
    {
        ref.current.onTimeout = onTimeout;
    }, [onTimeout]);

    React.useEffect(() =>
    {
        if (pause)
        {
            // Calculates the actual timeout.
            ref.current.actualTimeout -= (Date.now() - ref.current.startTime);
            return;
        }
        else
        {
            // Records the start time.
            ref.current.startTime = Date.now();

            // Starts a new timer when the timeout or pause is changed.
            const timer = setTimeout(() => ref.current.onTimeout(), ref.current.actualTimeout);
            return () => clearTimeout(timer);
        }
    }, [timeout, pause]);
}
