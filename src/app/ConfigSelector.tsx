'use client'

import { ChartMode } from "@/components/ChartPage"
import { selectChartMode, selectNumData, selectNumParticipant, selectNumSampledData, setChartMode, setData, setSampledData } from "@/lib/features/dataConfig"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { useState, ChangeEventHandler, FocusEventHandler, useCallback } from "react"

export default function ModeSelector() {
    const dispatch = useAppDispatch()
    const mode = useAppSelector(selectChartMode)

    const [numData, setNumData] = useState(useAppSelector(selectNumData))
    const [numSampledData, setNumSampledData] = useState(useAppSelector(selectNumSampledData))
    const [numParticipant, setNumParticipant] = useState(useAppSelector(selectNumParticipant))

    const onNumDataBlur = useCallback(() => {
        const numSampledData = Math.round(numData * 0.1)
        setNumSampledData(numSampledData)
        dispatch(setData({ numData, numSampledData, numParticipant }))
        dispatch(setChartMode(ChartMode.Raw))
    }, [numData, numSampledData, numParticipant])

    return (
        <div className="w-full h-2xl p-2 bg-gray-600 text-white">
            <div className="w-full mb-1">
                <label htmlFor="input-num-data"># of Data</label>
                <ModeSelectorInput
                    id={"input-num-data"}
                    value={numData}
                    onChange={(e) => setNumData(Number(e.target.value))}
                    onBlur={onNumDataBlur}
                />
                <label htmlFor="input-num-sampled-data"># of Sampled Data</label>
                <ModeSelectorInput
                    id={"input-num-sampled-data"}
                    value={numSampledData}
                    onChange={(e) => setNumSampledData(Number(e.target.value))}
                    onBlur={() => { dispatch(setSampledData({ numSampledData })); dispatch(setChartMode(ChartMode.Sampled)) }}
                />
                <label htmlFor="input-num-participants"># of Participants</label>
                <ModeSelectorInput
                    id={"input-num-sampled-participants"}
                    value={numParticipant}
                    onChange={(e) => setNumParticipant(Number(e.target.value))}
                    onBlur={() => { dispatch(setData({ numData, numSampledData, numParticipant })) }}
                />
            </div>
            <div className="w-full">
                <label htmlFor="visual-mode-raw">Raw data</label>
                <input type="radio" name="chart-mode" id="chart-mode-raw" className="ml-2 mr-4" checked={mode == ChartMode.Raw} onChange={() => dispatch(setChartMode(ChartMode.Raw))} />
                <label htmlFor="visual-mode-sampled">Sampled</label>
                <input type="radio" name="chart-mode" id="chart-mode-sampled" className="ml-2 mr-4" checked={mode == ChartMode.Sampled} onChange={() => dispatch(setChartMode(ChartMode.Sampled))} />
            </div>
        </div>
    )
}

function ModeSelectorInput(props: {
    id: string,
    value: number,
    onChange: ChangeEventHandler<HTMLInputElement>,
    onBlur: FocusEventHandler<HTMLInputElement>,
}) {
    const { id, value, onChange, onBlur } = props

    return (
        <input id={id} type="number" value={value}
            className={"ml-2 mr-12 w-18 border-b-2 focus:border-b-sky-300 outline-transparent shadow-none outline-none transition-border-color duration-100"}
            onChange={onChange} onBlur={onBlur}
            onKeyUp={(e) => { if (e.code == 'Enter') e.currentTarget.blur() }}
        />
    )
}