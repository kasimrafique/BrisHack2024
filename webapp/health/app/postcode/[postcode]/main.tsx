import { getScores, get_scores_array, getScoreOfYear } from "../../lib/score";
import { Montserrat } from "next/font/google";
import { calcLin } from "../../lib/math";
import { get_england_array } from "../../lib/default-data";
import { Keys } from "../../lib/default-data";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false, })
import dynamic from "next/dynamic";
import { yearlyLADValues } from "../../lib/graphs";
import Input from "./input";

const montserrat = Montserrat({ subsets: ["latin"] });

export async function Main({ lad }: { lad: string }) {

    const scores = get_scores_array(await getScores(lad));
    const ladVals = await yearlyLADValues(lad);
    const engVals = get_england_array();
    const ladRecord = await getScoreOfYear(lad, 2020);
    //const plots = ladVals && engVals && PlotLADs({ ladVals, engVals });
    //const scorePlots = scores && PlotScores({ scores });

    return (
        <>
            <div className="bg-white text-black">
                <div className="columns-2 bg-dark-green">
                    <div className={`flex justify-center  text-5xl text-white py-20 ${montserrat.className}`}>
                        <p>How Healthy is your Postcode?</p>
                    </div>
                    <div className={`flex justify-center text-5xl text-white py-20 ${montserrat.className}`}>
                        <Input />                        
                    </div>
                </div>


                <div className={`flex justify-left text-3xl font-semi-bold text-lilac py-2 my-2 ml-4 ${montserrat.className}`}>
                    Summary
                </div>

                <div className="grid grid-cols-7 gap-4 py-5" >
                    <div className={`flex justify-left text-xl font-semi-bold text-dark-green ml-4 ${montserrat.className}`}>
                        <p>Dial goes here</p>
                    </div>
                    <div className="col-span-4">
                        <i className={`flex justify-left text-xl font-semi-bold text-dark-green gap-8 pd-3 ${montserrat.className}`}>Life Satisfaction</i>
                        <p>The life satisfaction rating for {lad} is {ladRecord && ladRecord.life_satisfaction}/10 based on data from an Annual Population Survey in 2020.
                            This is [not good, below average, average, above average, very good] compared to the rest of England. </p>
                    </div>
                    <div className="">
                        <p> Graph goes here </p>
                        {/* <div className="border border-black scale-75">{plots && plots[0]}</div> */}
                    </div>
                </div>


                <div className="grid grid-cols-7 gap-4 py-5" >
                    <div className={`flex justify-left text-xl font-semi-bold text-dark-green ml-4 ${montserrat.className}`}>
                        <p>Dial goes here</p>
                    </div>
                    <div className="col-span-4">
                        <i className={`flex justify-left text-xl font-semi-bold text-dark-green gap-8 pd-3 ${montserrat.className}`}>Healthy Eating</i>
                        <p>Based on the 2020 data from the public health data collection Fingertips for the percentage of adults in {lad}
                             classified as overweight, we have calculated your area as {ladRecord && ladRecord.healthy_eating}/10 for healthy eating.
                            This is [not good, below average, average, above average, very good] compared to the rest of England. </p>
                    </div>
                    <div className="">
                        <p> Graph goes here </p>
                        {/* <div className="border border-black scale-75">{plots && plots[1]}</div> */}
                    </div>
                </div>

                <div className="grid grid-cols-7 gap-4 py-5" >
                    <div className={`flex justify-left text-xl font-semi-bold text-dark-green ml-4 ${montserrat.className}`}>
                        <p>Dial goes here</p>
                    </div>
                    <div className="col-span-4">
                        <i className={`flex justify-left text-xl font-semi-bold text-dark-green gap-8 pd-3 ${montserrat.className}`}>Air Pollution</i>
                        <p>The air pollution rating for {lad} is {ladRecord && ladRecord.air_pollution}/10 based Defra’s recordings of annual mean PM2.5 in µg m-3
                            weighted by the population. </p>
                    </div>
                    <div className="">
                        <p> Graph goes here </p>
                        {/* <div className="border border-black scale-75">{plots && plots[4]}</div> */}
                    </div>
                </div>

                <div className="grid grid-cols-7 gap-4 py-5" >
                    <div className={`flex justify-left text-xl font-semi-bold text-dark-green ml-4 ${montserrat.className}`}>
                        <p>Dial goes here</p>
                    </div>
                    <div className="col-span-4">
                        <i className={`flex justify-left text-xl font-semi-bold text-dark-green gap-8 pd-3 ${montserrat.className}`}>Noise Complaints</i>
                        <p>Based on the 2020 data from the public health data collection Fingertips for the rate of noise complaints in
                     {lad}, we have calculated your area as {ladRecord && ladRecord.noise_complaints}/10 for noise complaints. This is [not good, below average,
                    average, above average, very good] compared to the rest of England. </p>
                    </div>
                    <div className="">
                        <p> Graph goes here </p>
                        {/* <div className="border border-black scale-75">{plots && plots[5]}</div> */}
                    </div>
                </div>

                <div className="grid grid-cols-7 gap-4 py-5" >
                    <div className={`flex justify-left text-xl font-semi-bold text-dark-green ml-4 ${montserrat.className}`}>
                        <p>Dial goes here</p>
                    </div>
                    <div className="col-span-4">
                        <i className={`flex justify-left text-xl font-semi-bold text-dark-green gap-8 pd-3 ${montserrat.className}`}>Green Spaces</i>
                        <p>The green space rating is {ladRecord && ladRecord.green_space}/10 based on the number of addresses in {lad} with private outdoor space.
                    This data is from the Office of National Statistics and Ordnance Survey data. </p>
                    </div>
                    <div className="">
                        <p> Graph goes here </p>
                        {/* <div className="border border-black scale-75">{plots && plots[5]}</div> */}
                    </div>
                </div>

                <div className="grid grid-cols-7 gap-4 py-5" >
                    <div className={`flex justify-left text-xl font-semi-bold text-dark-green ml-4 ${montserrat.className}`}>
                        <p>Dial goes here</p>
                    </div>
                    <div className="col-span-4">
                        <i className={`flex justify-left text-xl font-semi-bold text-dark-green gap-8 pd-3 ${montserrat.className}`}>Physical Activity</i>
                        <p>Add here {ladRecord && ladRecord.physical_activity}/10</p>
                    </div>
                    <div className="">
                        <p> Graph goes here </p>
                        {/* <div className="border border-black scale-75">{plots && plots[5]}</div> */}
                    </div>
                </div>

                <div className="grid grid-cols-7 gap-4 py-5" >
                    <div className={`flex justify-left text-xl font-semi-bold text-dark-green ml-4 ${montserrat.className}`}>
                        <p>Dial goes here</p>
                    </div>
                    <div className="col-span-4">
                        <i className={`flex justify-left text-xl font-semi-bold text-dark-green gap-8 pd-3 ${montserrat.className}`}>Road Safety</i>
                        <p>The road safety rating for {lad} is {ladRecord && ladRecord.road_safety}/10 based on the gov.uk Department for Transport records.
                    This is [not good, below average, average, above average, very good] compared to the rest of England. </p>
                    </div>
                    <div className="">
                        <p> Graph goes here </p>
                        {/* <div className="border border-black scale-75">{plots && plots[6]}</div> */}
                    </div>
                </div>

                <div className="grid grid-cols-7 gap-4 py-5" >
                    <div className={`flex justify-left text-xl font-semi-bold text-dark-green ml-4 ${montserrat.className}`}>
                        <p>Dial goes here</p>
                    </div>
                    <div className="col-span-5">
                        <i className={`flex justify-left text-xl font-semi-bold text-dark-green gap-8 pd-3 ${montserrat.className}`}>Distance to GP services</i>
                        <p>The median km distance from your local GP practice is [distance here if Parthiv finds it] based on NHS records of
                    addresses. This gives your area a score of {ladRecord && ladRecord.gp_distance}/10 which is [not good, below average, average, above average,
                    very good] compared to the rest of England. </p>
                    </div>
                </div>



                <div className="grid grid-cols-7 gap-4 py-5" >
                    <div className={`flex justify-left text-xl font-semi-bold text-dark-green ml-4 ${montserrat.className}`}>
                        <p>Dial goes here</p>
                    </div>
                    <div className="col-span-5">
                        <i className={`flex justify-left text-xl font-semi-bold text-dark-green gap-8 pd-3 ${montserrat.className}`}>Distance to Pharmacies</i>
                        <p>The median km distance from your local pharmacy is [distance here if Parthiv finds it] based on NHS records of
                    addresses. This gives your area a score of {ladRecord && ladRecord.pharmacy_distance}/10 which is [not good, below average, average, above average,
                    very good] compared to the rest of England. </p>
                    </div>
                </div>

                <div className="grid grid-cols-7 gap-4 py-5" >
                    <div className={`flex justify-left text-xl font-semi-bold text-dark-green ml-4 ${montserrat.className}`}>
                        <p>Dial goes here</p>
                    </div>
                    <div className="col-span-5">
                        <i className={`flex justify-left text-xl font-semi-bold text-dark-green gap-8 pd-3 ${montserrat.className}`}>Distance to Sports fascilities</i>
                        <p>The median km distance from your local pharmacy is [distance here if Parthiv finds it] based on NHS records of
                    addresses. This gives your area a score of {ladRecord && ladRecord.sport_facility_distance}/10 which is [not good, below average, average, above average,
                    very good] compared to the rest of England. </p>
                    </div>
                </div>
            </div>

        </>

    );
}

/*

function PlotLADs({ ladVals, engVals }: { ladVals: (number | null)[][], engVals: (number | null)[][] }) {
    return ladVals?.map((r, i) => {
        const xs = [2015, 2016, 2017, 2018, 2019, 2020];
        const ladLinVals = calcLin(xs[0], r);
        const engLinVals = calcLin(xs[0], engVals[i]);

        const ladData = {
            x: xs,
            y: r,
            type: 'scatter',
            mode: 'lines',
            marker: { color: 'purple' }
        }

        const engData = {
            x: xs,
            y: engVals[i],
            type: 'scatter',
            mode: 'lines',
            marker: { color: 'blue' }
        }

        const ladLin = {
            x: xs,
            y: ladLinVals,
            type: 'scatter',
            mode: 'lines',
            marker: { color: 'purple' },
            line: { dash: 'dot' }
        }

        const engLin = {
            x: xs,
            y: engLinVals,
            type: 'scatter',
            mode: 'lines',
            marker: { color: 'blue' },
            line: { dash: 'dot' }
        }

        return <Plot
            // THIS WORKS DONT FIX IT
            data={[ladData, engData, ladLin, engLin]}
            layout={{ title: Keys[i] }}
            config={{ 'staticPlot': true }}
        />
    });
}

function PlotScores({ scores }: { scores: (number | null)[][] }) {
    return scores?.map((r, i) => {
        const xs = [2015, 2016, 2017, 2018, 2019, 2020];
        const scoresLinVals = calcLin(xs[0], r);

        const scoresData = {
            x: xs,
            y: scores,
            type: 'scatter',
            mode: 'lines',
            marker: { color: 'purple' },
        }

        const scoresLin = {
            x: xs,
            y: scoresLinVals,
            type: 'scatter',
            mode: 'lines',
            marker: { color: 'blue' },
            line: { dash: 'dot' }
        }

        return <Plot
            // THIS WORKS DONT FIX IT
            data={[scoresData, scoresLin]}
            layout={{ title: Keys[i] }}
            config={{ 'staticPlot': true }}
        />
    });
}

*/