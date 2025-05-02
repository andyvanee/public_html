import { Cpu, Palette, VidMode } from './Cpu'

const $ = (selector: string) => document.querySelector(selector)

const kernel = new Worker(new URL('kernel.js', import.meta.url))

const lazy = <T, I>() => {
    const map = new Map<T, I>()
    return {
        get: (key: T, callback: () => I) => {
            if (map.has(key)) return map.get(key)
            const value = callback()
            map.set(key, value)
            return value
        },
        set: (key: T, value: I) => {
            map.set(key, value)
        },
    }
}

const style = () => getComputedStyle(document.documentElement)

const css = (() => {
    const props = lazy<string, string>()
    return {
        get: (prop: string) => {
            return props.get(prop, () => style().getPropertyValue(prop))
        },
        set: (prop: string, value: string) => {
            props.set(prop, value)
        },
    }
})()

const palette = [
    css.get('--color-black'),
    css.get('--color-white'),
    css.get('--color-red'),
    css.get('--color-green'),
    css.get('--color-blue'),
    css.get('--color-yellow'),
    css.get('--color-cyan'),
    css.get('--color-magenta'),
    css.get('--color-gray'),
    css.get('--color-light-gray'),
    css.get('--color-dark-gray'),
    css.get('--color-light-red'),
    css.get('--color-light-green'),
    css.get('--color-light-blue'),
    css.get('--color-light-yellow'),
    css.get('--color-light-cyan'),
]

const { canvas, ctx } = (() => {
    const canvas = $('.screen') as HTMLCanvasElement | null
    if (!canvas) throw new Error('Canvas not found')
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('Canvas context not found')
    return { canvas, ctx }
})()

const app = {
    canvas,
    ctx,
    width: 800,
    height: 600,
}

const draw = (cpu: Cpu) => {
    const cols = 56
    const rows = 23
    const advancex = 13
    const advancey = 23
    const marginTop = 38
    const marginLeft = 38

    const mode: VidMode = cpu.memory[0x1000 - 3]
    const fg: Palette = cpu.memory[0x1000 - 2]
    const bg: Palette = cpu.memory[0x1000 - 1]
    const chars = cpu.memory.slice(0x1000, 0x1000 + cols * rows)

    app.ctx.fillStyle = palette[bg] || 'black'
    app.ctx.fillRect(0, 0, app.width, app.height)
    app.ctx.font = `18px ${css.get('--font-family')}`

    for (let i = 0; i < chars.length; i++) {
        const char = chars[i]
        const x = (i % cols) * advancex + marginLeft
        const y = Math.floor(i / cols) * advancey + marginTop
        ctx.fillStyle = palette[fg] || 'white'
        ctx.fillText(String.fromCharCode(char), x, y + 12)
    }
}

kernel.onmessage = (event: MessageEvent) => {
    if (!event.data) return

    const { type } = event.data

    if (type === 'tick') {
        const cpu: Cpu = event.data.cpu
        draw(cpu)
    } else if (type === 'state') {
        $('#fps-text')!.innerHTML = event.data.state.delta
        $('#status-text')!.innerHTML = event.data.state.halt ? 'Halted' : 'Running'
    } else {
        console.log('Unknown message type', event)
    }
}

kernel.postMessage({ type: 'start' })
