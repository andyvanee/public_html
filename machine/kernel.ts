import { Processor } from './Cpu'

const processor = new Processor()

onmessage = (e) => {
    if (!e.data) return
    const { type } = e.data

    if (type == 'start') {
        processor.reset()
        postMessage({ type: 'tick', cpu: processor.cpu })
        processor.resume()
    }
}

const state = {
    now: performance.now(),
    deltas: [0],
    tick: 30,
}

const tick = () => {
    const now = performance.now()
    processor.tick()
    state.tick++
    state.deltas.push(now - state.now)
    state.now = now
    if (state.deltas.length > 60) state.deltas.shift()
    postMessage({ type: 'tick', cpu: processor.cpu })
    if (state.tick > 60) {
        const avgDelta = ((state.deltas.reduce((a, b) => a + b, 0) / state.deltas.length) * 60) / 1000
        postMessage({ type: 'state', state: { delta: avgDelta.toFixed(3), halt: processor.halt } })
        state.tick = 0
    }
    return requestAnimationFrame(tick)
}

tick()
