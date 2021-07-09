import { useLayoutEffect, useRef, useState } from "react";
import type { RefObject } from "react";

/**
 * Creates a `shadow DOM tree` for the container, returns it's `shadow root`.
 *
 * If the shadow DOM tree is already there, returns it's shadow root.
 *
 * @param {RefObject<Element>} ref The container to attach the shadow DOM tree. Please note that not all elements can have a shadow DOM tree.
 * @param {ShadowRootInit} init The initial options of the shadow root.
 */
export function useShadowRoot(shadowHostRef: RefObject<Element>, init: ShadowRootInit)
{
    const hasAttachedRef = useRef(false);
    const [shadowRoot, setShadowRoot] = useState<ShadowRoot>();
    useLayoutEffect(() =>
    {
        if (!hasAttachedRef.current && shadowHostRef.current)
        {
            hasAttachedRef.current = true;
            if (shadowHostRef.current.shadowRoot)
            {
                setShadowRoot(shadowHostRef.current.shadowRoot);
            }
            else
            {
                setShadowRoot(shadowHostRef.current.attachShadow(init));
            }
        }
    }, [init, shadowHostRef]);
    return shadowRoot;
}
