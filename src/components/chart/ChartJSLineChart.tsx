'use client'
import React, { useEffect } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, } from "chart.js";
import { Scatter } from "react-chartjs-2";

ChartJS.register(CategoryScale, LineElement, LinearScale, PointElement, Title, Tooltip, Legend, Filler);

export default function ChartJSLineChart(props: {
    x: number[],
    y: number[]
}) {
    const { x, y } = props

    const rawData = x.map((v, i) => {
        return {
            x: v,
            y: y[i]
        }
    })

    const data = {
        labels: x,
        datasets: [
            {
                data: rawData,
                showLine: true,
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
            },
        ],
    };

    const zoomOptions = {
        pan: {
            enabled: true,
            modifierKey: 'ctrl',
        },
        zoom: {
            drag: {
                enabled: true,
                maintainAspectRatio: false,
            },
            wheel: {
                enabled: true,
                maintainAspectRatio: false,
            },
            mode: 'x',
        },
    };

    // To make configuration
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            zoom: zoomOptions,
            legend: {
                display: false
            },
        }
    };

    useEffect(() => {
        console.log(typeof window)
        if (typeof window !== "undefined")
            import("chartjs-plugin-zoom").then((plugin) => {
                ChartJS.register(plugin.default);
            });
    }, []);

    return (
        <div style={{ width: "100%", height: "100%", margin: "0 auto" }} className="absolute">
            <Scatter data={data} options={options} />
        </div>
    );
};