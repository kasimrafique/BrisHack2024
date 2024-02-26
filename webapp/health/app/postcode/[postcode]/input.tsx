"use client";

import { getPostcode } from "@/app/lib/actions";
import { useFormState } from "react-dom";


export default function Input(){
    const [state, dispatch] = useFormState(getPostcode, {});

    return (
        <form action={dispatch}>
            <input type="text" name="postcode" className="mx-8 my-2 text-black rounded-[7px] border border-dark-green" placeholder="  Enter postcode" />
            <button type="submit" className="text-black">Submit</button>
        </form>
    );
}