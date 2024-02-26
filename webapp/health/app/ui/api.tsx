"use client";

import { Montserrat } from "next/font/google";
import React from "react";
import { fetchNames } from "../lib/apiInteface";
import { getAirQualityIndex } from "../lib/apiInteface";
const montserrat = Montserrat({ subsets: ["latin"] });

const postcode = "BS14HJ";
const radius = 5000;

async function GymListHtml(){
    const gymList = await fetchNames("gym","BS14HJ",500);
    if(gymList == "nothing"){
        return (<div><a>No results.</a></div>)
    }
    return (
        <div className="text-black">
            {gymList.map((x: any)  => {
                return <div><a href={x["websiteUri"]}>{x["displayName"]["text"]}</a></div>
            })}
        </div>
    );
}

export default async function Home() {
    const airPolData = await getAirQualityIndex("BS14HJ");
    let index = (airPolData["indexes"])[0]["aqi"];
    console.log(index);
    return (
        <div className="bg-white fill-slate-400">
            <GymListHtml />
        </div>
    );
}