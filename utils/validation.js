export function isPositiveInteger(str) {
    return /^([1-9]\d*)$/.test(str);
}

export function isNormalInteger(str) {
    return /^(0|[1-9]\d*)$/.test(str);
}
