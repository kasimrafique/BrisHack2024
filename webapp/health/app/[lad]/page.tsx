import { Suspense } from "react";
import { Score, getScores } from "../lib/score";

export default function Page({ params }: { params: { lad: string } }) {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <Score lad={params.lad} />
        </Suspense>
    );
}

async function Score({ lad }: { lad: string }) {
    const score = await getScores(lad);

    return (
        <p>{score && score?.[2015]?.air_pollution}</p>
    );
}
