"use server";

import { redirect } from "next/navigation";
import { getLAD } from "./postcode";

type FormState = {
    error?: string;
}

export async function getPostcode(prevState: FormState, x: FormData): Promise<FormState> {
    "use server";

    const postcode = x.get("postcode");
    if (typeof postcode === "string") {
        const formatted = postcode.trim().replace(/\s/g, "").toUpperCase();
        const lad = await getLAD(formatted);
        redirect(`/postcode/${formatted}`);
    } else {
        return { error: "Invalid postcode" };
    }
}
