import { Data } from "./server-client";
import { england_data, standard_deviations } from "./default-data";
import { createClient } from "./client";


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

export async function getScoreOfYear(lad: string, year: number): Promise<Score | null> {
    const supabase = createClient();

    const { data, error }: {
        data: Data | null,
        error: any
    } = await supabase
        .from("data")
        .select("area_name, area_type, life_satisfaction, healthy_eating, physical_activity, green_space, gp_distance, pharmacy_distance, sport_facility_distance, air_pollution, noise_complaints, road_safety")
        .eq("area_code", lad)
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
    var sd;

    for (const key_eng in england_data) {
        if (year.toString() === key_eng) {
            const key = parseInt(key_eng) as keyof typeof england_data;
            england = england_data[key];
            break;
        }
    }

    for (const key_eng in standard_deviations) {
        if (year.toString() === key_eng) {
            const key = parseInt(key_eng) as keyof typeof standard_deviations;
            sd = standard_deviations[key];
            break;
        }
    }



    for (const key_t in england!) {
        const key: keyof Data = key_t as keyof Data;
        let score = 4;
        if (data[key] === null) {
            continue;
        }

        // @ts-ignore
        const z = (data[key] - england[key]) / sd[key];
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


export async function getScores(lad: string) {
    let scores: {
        2015: Score | null,
        2016: Score | null,
        2017: Score | null,
        2018: Score | null,
        2019: Score | null,
        2020: Score | null,
    } = {
        2015: null,
        2016: null,
        2017: null,
        2018: null,
        2019: null,
        2020: null,
    }

    for (const keyS in scores) {
        const key = parseInt(keyS) as keyof typeof scores;
        scores[key] = await getScoreOfYear(lad, key);
    }
    return scores;
}

export function get_scores_array(x: {
    2015: Score | null,
    2016: Score | null,
    2017: Score | null,
    2018: Score | null,
    2019: Score | null,
    2020: Score | null,
}) {
    let result: number[][] = [];
    for (const key_t in x) {
        const key = parseInt(key_t) as keyof typeof x;
        if (!x[key]) {
            return null;
        }
        const res = get_inner_array(x[key])
        if (!res) {
            return null;
        }

        result.push(res);
    }

    return result;
}

export function get_inner_array(x: Score | null) {
    if (!x) {
        return null;
    }

    let result: number[] = [];
    for (const key_t in x) {
        const key = key_t as keyof Score;
        if (!x[key]) {
            return null;
        }

        result.push(x[key]!);
    }

    return result;
}
