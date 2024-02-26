"use client";

import { SpringValue, animated, to, useSpring } from "@react-spring/web";

export default function Score({ score, size }: { score: number, size: number }) {
    const [props, api] = useSpring(() => ({
        from: {
            score: 0,
            color: "red"
        },
        to: {
            score: score,
            color: `hsl(${score * 12}, 60%, 50%)`
        },
        config: { duration: 500 }
    }), [score]);

    return <Dial score={props.score} color={props.color} finalScore={score} size={size} />;
}

function Dial({ score, color, finalScore, size }: { score: SpringValue<number>, color: SpringValue<string>, finalScore: number, size: number }) {
    const angle = score.to(s => s * 27);
    const unitAngle = angle.to(s => 225 - s);
    const x = unitAngle.to(a => Math.cos(a * Math.PI / 180));
    const y = unitAngle.to(a => Math.sin(a * Math.PI / 180));
    const xpercent = x.to(x => 50 + x * 50);
    const ypercent = y.to(y => 50 - y * 50);

    const clipPath = to([xpercent, ypercent, score], (x, y, score) => `polygon(0% 100%, 50% 50%, ${x}% ${y}% ${score >= 7.5 ? `, 100% ${y}%, 100% 0%` : ''}${score >= 5 ? `, ${x}% 0%` : ''}${score >= 2.5 ? ', 0% 0%' : ''})`);

    return (
        <>
            <div className="relative group" style={{
                width: `${size}rem`,
                height: `${size}rem`
            }}>
                <div className="absolute rounded-full overflow-hidden bg-gray-500" style={{
                    width: `${size}rem`,
                    height: `${size}rem`
                }}>
                    <div className="absolute top-0 left-0 w-full h-full bg-gray-400 z-20" style={{ clipPath: "polygon(0% 100%, 50% 50%, 100% 100%)" }} />
                    <animated.div className="absolute top-0 left-0 w-full h-full z-10" style={{ clipPath: clipPath, backgroundColor: color }} />
                    <div className="align-middle absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-5/6 h-5/6 bg-blackened z-30 rounded-full" >
                        <div className="flex items-center justify-center w-full h-full">
                            <p className="text-2xl font-bold text-gray-800">{finalScore}</p>
                        </div>
                    </div>
                </div>
                <animated.div className={`absolute z-40 rounded-full`} style={{
                    width: "15%",
                    height: "15%",
                    top: y.to(y => `${50 - 50 * (y * 11 / 12)}%`),
                    left: x.to(x => `${50 + 50 * (x * 11 / 12)}%`),
                    transform: "translate(-50%, -50%)",
                    backgroundColor: color
                }} />
            </div>
        </>
    );
}

