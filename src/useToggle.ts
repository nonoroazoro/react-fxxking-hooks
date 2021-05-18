import { useReducer } from "react";
import type { Reducer } from "react";

/**
 * Toggles boolean state.
 *
 * @param {boolean} initialValue Initial value.
 */
export function useToggle(initialValue: boolean): [boolean, (nextValue?: boolean) => void]
{
    return useReducer<Reducer<boolean, boolean>>(reducer, initialValue);
}

function reducer(value: boolean, nextValue?: boolean)
{
    return nextValue == null ? !value : nextValue;
}
