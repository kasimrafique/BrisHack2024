import { createClient as createServerClient } from "./server-client";
import { createClient as createClientClient } from "./client";
import { SupabaseClient } from "@supabase/supabase-js";

export async function getLAD(postcode: string, supabase: SupabaseClient) {
    const { data, error } = await supabase
        .from("postcodes")
        .select("LAD")
        .eq("postcode", postcode)

    if (error !== null) {
        console.log(error);
        // Handle error
        return null;
    }

    console.log("hello");
    console.log(data);
    console.log(data.length);

    if (data.length === 0) {
        return getNearestLAD(postcode, supabase);
    }

    console.log(data[0]);
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
        // Handle error
    }

    if (data === null) {
        return null;
    }

    return data[0].LAD;
}
