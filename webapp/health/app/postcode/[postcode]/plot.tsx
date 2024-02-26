"use client";

import dynamic from "next/dynamic";

const PlotlyPlot = dynamic(() => import("react-plotly.js"), { ssr: false, })

export function Plot({ data, layout, config }: { data: any, layout: any, config: any }) {
    return (
        <PlotlyPlot
            data={data}
            layout={layout}
            config={config}
        />
    );
}
