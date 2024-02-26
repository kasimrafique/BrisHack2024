"using client"

import { createClient } from "./client";

export async function getPlaceName(lad: string){
    const supabase = createClient();

    const { data, error }: {
        data: {area_name: string}[] | null,
        error: any
    } = await supabase
        .from("data")
        .select("area_name")
        .eq("area_code", lad);

    if (error !== null) {
        console.log(error);
        // Handle error
        return "your Area";
    }

    if (data === null || data.length === 0) {
        return "your Area";
    }

    return data[0].area_name;
}