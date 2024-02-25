"use client";

import { useState } from "react";
import { Keys } from "./lib/default-data"
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false, })
import { getLAD } from "./lib/postcode";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });
import { yearlyLADValues, yearlyEngValues } from "./lib/graphs";
import { Data } from "./lib/server-client";
import React from "react";
import dynamic from "next/dynamic";

export default function Home() {
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
    
    const plots = ladVals && engVals && PlotGraphs({ladVals,engVals});
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

                <div className={`flex justify-left text-3xl font-semi-bold text-lilac py-2 my-2 ml-4 ${montserrat.className}`}> 
                Summary</div>
                <div className={`flex justify-left text-xl font-semi-bold text-dark-green py-2 ml-4 ${montserrat.className}`}>
                <i>Life Satisfaction</i>

                


                </div>

                <div className={`flex justify-left text-3xl font-semi-bold text-lilac py-4 ml-4  ${montserrat.className}`}> Graphs</div>
                <div className="border border-black scale-75">{plots && plots[0]}</div>
                <div className="border border-blue-600 scale-75">{plots && plots[1]}</div>
                <div className="border border-black scale-75">{plots && plots[2]}</div>
                <div className="border border-blue-600 scale-75">{plots && plots[3]}</div>
                <div className="border border-black scale-75">{plots && plots[4]}</div>
                {/* <div>{data && <PlotGraphs data={data}/>}</div> */}
            </div>
            
        </div>
    );
}


function PlotGraphs({ ladVals, engVals  } : { ladVals : (number | null)[][], engVals : (number | null)[][]}) {
    return ladVals?.map((r, i) => {
            return <Plot
            data={[
            {
                x: [2015, 2016, 2017, 2018, 2019, 2020],
                y: r,
                type: 'scatter',
                mode: 'lines',
                marker: {color: 'purple'},
            },
            {
                x: [2015, 2016, 2017, 2018, 2019, 2020],
                y: engVals[i],
                type: 'scatter',
                mode: 'lines',
                marker: {color: 'blue'},
            }
            ]}
            layout={ {title: Keys[i]} }
            config={ {'staticPlot': true} }
            />
    });
}
