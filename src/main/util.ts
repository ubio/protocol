export function deepClone(value: any): any {
    return JSON.parse(JSON.stringify(value));
}
