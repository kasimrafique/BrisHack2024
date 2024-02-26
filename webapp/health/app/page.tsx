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
        <><div className="bg-white x h-screen fill-white ">
            <div className={`flex justify-center w-screen object-fill bg-dark-green text-5xl text-white  py-20 ${montserrat.className}`}>
                <p>How Healthy is your Postcode?</p>
            </div>


            <div className="flex flex-col items-center">
                <div className="flex justify-center grid-cols-3 mr-5">
                    <div className="flex pl-2 pr-1 pt-8 pb-5 justify-left text-xl text-dark-green mx-4 my-2"> Enter your postcode here:</div>
                    <form action={dispatch}>
                        <div className="flex items-center">
                            <div className="mt-5">
                                <input type="text" name="postcode" className="mx-8 my-2 p-[5%] text-black rounded-[7px] border border-dark-green" placeholder="  Enter postcode" />
                            </div>
                            <div>
                                <button type="submit" className="text-black justify-center mt-6"><ArrowRightCircleIcon className="h-10 w-10 text-dark-green hover:text-green-800" /></button>
                            </div>
                        </div>
                    </form>
                </div>
                {state.error && <div className="flex justify-left text-sm text-red-300">{state.error}</div>}
            </div>

        </div><footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
                <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                    <span className="text-sm text-light-green text-center "><i>Valid for England Postcodes only</i></span>
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 Pancakes</span>
                    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">About</a>
                        </li>
                
                        <li>
                            <a href="mailto:askusanything@ashbythorpe.com?Subject=HAemailbounced" className="hover:underline">Contact</a>
                        </li>
                    </ul>
                </div>
            </footer></>



    );
}
