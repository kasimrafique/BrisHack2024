"use client";

import { Suspense, useState } from "react";
import { FacilityList, FacilitySkeleton } from "./api";
import { Montserrat } from "next/font/google";
import Slider from "./slider";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function Location({ postcode }: { postcode: string }) {
    const [radius, setRadius] = useState(5);

    return (
        <>
            <div className="bg-white w-full flex flex-col justify-around items-center">
                <h1 className={`text-dark-green font-semibold text-xl ${montserrat.className}`}>Local health facilities</h1>
                <div className="flex items-center justify-between">
                    <label htmlFor="slider" className="text-dark-green font-semibold text-lg">
                        Radius: {radius} miles
                    </label>
                    <Slider value={radius} setValue={setRadius} id="slider" />
                </div>
            </div>
            <div className="bg-white grid grid-cols-4 p-5">
                <Suspense fallback={<Skeleton />}>
                    <FacilityList postcode={postcode} search="gym" title="Gyms" radius={radius} />
                    <FacilityList postcode={postcode} search="hospital" title="Hospitals" radius={radius} />
                    <FacilityList postcode={postcode} search="pharmacy" title="Pharmacies" radius={radius} />
                    <FacilityList postcode={postcode} search="gp" title="GPs" radius={radius} />
                </Suspense >
            </div >
        </>
    );
}

function Skeleton() {
    return (
        <>
            <FacilitySkeleton title="Gyms" />
            <FacilitySkeleton title="Hospitals" />
            <FacilitySkeleton title="Pharmacies" />
            <FacilitySkeleton title="GPs" />
        </>
    );
}
