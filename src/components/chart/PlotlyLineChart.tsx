'use client'
import dynamic from "next/dynamic";
import { useRef, useState, useEffect, RefObject } from "react"

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false })

export default function PlotlyLineChart(props: {
    x: number[],
    y: number[]
}) {
    const { x, y } = props

    const ref = useRef<HTMLDivElement>(null)
    const [size, setSize] = useState({ width: 800, height: 100 });

    useEffect(() => {
        const updateSize = () => {
            if (ref.current) {
                setSize({
                    width: ref.current.clientWidth,
                    height: ref.current.clientHeight,
                });
            }
        };

        updateSize(); // 초기 크기 설정
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, [x, y])

    console.log(size)

    return (
        <div className="h-full w-full absolute" ref={ref}>
            <Plot
                data={[
                    {
                        x: x,
                        y: y,
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: { color: 'red' },
                    },
                ]}
                layout={{
                    width: size.width,
                    height: size.height,
                    autosize: true,
                    margin: {
                        t: 30,
                        l: 25,
                        r: 25,
                        b: 30
                    }
                }}
                useResizeHandler={true}
            />
        </div>
    );
}