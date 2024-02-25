"use client";

import { useState } from "react";
import { Keys } from "./lib/default-data"
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false, })
import { getLAD } from "./lib/postcode";
import { yearlyLADValues, yearlyEngValues } from "./lib/graphs";
import { Data } from "./lib/server-client";
import React from "react";
import dynamic from "next/dynamic";

export default function Home() {
    const [postcode, setPostcode] = useState("");
    const [data, setData] = useState<(number | null)[][]>();

    return (
        <div>
            <input type="text" className="text-black" placeholder="Enter postcode" value={postcode} onChange={e => setPostcode(e.target.value)} />
            <button onClick={async () => {
                const lad = await getLAD(postcode);
                setData(await yearlyLADValues(lad));
            }}>Get Data</button>
            {data && <PlotGraphs data={data} />}
        </div>
    );
}

function PlotGraphs({ data } : { data : (number | null)[][]}) {
    return <>
        {data?.map((r, i) => {
            return <Plot
            data={[
            {
                x: [2015, 2016, 2017, 2018, 2019, 2020],
                y: r,
                type: 'scatter',
                mode: 'lines',
                marker: {color: 'red'},
            },
            ]}
            layout={ {title: Keys[i]} }
            />
        })}
    </>;
}