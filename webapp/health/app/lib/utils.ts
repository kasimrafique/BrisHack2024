import { GraphData } from "./graphs";

// Doesn't actually transpose
export function transpose(data: GraphData[] | null) {
    let data_t: (number | null)[][] = [];
    if (!data) {
        return data_t;
    }

    for (const x of data) {
        let inner: (number | null)[] = [];
        for (const key_t in x) {
            const key = key_t as keyof GraphData;
            inner.push(x[key]);
        }
        data_t.push(inner);
    }

    return data_t;
}

export function actually_transpose<T>(data: T[][]): T[][] {
    if (data.length === 0) {
        return [];
    }
    let data_t: T[][] = [];
    for (let i = 0; i < data[0].length; i++) {
        let inner: T[] = [];
        for (let j = 0; j < data.length; j++) {
            inner.push(data[j][i]);
        }
        data_t.push(inner);
    }
    return data_t;
}
