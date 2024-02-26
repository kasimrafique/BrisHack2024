"use server";

import { createClient } from "./client";
import { Data } from "./server-client";
import { actually_transpose, transpose } from "./utils";

export type GraphData = {
    "life_satisfaction": number | null
    "healthy_eating": number | null
    "physical_activity": number | null
    "green_space": number | null
    "air_pollution": number | null
    "noise_complaints": number | null
    "road_safety": number | null,
}

export async function yearlyLADValues(place: String): Promise<(number | null)[][]> {
    const supabase = createClient();

    const { data, error }: { data: GraphData[] | null, error: any } = await supabase
        .from("data")
        .select("life_satisfaction, healthy_eating, physical_activity, green_space, air_pollution, noise_complaints, road_safety")
        .eq("area_code", place);
    const data_t = transpose(data);

    return actually_transpose(data_t);
}

export async function yearlyEngValues() {
    const supabase = createClient();

    const { data, error }: { data: GraphData[] | null, error: any } = await supabase
        .from("data")
        .select("life_satisfaction, healthy_eating, physical_activity, green_space, air_pollution, noise_complaints, road_safety")
        .eq("area_name", "ENGLAND");
    return actually_transpose(transpose(data));
}
