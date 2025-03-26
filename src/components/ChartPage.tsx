'use client'

import { generateData, sampleData } from "@/util/data"
import ChartJSLineChart from "./chart/ChartJSLineChart"
import ObservableLineChart from "./chart/ObserverableLineChart"
import PlotlyLineChart from "./chart/PlotlyLineChart"
import { useAppSelector } from "@/lib/hooks"
import { selectChartMode, selectData, selectSampledData } from "@/lib/features/dataConfig"
import { LibraryType } from "@/util/types"
import { Fragment } from "react"

export enum ChartMode {
    Raw,
    Sampled,
}

export default function ChartPage(props: {
    libraryType: LibraryType
}) {
    const { libraryType } = props
    const Chart = LineChart(libraryType)

    const chartMode = useAppSelector(selectChartMode)
    const data = useAppSelector(selectData)
    const sampledData = useAppSelector(selectSampledData)

    return (
        <div className="h-full w-full flex flex-col">
            {
                data.map((_, index) =>
                    <Fragment key={`fragment ${index}`}>
                        {
                            (chartMode != ChartMode.Sampled) &&
                            <div key={2 * index} className="flex-1 relative">
                                <Chart
                                    x={data[index].x}
                                    y={data[index].y}
                                    keyIndex={index}
                                />
                            </div>
                        }
                        {
                            (chartMode != ChartMode.Raw) &&
                            <div key={2 * index + 1} className="flex-1 relative">
                                <Chart
                                    x={sampledData[index].x}
                                    y={sampledData[index].y}
                                    keyIndex={index}
                                />
                            </div>
                        }
                    </Fragment>

                )
            }
        </div>
    );
}

function LineChart(libraryType: LibraryType) {
    switch (libraryType) {
        case LibraryType.ChartJS:
            return ChartJSLineChart
        case LibraryType.Observable:
            return ObservableLineChart
        case LibraryType.Plotly:
            return PlotlyLineChart
    }
}