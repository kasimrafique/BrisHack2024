import { Suspense } from "react";
import { Main } from "./main";

export default function Page({ params }: { params: { postcode: string } }) {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <Main postcode={params.postcode} />
        </Suspense>
    );
}
