import { Montserrat } from "next/font/google";
import { fetchNames } from "../lib/apiInteface";


export async function FacilityList({ postcode, search, title, radius }: { postcode: string, search: string, title: string, radius: number }) {
    const facilities = await fetchNames(search, postcode, radius * 1609.34);
    if (facilities == "nothing") {
        return (<div>No results.</div>)
    }

    return (
        <div className="text-black">
            <h1 className="text-gray-800 font-semibold text-[17px]">{title} ({facilities.length})</h1>
            {facilities.map((x: any, i: number) => {
                return <div key={i}><a className="text-gray-700 hover:text-gray-800 hover:underline" href={x["websiteUri"]}>{x["displayName"]["text"]}</a></div>
            })}
        </div>
    );
}

export function FacilitySkeleton({ title }: { title: string }) {
    return (
        <div className="text-gray-700">
            <h1 className="text-gray-500 font-semibold text-[17px]">{title}</h1>
            <p>
                Loading...
            </p>
        </div>
    );
}
