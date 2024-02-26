"use client";

import { Montserrat } from "next/font/google";
import React from "react";
import { useFormState } from "react-dom";
import { getPostcode } from "./lib/actions";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";



const montserrat = Montserrat({ subsets: ["latin"] });

export default function Home() {
    const [state, dispatch] = useFormState(getPostcode, {});

    return (
        <div className="bg-white x h-screen fill-white ">
            <div className={`flex justify-center w-screen object-fill bg-dark-green text-5xl text-white  py-20 ${montserrat.className}`}>
                <p>How Healthy is your Postcode?</p>
            </div>


            <div className="flex justify-center">
                <div className="flex pl-2 pr-1 pt-8 pb-5 justify-left text-xl text-dark-green mx-4 my-2"> Enter your postcode here:</div>
                <form action={dispatch}>
                    <div className="mt-5">
                    <input type="text" name="postcode" className="mx-8 my-2 p-[5%] text-black rounded-[7px] border border-dark-green" placeholder="  Enter postcode" />
                    <button type="submit" className="text-black"><ArrowRightCircleIcon className="h-10 w-10 text-dark-green" /></button>
                    </div>
                </form>
                {
                    state.error && <div className="flex justify-left text-sm text-red">{state.error}</div>
                }
                <div className="flex justify-left text-sm text-light-green"></div>
            </div>

        </div>
    );
}
