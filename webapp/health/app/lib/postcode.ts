import { equal } from "assert";
import { createClient, supabase } from "./server-client";

export async function getLAD(postcode: string) {
    const start = postcode.trim().replace(/\s/g, "");
    const { row, error } = await supabase
        .from("postcodes")
        .eq("postcode", start)
        .select("LAD");

    if (row.length == 0) {
        getNearestLAD(start);
    }

    return row[0].LAD;
}

async function getNearestLAD(postcode: string) {
    const start = postcode.slice(0, -3);

    const { data, error } = await supabase
        .from("postcodes")
        .like("postcode", start + "%")
        .select("LAD")
    
    if (data.length === 0) {
        return null;
    }

    return data[0].LAD;
}