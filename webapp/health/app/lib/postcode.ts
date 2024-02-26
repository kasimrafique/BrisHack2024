import { SupabaseClient } from "@supabase/supabase-js";

export async function getLAD(postcode: string, supabase: SupabaseClient) {
    const { data, error } = await supabase
        .from("postcodes")
        .select("LAD")
        .eq("postcode", postcode)

    if (error !== null) {
        console.log(error);
        return null;
    }

    if (data.length === 0) {
        return getNearestLAD(postcode, supabase);
    }

    return data[0].LAD;
}

async function getNearestLAD(postcode: string, supabase: SupabaseClient) {
    const start = postcode.slice(0, -3);

    const { data, error } = await supabase
        .from("postcodes")
        .select("LAD")
        .like("postcode", start + "%")

    if (error !== null) {
        console.log(error);
        return null;
    }

    if (data === null || data.length === 0) {
        return null;
    }

    return data[0].LAD;
}
