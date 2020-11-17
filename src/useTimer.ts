import * as React from "react";

/**
 * Advanced timer which supports both `interval` and `timeout`.
 *
 * @param {() => void} onInterval Will be called on each interval.
 * @param {number} interval The interval time in `milliseconds`.
 * @param {() => void} onTimeout Will be called when the timeout is reached.
 * @param {number} timeout The timeout in `milliseconds`.
 * @param {boolean} [pause=false] Indicates whether the timer should be paused.
 */
export function useTimer(
    onInterval: () => void,
    interval: number,
    onTimeout: () => void,
    timeout: number,
    pause: boolean = false
)
{
    const ref = React.useRef({ onInterval, onTimeout, timeRemaining: timeout });

    // Updates when the timeout is changed.
    React.useEffect(() =>
    {
        ref.current.timeRemaining = timeout;
    }, [timeout]);

    // Updates when the callbacks are changed.
    React.useEffect(() =>
    {
        ref.current.onInterval = onInterval;
    }, [onInterval]);
    React.useEffect(() =>
    {
        ref.current.onTimeout = onTimeout;
    }, [onTimeout]);

    React.useEffect(() =>
    {
        if (!pause)
        {
            if (ref.current.timeRemaining <= 0)
            {
                ref.current.onTimeout();
                return;
            }
            else
            {
                // Starts a new timer when the interval or pause is changed.
                const timer = setInterval(() =>
                {
                    ref.current.timeRemaining -= interval;
                    if (ref.current.timeRemaining <= 0)
                    {
                        clearInterval(timer);
                        ref.current.onTimeout();
                    }
                    else
                    {
                        ref.current.onInterval();
                    }
                }, interval);
                return () => { clearInterval(timer); };
            }
        }
        return;
    }, [interval, pause]);
}
