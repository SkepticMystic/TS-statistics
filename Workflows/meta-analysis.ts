import { normInv } from "../Functions/basic-stats";
import { fisherRtoZ, fisherZtoR } from "../Functions/other-stats"
import { sum, roundNumber } from "../Functions/utility";

export function fixedEffectMA(
    studies: {
        r: number,
        n: number,
        stdNormEffect?: number,
        nr?: number
    }[],
    alpha: number
) {
    const nT = sum(studies.map(st => st.n))
    const nBar = nT / studies.length
    const rBar = sum(studies.map(st => st.n * st.r)) / nT

    const sampEffectVar = sum(studies.map(st => st.n * ((st.r - rBar) ** 2))) / nT
    const errorVar = ((1 - (rBar ** 2)) ** 2) / (nBar - 1);
    const popEffectVar = sampEffectVar - errorVar;

    const moe = normInv(alpha / 2) * Math.sqrt(popEffectVar)
    const credInt: [number, number] = [rBar - moe, rBar + moe]

    return {
        trueEffect: roundNumber(popEffectVar, 4),
        credInt: credInt.map(bound => roundNumber(bound, 4))
    }

}

export function randomEffectsMA(studies: {
    r: number,
    n: number,
    z?: number,
    w?: number,
    wStar?: number
}[],
    alpha: number) {

    studies.forEach(st => {
        st.z = fisherRtoZ(st.r);
        st.w = st.n - 3
    })

    const wT = sum(studies.map(st => st.w))
    const w2T = sum(studies.map(st => st.w ** 2))
    const zBar = sum(studies.map(st => st.z * st.w)) / wT;

    const k = studies.length;
    const Q = sum(studies.map(st => st.w * ((st.z - zBar) ** 2)));
    const c = wT - (w2T / wT)
    const tau2 = (Q - (k - 1)) / c;

    studies.forEach(st => {
        st.wStar = 1 / ((1 / st.w) + tau2);
    });

    const zBarStar = sum(studies.map(st => st.wStar * st.z)) / sum(studies.map(st => st.wStar))
    const trueEffect = fisherZtoR(zBarStar)

    const moe = normInv(alpha / 2) * Math.sqrt(1 / sum(studies.map(st => st.wStar)))
    const confInt: [number, number] = [zBarStar + moe, zBarStar - moe]

    return {
        trueEffect: roundNumber(trueEffect, 4),
        confInt: confInt.map(bound => roundNumber(fisherZtoR(bound), 4))
    }
}

const studies = [
    { r: -0.68, n: 135 },
    { r: -0.79, n: 1235 },
    { r: -0.74, n: 570 },
    { r: 0.12, n: 190 },
    { r: 0.24, n: 52 }
];