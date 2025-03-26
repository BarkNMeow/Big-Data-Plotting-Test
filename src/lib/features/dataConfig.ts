import { ChartMode } from '@/components/ChartPage'
import { generateData, sampleData } from '@/util/data'
import { createSelector, createSlice } from '@reduxjs/toolkit'

interface State {
    data: { x: number[], y: number[] }[],
    sampledData: { x: number[], y: number[] }[],
    chartMode: ChartMode
}

interface SelectorState {
    dataConfig: State
}

export const slice = createSlice({
    name: 'dataConfig',
    initialState: {
        data: [],
        sampledData: [],
        chartMode: ChartMode.Raw
    } as State,
    reducers: {
        setData: (state, action) => {
            const { numData, numSampledData, numParticipant } = action.payload
            const newData = []
            const newSampledData = []

            for (let i = 0; i < numParticipant; i++) {
                const [x, y] = generateData(numData, 0.01)
                newData.push({ x, y })

                const [s_x, s_y] = sampleData(x, y, numSampledData)
                newSampledData.push({ x: s_x, y: s_y })
            }

            state.data = newData
            state.sampledData = newSampledData
        },

        setSampledData: (state, action) => {
            const { numSampledData } = action.payload
            const newSampledData = state.data.map(v => {
                const [x, y] = sampleData(v.x, v.y, numSampledData)
                return { x, y }
            })

            state.sampledData = newSampledData
        },

        setChartMode: (state, action) => { state.chartMode = action.payload }
    }
})

export const { setData, setSampledData, setChartMode } = slice.actions

export const selectData = (state: SelectorState) => state.dataConfig.data
export const selectSampledData = (state: SelectorState) => state.dataConfig.sampledData
export const selectChartMode = (state: SelectorState) => state.dataConfig.chartMode

export const selectNumData = createSelector(selectData, (data) => {
    if (data.length == 0) return 0
    else return data[0].x.length
})

export const selectNumSampledData = createSelector(selectSampledData, (data) => {
    if (data.length == 0) return 0
    else return data[0].x.length
})

export const selectNumParticipant = createSelector(selectData, (data) => {
    return data.length
})

export default slice.reducer