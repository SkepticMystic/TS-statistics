import { DIM_ERROR } from "../constants";
import { arraysEqual, randInt, sum } from "./utility";

export function randMat(n: number = 2, m: number = 2): number[][] {
    const mat: number[][] = []
    for (let i = 0; i < n; i++) {
        mat.push([]);
        for (let j = 0; j < m; j++) {
            mat[i].push(randInt(-9, 9))
        }
    }
    return mat
}

export const dim = (mat: number[][]): number[] => [mat.length, mat[0].length]

export function addVectors(v: number[], q: number[]): number[] {
    if (v.length !== q.length) {
        throw new Error(DIM_ERROR)
    }
    const p: number[] = [];
    for (let i = 0; i < v.length; i++) {
        p.push(v[i] + q[i]);
    }
    return p
}

export function addMatrices(A: number[][], B: number[][]) {
    if (!arraysEqual(dim(A), dim(B))) {
        throw new Error(DIM_ERROR)
    }

    const C: number[][] = [];
    for (let i = 0; i < A.length; i++) {
        C.push(addVectors(A[i], B[i]));
    }
    return C
}

export function transpose(A: number[][]) {
    const [rows, cols] = dim(A);
    const AT: number[][] = [];
    // For each column
    for (let j = 0; j < cols; j++) {
        // Add a new row to AT
        AT.push([])
        // And fill it with the values in the jth column of A
        A.forEach(row => AT[j].push(row[j]))
    }
    return AT
}

export const scalarMult = (k: number, A: number[][]) => A.map(row => row.map(element => element * k))

export const dot = (v: number[], q: number[]) => {
    if (v.length !== q.length) {
        throw new Error(DIM_ERROR)
    }

    return sum(v.map((el, i) => el * q[i]))
}