"use client";

import { Montserrat } from "next/font/google";
import React from "react";
import { useFormState } from "react-dom";
import { getPostcode } from "./lib/actions";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function Home() {
<<<<<<< Updated upstream
    const [postcode, setPostcode] = useState("");
    const [ladVals, setLadVals] = useState<(number | null)[][]>();
    const [engVals, setEngVals] = useState<(number | null)[][]>();


    const action = async (x : FormData) => {
        const postcode = x.get("postcode");
        if (typeof postcode === "string") {
            const lad = await getLAD(postcode);
            setLadVals(await yearlyLADValues(lad));
            setEngVals(await yearlyEngValues());
         
        }
    }
    
||||||| ancestor
    calcLin(10, [1,2,3,4,5,6]);

    const [postcode, setPostcode] = useState("");
    const [ladVals, setLadVals] = useState<(number | null)[][]>();
    const [engVals, setEngVals] = useState<(number | null)[][]>();


    const action = async (x : FormData) => {
        const postcode = x.get("postcode");
        if (typeof postcode === "string") {
            const lad = await getLAD(postcode);
            setLadVals(await yearlyLADValues(lad));
            setEngVals(await yearlyEngValues());
         
        }
    }
    
=======
    const [state, dispatch] = useFormState(getPostcode, {});

>>>>>>> Stashed changes
    return (
        <div className="bg-white fill-slate-400">
            <div className={`flex justify-center bg-dark-green text-5xl text-white py-20 ${montserrat.className}`}>
                <p>How Healthy is your Postcode?</p>
            </div>


            <div className="">
                <div className="flex justify-left text-xl text-dark-green mx-4 my-2"> Enter your postcode here:</div>

                <form action={dispatch}>
                    <input type="text" name="postcode" className="mx-8 my-2 text-black rounded-[7px] border border-dark-green" placeholder="  Enter postcode" />
                    <button type="submit" className="text-black">Submit</button>
                </form>
                {
                    state.error && <div className="flex justify-left text-sm text-red">{state.error}</div>
                }
                <div className="flex justify-left text-sm text-light-green"></div>
            </div>

        </div>
    );
}
