/**
 * Checks if the input value is a `String` primitive or object.
 */
export function isString(input: any): input is string
{
    return (typeof input === "string" || input instanceof String);
}
