import { E } from "../constants";

export const fisherRtoZ = (r: number) => 1 / 2 * (Math.log((1 + r) / (1 - r)));

export const fisherZtoR = (z: number) => {
    const ePow = E ** (2 * z);
    return (ePow - 1) / (ePow + 1)
}