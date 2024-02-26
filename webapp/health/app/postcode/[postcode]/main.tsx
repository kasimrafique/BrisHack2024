import { getScores, get_scores_array, getScoreOfYear } from "../../lib/score";
import { Montserrat } from "next/font/google";
import { calcLin } from "../../lib/math";
import { get_england_array } from "../../lib/default-data";
import { Keys } from "../../lib/default-data";
import { Plot } from "./plot";
import { yearlyLADValues } from "../../lib/graphs";
import Input from "./input";
import Dial from "../../ui/score"
import { getLAD } from "@/app/lib/postcodeClient";
import { actually_transpose } from "@/app/lib/utils";
import Location from "@/app/ui/location";
import { getPlaceName } from "@/app/lib/getPlace";

const montserrat = Montserrat({ subsets: ["latin"] });

function getCommentFromScore(score: number){
    if(score<3){
        return "not good";
    }
    else if(score<4.5){
        return "less than average";
    }
    else if(score<5.5){
        return "average";
    }
    else if(score<7){
        return "above average";
    }
    else return "very good";
}

export async function Main({ postcode }: { postcode: string }) {
    const lad = await getLAD(postcode.trim().replace(/\s/g, "").toUpperCase());
    const scores = get_scores_array(await getScores(lad));
    const ladVals = await yearlyLADValues(lad);
    const engVals = actually_transpose(get_england_array());
    const ladRecord = await getScoreOfYear(lad, 2020);
    console.log(ladRecord);
    const plots = ladVals && engVals && PlotLADs({ ladVals, engVals });
    const scorePlots = scores && PlotScores({ scores });
    const placeName = await getPlaceName(lad);

    return (
        <>
            <div className="bg-white text-black">
                <div className="columns-2 bg-dark-green">
                    <div className={`flex justify-center  text-5xl text-white pl-12 bottom-2 py-20 ${montserrat.className}`}>
                        <p>How Healthy is your Postcode?</p>
                    </div>
                    <div className={`justify-center text-3xl text-white py-20 ${montserrat.className}`}>
                        <Input />
                    </div>
                </div>

                <div className="flex space-x-5">
                    <div className = "pt-10 pl-10 pr-10">
                        <i className={`flex justify-left text-4xl font-semi-bold text-dark-green pt-3 ${montserrat.className}`}>Overall Score</i>
                    </div>
                    <div className={`col-span-1 flex justify-left text-xl font-semi-bold text-dark-green ml-10 pl-30 pr-30 pt-14  ${montserrat.className}`}>
                        {ladRecord && ladRecord.final_score && <Dial score={ladRecord.final_score} size={15} />}
                    </div>
                    <div className="pl-10 pr-10 pt-10">
                        <i className={`flex justify-left text-2xl font-semi-bold text-dark-green pt-3 ${montserrat.className}`}> What this score means:</i>
                        <p> This score is calculated based on numerous catergories that affect your health as summarised below. Your area has scored a {ladRecord && ladRecord.final_score}/10.
                         The average for England is a five out of ten so above five means your area
                        is above average and below five means your area is below average.
                         </p>
                    </div>

                </div>


                <div className="flex space-x-5" >
                    <div className={`col-span-1 flex justify-left text-xl font-semi-bold text-dark-green ml-10 pt-14  ${montserrat.className}`}>
                        {ladRecord && ladRecord.life_satisfaction && <Dial score={ladRecord.life_satisfaction} size={9} />}
                    </div>
                    <div className="pt-10 pl-10 ">
                        <i className={`flex justify-left text-2xl font-semi-bold text-dark-green pt-3 ${montserrat.className}`}>Life Satisfaction</i>
                        <ul className="list-disc pl-4 pr-3 pt-3">
                            <li>The life satisfaction rating for {placeName} is {ladRecord && ladRecord.life_satisfaction}/10 based on data from an Annual Population
                                Survey in 2020.</li>
                            <li>This is {ladRecord && ladRecord.life_satisfaction && getCommentFromScore(ladRecord.life_satisfaction)} compared to the rest of England. </li>
                        </ul>

                    </div>
                    <div className="pt-7 pr-10">
                        <div className="border border-black ">{plots && plots[0]}</div>
                    </div>
                </div>



                <div className="flex space-x-5" >
                    <div className={`col-span-1 flex justify-left text-xl font-semi-bold text-dark-green ml-10 pt-14  ${montserrat.className}`}>
                        {ladRecord && ladRecord.healthy_eating && <Dial score={ladRecord.healthy_eating} size={9} />}
                    </div>
                    <div className="pt-10 pl-10 ">
                        <i className={`flex justify-left text-2xl font-semi-bold text-dark-green pt-3 ${montserrat.className}`}>Healthy Eating</i>
                        <ul className="list-disc pl-4 pr-3 pt-3">
                            <li>Based on the 2020 data from the public health data collection Fingertips for the percentage of adults in {placeName} 
                                classified as overweight, we have calculated your area as {ladRecord && ladRecord.healthy_eating}/10 for healthy eating.</li>
                            <li>This is {ladRecord && ladRecord.healthy_eating && getCommentFromScore(ladRecord.healthy_eating)} compared to the rest of England. </li>
                        </ul>

                    </div>
                    <div className="pt-7 pr-10">
                        <div className="border border-black ">{plots && plots[1]}</div>
                    </div>
                </div>

                <div className="flex space-x-5" >
                    <div className={`col-span-1 flex justify-left text-xl font-semi-bold text-dark-green ml-10 pt-14  ${montserrat.className}`}>
                        {ladRecord && ladRecord.air_pollution && <Dial score={ladRecord.air_pollution} size={9} />}
                    </div>
                    <div className="pt-10 pl-10 ">
                        <i className={`flex justify-left text-2xl font-semi-bold text-dark-green pt-3 ${montserrat.className}`}>Air Pollution</i>
                        <ul className="list-disc pl-4 pr-3 pt-3">
                            <li>The air pollution rating for {placeName} is {ladRecord && ladRecord.air_pollution}/10 based Defra’s recordings of annual mean PM2.5 in µg m-3
                                weighted by the population.</li>
                            <li>This is {ladRecord && ladRecord.air_pollution && getCommentFromScore(ladRecord.air_pollution)} compared to the rest of England. </li>
                        </ul>

                    </div>
                    <div className="pt-7 pr-10">
                        <div className="border border-black ">{plots && plots[4]}</div>
                    </div>
                </div>

                <div className="flex space-x-5" >
                    <div className={`col-span-1 flex justify-left text-xl font-semi-bold text-dark-green ml-10 pt-14  ${montserrat.className}`}>
                        {ladRecord && ladRecord.noise_complaints && <Dial score={ladRecord.noise_complaints} size={9} />}
                    </div>
                    <div className="pt-10 pl-10 ">
                        <i className={`flex justify-left text-2xl font-semi-bold text-dark-green pt-3 ${montserrat.className}`}>Noise Complaints</i>
                        <ul className="list-disc pl-4 pr-3 pt-3">
                            <li>Based on the 2020 data from the public health data collection Fingertips for the rate of noise complaints in
                            {placeName}, we have calculated your area as {ladRecord && ladRecord.noise_complaints}/10 for noise complaints.</li>
                            <li>This is {ladRecord && ladRecord.noise_complaints && getCommentFromScore(ladRecord.noise_complaints)} compared to the rest of England. </li>
                        </ul>

                    </div>
                    <div className="pt-7 pr-10">
                        <div className="border border-black ">{plots && plots[5]}</div>
                    </div>
                </div>



                <div className="flex space-x-5" >
                    <div className={`col-span-1 flex justify-left text-xl font-semi-bold text-dark-green ml-10 pt-14  ${montserrat.className}`}>
                        {ladRecord && ladRecord.green_space && <Dial score={ladRecord.green_space} size={9} />}
                    </div>
                    <div className="pt-10 pl-10 ">
                        <i className={`flex justify-left text-2xl font-semi-bold text-dark-green pt-3 ${montserrat.className}`}>Green Space</i>
                        <ul className="list-disc pl-4 pr-3 pt-3">
                            <li>The green space rating is {ladRecord && ladRecord.green_space}/10 based on the number of addresses in {placeName} with private outdoor space.
                                This data is from the Office of National Statistics and Ordnance Survey data.</li>
                            <li>This is {ladRecord && ladRecord.green_space && getCommentFromScore(ladRecord.green_space)} compared to the rest of England. </li>
                        </ul>

                    </div>
                    <div className="pt-7 pr-10">
                        <div className="border border-black ">{plots && plots[3]}</div>
                    </div>
                </div>

                <div className="flex space-x-5" >
                    <div className={`col-span-1 flex justify-left text-xl font-semi-bold text-dark-green ml-10 pt-14  ${montserrat.className}`}>
                        {ladRecord && ladRecord.physical_activity && <Dial score={ladRecord.physical_activity} size={9} />}
                    </div>
                    <div className="pt-10 pl-10 ">
                        <i className={`flex justify-left text-2xl font-semi-bold text-dark-green pt-3 ${montserrat.className}`}>Physical Activity</i>
                        <ul className="list-disc pl-4 pr-3 pt-3">
                            <li>Based on the 2020 data from the public health data collection Fingertips for the respondents aged 19 and over in {placeName} 
                                of their physical activity per week, we have calculated your area as {ladRecord && ladRecord.physical_activity}/10 for physical activity. </li>
                            <li>This is {ladRecord && ladRecord.physical_activity && getCommentFromScore(ladRecord.physical_activity)} compared to the rest of England. </li>
                        </ul>

                    </div>
                    <div className="pt-7 pr-10">
                        <div className="border border-black">{plots && plots[2]}</div>
                    </div>
                </div>

                <div className="flex space-x-5" >
                    <div className={`col-span-1 flex justify-left text-xl font-semi-bold text-dark-green ml-10 pt-14  ${montserrat.className}`}>
                        {ladRecord && ladRecord.road_safety && <Dial score={ladRecord.road_safety} size={9} />}
                    </div>
                    <div className="pt-10 pl-10 ">
                        <i className={`flex justify-left text-2xl font-semi-bold text-dark-green pt-3 ${montserrat.className}`}>Road Safety</i>
                        <ul className="list-disc pl-4 pr-3 pt-3">
                            <li>The road safety rating for {placeName} is {ladRecord && ladRecord.road_safety}/10 based on the gov.uk Department for Transport records.</li>
                            <li>This is {ladRecord && ladRecord.road_safety && getCommentFromScore(ladRecord.road_safety)} compared to the rest of England. </li>
                        </ul>

                    </div>
                    <div className="pt-7 pr-10">
                        <div className="border border-black ">{plots && plots[6]}</div>
                    </div>
                </div>


                <div className="flex space-x-5" >
                    <div className={`col-span-1 flex justify-left text-xl font-semi-bold text-dark-green ml-10 pt-14  ${montserrat.className}`}>
                        {ladRecord && ladRecord.gp_distance && <Dial score={ladRecord.gp_distance} size={9} />}
                    </div>
                    <div className="pt-10 pl-10 ">
                        <i className={`flex justify-left text-2xl font-semi-bold text-dark-green pt-3 ${montserrat.className}`}>Distance to GP</i>
                        <ul className="list-disc pl-4 pr-3 pt-3">
                            <li>The median km distance from your local GP practice is [distance here if Parthiv finds it] based on NHS records of
                                addresses. This gives your area a score of {ladRecord && ladRecord.gp_distance}/10</li>
                            <li>This is {ladRecord && ladRecord.gp_distance && getCommentFromScore(ladRecord.gp_distance)} compared to the rest of England. </li>
                        </ul>

                    </div>
                </div>


                <div className="flex space-x-5" >
                    <div className={`col-span-1 flex justify-left text-xl font-semi-bold text-dark-green ml-10 pt-14  ${montserrat.className}`}>
                        {ladRecord && ladRecord.pharmacy_distance && <Dial score={ladRecord.pharmacy_distance} size={9} />}
                    </div>
                    <div className="pt-10 pl-10 ">
                        <i className={`flex justify-left text-2xl font-semi-bold text-dark-green pt-3 ${montserrat.className}`}>Distance to Pharmacies</i>
                        <ul className="list-disc pl-4 pr-3 pt-3">
                            <li>The median km distance from your local pharmacy is [distance here if Parthiv finds it] based on NHS records of
                                addresses. This gives your area a score of {ladRecord && ladRecord.pharmacy_distance}/10</li>
                            <li>This is {ladRecord && ladRecord.pharmacy_distance && getCommentFromScore(ladRecord.pharmacy_distance)} compared to the rest of England. </li>
                        </ul>

                    </div>
                </div>

                <div className="flex space-x-5" >
                    <div className={`col-span-1 flex justify-left text-xl font-semi-bold text-dark-green ml-10 pt-14  ${montserrat.className}`}>
                        {ladRecord && ladRecord.pharmacy_distance && <Dial score={ladRecord.pharmacy_distance} size={9} />}
                    </div>
                    <div className="pt-10 pl-10 ">
                        <i className={`flex justify-left text-2xl font-semi-bold text-dark-green pt-3 ${montserrat.className}`}>Distance to Sports Facilities</i>
                        <ul className="list-disc pl-4 pr-3 pt-3">
                            <li>The median km distance from your local sports fascilities is [distance here if Parthiv finds it] based on NHS records of
                                addresses. This gives your area a score of {ladRecord && ladRecord.sport_facility_distance}/10</li>
                            <li>This is {ladRecord&&ladRecord.sport_facility_distance&&getCommentFromScore(ladRecord.sport_facility_distance)} compared to the rest of England. </li>
                        </ul>

                    </div>
                </div>

            </div>
            <Location postcode={postcode} />
        </>
    );
}



function PlotLADs({ ladVals, engVals }: { ladVals: (number | null)[][], engVals: (number | null)[][] }) {
    return ladVals?.map((r, i) => {
        const xs = [2015, 2016, 2017, 2018, 2019, 2020];
        const ladLinVals = calcLin(r);
        const engLinVals = calcLin(engVals[i]);

        const ladData = {
            x: xs,
            y: r,
            type: 'scatter',
            mode: 'lines',
            name: 'Actual value',
            marker: { color: 'purple' }
        }

        const engData = {
            x: xs,
            y: engVals[i],
            type: 'scatter',
            mode: 'lines',
            name: 'England average',
            marker: { color: 'blue' }
        }

        const ladLin = {
            x: xs,
            y: ladLinVals,
            type: 'scatter',
            mode: 'lines',
            marker: { color: 'purple' },
            name: 'Actual trend line',
            line: { dash: 'dot' }
        }

        const engLin = {
            x: xs,
            y: engLinVals,
            type: 'scatter',
            mode: 'lines',
            marker: { color: 'blue' },
            name: 'England trend line',
            line: { dash: 'dot' }
        }

        return <Plot
            key={i}
            // THIS WORKS DONT FIX IT
            data={[ladData, engData, ladLin, engLin]}
            layout={{ title: Keys[i], width: 500, height: 300 }}
            config={{ 'staticPlot': true }}
        />
    });
}

function PlotScores({ scores }: { scores: (number | null)[][] }) {
    return scores?.map((r, i) => {
        const xs = [2015, 2016, 2017, 2018, 2019, 2020];
        const scoresLinVals = calcLin(r);

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
            key={i}
            // THIS WORKS DONT FIX IT
            data={[scoresData, scoresLin]}
            layout={{ title: Keys[i] }}
            config={{ 'staticPlot': true }}
        />
    });
}

