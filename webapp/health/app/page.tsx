"use client";

import { useState } from "react";
import { getLAD } from "./lib/postcode";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function Home() {
    const [postcode, setPostcode] = useState("");
    const [lad, setLAD] = useState("");

    const action = async (x : FormData) => {
        const postcode = x.get("postcode");
        if (typeof postcode === "string") {
            setLAD(await getLAD(postcode));
        }
    }

    return (


        <div className="bg-white">
            <div className={`flex justify-center bg-dark-green text-5xl text-white py-20 ${montserrat.className}`}> 
                <p>How Healthy is your Postcode?</p>
            </div>  


            <div className="">
                <div className="flex justify-left text-xl text-light-green mx-2 my-2"> Enter your postcode here:</div>
                
                <form action={action}>
                        <input type="text" name="postcode" className="mx-6 my-2 text-black rounded-[7px] border border-dark-green" placeholder="  Enter postcode" />
                    <button type="submit" className="text-black">Submit</button>
                </form>
        
                {lad !== "" && <p className="text-black">Your LAD code is : {lad}</p>}
                <div className="flex justify-left text-sm text-light-green"></div> 
                <Thing />

                <div className={`flex justify-left text-xl font-semi-bold text-dark-green py-20 ${montserrat.className}`}> 
                Summary
                <div className={`flex justify-left text-xl font-semi-bold text-dark-green py-20 ${montserrat.className}`}>
                    Life Satisfaction
                    
                </div>


                </div>

                <div className={`flex justify-left text-xl font-semi-bold text-dark-green py-20 ${montserrat.className}`}> Graphs</div>
            </div>

        </div>
    );
}

function Thing() {
    return <div></div>
}
