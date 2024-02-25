import { createClient } from "./server-client";
import { england_2020 } from "./default-data";
import { standard_deviations } from "./default-data";

async function score(lad: string) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("scores")
        .select("area_name, area_type, life_satisfaction, healthy_eating, physical_activity, green_space, gp_distance, pharmacy_distance, sport_facility_distance, air_pollution, noise_complaints, road_safety")
        .eq("LAD", lad)
        .single();

    if (error !== null) {
        console.log(error);
        // Handle error
    }

    if (data === null) {
        return null;
    }

    let scores = {};
    let final_score = 0;
    for (const key in england_2020) {
        let score = 4;
        // @ts-ignore
        const z = (data[key] - england_2020[key]) / standard_deviations[key];
        if (key in ["life_satisfaction", "healthy_eating", "physical_activity", "green_space"]) {
            score += z;
        } else {
            score -= z;
        }

        // @ts-ignore
        scores[key] = score;
        final_score += score;
    }

    scores["final_score"] = final_score / england_2020.length;
}
