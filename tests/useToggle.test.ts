import { renderHook, act } from "@testing-library/react-hooks";

import { useToggle } from "../src";

describe("useToggle", () =>
{
    it("should toggle state", () =>
    {
        const initialValue = false;
        const targetValue = true;
        const { result } = renderHook(() => useToggle(initialValue));
        expect(result.current[0]).toBe(initialValue);

        act(() =>
        {
            result.current[1]();
        });
        expect(result.current[0]).toBe(targetValue);
    });

    it("should toggle state to a specified value", () =>
    {
        const initialValue = false;
        const intermediateValue = true;
        const nextValue = false;
        const emptyNextValue = undefined;
        const { result } = renderHook(() => useToggle(initialValue));
        expect(result.current[0]).toBe(initialValue);

        act(() =>
        {
            result.current[1]();
        });
        expect(result.current[0]).toBe(intermediateValue);

        act(() =>
        {
            result.current[1](nextValue);
        });
        expect(result.current[0]).toBe(nextValue);

        act(() =>
        {
            result.current[1](emptyNextValue);
        });
        expect(result.current[0]).toBe(intermediateValue);
    });
});
