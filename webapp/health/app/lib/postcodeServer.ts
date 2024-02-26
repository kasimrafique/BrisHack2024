import { createClient } from "./server-client";
import { getLAD as getLADimpl } from "./postcode";

export async function getLAD(postcode: string) {
    return getLADimpl(postcode, createClient());
}
