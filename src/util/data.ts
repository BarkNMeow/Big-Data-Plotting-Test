type point = { x: number, y: number }

export function generateData(count: number, skipProbability: number,) {
    const x: number[] = []
    const y: number[] = []

    for (let i = 0; i < count; i++) {
        const isSkipping = Math.random() < skipProbability
        const lastX = x.length > 0 ? x[x.length - 1] : 0

        if (lastX != 0 && isSkipping) {
            const nextX = lastX + (Math.random() * 20 + 10)
            x.push(nextX)
            y.push(Math.random() * 100)
        } else {
            x.push(lastX + 1)

            const lastY = y.length > 0 ? y[y.length - 1] : 50
            y.push(lastY + (3 - Math.random() * 6))
        }
    }

    return [x, y]
}

export function sampleData(x: number[], y: number[], k: number) {
    const data = x.map((v, i) => { return { x: v, y: y[i] } }) as point[]
    let R: [point, number][] = []

    // For stream of data, we can calculate them by one step
    for (let item of data) {
        if (R.length < k) expand(R, item)
        else {
            expand(R, item)
            shrink(R)
        }
    }

    const sample_x = R.map(v => v[0].x)
    const sample_y = R.map(v => v[0].y)
    return [sample_x, sample_y]
}

function kappa(a: point, b: point) {
    const norm = (a.x - b.x) ** 2 + (a.y - b.y) ** 2
    return Math.exp(-norm / 200)
}

function expand(R: [point, number][], t: point) {
    let rsp = 0

    for (let i = 0; i < R.length; i++) {
        let [s, r] = R[i]
        const l = kappa(t, s)
        R[i][1] += l
        rsp += l
    }

    R.push([t, rsp])
    return R.map(v => v[0])
}

function shrink(R: [point, number][]) {
    let largest_rsp = R[0][1]
    let largest_index = 0

    for (let i in R) {
        const [t, r] = R[i]

        if (r > largest_rsp) {
            largest_rsp = r
            largest_index = Number(i)
        }
    }

    let [t, _] = R[largest_index]
    R.splice(largest_index, 1)

    for (let i = 0; i < R.length; i++) {
        let [s, r] = R[i]
        R[i][1] -= kappa(t, s)
    }
}