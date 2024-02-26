"use client";

import { useState } from "react";
import { Keys } from "./lib/default-data"
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false, })
import { getLAD } from "./lib/postcode";
import { Montserrat } from "next/font/google";
import { calcLin } from "./lib/math";

import { get_england_array,england_data } from "./lib/default-data";

const montserrat = Montserrat({ subsets: ["latin"] });
import { yearlyLADValues, yearlyEngValues } from "./lib/graphs";
import { Data } from "./lib/server-client";
import React from "react";
import dynamic from "next/dynamic";
import Score from "./ui/score";

export default function Home() {
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
    
    return (
        <div className="bg-white fill-slate-400">
            <div className={`flex justify-center bg-dark-green text-5xl text-white py-20 ${montserrat.className}`}> 
                <p>How Healthy is your Postcode?</p>
            </div>  


            <div className="">
                <div className="flex justify-left text-xl text-dark-green mx-4 my-2"> Enter your postcode here:</div>
                
                <form action={action}>
                        <input type="text" name="postcode" className="mx-8 my-2 text-black rounded-[7px] border border-dark-green" placeholder="  Enter postcode" />
                    <button type="submit" className="text-black">Submit</button>
                </form>
                <div className="flex justify-left text-sm text-light-green"></div> 
            </div>
            
        </div>
    );
}