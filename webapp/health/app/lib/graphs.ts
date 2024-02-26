"use server";

import { createClient } from "./client";
import { Data } from "./server-client";

export type GraphData = {
    "life_satisfaction": number | null
    "healthy_eating": number | null
    "physical_activity": number | null
    "green_space": number | null
    "air_pollution": number | null
    "noise_complaints": number | null
    "road_safety": number | null,
}

// Doesn't actually transpose
async function transpose(data: GraphData[] | null) {
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

export async function yearlyLADValues(place: String): Promise<(number | null)[][]> {
    const supabase = createClient();

    const { data, error }: { data: GraphData[] | null, error: any } = await supabase
        .from("data")
        .select("life_satisfaction, healthy_eating, physical_activity, green_space, air_pollution, noise_complaints, road_safety")
        .eq("area_code", place);
    const data_t = transpose(data);

    return data_t;
}

export async function yearlyEngValues() {
    const supabase = createClient();

    const { data, error }: { data: GraphData[] | null, error: any } = await supabase
        .from("data")
        .select("life_satisfaction, healthy_eating, physical_activity, green_space, air_pollution, noise_complaints, road_safety")
        .eq("area_name", "ENGLAND");
    return transpose(data);
}
