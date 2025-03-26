'use client'

import * as Plot from "@observablehq/plot";
import Document from "../../util/document";
import React, { useEffect, useRef, useState } from "react";

export default function ObservableLineChart(props: {
    x: number[],
    y: number[],
    keyIndex: number,
}) {
    const { x, y, keyIndex } = props

    const [size, setSize] = useState({ width: 800, height: 100 })
    const ref = useRef<HTMLDivElement>(null)

    const data = x.map((v, i) => {
        return {
            x: v,
            y: y[i]
        }
    })

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

    useEffect(() => {
        const chart = Plot.plot({
            width: size.width,
            height: size.height,
            marks: [
                Plot.dot(data, { x: "x", y: "y", r: 5, fill: "steelblue" }),
                Plot.line(data, { x: "x", y: "y", stroke: "steelblue", strokeWidth: 2 })
            ],
            x: { label: "X" },
            y: { label: "Y" }
        });

        ref.current?.append(chart);
        return () => chart.remove();
    })



    return (
        <div key={keyIndex} ref={ref} className="w-full h-full absolute">
        </div>
    );
}