"use client";

import { useState } from "react";
import { getLAD } from "./lib/postcode";

export default function Home() {
    const [postcode, setPostcode] = useState("");
    const [lad, setLAD] = useState("");

    return (
        <div>
            <input type="text" placeholder="Enter postcode" value={postcode} onChange={e => setPostcode(e.target.value)} />
            <button onClick={async () => setLAD(await getLAD(postcode))}>Get LAD</button>
            {lad !== "" && <p>LAD: {lad}</p>}
        </div>
    );
}
