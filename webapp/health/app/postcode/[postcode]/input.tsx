"use client";

import { getPostcode } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({ subsets: ["latin"] });


export default function Input(){
    const [state, dispatch] = useFormState(getPostcode, {});

    return (
        
        <form action={dispatch}>
            <i className={`flex justify-left text-2xl font-semi-bold text-white mx-8 pt-3 ${montserrat.className}`}>Find out about another area:</i>
            <input type="text" name="postcode" className="mx-8 my-2 text-black rounded-[2px] border border-dark-green" placeholder="  Enter postcode" />
            <button type="submit" className="text-black">Submit</button>
        </form>
    );
}