import { DECIMALS } from "../constants";
import { mean } from "./basic-stats";

export const randInt = (a: number, b: number) => Math.round((Math.random() * (b - a))) + a

export function roundNumber(num: number, dec: number) {
    return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
}

export const sum = (xs: number[]) => {
    try {
        return xs.reduce((a, b) => a + b)
    }
    catch (e) {
        console.log(e.message)
    }
}

export function defIntegral(f: (x: number) => number, a: number, b: number, dx: number) {
    const heights: number[] = [];
    for (let i = a; i <= b; i += dx) {
        heights.push(f(i))
    }
    return roundNumber(mean(heights), DECIMALS);
}

export function arraysEqual(arr1: any[], arr2: any[]): boolean {
    return Array.isArray(arr1) && Array.isArray(arr2)
        && arr1.length === arr2.length
        && arr1.every((value, i) => value === arr2[i])
}