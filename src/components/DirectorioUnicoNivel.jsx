import { useState, useCallback, useRef } from 'react'

const files = [
  { icon: '📄', color: '#f85149', grad: ['#f85149', '#b91c1c'], ext: 'PDF' },
  { icon: '🖼', color: '#a371f7', grad: ['#a371f7', '#6d28d9'], ext: 'PNG' },
  { icon: '🎵', color: '#3fb950', grad: ['#3fb950', '#15803d'], ext: 'MP3' },
  { icon: '📝', color: '#58a6ff', grad: ['#58a6ff', '#1d4ed8'], ext: 'TXT' },
  { icon: '📃', color: '#f0883e', grad: ['#f0883e', '#c2410c'], ext: 'DOCX' },
]

const ROOT_W  = 420
const ROOT_H  = 100
const NODE_SZ = 88
const PAD     = 50
const GAP     = 28
const BRANCH_H = 130

const totalW = PAD * 2 + NODE_SZ * files.length + (files.length - 1) * GAP
const totalH = 20 + ROOT_H + BRANCH_H + NODE_SZ + 70
const cx = totalW / 2

const rootX = cx - ROOT_W / 2
const rootY = PAD
const rootB = rootY + ROOT_H

const nodeY = rootY + ROOT_H + BRANCH_H

export default function DirectorioUnicoNivel() {
  const [tooltip, setTooltip] = useState(null)
  const [hoveredIdx, setHoveredIdx] = useState(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)

  const handleMove = useCallback(e => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }, [])

  const TOOLTIP_W = 180
  const TOOLTIP_H = 44
  const cw = containerRef.current?.offsetWidth ?? 800
  const tLeft = Math.min(Math.max(mouse.x - TOOLTIP_W / 2, 6), cw - TOOLTIP_W - 6)
  const tTop = mouse.y - TOOLTIP_H - 8 < 0 ? mouse.y + 16 : mouse.y - TOOLTIP_H - 8

  return (
    <div
      ref={containerRef}
      className="relative rounded-xl overflow-hidden"
      style={{ background: '#0d1117', minHeight: '360px' }}
      onMouseMove={handleMove}
      onMouseLeave={() => { setTooltip(null); setHoveredIdx(null) }}
    >
      <svg viewBox={`0 0 ${totalW} ${totalH}`} width="100%" style={{ display: 'block' }}>
        <defs>
          {files.map((f, i) => (
            <filter key={i} id={`g-${i}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="5" result="blur"/>
              <feFlood floodColor={f.color} floodOpacity="0.7" result="color"/>
              <feComposite in="color" in2="blur" operator="in" result="glow"/>
              <feMerge><feMergeNode in="glow"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          ))}
          <filter id="g-root" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur"/>
            <feFlood floodColor="#f85149" floodOpacity="0.35" result="color"/>
            <feComposite in="color" in2="blur" operator="in" result="glow"/>
            <feMerge><feMergeNode in="glow"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <linearGradient id="root-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2d0f0f"/>
            <stop offset="100%" stopColor="#160808"/>
          </linearGradient>
          {files.map((f, i) => (
            <linearGradient key={i} id={`node-grad-${i}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={f.grad[0]} stopOpacity="0.2"/>
              <stop offset="100%" stopColor={f.grad[0]} stopOpacity="0.05"/>
            </linearGradient>
          ))}
        </defs>

        <rect x={rootX} y={rootY} width={ROOT_W} height={ROOT_H} rx={16}
          fill="url(#root-grad)" stroke="#f85149" strokeWidth={2.5}
          filter="url(#g-root)"
        />
        <text x={cx} y={rootY + 40} textAnchor="middle" fill="#f85149" fontSize={24} fontWeight="bold" fontFamily="Courier New, monospace">
          📁 Raíz
        </text>
        <text x={cx} y={rootY + 66} textAnchor="middle" fill="#f85149" fontSize={13} fontFamily="Courier New, monospace" opacity="0.6">
          / — directorio principal
        </text>

        {files.map((f, i) => {
          const fcx = PAD + i * (NODE_SZ + GAP) + NODE_SZ / 2
          const hovered = hoveredIdx === i
          const scale = hovered ? 1.12 : 1
          const ncy = nodeY + NODE_SZ / 2
          const nx = fcx - NODE_SZ / 2

          return (
            <g key={i}>
              <path d={`M${cx},${rootB} Q${(cx + fcx) / 2},${rootB + 50} ${fcx},${nodeY}`}
                stroke={f.color} strokeWidth="3" fill="none"
                opacity={hovered ? 1 : 0.6}
              />

              <g
                style={{ cursor: 'pointer' }}
                transform={`translate(${fcx},${ncy}) scale(${scale}) translate(${-fcx},${-ncy})`}
                onMouseEnter={() => { setTooltip(f); setHoveredIdx(i) }}
                onMouseLeave={() => { setTooltip(null); setHoveredIdx(null) }}
              >
                <rect x={nx} y={nodeY} width={NODE_SZ} height={NODE_SZ} rx={18}
                  fill={`url(#node-grad-${i})`} stroke={f.color} strokeWidth={hovered ? 2.5 : 1.5}
                  filter={hovered ? `url(#g-${i})` : undefined}
                />
                <text x={fcx} y={ncy - 4} textAnchor="middle" fontSize={34} dominantBaseline="central">
                  {f.icon}
                </text>
                <rect x={fcx - 16} y={nodeY + NODE_SZ - 24} width={32} height={16} rx={4}
                  fill={f.color} opacity={hovered ? 0.9 : 0.6}
                />
                <text x={fcx} y={nodeY + NODE_SZ - 12} textAnchor="middle" fill="#fff" fontSize={9}
                  fontWeight="bold" fontFamily="Courier New, monospace"
                >
                  {f.ext}
                </text>
              </g>
            </g>
          )
        })}
      </svg>

      {tooltip && (
        <div className="absolute z-50 pointer-events-none"
          style={{ left: tLeft, top: tTop, width: TOOLTIP_W }}
        >
          <div className="bg-slate-900 border border-emerald-500/60 rounded-lg px-3 py-2.5 shadow-xl text-xs">
            <div className="text-white font-bold font-mono text-sm flex items-center gap-2">
              {tooltip.icon} Archivo .{tooltip.ext.toLowerCase()}
            </div>
            <div className="text-slate-400 mt-1 pl-6">Archivo de tipo {tooltip.ext}</div>
          </div>
        </div>
      )}
    </div>
  )
}
