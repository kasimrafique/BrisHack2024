"use server";

import { redirect } from "next/navigation";
import { getLAD } from "./postcodeServer";

type FormState = {
    error?: string;
}

export async function getPostcode(prevState: FormState, x: FormData): Promise<FormState> {
    const postcode = x.get("postcode");
    if (typeof postcode === "string" && postcode != "") {
        const formatted = postcode.trim().replace(/\s/g, "").toUpperCase();
        const lad = await getLAD(formatted);
        if (lad !== "" && typeof lad === "string") {
            redirect(`/postcode/${formatted}`);
        }
    }

    return { error: "Invalid postcode" };
}
