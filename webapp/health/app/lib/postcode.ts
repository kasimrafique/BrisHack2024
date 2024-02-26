"use server";

import { createClient } from "./server-client";


export async function getLAD(postcode: string) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("postcodes")
        .select("LAD")
        .eq("postcode", postcode)

    if (error !== null) {
        console.log(error);
        // Handle error
        return null;
    }

    if (data.length === 0) {
        return getNearestLAD(postcode);
    }

    return data[0].LAD;
}

async function getNearestLAD(postcode: string) {
    const supabase = createClient();
    const start = postcode.slice(0, -3);

    const { data, error } = await supabase
        .from("postcodes")
        .select("LAD")
        .like("postcode", start + "%")

    if (error !== null) {
        console.log(error);
        // Handle error
    }

    if (data === null) {
        return null;
    }

    return data[0].LAD;
}
