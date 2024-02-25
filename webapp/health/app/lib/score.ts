import { Data, createClient } from "./server-client";
import { england_data} from "./default-data";
import { standard_deviations } from "./default-data";

export type Score = {
    "life_satisfaction": number | null
    "healthy_eating": number | null
    "physical_activity": number | null
    "green_space": number | null
    "gp_distance": number | null
    "pharmacy_distance": number | null
    "sport_facility_distance": number | null
    "air_pollution": number | null
    "noise_complaints": number | null
    "road_safety": number | null,
    "final_score": number | null
}

export async function getScore(lad: string, year : number): Promise<Score | null> {
    const supabase = createClient();

    const { data, error }: {
        data: Data | null,
        error: any
    } = await supabase
        .from("data")
        .select("area_name, area_type, life_satisfaction, healthy_eating, physical_activity, green_space, gp_distance, pharmacy_distance, sport_facility_distance, air_pollution, noise_complaints, road_safety")
        .eq("LAD", lad)
        .eq("year", year)
        .single();

    if (error !== null) {
        console.log(error);
        // Handle error
        return null;
    }

    if (data === null) {
        return null;
    }

    let scores: Score = {
        "life_satisfaction": null,
        "healthy_eating": null,
        "physical_activity": null,
        "green_space": null,
        "gp_distance": null,
        "pharmacy_distance": null,
        "sport_facility_distance": null,
        "air_pollution": null,
        "noise_complaints": null,
        "road_safety": null,
        "final_score": null
    };
    let final_score = 0;
    let n = 0;
    
    var england;

    for (const key_eng in england_data){
        if (year.toString() === key_eng){
            const key = parseInt(key_eng) as keyof typeof england_data;
            england = england_data[key];
        }
    }



    for (const key_t in Object.keys(england!)) {
        const key: keyof Data = key_t as keyof Data;
        let score = 4;
        if (data[key] === null) {
            continue;
        }

        // @ts-ignore
        const z = (data[key] - england[key]) / standard_deviations[key];
        if (key in ["life_satisfaction", "healthy_eating", "physical_activity", "green_space"]) {
            score += z;
        } else {
            score -= z;
        }

        scores[key] = score;
        final_score += score;
        n += 1;
    }

    // @ts-ignore
    if (n !== 0) {
        scores["final_score"] = (final_score / n) * (10 / 8);
    }


    // @ts-ignore
    return scores;
}
