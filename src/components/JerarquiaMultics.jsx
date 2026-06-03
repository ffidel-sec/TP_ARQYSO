import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'

const colors = {
  dark: {
    bg: '#1a1a24',
    border: 'rgba(255,255,255,0.08)',
    text: 'rgba(255,255,255,0.85)',
    sub: 'rgba(255,255,255,0.45)',
    arrow: '#888780',
    arrowBright: '#c4c4b8',
    box: '#252535',
    boxStroke: 'rgba(255,255,255,0.15)',
    gray: { fill: '#444441', stroke: '#B4B2A9', text: '#D3D1C7', sub: '#B4B2A9', fillHover: '#5c5c57', strokeHover: '#d4d2c8' },
    purple: { fill: '#3C3489', stroke: '#AFA9EC', text: '#CECBF6', sub: '#AFA9EC', fillHover: '#5046b0', strokeHover: '#c8c4f2' },
    teal: { fill: '#085041', stroke: '#5DCAA5', text: '#9FE1CB', sub: '#5DCAA5', fillHover: '#0a6b56', strokeHover: '#7dd8b8' },
    coral: { fill: '#712B13', stroke: '#F0997B', text: '#F5C4B3', sub: '#F0997B', fillHover: '#963a1a', strokeHover: '#f5b09b' },
    legendBg: 'rgba(255,255,255,0.04)',
  },
  light: {
    bg: '#f8fafc',
    border: 'rgba(0,0,0,0.08)',
    text: 'rgba(0,0,0,0.85)',
    sub: 'rgba(0,0,0,0.50)',
    arrow: '#94a3b8',
    arrowBright: '#475569',
    box: '#e2e8f0',
    boxStroke: 'rgba(0,0,0,0.12)',
    gray: { fill: '#cbd5e1', stroke: '#64748b', text: '#334155', sub: '#64748b', fillHover: '#a8b8cd', strokeHover: '#475569' },
    purple: { fill: '#c4b5fd', stroke: '#7c3aed', text: '#4c1d95', sub: '#7c3aed', fillHover: '#a78bfa', strokeHover: '#6d28d9' },
    teal: { fill: '#99f6e4', stroke: '#0d9488', text: '#115e59', sub: '#0d9488', fillHover: '#5eead4', strokeHover: '#0f766e' },
    coral: { fill: '#fdba74', stroke: '#ea580c', text: '#7c2d12', sub: '#ea580c', fillHover: '#fb923c', strokeHover: '#c2410c' },
    legendBg: 'rgba(0,0,0,0.03)',
  },
}

const arrowDefs = [
  { id: 'so-pcb', x1: 340, y1: 72, x2: 340, y2: 108 },
  { id: 'pcb-segdesc', x1: 340, y1: 162, x2: 340, y2: 198 },
  { id: 'segdesc-desc0', x1: 175, y1: 252, x2: 115, y2: 298 },
  { id: 'segdesc-desc1', x1: 340, y1: 252, x2: 340, y2: 298 },
  { id: 'segdesc-desc2', x1: 505, y1: 252, x2: 565, y2: 298 },
  { id: 'desc0-pt0', x1: 115, y1: 352, x2: 115, y2: 398 },
  { id: 'desc1-pt1', x1: 340, y1: 352, x2: 340, y2: 398 },
  { id: 'desc2-pt2', x1: 565, y1: 352, x2: 565, y2: 398 },
  { id: 'pt0-seg0', x1: 115, y1: 500, x2: 115, y2: 546 },
  { id: 'pt1-seg1', x1: 340, y1: 500, x2: 340, y2: 546 },
  { id: 'pt2-seg2', x1: 565, y1: 500, x2: 565, y2: 546 },
]

const nodeArrows = {
  so: ['so-pcb'],
  pcb: ['so-pcb', 'pcb-segdesc'],
  segdesc: ['pcb-segdesc', 'segdesc-desc0', 'segdesc-desc1', 'segdesc-desc2'],
  desc0: ['segdesc-desc0', 'desc0-pt0'],
  desc1: ['segdesc-desc1', 'desc1-pt1'],
  desc2: ['segdesc-desc2', 'desc2-pt2'],
  pt0: ['desc0-pt0', 'pt0-seg0'],
  pt1: ['desc1-pt1', 'pt1-seg1'],
  pt2: ['desc2-pt2', 'pt2-seg2'],
  seg0: ['pt0-seg0'],
  seg1: ['pt1-seg1'],
  seg2: ['pt2-seg2'],
}

function Box({ c, x, y, w, h, r, hovered }) {
  const fill = hovered ? c.fillHover : c.fill
  const stroke = hovered ? c.strokeHover : c.stroke
  const strokeW = hovered ? 2 : 0.5
  return (
    <rect
      x={x} y={y} width={w} height={h} rx={r}
      fill={fill} stroke={stroke} strokeWidth={strokeW}
      style={{ transition: 'fill 0.2s, stroke 0.2s', cursor: 'pointer' }}
    />
  )
}

function ArrowLine({ arrow, highlight, arrowC, brightC }) {
  const stroke = highlight ? brightC : arrowC
  const width = highlight ? 2 : 1
  return (
    <line
      x1={arrow.x1} y1={arrow.y1} x2={arrow.x2} y2={arrow.y2}
      stroke={stroke} strokeWidth={width}
      markerEnd={highlight ? 'url(#arrowBright)' : 'url(#arrow)'}
      style={{ transition: 'stroke 0.2s, stroke-width 0.2s' }}
    />
  )
}

function InteractiveNode({ id, children, onEnter, onLeave }) {
  return (
    <g
      onMouseEnter={() => onEnter(id)}
      onMouseLeave={onLeave}
      style={{ cursor: 'pointer' }}
    >
      {children}
    </g>
  )
}

export default function JerarquiaMultics() {
  const { dark } = useTheme()
  const c = dark ? colors.dark : colors.light
  const [hovered, setHovered] = useState(null)

  const handleEnter = (id) => setHovered(id)
  const handleLeave = () => setHovered(null)

  return (
    <div className="my-6">
      <div
        className="rounded-2xl border p-4 sm:p-6 shadow-sm overflow-x-auto"
        style={{ background: c.bg, borderColor: c.border }}
      >
        <svg width="100%" viewBox="0 0 680 720" role="img" style={{ minWidth: 520 }} className="block mx-auto">
          <title>Jerarquía de memoria en MULTICS</title>
          <desc>Diagrama jerárquico: SO gestiona PCBs, cada PCB apunta al segmento del descriptor, que tiene descriptores de segmento, cada uno apuntando a una tabla de páginas con marcos en RAM o disco.</desc>
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M2 1L8 5L2 9" fill="none" stroke={c.arrow} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </marker>
            <marker id="arrowBright" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
              <path d="M2 1L8 5L2 9" fill="none" stroke={c.arrowBright} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </marker>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ARROWS (render behind nodes) */}
          {arrowDefs.map((a) => (
            <ArrowLine
              key={a.id}
              arrow={a}
              highlight={hovered && nodeArrows[hovered]?.includes(a.id)}
              arrowC={c.arrow}
              brightC={c.arrowBright}
            />
          ))}

          {/* NIVEL 0: SO */}
          <InteractiveNode id="so" onEnter={handleEnter} onLeave={handleLeave}>
            <Box c={c.gray} x={215} y={20} w={250} h={52} r={10}
              hovered={hovered === 'so'} />
            <text x={340} y={40} textAnchor="middle" dominantBaseline="central"
              fill={hovered === 'so' ? '#fff' : c.gray.text}
              style={{ transition: 'fill 0.2s' }}
              className="text-[14px] font-semibold">Sistema operativo</text>
            <text x={340} y={59} textAnchor="middle" dominantBaseline="central"
              fill={hovered === 'so' ? c.gray.sub : c.gray.sub}
              style={{ transition: 'fill 0.2s' }}
              className="text-[12px]">gestiona todos los PCBs</text>
          </InteractiveNode>

          {/* NIVEL 1: PCB */}
          <InteractiveNode id="pcb" onEnter={handleEnter} onLeave={handleLeave}>
            <Box c={c.gray} x={215} y={110} w={250} h={52} r={10}
              hovered={hovered === 'pcb'} />
            <text x={340} y={130} textAnchor="middle" dominantBaseline="central"
              fill={hovered === 'pcb' ? '#fff' : c.gray.text}
              style={{ transition: 'fill 0.2s' }}
              className="text-[14px] font-semibold">PCB — uno por proceso</text>
            <text x={340} y={149} textAnchor="middle" dominantBaseline="central"
              fill={c.gray.sub} className="text-[12px]">dirección al seg. del descriptor</text>
          </InteractiveNode>

          {/* NIVEL 2: SEGMENTO DEL DESCRIPTOR */}
          <InteractiveNode id="segdesc" onEnter={handleEnter} onLeave={handleLeave}>
            <Box c={c.purple} x={160} y={200} w={360} h={52} r={10}
              hovered={hovered === 'segdesc'} />
            <text x={340} y={220} textAnchor="middle" dominantBaseline="central"
              fill={hovered === 'segdesc' ? '#fff' : c.purple.text}
              style={{ transition: 'fill 0.2s' }}
              className="text-[14px] font-semibold">Segmento del descriptor</text>
            <text x={340} y={239} textAnchor="middle" dominantBaseline="central"
              fill={c.purple.sub} className="text-[12px]">uno por proceso — tabla maestra</text>
          </InteractiveNode>

          {/* Flecha puntero a tabla de páginas (entre nivel 3 y 4) */}
          <text x={340} y={378} textAnchor="middle" dominantBaseline="central"
            fill={
              hovered && (nodeArrows[hovered]?.includes('desc0-pt0') || nodeArrows[hovered]?.includes('desc1-pt1') || nodeArrows[hovered]?.includes('desc2-pt2'))
                ? c.arrowBright : c.sub
            }
            style={{ transition: 'fill 0.2s' }}
            className="text-[12px]">puntero a tabla de páginas</text>

          {/* NIVEL 3: DESCRIPTORES */}
          <InteractiveNode id="desc0" onEnter={handleEnter} onLeave={handleLeave}>
            <Box c={c.purple} x={30} y={300} w={170} h={52} r={8}
              hovered={hovered === 'desc0'} onEnter={handleEnter} onLeave={handleLeave} />
            <text x={115} y={320} textAnchor="middle" dominantBaseline="central"
              fill={hovered === 'desc0' ? '#fff' : c.purple.text}
              style={{ transition: 'fill 0.2s' }}
              className="text-[14px] font-semibold">Descriptor seg 0</text>
            <text x={115} y={339} textAnchor="middle" dominantBaseline="central"
              fill={c.purple.sub} className="text-[12px]">código · r-x · 3 págs</text>
          </InteractiveNode>
          <InteractiveNode id="desc1" onEnter={handleEnter} onLeave={handleLeave}>
            <Box c={c.purple} x={255} y={300} w={170} h={52} r={8}
              hovered={hovered === 'desc1'} onEnter={handleEnter} onLeave={handleLeave} />
            <text x={340} y={320} textAnchor="middle" dominantBaseline="central"
              fill={hovered === 'desc1' ? '#fff' : c.purple.text}
              style={{ transition: 'fill 0.2s' }}
              className="text-[14px] font-semibold">Descriptor seg 1</text>
            <text x={340} y={339} textAnchor="middle" dominantBaseline="central"
              fill={c.purple.sub} className="text-[12px]">stack · rw- · 2 págs</text>
          </InteractiveNode>
          <InteractiveNode id="desc2" onEnter={handleEnter} onLeave={handleLeave}>
            <Box c={c.purple} x={480} y={300} w={170} h={52} r={8}
              hovered={hovered === 'desc2'} onEnter={handleEnter} onLeave={handleLeave} />
            <text x={565} y={320} textAnchor="middle" dominantBaseline="central"
              fill={hovered === 'desc2' ? '#fff' : c.purple.text}
              style={{ transition: 'fill 0.2s' }}
              className="text-[14px] font-semibold">Descriptor seg 2</text>
            <text x={565} y={339} textAnchor="middle" dominantBaseline="central"
              fill={c.purple.sub} className="text-[12px]">heap · rw- · 2 págs</text>
          </InteractiveNode>

          {/* NIVEL 4: TABLAS DE PÁGINAS */}
          <InteractiveNode id="pt0" onEnter={handleEnter} onLeave={handleLeave}>
            <Box c={c.teal} x={30} y={400} w={170} h={100} r={8}
              hovered={hovered === 'pt0'} onEnter={handleEnter} onLeave={handleLeave} />
            <text x={115} y={420} textAnchor="middle" dominantBaseline="central"
              fill={hovered === 'pt0' ? '#fff' : c.teal.text}
              style={{ transition: 'fill 0.2s' }}
              className="text-[14px] font-semibold">Tabla de páginas</text>
            <rect x={44} y={433} width="142" height="22" rx="4"
              fill={c.box} stroke={c.boxStroke} strokeWidth="0.5" />
            <text x={115} y={444} textAnchor="middle" dominantBaseline="central"
              fill={c.sub} className="text-[12px]">pág 0 → Marco 14 RAM</text>
            <rect x={44} y={459} width="142" height="22" rx="4"
              fill={c.box} stroke={c.boxStroke} strokeWidth="0.5" opacity="0.6" />
            <text x={115} y={470} textAnchor="middle" dominantBaseline="central"
              fill={c.sub} className="text-[12px]">pág 1 → disco</text>
            <rect x={44} y={483} width="142" height="12" rx="4"
              fill={c.box} stroke={c.boxStroke} strokeWidth="0.5" opacity="0.3" />
          </InteractiveNode>

          <InteractiveNode id="pt1" onEnter={handleEnter} onLeave={handleLeave}>
            <Box c={c.teal} x={255} y={400} w={170} h={100} r={8}
              hovered={hovered === 'pt1'} onEnter={handleEnter} onLeave={handleLeave} />
            <text x={340} y={420} textAnchor="middle" dominantBaseline="central"
              fill={hovered === 'pt1' ? '#fff' : c.teal.text}
              style={{ transition: 'fill 0.2s' }}
              className="text-[14px] font-semibold">Tabla de páginas</text>
            <rect x={269} y={433} width="142" height="22" rx="4"
              fill={c.box} stroke={c.boxStroke} strokeWidth="0.5" />
            <text x={340} y={444} textAnchor="middle" dominantBaseline="central"
              fill={c.sub} className="text-[12px]">pág 0 → Marco 33 RAM</text>
            <rect x={269} y={459} width="142" height="22" rx="4"
              fill={c.box} stroke={c.boxStroke} strokeWidth="0.5" opacity="0.6" />
            <text x={340} y={470} textAnchor="middle" dominantBaseline="central"
              fill={c.sub} className="text-[12px]">pág 1 → Marco 89 RAM</text>
          </InteractiveNode>

          <InteractiveNode id="pt2" onEnter={handleEnter} onLeave={handleLeave}>
            <Box c={c.teal} x={480} y={400} w={170} h={100} r={8}
              hovered={hovered === 'pt2'} onEnter={handleEnter} onLeave={handleLeave} />
            <text x={565} y={420} textAnchor="middle" dominantBaseline="central"
              fill={hovered === 'pt2' ? '#fff' : c.teal.text}
              style={{ transition: 'fill 0.2s' }}
              className="text-[14px] font-semibold">Tabla de páginas</text>
            <rect x={494} y={433} width="142" height="22" rx="4"
              fill={c.box} stroke={c.boxStroke} strokeWidth="0.5" />
            <text x={565} y={444} textAnchor="middle" dominantBaseline="central"
              fill={c.sub} className="text-[12px]">pág 0 → disco</text>
            <rect x={494} y={459} width="142" height="22" rx="4"
              fill={c.box} stroke={c.boxStroke} strokeWidth="0.5" opacity="0.6" />
            <text x={565} y={470} textAnchor="middle" dominantBaseline="central"
              fill={c.sub} className="text-[12px]">pág 1 → Marco 7 RAM</text>
          </InteractiveNode>

          {/* NIVEL 5: SEGMENTOS */}
          <InteractiveNode id="seg0" onEnter={handleEnter} onLeave={handleLeave}>
            <Box c={c.coral} x={30} y={548} w={170} h={52} r={8}
              hovered={hovered === 'seg0'} onEnter={handleEnter} onLeave={handleLeave} />
            <text x={115} y={568} textAnchor="middle" dominantBaseline="central"
              fill={hovered === 'seg0' ? '#fff' : c.coral.text}
              style={{ transition: 'fill 0.2s' }}
              className="text-[14px] font-semibold">Páginas individuales</text>
            <text x={115} y={587} textAnchor="middle" dominantBaseline="central"
              fill={c.coral.sub} className="text-[12px]">bytes crudos</text>
          </InteractiveNode>
          <InteractiveNode id="seg1" onEnter={handleEnter} onLeave={handleLeave}>
            <Box c={c.coral} x={255} y={548} w={170} h={52} r={8}
              hovered={hovered === 'seg1'} onEnter={handleEnter} onLeave={handleLeave} />
            <text x={340} y={568} textAnchor="middle" dominantBaseline="central"
              fill={hovered === 'seg1' ? '#fff' : c.coral.text}
              style={{ transition: 'fill 0.2s' }}
              className="text-[14px] font-semibold">Páginas individuales</text>
            <text x={340} y={587} textAnchor="middle" dominantBaseline="central"
              fill={c.coral.sub} className="text-[12px]">bytes crudos</text>
          </InteractiveNode>
          <InteractiveNode id="seg2" onEnter={handleEnter} onLeave={handleLeave}>
            <Box c={c.coral} x={480} y={548} w={170} h={52} r={8}
              hovered={hovered === 'seg2'} onEnter={handleEnter} onLeave={handleLeave} />
            <text x={565} y={568} textAnchor="middle" dominantBaseline="central"
              fill={hovered === 'seg2' ? '#fff' : c.coral.text}
              style={{ transition: 'fill 0.2s' }}
              className="text-[14px] font-semibold">Páginas individuales</text>
            <text x={565} y={587} textAnchor="middle" dominantBaseline="central"
              fill={c.coral.sub} className="text-[12px]">bytes crudos</text>
          </InteractiveNode>

          {/* LEYENDA */}
          <rect x={30} y={628} width="620" height="70" rx="8"
            fill={c.legendBg} stroke={c.boxStroke} strokeWidth="0.5" />
          <text x={46} y={648} dominantBaseline="central" fill={c.text} className="text-[14px] font-semibold">
            Uno por proceso:
          </text>
          <text x={195} y={648} dominantBaseline="central" fill={c.sub} className="text-[12px]">
            PCB · segmento del descriptor
          </text>
          <text x={46} y={672} dominantBaseline="central" fill={c.text} className="text-[14px] font-semibold">
            Uno por segmento:
          </text>
          <text x={195} y={672} dominantBaseline="central" fill={c.sub} className="text-[12px]">
            descriptor · tabla de páginas · segmento
          </text>
          <line x1={430} y1={648} x2={458} y2={648} stroke={c.purple.sub} strokeWidth="1" markerEnd="url(#arrow)" />
          <text x={466} y={648} dominantBaseline="central" fill={c.sub} className="text-[12px]">puntero</text>
          <line x1={430} y1={668} x2={458} y2={668} stroke={c.teal.sub} strokeWidth="1" markerEnd="url(#arrow)" />
          <text x={466} y={668} dominantBaseline="central" fill={c.sub} className="text-[12px]">marcos RAM/disco</text>
        </svg>
      </div>
    </div>
  )
}
