import { useLayoutEffect, useRef, useState } from "react";
import type { RefObject } from "react";

/**
 * Creates a `shadow DOM tree` for the container, returns it's `shadow root`.
 *
 * If the shadow DOM tree is already there, returns it's shadow root.
 *
 * @param {RefObject<HTMLDivElement>} ref The container to attach the shadow DOM tree. Please note that not all elements can have a shadow DOM tree.
 * @param {ShadowRootInit} init The initial options of the shadow root.
 */
export function useShadowRoot(ref: RefObject<HTMLElement>, init: ShadowRootInit)
{
    const isInitializedRef = useRef(false);
    const [shadowRoot, setShadowRoot] = useState<ShadowRoot>();
    useLayoutEffect(() =>
    {
        if (!isInitializedRef.current && ref.current)
        {
            isInitializedRef.current = true;
            if (ref.current.shadowRoot)
            {
                setShadowRoot(ref.current.shadowRoot);
            }
            else
            {
                setShadowRoot(ref.current.attachShadow(init));
            }
        }
    }, [init, ref]);
    return shadowRoot;
}
