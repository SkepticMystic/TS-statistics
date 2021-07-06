import { erf } from "mathjs";
import { DECIMALS } from "../constants";
import { roundNumber, sum } from "./utility";

export const mean = (xs: number[]) => sum(xs) / (xs.length);

export const variance = (xs: number[]) => {
    const xbar = mean(xs);
    const sse = sum(xs.map(x => (x - xbar) ** 2));
    return roundNumber(sse / (xs.length - 1), DECIMALS);
}

export const stdev = (xs: number[]) => variance(xs) ** 0.5
export const stdDevPBar = (pbar: number, n: number) => Math.sqrt((pbar * (1 - pbar)) / n)

// SECTION NormInv. Source: https://stackoverflow.com/questions/8816729/javascript-equivalent-for-inverse-normal-function-eg-excels-normsinv-or-nor
function erfcinv(p: number) {
    let j = 0;
    let x: number, err: number, t: number, pp: number;
    if (p >= 2)
        return -100;
    if (p <= 0)
        return 100;
    pp = (p < 1) ? p : 2 - p;
    t = Math.sqrt(-2 * Math.log(pp / 2));
    x = -0.70711 * ((2.30753 + t * 0.27061) /
        (1 + t * (0.99229 + t * 0.04481)) - t);
    for (; j < 2; j++) {
        err = erfc(x) - pp;
        x += err / (1.12837916709551257 * Math.exp(-x * x) - x * err);
    }
    return (p < 1) ? x : -x;
}
function erfc(x: number) {
    return 1 - erf(x);
}
export function normInv(p: number) {
    return -1.41421356237309505 * erfcinv(2 * p);

}
// !SECTION

export function moe(n: number, sigma: number | null, alpha: number) {
    if (sigma) {
        return normInv(alpha / 2) * (sigma / Math.sqrt(n))
    }
    // else {}
}

export function confInt(xbar: number, sigma: number | null, n: number, alpha: number): [number, number] {
    const error = moe(n, sigma, alpha)
    const a = roundNumber(xbar + error, DECIMALS);
    const b = roundNumber(xbar - error, DECIMALS);
    return [a, b]
}